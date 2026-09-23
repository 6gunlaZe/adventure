
const MERCHANT = "MuaBan";
const LEADER = "haiz";

// Danh sách item rác sẽ tự động bán
const TRASH_ITEMS = [
  "alloyquiver", "bandages", "basher", "beewings", "blade1111", "broom", "bunnyelixir","cake", "candycandesword", "cape", "carrotsword", "carrotsword1111", "cave_reedscythe",
  "cclaw", "coat", "coat1", "crabclaw", "cupid", "dagger", "daggerofthedead11111", "dstones", "eears", "ecape11", "eggnog","elixirdex0", "elixirdex1", "elixirdex2", "elixirint0", "elixirint1", "elixirint2",
  "elixirpnres", "elixirstr0", "elixirstr1", "elixirstr2", "elixirvit0", "elixirvit1","elixirvit2", "epyjamas", "eslippers", "fieldgen0", "fireblade1111", "firecrackers",
  "firestaff", "frankypants", "frogt", "gbow", "gloves", "gloves1", "gphelmet", "hammer","harmor", "hboots", "hgloves", "hhelmet", "hpamulet", "hpants", "hpbelt", "jacko",
  "lantern", "lostearring", "lspores", "maceofthedead", "merry", "mittens", "mittens1111",
  "mushroomstaff", "oozingterror", "ornamentstaff", "pants", "pants1", "partyhat","pclaw", "phelmet", "pinkie", "pmace", "pmaceofthedead", "poker", "pouchbow111",
  "pstem", "pumpkinspice", "quiver", "rapier", "rednose", "reefglass", "rfangs", "ringsj","santasbelt", "seashell", "shoes", "shoes1", "skates", "skullamulet", "slimestaff",
  "smoke111", "smush", "snowball111", "snowflakes", "sparkstaff", "spear", "spikedhelmet","sshield", "sstinger", "staffofthedead", "stinger", "stramulet", "strearring", "svenom",
  "swifty", "sword", "swordofthedead", "t2bow", "t2quiver", "talkingskull", "throwingstars","tombkey", "tshirt0", "tshirt1", "tshirt2", "tshirt3", "vboots", "vgloves", "vitring",
  "vitscroll", "wbasher", "wbook0", "wcap", "wbreeches", "wgloves", "whiteegg", "wshoes","wattire", "warmscarf", "xmace", "xmashat", "xmaspants", "xmasshoes", "xmassweater"
];

// 1. Khai báo danh sách các món đồ ưu tiên chế tạo
const craftList = ["computer", "cloverstud","moonshardearring",];

//Danh sách đổi quà tự động
const EXCHANGE = {
    gem0: 1, weaponbox: 1,
};

// Danh sách các item KHÔNG ĐƯỢC RÚT TỪ BANK để chế (chỉ dùng nếu có sẵn trong túi)
 const blackListCraftFromBank = ["essenceoffire", "smoke", "mbones"];

//  Luôn giữ lại các vật phẩm quan trọng trên túi đồ
const IMPORTANT_ITEMS = [
        "scroll0", "scroll1", "scroll2","stand0","stand1",
        "cscroll0", "cscroll1", "cscroll2", 
        "tracker", "computer", "supercomputer"
    ];


// ============================================================
// CONFIG
// ============================================================
map_key("A", "toggle_run_code");

const CONFIG = {
    ARRIVE_DELAY: 500,
    SERVICE_DELAY: 700,
    MAX_QUEUE: 30,
    DEFAULT_TIMEOUT: 300000,

    HOME_LOCATION: {
        map: "main",
        x: -100,
        y: -40
    }
};

// ============================================================
// LOCATIONS
// ============================================================

const LOCATIONS = {
    shop: { map: "main", x: 0, y: 0 },
    storage: { map: "bank", x: 0, y: -150 },
    upgrade: { map: "main", x: 0, y: 0 },
    gem: { map: "main", x: 0, y: 0 }
};

// ============================================================
// SERVICES
// ============================================================

const SERVICES = {
    hp: { priority: 10, target: "player", timeout: 150000, handler: service_hp },
    mp: { priority: 70, target: "player", timeout: 150000, handler: service_mp },
    full: { priority: 60, target: "player", timeout: 150000, handler: service_full },
    buy: { priority: 70, target: "shop", timeout: 15000, handler: service_buy },
    sell: { priority: 70, target: "shop", timeout: 15000, handler: service_sell },
    retrieve: { priority: 50, target: "storage", timeout: 15000, handler: service_retrieve },
    storage: { priority: 100, target: "storage", timeout: 150000, handler: service_storage },
    cleanup: { priority: 30, target: "storage", timeout: 15000, handler: service_cleanup },
    upgrade: { priority: 20, target: "upgrade", timeout: 30000, handler: service_upgrade },
    compound: { priority: 20, target: "upgrade", timeout: 30000, handler: service_compound },
    craft: { priority: 20, target: "upgrade", timeout: 30000, handler: service_craft },
    gem: { priority: 10, target: "gem", timeout: 15000, handler: service_gem }
};

// ============================================================
// STATE
// ============================================================

let busy = false;
let service = null;
let queue1 = [];
let serviceTimer = null;


// ============================================================
// AUTO UPGRADE RULES & WHITELIST  
// ============================================================

const upgradeGroups = {
	group_basic: [
		{ levels: [0,1,2,3,4], scroll: 0, offering: 0 },
		{ levels: [5,6],       scroll: 1, offering: 0 },
		{ levels: [7],         scroll: 2, offering: 0 },
		{ levels: [8],         scroll: 2, offering: 0 }
	],

	group_basic1: [
		{ levels: [0,1,2,3,4,5,6], scroll: 0, offering: 0 },
		{ levels: [7], scroll: 1, offering: 0 },
		{ levels: [8], scroll: 2, offering: 0 },

	],

	group_basic2: [
		{ levels: [0,1,2,3,4], scroll: 0, offering: 0 },
		//{ levels: [5,6],       scroll: 1, offering: 0 },
		//{ levels: [7],         scroll: 2, offering: 0 },
		//{ levels: [8],         scroll: 2, offering: 1 }
	],
	group_basic4: [
		{ levels: [0,1,2,3,4], scroll: 1, offering: 0 },
		{ levels: [5,6],       scroll: 2, offering: 0 },
		{ levels: [7],         scroll: 2, offering: 0 },
		//{ levels: [8],         scroll: 2, offering: 1 }
	],
	group_basic5: [
		{ levels: [0,1,2], scroll: 0, offering: 0 },
		{ levels: [3,4,5,6],       scroll: 1, offering: 0 },
		{ levels: [7],         scroll: 2, offering: 0 },
		//{ levels: [8],         scroll: 2, offering: 1 }
	],
	group_basic6: [
		{ levels: [0,1,2,3,4,5,6,7], scroll: 2, offering: 0 },
	],
	group_basic3: [
		{ levels: [0,1,2,3,4,5,6], scroll: 1, offering: 0 },
		{ levels: [7],         scroll: 2, offering: 0 },

	]
};

const upgradeWhitelistVIPP = {
	group_basic: ["throwingstars"],
	group_basic1: ["wcap","wattire","wbreeches","wgloves","wshoes"],
	group_basic2: ["cclaw233242"],
	group_basic3: ["t2bow","firebow","firestaff"],
	group_basic4: ["bowofthedead","crossbow","alloyquiver","harbringer"],
	group_basic5: ["quiver","shield","mittens"],
	group_basic6: ["t3bow"],

};

const COMPOUND_RULES = [ 
    { items: ["dexamulet","stramulet11","intamulet",], rules: [{ levels: [0, 1], scroll: null, offering: null }, { levels: [2,3], scroll: "cscroll1", offering: null },  ] },
    { items: ["dexring","intring"], rules: [{ levels: [0, 1], scroll: null, offering: null }, { levels: [2], scroll: "cscroll1", offering: null },  ] },
    { items: ["dexearring","strbelt","intbelt"], rules: [{ levels: [0,1], scroll: null, offering: null }, { levels: [2], scroll: "cscroll1", offering: null },  ] },
    { items: ["dexbelt"], rules: [{ levels: [0,1], scroll: null, offering: null },  ] },
    { items: ["wbook0"], rules: [{ levels: [0, 1, 2, 3], scroll: null, offering: null },  ] },
    { items: ["vitearring"], rules: [{ levels: [0], scroll: null, offering: null }, { levels: [1], scroll: "cscroll1", offering: null }] }
];


// Item thêm thủ công mua ponty
const PONTY_EXTRA_ITEMS = [
  "anniversarygift", "bataxe", "bcandle", "bfangamulet", "bowofthedead", "bwing","candy0", "candy1", "candycane", "cape", "carrot", "cdarktristone", "confetti",
  "crossbow", "cryptkey", "cshell", "dexbelt", "dexearring", "ectoplasm", "egg0","egg1", "egg2", "egg3", "egg4", "egg5", "egg6", "egg7", "egg8", "embercore",
  "essenceofether", "essenceofgreed", "fallen", "fireblade", "firecrackers", "fury","gcape", "gem0", "glolipop", "gslime", "harbringer", "ijx", "ink", "intbelt",
  "mcape", "mistletoe", "ololipop", "ornament", "powerglove", "rabbitsfoot", "scythe","slice_blueberry", "slice_citrus", "slice_honey", "slice_nightberry", "slice_strawberry",
  "snakefang", "smoke", "starkillers", "strbelt", "suckerpunch", "supermittens","stormfeather", "tshirt9", "vdagger", "vhammer", "vitearring", "voidthread",
  "weaponbox", "wbookhs", "x0", "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8","xarmor", "xgloves", "xhelmet"
];

// Giới hạn từng item mua của ponty
const itemLimits = {
    snowball: 1,
    smoke: 1,
};

const PONTY_EXCLUDE_ITEMS = [
    "wcap","wbreeches","wgloves","wshoes",

];


// ============================================================
// NHẬN CODE MESSAGE
// ============================================================

function on_cm(sender, data) {
    if (character.name !== MERCHANT) return;
    if (!data) return;

    const name = sender; // Chuẩn hóa name từ sender

    // =========================================================================
    // 1. XỬ LÝ DỮ LIỆU DẠNG CHUỖI (String - Forwarding & Dẫn quái ENT)
    // =========================================================================
    if (typeof data === "string") {
        
        // --- Logic Forwarding: Chuyển tiếp lệnh từ Haiz cho các thành viên trong party_list ---
        if (name === "haiz" ) {
            if (parent.party_list && parent.party_list.length > 0) {
                for (let member of parent.party_list) {
                    // Lọc bỏ Merchant, Haiz và Ynhi
                    if (member !== character.name && member !== "haiz" && member !== "Ynhi") {
                        send_cm(member, data);
                    }
                }
            }
        }

        // --- Logic dẫn quái ent về farm --- nên cho vào  HÀNG CHỜ QUEUE
      //  if ((name === "Ynhi" || name === "haiz") && data === "ent" && (character.map === "main" || !startLure)) {
      //      runLure();
     //   }

        return; 
    }

    // =========================================================================
    // 2. XỬ LÝ DỮ LIỆU DẠNG ĐỐI TƯỢNG (Kích hoạt chiến thuật / Instance Key)
    // =========================================================================
    if (typeof data === "object" && data !== null) {
        if (data.command) {
            game_log("Lệnh nhận được: " + data.command);
        }

        // --- Logic hỗ trợ Xmage (Haiz gửi Object kèm mã character.in) ---
        if (name === "haiz" && data.command === "assist_xmage") {
            const targetPos = { map: "winterland", x: 1049, y: -2002 };
            const isGoingToCorrectPlace = typeof smart !== "undefined" && 
                                          smart && 
                                          smart.moving && 
                                          smart.map === targetPos.map && 
                                          smart.x === targetPos.x && 
                                          smart.y === targetPos.y;

            const dungeon_key = data.instance_key;

            if (dungeon_key && character.map !== "winter_instance" && (!isGoingToCorrectPlace || !smart.moving)) {
                game_log("Nhận mã hầm ngục từ Haiz: " + dungeon_key);
                
                // Di chuyển đến cửa hầm ngục
                smart_move(targetPos, () => {
                    if (distance(character, targetPos) < 50) {
                        game_log("Đang vào đúng hầm ngục của Haiz...");
                        enter("winter_instance", dungeon_key); 
                    } else {
                        game_log("Không đúng vị trí cửa hầm ngục!");
                    }
                });
            }

            return; // Kết thúc xử lý lệnh assist_xmage trực tiếp
        }
    }

    // =========================================================================
    // 3. XỬ LÝ ĐƯA VÀO HÀNG CHỜ QUEUE (Các dịch vụ Merchant thông thường)
    // =========================================================================
    if (!data?.command) return;

    const config = SERVICES[data.command];

    if (!config) {
        console.log("[StoneMer] Unknown command:", data.command);
        return;
    }

    if (config.target === "player" && !data.name) {
        console.log("[StoneMer] Missing player name:", data.command);
        return;
    }

    const request = {
        id: Date.now() + "_" + Math.random().toString(36).slice(2),
        sender: sender,
        command: data.command,
        name: data.name,
        map: data.map,
        x: data.x,
        y: data.y,
        data: data,
        priority: config.priority,
        target: config.target,
        createdAt: Date.now()
    };

    if (queue1.length >= CONFIG.MAX_QUEUE) {
        console.log("[StoneMer] Queue full:", data.command, data.name);
        return;
    }

    if (is_duplicate_request(request)) {
        console.log("[StoneMer] DUPLICATE:", request.command, request.name);
        return;
    }

    queue1.push(request);
    sort_queue();

    console.log("[StoneMer] QUEUE:", request.command, request.name, "priority:", request.priority);

    process_queue();
}

// ============================================================
// SORT & PROCESS QUEUE
// ============================================================

function sort_queue() {
    queue1.sort((a, b) => {
        if (b.priority !== a.priority) return b.priority - a.priority;
        return a.createdAt - b.createdAt;
    });
}

function process_queue() {
    if (busy || queue1.length === 0) return;
  
    stop_idle_upgrade_loop();
  
    // 1. Khai báo biến cục bộ rõ ràng
    const currentService = queue1.shift();
    service = currentService; // Giữ lại nếu các hàm khác (như execute_service) vẫn dùng biến toàn cục 'service'
    busy = true;

    console.log("[StoneMer] START:", currentService.command, currentService.name, "priority:", currentService.priority);

    const config = SERVICES[currentService.command];

    clearTimeout(serviceTimer);
    serviceTimer = setTimeout(() => {
        // 2. Kiểm tra an toàn trước khi truy cập thuộc tính
        if (currentService) {
            console.log("[StoneMer] TIMEOUT:", currentService.command, currentService.name);
        } else {
            console.log("[StoneMer] TIMEOUT: Unknown service");
        }
        abort_service("Timeout executed");
    }, config?.timeout ?? CONFIG.DEFAULT_TIMEOUT);

    execute_service();
}

function execute_service() {
    if (!service) {
        finish_and_return();
        return;
    }

    const config = SERVICES[service.command];

    if (!config?.handler) {
        console.log("[StoneMer] Handler missing:", service.command);
        abort_service("Missing handler");
        return;
    }

    try {
        config.handler(service);
    } catch (e) {
        console.log("[StoneMer] ERROR:", service.command, e);
        abort_service("Exception in handler");
    }
}

// ============================================================
// NAVIGATION & TARGETING
// ============================================================

function get_service_destination(req) {
    const config = SERVICES[req.command];
    if (!config) return null;

    if (config.target === "player") {
        if (!req.map || req.x == null || req.y == null) return null;
        return { map: req.map, x: req.x, y: req.y };
    }

    const location = LOCATIONS[config.target];
    if (!location) return null;

    return { map: location.map, x: location.x, y: location.y };
}

function go_to_service(req, callback) {
	
    const destination = get_service_destination(req);

    if (!destination) {
        console.log("[StoneMer] Invalid destination:", req.command);
        abort_service("Invalid destination");
        return;
    }

    // 1. ƯU TIÊN LỆNH MỚI: Ngắt ngay di chuyển cũ (ví dụ đang di chuyển dở về HOME)
    if (smart.moving) {
        stop();
    }

    let completed = false;

    const moveTimeout = setTimeout(() => {
        if (!completed) {
            completed = true;
            console.log("[StoneMer] smart_move stuck -> Aborting");
            stop();
            abort_service("Smart move timeout");
        }
    }, CONFIG.DEFAULT_TIMEOUT - 2000);

    smart_move(destination, () => {
        if (completed || !service) return;

        completed = true;
        clearTimeout(moveTimeout);

        setTimeout(() => {
            if (!service) return;
            callback();
        }, CONFIG.ARRIVE_DELAY);
    });
}

function get_service_target() {
    if (!service?.name) return null;
    return get_player(service.name);
}

// ============================================================
// RETURN HOME & FINISH HANDLERS
// ============================================================

function return_home(on_complete) {
    const home = CONFIG.HOME_LOCATION;

    // 1. Nếu đã ở HOME -> Xử lý công việc tại HOME
    if (character.map === home.map && 
        Math.abs(character.x - home.x) < 15 && 
        Math.abs(character.y - home.y) < 15) {
        
        sell_trash_items();
        ensure_potions_at_home("hpot1", 9900);
        ensure_potions_at_home("mpot1", 9900);

        if (on_complete) on_complete();
        return;
    }

    // 2. CHẶN: Nếu đã và đang trên đường di chuyển (smart.moving = true) thì không gọi lại
    if (smart.moving) {
        return;
    }

    console.log(`[StoneMer] Moving to HOME: ${home.map} (${home.x}, ${home.y})`);

    // Dừng ép đồ khi di chuyển
    stop_idle_upgrade_loop();

    smart_move(home, () => {
        console.log("[StoneMer] Returned to HOME successfully.");
        
        sell_trash_items();
        open_stand();
		
        if (on_complete) on_complete();
    });
}

function finish_and_return() {
    clearTimeout(serviceTimer);
    serviceTimer = null;

    console.log("[StoneMer] Service finished, returning to HOME...");

    return_home(() => {
        console.log("[StoneMer] Reached HOME. Waiting 10s before releasing service...");

        setTimeout(() => {
            service = null;
            busy = false;

            console.log("[StoneMer] Service released after 10s.");
            process_queue();
        }, 10000);
    });
}

function abort_service(reason) {
    clearTimeout(serviceTimer);
    serviceTimer = null;

    console.log(`[StoneMer] Aborting service (${reason}). Returning to HOME...`);

    return_home(() => {
        console.log("[StoneMer] Reached HOME. Waiting 10s before releasing service...");

        setTimeout(() => {
            service = null;
            busy = false;

            console.log("[StoneMer] Service released after 10s.");
            process_queue();
        }, 10000);
    });
}

// ============================================================
// HANDLERS (SUPPLY)
// ============================================================

function service_full(req) {
    go_to_service(req, () => {
        const target = get_service_target();
        if (target) apply_mluck(target);
        if (target && target.name == "KiroDagger" )give_item(target.name, "confetti", 9999);
        setTimeout(() => finish_and_return(), CONFIG.SERVICE_DELAY);
    });
}



// Handler xử lý cấp Máu (HP)
function service_hp(req) {
    // 1. Mua đủ HP Potions trước khi xuất phát (khi vẫn đang ở HOME)
    ensure_potions_at_home("hpot1", 8000);

    // 2. Chạy tới vị trí nhân vật yêu cầu
    go_to_service(req, () => {
        const target = get_service_target();
        if (target) {
            give_potion(target, "hpot1");
            apply_mluck(target); // Buff MLuck tiện thể
        }
        setTimeout(() => finish_and_return(), CONFIG.SERVICE_DELAY);
    });
}

// Handler xử lý cấp Mana (MP)
function service_mp(req) {
    // 1. Mua đủ MP Potions trước khi xuất phát (khi vẫn đang ở HOME)
    ensure_potions_at_home("mpot1", 8000);

    // 2. Chạy tới vị trí nhân vật yêu cầu
    go_to_service(req, () => {
        const target = get_service_target();
        if (target) {
            give_potion(target, "mpot1");
            apply_mluck(target); // Buff MLuck tiện thể
        }
        setTimeout(() => finish_and_return(), CONFIG.SERVICE_DELAY);
    });
}

// ============================================================
// STUB HANDLERS
// ============================================================

function service_buy(req) { go_to_service(req, () => setTimeout(finish_and_return, CONFIG.SERVICE_DELAY)); }
function service_sell(req) { go_to_service(req, () => setTimeout(finish_and_return, CONFIG.SERVICE_DELAY)); }
function service_retrieve(req) { go_to_service(req, () => setTimeout(finish_and_return, CONFIG.SERVICE_DELAY)); }
function service_upgrade(req) { go_to_service(req, () => setTimeout(finish_and_return, CONFIG.SERVICE_DELAY)); }
function service_compound(req) { go_to_service(req, () => setTimeout(finish_and_return, CONFIG.SERVICE_DELAY)); }
function service_craft(req) { go_to_service(req, () => setTimeout(finish_and_return, CONFIG.SERVICE_DELAY)); }
function service_gem(req) { go_to_service(req, () => setTimeout(finish_and_return, CONFIG.SERVICE_DELAY)); }

// ============================================================
// ITEM FUNCTIONS
// ============================================================

// Hàm thực hiện Buff MLuck dựa theo logic kiểm tra chuẩn
function apply_mluck(target) {
    if (!target) return;

    // Kiểm tra khoảng cách sử dụng skill mluck
    if (!is_in_range(target, "mluck")) return;

    // Logic kiểm tra xem target có cần MLuck không (lấy từ code mẫu của bạn)
    const needs_mluck = target.ctype !== "merchant" && (
        !target.s ||
        !target.s.mluck ||
        (target.s.mluck.f !== character.name && !target.s.mluck.strong) ||
        (target.s.mluck.f === character.name && target.s.mluck.ms < 2000000)
    );

    if (needs_mluck && !is_on_cooldown("mluck")) {
        use_skill("mluck", target);
        console.log(`[StoneMer] 🍀 MLuck applied to ${target.name}`);
    }
}

function give_potion(target, potion) {
    // 1. Kiểm tra target có tồn tại và đứng gần không (get_player trả về null nếu quá xa)
    if (!target) {
        console.log("[StoneMer] Target not found or too far away.");
        return;
    }

    const targetName = target.id;
    let need = 8000; // Số lượng potion tối đa muốn chuyển

    // 2. Duyệt qua túi đồ của Merchant để gửi item
    for (let i = 0; i < character.items.length && need > 0; i++) {
        const item = character.items[i];
        if (!item || item.name !== potion) continue;

        // Bỏ qua item bị khóa (locked / sealed)
        if (item.l || item.s) continue;

        const currentQty = item.q ?? 1;
        const amountToSend = Math.min(currentQty, need);

        // Gọi hàm send_item chuẩn API Adventure Land: send_item(target_name, slot_index, quantity)
        send_item(targetName, i, amountToSend);
        console.log(`[StoneMer] Sent ${amountToSend}x ${potion} to ${targetName}`);

        need -= amountToSend;
    }
}


// Hàm trợ giúp kiểm tra & mua Potion ngay tại HOME trước khi di chuyển
function ensure_potions_at_home(potion_name, amount_needed = 4000) {
    let merchant_has = 0;
    
    // Đếm Potion hiện có trong túi Merchant
    for (const item of character.items) {
        if (item && item.name === potion_name) {
            merchant_has += item.q ?? 1;
        }
    }

    // Nếu thiếu Potion, tiến hành mua ngay từ NPC (vì Merchant đang ở HOME)
    if (merchant_has < amount_needed) {
        let to_buy = amount_needed - merchant_has;
			buy(potion_name, to_buy);
            console.log(`[StoneMer] 🛒 Bought ${to_buy}x ${potion_name} at HOME`);
    }
}


function is_duplicate_request(req) {
    const config = SERVICES[req.command];
    if (!config) return false;

    if (config.target === "player") {
        if (service && service.command === req.command && service.name === req.name) return true;
        if (queue1.some(q => q.command === req.command && q.name === req.name)) return true;
        return false;
    }

    if (service && service.command === req.command) return true;
    if (queue1.some(q => q.command === req.command)) return true;

    return false;
}




function sell_trash_items() {
    // Nếu đứng tại HOME mà muốn bán đồ cho NPC, cần đảm bảo có NPC bán hàng gần đó 
    // hoặc Merchant đã mở Stand (mở bảng bán hàng)
    const home = CONFIG.HOME_LOCATION;

if (
    character.map !== home.map ||
    Math.hypot(character.x - home.x, character.y - home.y) >= 300
) {
    return;
}


	
    let soldCount = 0;

    for (let i = 0; i < character.items.length; i++) {
        const item = character.items[i];
        if (!item) continue;

        // Kiểm tra vật phẩm thuộc danh sách rác và không bị khóa (locked)
        if (TRASH_ITEMS.includes(item.name) && !item.l && !item.s && (item.level ?? 0) <= 0) {
            sell(i, item.q ?? 1);
            console.log(`[StoneMer] Sold trash item at HOME: ${item.name}`);
            soldCount++;
        }
    }

    if (soldCount > 0) {
        console.log(`[StoneMer] Cleaned up ${soldCount} trash items at HOME.`);
    }
}




/**
 * Kiểm tra xem túi đồ có sắp đầy hay chưa
 * @param {number} threshold - Số ô trống tối thiểu còn lại. Mặc định là 0 (đầy 100%)
 * @returns {boolean}
 */
function is_inventory_full(threshold = 0) {
    const freeSlots = character.items.filter(item => item === null).length;
    return freeSlots <= threshold;
}

/**
 * Kiểm tra xem một item trong túi có nên cất vào Bank hay không
 * @param {object} item - Object item lấy từ character.items[i]
 * @param {object} [kept_counts={}] - Object dùng để đếm/theo dõi số lượng item đã giữ lại (ví dụ: { hpot1: 1, mpot1: 1 })
 * @returns {boolean} - Returns true nếu món đồ NÊN cất vào Bank, false nếu GIỮ LẠI trong túi
 */
function should_store_item(item, kept_counts = {}) {
    // 1. Nếu ô trống hoặc item không hợp lệ -> Không làm gì
    if (!item) return false;

    // 2. Không cất các item đang bị Khóa (Locked) hoặc Niêm phong (Sealed)
    if (item.l || item.s) return false;

    // 3. Giữ lại Potion (Máu / Mana) - Chỉ giữ tối đa 1 stack chính cho mỗi loại
    if (item.name === "hpot1" || item.name === "mpot1") {
        if (!kept_counts[item.name]) {
            kept_counts[item.name] = 1; // Đánh dấu đã giữ lại 1 stack trong túi
            return false; // Giữ lại stack này
        }
        // Nếu đã có 1 stack Potion trong túi rồi thì stack dư thừa sẽ cho cất vào Bank
        return true; 
    }

    if (IMPORTANT_ITEMS.includes(item.name)) {
        return false; // Giữ lại trong túi
    }

    // 5. TRASH_ITEMS -> Không cất vào Bank
    if (TRASH_ITEMS.includes(item.name)) {
        return false;
    }

	
    return true;
}


// ============================================================
// STONEMER IDLE UPGRADE INTEGRATION
// ============================================================

let idleUpgradeTimer = null;















/**
 * Hàm trợ giúp tìm item trong túi đồ
 */
function find_item(filter) {
	for (let i = 0; i < character.items.length; i++) {
		if (filter(character.items[i])) return [i, character.items[i]];
	}
	return null;
}

/**
 * Khởi động / Dừng vòng lặp Upgrade khi rảnh
 */
function start_idle_upgrade_loop() {
    stop_idle_upgrade_loop();
    idleUpgradeTimer = setInterval(() => {
        // Chặn nâng cấp nếu đang di chuyển hoặc đang bận làm nhiệm vụ
        if (smart.moving || busy || queue1.length > 0 || character.esize < 1 || character.gold < 4500000 ) return;
        compound_itemsVIP();
        upgradeVIP_Idle();
    }, 1700);
}

function stop_idle_upgrade_loop() {
	if (idleUpgradeTimer) {
		clearInterval(idleUpgradeTimer);
		idleUpgradeTimer = null;
	}
}






// Khởi chạy kiểm tra vị trí/bắt đầu loop khi vừa load script
if (!busy && queue1.length === 0) {
    return_home();
}



setInterval(function() {

    use_hp_or_mp1()
	
    if (character.name === LEADER) return;

    if (!character.party) {
        send_party_request(LEADER);
    } else if (character.party !== LEADER) {
        leave_party();
    }
}, 2000); // 2000ms = 2 giây chạy 1 lần




setInterval(() => character.rip && respawn(), 50000);


function use_hp_or_mp1() {
	if (safeties && mssince(last_potion) < min(200, character.ping * 3)) return resolving_promise({ reason: "safeties", success: false, used: false });
	if (is_on_cooldown("use_hp")) return resolving_promise({ success: false, reason: "cooldown" });
	var skill = null;
	if (character.mp / character.max_mp < 0.2) skill = "use_mp";
	else if (character.hp / character.max_hp < 0.6) skill = "use_hp";
	else if (character.mp / character.max_mp < 0.9) skill = "use_mp";
	if (!skill) return resolving_promise({ reason: "full", success: false, used: false });
	last_potion = new Date();
	return use_skill(skill);
}





// ============================================================
// HÀM HỖ TRỢ ĐẾM Ô TRỐNG
// ============================================================

function get_free_inventory_slots() {
    return character.items.filter(slot => slot === null).length;
}

// ============================================================
// QUY TRÌNH CHÍNH (FULL AUTO STORAGE & UPGRADE/COMPOUND RETRIEVE)
// ============================================================

function service_storage(req) {
    go_to_service(req, async () => {
        if (character.map !== "bank") {
            console.log("[StoneMer] Chưa ở trong Bank, aborting...");
            finish_and_return();
            return;
        }

        console.log("==================================================");
        console.log("[StoneMer] BẮT ĐẦU BƯỚC 1: CẤT ĐỒ KHÔNG CẦN THIẾT VÀO KHO");
        console.log("==================================================");

        const kept_counts = {};
        for (let i = 0; i < character.items.length; i++) {
            const item = character.items[i];
            if (!item) continue;

            // should_store_item đã định nghĩa ở bài trước (kiểm tra CONFIG.KEEP_ITEMS)
            if (should_store_item(item, kept_counts)) {
                try {
                    await bank_store(i);
                    console.log(`[StoneMer] Đã cất ${item.name} từ ô ${i} vào Bank.`);
                    await new Promise(resolve => setTimeout(resolve, 200));
                } catch (err) {
                    console.log(`[StoneMer] Lỗi cất item ô ${i}:`, err);
                    if (err?.reason === "bank_full") {
                        console.log("[StoneMer] Bank đã đầy!");
                        break;
                    }
                }
            }
        }

        // Tự gửi Vàng thừa nếu có quá 10b
        if (character.gold > 10000000000) {
            try { await bank_deposit(character.gold - 10000000000); } catch (e) {}
        }

        console.log("==================================================");
        console.log("[StoneMer] BẮT ĐẦU BƯỚC 2: CHECK VÀ RÚT ĐỒ NÂNG CẤP / GHÉP");
        console.log("==================================================");

        await process_upgrade_and_compound_retrieval();

        console.log("[StoneMer] Hoàn thành quy trình kho! Chuẩn bị về HOME.");
        setTimeout(() => finish_and_return(), CONFIG.SERVICE_DELAY);
    });
}

// Gán cleanup dùng chung logic với storage
function service_cleanup(req) {
    service_storage(req);
}






async function process_upgrade_and_compound_retrieval() {
    // --- 0. HELPER XÁC ĐỊNH TẦNG & DI CHUYỂN ---
    const packFloor = (pack) => {
        const n = +pack.replace("items", "");
        return n <= 7 ? "bank" : n <= 23 ? "bank_b" : "bank_u";
    };

    const go = async (to) => {
        if (!to || character.map === to) return;
        console.log(`[StoneMer] [TRAVEL] Di chuyển tầng: ${character.map} -> ${to}`);
        try {
            await smart_move(to);
        } catch (err) {
            console.log(`[StoneMer] Lỗi di chuyển sang ${to}:`, err);
        }
    };

    const getFreeSlots = () => character.esize ?? character.items.filter(i => !i).length;

    // ----------------------------------------------------
    // 1. Quét toàn bộ đồ hiện có trong Bank
    // ----------------------------------------------------
    const bank_items_map = {};

    for (const pack in character.bank) {
        if (!pack.startsWith("items")) continue;
        const pack_items = character.bank[pack];
        if (!Array.isArray(pack_items)) continue;

        for (let slot = 0; slot < pack_items.length; slot++) {
            const item = pack_items[slot];
            if (!item) continue;

            const level = item.level ?? 0;
            const key = `${item.name}_${level}`;
            if (!bank_items_map[key]) bank_items_map[key] = [];
            bank_items_map[key].push({ pack, slot, item });
        }
    }

    // DANH SÁCH CÁC BỘ HÀNH ĐỘNG (ACTION SETS)
    const action_sets = [];
    const reservedUniqueSlots = new Set();

    // ----------------------------------------------------
    // A. Check Upgrade Whitelist (Tạo các Bộ Upgrade 2 món)
    // ----------------------------------------------------
    for (const groupName in upgradeWhitelistVIPP) {
        const itemsInGroup = upgradeWhitelistVIPP[groupName] || [];
        const groupRules = upgradeGroups[groupName] || [];
        const validLevels = groupRules.flatMap(rule => rule.levels);

        for (const key in bank_items_map) {
            const [name, levelStr] = key.split("_");
            const level = parseInt(levelStr, 10);
            if (!itemsInGroup.includes(name) || !validLevels.includes(level)) continue;

            const available = (bank_items_map[key] || []).filter(e => !reservedUniqueSlots.has(`${e.pack}:${e.slot}`));
            if (available.length >= 2) {
                const pairsCount = Math.floor(available.length / 2);
                for (let i = 0; i < pairsCount; i++) {
                    const item1 = available[i * 2];
                    const item2 = available[i * 2 + 1];
                    reservedUniqueSlots.add(`${item1.pack}:${item1.slot}`);
                    reservedUniqueSlots.add(`${item2.pack}:${item2.slot}`);

                    action_sets.push({
                        type: "Upgrade",
                        name: `${name} +${level}`,
                        items: [item1, item2]
                    });
                }
            }
        }
    }

    // ----------------------------------------------------
    // B. Check Compound Rules (Tạo các Bộ Compound 3 món)
    // ----------------------------------------------------
    for (const compound_entry of COMPOUND_RULES) {
        for (const itemName of compound_entry.items) {
            for (const rule of compound_entry.rules) {
                for (const validLevel of rule.levels) {
                    const key = `${itemName}_${validLevel}`;
                    const available = (bank_items_map[key] || []).filter(e => !reservedUniqueSlots.has(`${e.pack}:${e.slot}`));

                    if (available.length >= 3) {
                        const setsCount = Math.floor(available.length / 3);
                        for (let i = 0; i < setsCount; i++) {
                            const item1 = available[i * 3];
                            const item2 = available[i * 3 + 1];
                            const item3 = available[i * 3 + 2];
                            reservedUniqueSlots.add(`${item1.pack}:${item1.slot}`);
                            reservedUniqueSlots.add(`${item2.pack}:${item2.slot}`);
                            reservedUniqueSlots.add(`${item3.pack}:${item3.slot}`);

                            action_sets.push({
                                type: "Compound",
                                name: `${itemName} +${validLevel}`,
                                items: [item1, item2, item3]
                            });
                        }
                    }
                }
            }
        }
    }

    // ----------------------------------------------------
    // C. Check Crafting List (LẶP ĐẾN KHỦNG DÙNG HẾT NGUYÊN LIỆU)
    // ----------------------------------------------------
    // 1. Pool ảo nguyên liệu BANK
    const virtualStackPool = {};
    for (const key in bank_items_map) {
        const [name] = key.split("_");
        const itemGData = parent.G.items[name];
        if (itemGData && !itemGData.upgrade && !itemGData.compound) {
            if (!virtualStackPool[name]) virtualStackPool[name] = [];
            bank_items_map[key].forEach(entry => {
                virtualStackPool[name].push({
                    pack: entry.pack,
                    slot: entry.slot,
                    qRemaining: entry.item.q || 1,
                    entry: entry
                });
            });
        }
    }

    // 2. Pool ảo nguyên liệu TRONG TÚI (Để trừ dần khi craft lặp lại)
    const virtualBagPool = {};
    const usedBagSlots = new Set();
    character.items.forEach((item, slot) => {
        if (!item) return;
        const itemGData = parent.G.items[item.name];
        if (itemGData && !itemGData.upgrade && !itemGData.compound) {
            virtualBagPool[item.name] = (virtualBagPool[item.name] || 0) + (item.q || 1);
        }
    });

    const craftList112 = craftList;

    for (const craftName of craftList112) {
        const craftDef = parent.G.craft[craftName];
        if (!craftDef) continue;

        // Vòng lặp liên tục cho cùng 1 công thức
        while (true) {
            let totalCost = craftDef.cost || 0;
            let canCraft = true;
            const bankItemsForThisRecipe = [];
            const poolUpdates = []; 
            const reservedUniqueForThisCraft = [];
            const bagDeductions = [];

            for (const itemDef of craftDef.items) {
                const quantity = itemDef[0];
                const itemName = itemDef[1];
                const reqLevel = itemDef[2] || 0;

                const itemGData = parent.G.items[itemName];
                const isEquipment = itemGData && (itemGData.upgrade || itemGData.compound);

                // Kiểm tra số lượng còn khả dụng trong TÚI ĐỒ (ảo)
                let availableInBag = 0;
                if (isEquipment) {
                    character.items.forEach((i, idx) => {
                        if (i && i.name === itemName && (i.level || 0) === reqLevel && !usedBagSlots.has(idx)) {
                            availableInBag += 1;
                        }
                    });
                } else {
                    availableInBag = virtualBagPool[itemName] || 0;
                }

                let takenFromBag = Math.min(availableInBag, quantity);
                let neededFromBank = quantity - takenFromBag;

                let inBankCount = 0;
                const tempBankSlots = [];
                const isBlacklisted = typeof blackListCraftFromBank !== "undefined" && blackListCraftFromBank.includes(itemName);

                if (neededFromBank > 0 && !isBlacklisted) {
                    if (isEquipment) {
                        const key = `${itemName}_${reqLevel}`;
                        const bankAvailable = bank_items_map[key] || [];
                        for (const bankEntry of bankAvailable) {
                            const slotKey = `${bankEntry.pack}:${bankEntry.slot}`;
                            if (reservedUniqueSlots.has(slotKey) || reservedUniqueForThisCraft.includes(slotKey)) continue;

                            inBankCount += 1;
                            tempBankSlots.push(bankEntry);
                            reservedUniqueForThisCraft.push(slotKey);
                            if (inBankCount >= neededFromBank) break;
                        }
                    } else {
                        const pool = virtualStackPool[itemName] || [];
                        for (const stock of pool) {
                            if (neededFromBank <= 0) break;

                            const pendingDeduction = poolUpdates
                                .filter(u => u.stock === stock)
                                .reduce((sum, u) => sum + u.deduct, 0);
                            const currentAvailableQ = stock.qRemaining - pendingDeduction;

                            if (currentAvailableQ <= 0) continue;

                            const takeQ = Math.min(currentAvailableQ, neededFromBank);
                            poolUpdates.push({ stock, deduct: takeQ });
                            neededFromBank -= takeQ;
                            inBankCount += takeQ;

                            if (!tempBankSlots.some(b => b.pack === stock.entry.pack && b.slot === stock.entry.slot)) {
                                tempBankSlots.push(stock.entry);
                            }
                        }
                    }
                }

                if (takenFromBag + inBankCount < quantity) {
                    const stillNeeded = quantity - (takenFromBag + inBankCount);
                    if (reqLevel === 0 && parent.G.npcs.basics?.items?.includes(itemName)) {
                        totalCost += (itemGData.g * stillNeeded);
                    } else {
                        canCraft = false;
                        break;
                    }
                }

                bagDeductions.push({ itemName, isEquipment, count: takenFromBag, reqLevel });
                bankItemsForThisRecipe.push(...tempBankSlots);
            }

            // ĐỦ ĐIỀU KIỆN CRAFT & CÓ NGHĨA VỤ RÚT TỪ BANK -> TẠO BỘ
            if (canCraft && character.gold >= totalCost && bankItemsForThisRecipe.length > 0) {
                // Trừ kho ảo TÚI ĐỒ
                bagDeductions.forEach(d => {
                    if (d.isEquipment) {
                        let countLeft = d.count;
                        character.items.forEach((i, idx) => {
                            if (countLeft > 0 && i && i.name === d.itemName && (i.level || 0) === d.reqLevel && !usedBagSlots.has(idx)) {
                                usedBagSlots.add(idx);
                                countLeft--;
                            }
                        });
                    } else {
                        virtualBagPool[d.itemName] -= d.count;
                    }
                });

                // Trừ kho ảo BANK
                poolUpdates.forEach(u => u.stock.qRemaining -= u.deduct);
                reservedUniqueForThisCraft.forEach(s => reservedUniqueSlots.add(s));

                action_sets.push({
                    type: "Crafting",
                    name: craftName,
                    items: bankItemsForThisRecipe
                });
            } else {
                // Không đủ tài nguyên để craft thêm lần nữa (hoặc không cần rút gì từ bank) -> Dừng công thức này
                break;
            }
        }
    }

    // ----------------------------------------------------
    // D. RÚT ĐỒ THEO BỘ (KIỂM TRA DỰ PHÒNG SỨC CHỨA)
    // ----------------------------------------------------
    if (!action_sets.length) {
        console.log("[StoneMer] Không có bộ đồ nào đủ điều kiện để rút.");
        return;
    }

    console.log(`[StoneMer] Phát hiện ${action_sets.length} bộ hành động cần rút.`);

    for (const set of action_sets) {
        const uniqueItemsInSet = set.items.filter((item, index, self) =>
            index === self.findIndex((t) => t.pack === item.pack && t.slot === item.slot)
        );

        const freeSlots = getFreeSlots();
        const neededSlots = uniqueItemsInSet.length;

        if (freeSlots - neededSlots < 4) {
            console.log(`[StoneMer] ⚠️ Bỏ qua bộ [${set.type}: ${set.name}]! Cần ${neededSlots} ô nhưng túi chỉ còn ${freeSlots} ô trống (cần giữ 4 ô dự phòng).`);
            continue; 
        }

        console.log(`[StoneMer] 📦 Bắt đầu rút TRỌN BỘ [${set.type}: ${set.name}] (${neededSlots} ô)...`);

        const setByFloor = {};
        for (const target of uniqueItemsInSet) {
            const floor = packFloor(target.pack);
            if (!setByFloor[floor]) setByFloor[floor] = [];
            setByFloor[floor].push(target);
        }

        for (const floor in setByFloor) {
            await go(floor);

            for (const target of setByFloor[floor]) {
                try {
                    await bank_retrieve(target.pack, target.slot);
                    console.log(`[StoneMer]  └─ Đã rút: ${target.item.name} (+${target.item.level ?? 0}) từ ${target.pack}[${target.slot}]`);
                    await new Promise(resolve => setTimeout(resolve, 250));
                } catch (err) {
                    console.log(`[StoneMer] Lỗi khi rút ${target.item.name}:`, err);
                }
            }
        }
    }

    console.log("[StoneMer] Hoàn thành rút đồ theo bộ!");
}











// Flag tránh chạy chồng chéo lệnh craft
let isCraftingBusy = false;

// 2. Chạy hàm kiểm tra chế đồ định kỳ (mỗi 2 giây check 1 lần)
setInterval(async () => {
    if (isCraftingBusy || character.rip) return;

    isCraftingBusy = true;
    try {
        await tryCraftOptimized();
    } catch (e) {
        console.log("[Craft Loop Error]", e);
    } finally {
        isCraftingBusy = false;
    }
}, 1000);

async function tryCraftOptimized() {
    for (const craftName of craftList) {
        const craftDef = parent.G.craft[craftName];
        if (!craftDef) continue;

        let totalCost = craftDef.cost || 0;
        const missingItems = [];

        // Duyệt từng nguyên liệu theo đúng cấu trúc JSON của game
        for (const itemDef of craftDef.items) {
            const quantity = itemDef[0];
            const itemName = itemDef[1];
            const reqLevel = itemDef[2] || 0; // Lấy level yêu cầu (nếu có)

            const itemGData = parent.G.items[itemName];
            const isEquipment = itemGData.upgrade || itemGData.compound;

            // Tìm nguyên liệu trong Túi đồ thỏa mãn đúng Tên và Level
            const invIndex = character.items.findIndex(i => {
                if (!i || i.name !== itemName) return false;
                if (isEquipment) {
                    return (i.level || 0) === reqLevel; // Bắt buộc đúng level yêu cầu
                }
                return i.q ? i.q >= quantity : true;
            });

            if (invIndex === -1) {
                // Nếu thiếu và công thức yêu cầu Level 0 + NPC Basics có bán -> Cho phép mua
                if (reqLevel === 0 && parent.G.npcs.basics?.items?.includes(itemName)) {
                    totalCost += (itemGData.g * quantity);
                    missingItems.push({ name: itemName, q: quantity });
                } else {
                    // Thiếu đồ có Level (ví dụ hpbelt +2) hoặc đồ hiếm -> Bỏ qua món này
                    missingItems.push({ name: itemName, unbuyable: true });
                    break;
                }
            }
        }

        // Không đủ vàng hoặc thiếu đồ không mua được -> Bỏ qua món craft này
        if (character.gold < totalCost || missingItems.some(i => i.unbuyable)) {
            continue;
        }

        // Mua nguyên liệu thiếu từ xa (chỉ áp dụng cho nguyên liệu Level 0)
        if (missingItems.length > 0) {
            for (const item of missingItems) {
                console.log(`[Crafting] Mua từ xa: ${item.q}x ${item.name}`);
                await buy(item.name, item.q);
            }
            return; // Chờ tick sau túi đồ cập nhật rồi mới gọi auto_craft
        }

        // Đã đủ nguyên liệu (chuẩn Level) trong túi -> Gọi hàm auto_craft!
        try {
            console.log(`[Crafting] Bắt đầu chế: ${craftName}`);
            await auto_craft(craftName);
            console.log(`[Crafting] SUCCESS: ${craftName}`);
            break;
        } catch (err) {
            console.log(`[Crafting FAIL] ${craftName}:`, err?.reason || err);
        }
    }
}

function compound_itemsVIP() {
	// Kiểm tra nếu Merchant đang bận làm service khác hoặc hàng chờ không trống
	if (busy || queue1.length > 0) return false;

	// Không nâng cấp nếu character đang trong thời gian chờ compound của game
	if (character.q?.compound) {
		console.log("[StoneMer IDLE] ⏳ Đang cooldown compound");
		return false;
	}

	let bestCandidate = null;

	// Quét tìm bộ 3 item có cấp thấp nhất hợp lệ
	for (let i = 0; i < character.items.length; i++) {
		let item = character.items[i];
		if (!item) continue;

		// Bỏ qua item bị khóa hoặc item đặc biệt
		if (item.p1111 || item.l || item.s) continue;

		// Tìm nhóm rule
		let group = COMPOUND_RULES.find(
			g => g.items.includes(item.name)
		);

		if (!group) continue;

		let rule = group.rules.find(
			r => r.levels.includes(item.level)
		);

		if (!rule) continue;

		// Tìm đủ 3 slot trùng tên + level
		let matchingSlots = [];

		for (let j = 0; j < character.items.length; j++) {
			let it = character.items[j];

			if (
				it &&
				it.name === item.name &&
				it.level === item.level &&
				!it.p1111 &&
				!it.l &&
				!it.s
			) {
				matchingSlots.push(j);
			}
		}

		if (matchingSlots.length >= 3) {

			console.log(
				`[StoneMer IDLE] 🔎 Compound candidate:` +
				` ${item.name}+${item.level}` +
				` | slots=${matchingSlots.join(",")}` +
				` | count=${matchingSlots.length}`
			);

			if (
				!bestCandidate ||
				item.level < bestCandidate.level
			) {
				bestCandidate = {
					name: item.name,
					level: item.level,
					slots: matchingSlots.slice(0, 3),
					rule: rule
				};
			}
		}
	}

	if (!bestCandidate) return false;

	let {
		name,
		level,
		slots,
		rule
	} = bestCandidate;

	console.log(
		`[StoneMer IDLE] 🎯 Compound target:` +
		` ${name}+${level}` +
		` | slots=${slots.join(",")}` +
		` | scrollRule=${rule.scroll ?? "default"}` +
		` | offeringRule=${rule.offering ?? "none"}`
	);

	// Xác định tên Scroll
	let scrollName = rule.scroll || "cscroll0";

	let scroll_info = find_item(
		i => i && i.name === scrollName
	);

	let scrollSlot = scroll_info
		? scroll_info[0]
		: -1;

	console.log(
		`[StoneMer IDLE] 📦 Compound material:` +
		` scroll=${scrollName}` +
		` slot=${scrollSlot}`
	);

	if (scrollSlot === -1) {

		console.log(
			`[StoneMer IDLE] 🛒 Thiếu ${scrollName} -> BUY`
		);

		if (parent.buy) {
			parent.buy(scrollName);
		} else {
			console.log(
				"[StoneMer IDLE] ❌ parent.buy không tồn tại"
			);
		}

		return true;
	}

	// Kiểm tra Offering
	let offeringSlot = -1;

	if (rule.offering) {

		let offering_info = find_item(
			i => i && i.name === rule.offering
		);

		offeringSlot = offering_info
			? offering_info[0]
			: -1;

		console.log(
			`[StoneMer IDLE] 📦 Offering:` +
			` ${rule.offering}` +
			` slot=${offeringSlot}`
		);

		// Thiếu offering bắt buộc -> Bỏ qua ghép
		if (offeringSlot === -1) {

			console.log(
				`[StoneMer IDLE] ❌ Thiếu offering ${rule.offering} -> bỏ qua compound`
			);

			return true;
		}
	}

	// Buff Mass Production
	if (
		can_use("massproductionpp") && character.level >= 60 &&
		!character.s.massproductionpp
	) {
		console.log(
			"[StoneMer IDLE] ⚡ Dùng massproductionpp"
		);

		use_skill("massproductionpp");

	} else if (
		can_use("massproduction") &&
		!character.s.massproduction
	) {
		console.log(
			"[StoneMer IDLE] ⚡ Dùng massproduction"
		);

		use_skill("massproduction");
	}

	// Thực hiện ghép packet
	if (parent.socket) {

		console.log(
			`[StoneMer IDLE] 🚀 SEND compound:` +
			` items=[${slots.join(",")}]` +
			` scroll=${scrollSlot}` +
			` offering=${offeringSlot > -1 ? offeringSlot : null}` +
			` clevel=${level}`
		);

		parent.socket.emit("compound", {
			items: slots,
			scroll_num: scrollSlot,
			offering_num:
				offeringSlot > -1
					? offeringSlot
					: null,
			clevel: level
		});

		let logMessage =
			`💎 Compound ${name}+${level}` +
			` using ${scrollName}` +
			`${rule.offering ? " + " + rule.offering : ""}`;

		if (typeof game_log === "function")
			game_log(logMessage);
		else
			console.log(logMessage);

	} else {

		console.log(
			"[StoneMer IDLE] ❌ parent.socket không tồn tại"
		);
	}

	return true;
}




function upgradeVIP_Idle() {
	// Kiểm tra nếu Merchant đang bận làm service khác hoặc hàng chờ không trống
	if (busy || queue1.length > 0) return;

	// Không nâng cấp nếu character đang trong thời gian chờ upgrade của game
	if (character.q?.upgrade) {
		console.log("[StoneMer IDLE] ⏳ Đang cooldown upgrade");
		return;
	}

// Đếm số lượng từng loại item trong túi
let itemCounts = {};

for (let i = 0; i < character.items.length; i++) {
	let c = character.items[i];
	if (!c) continue;

	itemCounts[c.name] = (itemCounts[c.name] || 0) + 1;
}

	
	let candidates = [];

	for (let i = 0; i < character.items.length; i++) {
		let c = character.items[i];
		if (!c) continue;

         // Chỉ upgrade nếu trong túi có ít nhất 2 món cùng tên
        if ((itemCounts[c.name] || 0) < 2) continue;
		
		// Bỏ qua item bị khóa hoặc item đặc biệt
		if (c.p1111 || c.l || c.s) continue;

		// Tìm nhóm phù hợp trong Whitelist
		let group = Object.keys(upgradeWhitelistVIPP).find(groupName =>
			upgradeWhitelistVIPP[groupName].includes(c.name)
		);

		if (!group) continue;

		let rules = upgradeGroups[group];
		if (!rules) continue;

		let rule = rules.find(r => r.levels.includes(c.level ?? 0));
		if (!rule) continue;

		candidates.push({
			slot: i,
			item: c,
			group,
			rule
		});
	}

	if (candidates.length === 0) return;

	console.log(
		`[StoneMer IDLE] 🔎 Tìm thấy ${candidates.length} item upgrade:`,
		candidates.map(c =>
			`${c.item.name}+${c.item.level ?? 0}[slot ${c.slot}]`
		).join(", ")
	);

	// Chọn item có level thấp nhất để ưu tiên nâng
	let target = candidates.reduce(
		(a, b) =>
			((a.item.level ?? 0) < (b.item.level ?? 0) ? a : b)
	);

	let rule = target.rule;

	let scrollname =
		["scroll0", "scroll1", "scroll2"][rule.scroll];

	let offeringname =
		["No_use", "offeringp", "offering"][rule.offering];

	console.log(
		`[StoneMer IDLE] 🎯 Target: ${target.item.name}+${target.item.level ?? 0}` +
		` | slot=${target.slot}` +
		` | scroll=${scrollname}` +
		` | offering=${rule.offering > 0 ? offeringname : "none"}`
	);

	let scroll_info = find_item(
		i => i && i.name === scrollname
	);

	let scroll_slot = scroll_info ? scroll_info[0] : -1;

	let offering_info = find_item(
		i => i && i.name === offeringname
	);

	let offering_slot = offering_info ? offering_info[0] : -1;

	console.log(
		`[StoneMer IDLE] 📦 Check material:` +
		` scrollSlot=${scroll_slot}` +
		` offeringSlot=${offering_slot}`
	);

	// Nếu thiếu scroll -> Mua scroll từ NPC
	if (scroll_slot === -1) {
		console.log(
			`[StoneMer IDLE] 🛒 Thiếu ${scrollname} -> BUY`
		);

		if (parent.buy) {
			parent.buy(scrollname);
		} else {
			console.log(
				"[StoneMer IDLE] ❌ parent.buy không tồn tại"
			);
		}

		return;
	}

	// Nếu rule yêu cầu offering nhưng không có trong túi -> Bỏ qua
	if (rule.offering > 0 && offering_slot === -1) {
		console.log(
			`[StoneMer IDLE] ❌ Thiếu offering ${offeringname} -> bỏ qua upgrade`
		);
		return;
	}

	// Dùng kỹ năng tăng tỷ lệ thành công của Merchant
	if (
		can_use("massproductionpp") && character.level >= 60 &&
		!character.s.massproductionpp
	) {
		console.log(
			"[StoneMer IDLE] ⚡ Dùng massproductionpp"
		);

		use_skill("massproductionpp");

	} else if (
		can_use("massproduction") &&
		!character.s.massproduction
	) {
		console.log(
			"[StoneMer IDLE] ⚡ Dùng massproduction"
		);

		use_skill("massproduction");
	}

	// Gửi packet nâng cấp tới Server
	if (parent.socket) {

		console.log(
			`[StoneMer IDLE] 🚀 SEND upgrade:` +
			` item=${target.slot}` +
			` scroll=${scroll_slot}` +
			` offering=${offering_slot > -1 ? offering_slot : null}` +
			` clevel=${target.item.level ?? 0}`
		);

		parent.socket.emit('upgrade', {
			item_num: target.slot,
			scroll_num: scroll_slot,
			offering_num: offering_slot > -1
				? offering_slot
				: null,
			clevel: target.item.level ?? 0
		});

		console.log(
			`[StoneMer IDLE] 🔨 Upgrading ${target.item.name}+${target.item.level ?? 0}` +
			` [${target.group}] using ${scrollname}` +
			`${rule.offering > 0 ? " + " + offeringname : ""}`
		);

	} else {
		console.log(
			"[StoneMer IDLE] ❌ parent.socket không tồn tại"
		);
	}
}


setInterval(() => {

    if (character.stand && (character.moving || smart.moving)) close_stand();
	
    // Không ở HOME
    if (
        character.map !== CONFIG.HOME_LOCATION.map ||
        Math.abs(character.x - CONFIG.HOME_LOCATION.x) >= 15 ||
        Math.abs(character.y - CONFIG.HOME_LOCATION.y) >= 15
    ) {
        stop_idle_upgrade_loop();
        return;
    }

    // Đang bận xử lý service
    if (busy) return;

    // Còn queue chờ xử lý
    if (queue1.length > 0) return;

    // Không có slot
    if (character.esize < 1) return;

    // Không đủ gold
    if (character.gold < 1500000) return;

    // Đảm bảo idle loop đang chạy
    if (!idleUpgradeTimer) {
        console.log("[StoneMer] 🏠 HOME detected -> START idle upgrade");
        start_idle_upgrade_loop();
    }

}, 1700);



let lastIdleTime = Date.now();
let storagePending = false;
let storagePendingTime = 0;

setInterval(() => {
    const now = Date.now();

	sell_trash_items();

    if (busy) {
        lastIdleTime = now;
        storagePending = false;
        storagePendingTime = 0;
        return;
    }

    const hasStorageJob = queue1.some(
        q => q.command === "storage" || q.command === "cleanup"
    );

    if (hasStorageJob) {
        storagePending = false;
        storagePendingTime = 0;
        return;
    }

    const inventoryFull = is_inventory_full() || character.esize < 3;
    const idleStorage = now - lastIdleTime >= 10 * 60 * 1000;

    // Chưa đủ điều kiện STORAGE
    if (!inventoryFull && !idleStorage) {
        storagePending = false;
        storagePendingTime = 0;
        return;
    }

    // Vừa phát hiện đủ điều kiện → bắt đầu chờ 30s
    if (!storagePending) {
        storagePending = true;
        storagePendingTime = now;
        console.log("[StoneMer] AUTO: Đủ điều kiện STORAGE → chờ 30s");
        return;
    }

    // Chưa đủ 30s
    if (now - storagePendingTime < 30 * 1000) return;

    // Sau 30s kiểm tra lại
    if (!is_inventory_full() && character.esize >= 3 && !idleStorage) {
        storagePending = false;
        storagePendingTime = 0;
        console.log("[StoneMer] AUTO: Túi đã được xử lý → hủy STORAGE");
        return;
    }

    console.log("[StoneMer] AUTO: Sau 30s vẫn đủ điều kiện → STORAGE");

    queue1.unshift({
        id: "auto_storage_" + now,
        sender: character.name,
        command: "storage",
        priority: 85,
        target: "storage",
        createdAt: now
    });

    storagePending = false;
    storagePendingTime = 0;
    lastIdleTime = now;

    process_queue();

}, 1000);



//////////////////////////////////////////////
// AUTO PONTY BUY
//////////////////////////////////////////////



// Tạo danh sách item cần mua từ 3 nguồn
function getPontyBuySet() {
    const set = new Set();

    // upgradeWhitelistVIPP
    for (const group in upgradeWhitelistVIPP) {
        const items = upgradeWhitelistVIPP[group];
        if (!Array.isArray(items)) continue;
        for (const item of items) {
            if (item) set.add(item);
        }
    }

    // COMPOUND_RULES
    for (const rule of COMPOUND_RULES) {
        if (!rule || !Array.isArray(rule.items)) continue;
        for (const item of rule.items) {
            if (item) set.add(item);
        }
    }

    // PONTY_EXTRA_ITEMS
    for (const item of PONTY_EXTRA_ITEMS) {
        if (item) set.add(item);
    }


// bộ lọc cuối loại trừ các item này
for (const item of PONTY_EXCLUDE_ITEMS) {
    set.delete(item);
}
	

    return set;
}

// Đếm item trong inventory
function countItem(name) {
    let total = 0;

    for (let i = 0; i < character.isize; i++) {
        const item = character.items[i];
        if (item && item.name === name) {
            total += item.q ? item.q : 1;
        }
    }

    return total;
}

// Handler Ponty
function secondhands_handler(event) {
    if (!event) return;

    const pontyBuySet = getPontyBuySet();

    for (const i in event) {
        const item = event[i];
        if (!item || !pontyBuySet.has(item.name)) continue;

        const currentAmount = countItem(item.name);

        if (Object.prototype.hasOwnProperty.call(itemLimits, item.name)) {
            const limit = itemLimits[item.name];
            if (limit !== null && currentAmount >= limit) continue;
        }

        game_log("Ponty mua: " + item.name);
        if (character.esize > 10) parent.socket.emit("sbuy", { rid: item.rid });
    }
}

// Check Ponty
function checkPonty() {
    if (is_moving(character) || character.esize < 10 || character.gold < 15000000 ) return;
    if (character.map !== "main") return;
    if (distance(character, { x: 0, y: 0 }) >= 400) return;

    parent.socket.off("secondhands", secondhands_handler);
    parent.socket.on("secondhands", secondhands_handler);
    parent.socket.emit("secondhands");
}

// Cleanup
function on_destroy() {
    parent.socket.off("secondhands", secondhands_handler);
}

// Chạy lần đầu sau 5 giây
setTimeout(checkPonty, 5000);

// Sau đó kiểm tra mỗi 30 giây
setInterval(checkPonty, 30000);



setInterval(() => {
    if (character.q.exchange || character.esize < 5) return;

    let first = -1;

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];
        if (!item || EXCHANGE[item.name] == null) continue;

        if (item.q >= EXCHANGE[item.name]) {
            if (can_use("massexchangepp") && !character.s.massproductionpp && character.level >= 70 )
                use_skill("massexchangepp");
            else if (can_use("massexchange") && !character.s.massproduction)
                use_skill("massexchange");

            exchange(i);
            return;
        }

        if (first < 0) first = i;
        else {
            swap(first, i);
            return;
        }
    }
}, 1000);


function give_item(target, itemName, amount = 1) {
    // 1. Kiểm tra target có tồn tại/đứng gần không
    if (!target) {
        console.log(`[Item Transfer] Target not found or too far away.`);
        return 0;
    }

    const targetName = target.id || target; // Hỗ trợ cả object target hoặc string name
    let remainingNeed = amount;
    let totalSent = 0;

    // 2. Duyệt qua túi đồ (character.items)
    for (let i = 0; i < character.items.length && remainingNeed > 0; i++) {
        const item = character.items[i];
        
        // Bỏ qua nếu không phải item cần tìm
        if (!item || item.name !== itemName) continue;

        // Bỏ qua item bị khóa (locked / sealed)
        if (item.l || item.s) continue;

        // Đồ không cộng dồn (unstackable) thì q = 1
        const currentQty = item.q ?? 1;
        const amountToSend = Math.min(currentQty, remainingNeed);

        // Gửi item theo API: send_item(target_name, slot_index, quantity)
        send_item(targetName, i, amountToSend);
        
        totalSent += amountToSend;
        remainingNeed -= amountToSend;
    }

    if (totalSent > 0) {
        console.log(`[Item Transfer] Sent ${totalSent}x ${itemName} to ${targetName}`);
    } else {
        console.log(`[Item Transfer] No available ${itemName} to send.`);
    }

    return totalSent; // Trả về số lượng thực tế đã gửi
}
