
/// send_mail('Plutus', '10 keys', 'nice', true)
/// wishlist(23,"fury",2000000000,0,3)
let urls = [
    "https://raw.githubusercontent.com/6gunlaZe/adventure/refs/heads/main/6_MUA-BAN.js",
];

urls.forEach((url) => loadURLs(url, 3)); // Thử tối đa 3 lần

function loadURLs(url, retries = 3) {
    let attempt = 0;

    while (attempt < retries) {
        try {
            var ajax = new XMLHttpRequest();
            ajax.open('GET', url, false); // synchronous
            ajax.send(null);

            if (ajax.status === 200) {
                var script = ajax.responseText || ajax.response;
                eval.apply(window, [script]);
                console.log(`✅ Script loaded successfully from ${url} (attempt ${attempt + 1})`);
                return true;
            } else {
                console.warn(`❌ Attempt ${attempt + 1} failed with status: ${ajax.status}`);
            }
        } catch (e) {
            console.warn(`⚠️ Attempt ${attempt + 1} threw an error: ${e}`);
        }

        attempt++;
    }

    console.error(`🚫 Failed to load script from ${url} after ${retries} attempts. Logging out...`);
    parent.api_call("disconnect_character", {name: "MuaBan"});
    return false;
}


///////////////////

const autoSellToMerchItems = [
    { name: "tombkey", price: 2300000 },
    { name: "frozenkey", price: 5900000 },
    { name: "spikedhelmet", price: 14900000 },

];

const validBuyers = ["Plutus", "CrownMerch"]; // <-- Thêm nhiều người mua ở đây

function MerchantSellTo() {
    for (let i in parent.entities) {
        const entity = parent.entities[i];

        // Chỉ làm việc với merchant hợp lệ trong danh sách
        if (entity.ctype === "merchant" && validBuyers.includes(entity.name)) {
            const otherPlayer = entity;

            let tradeSlots = [];
            if (otherPlayer.slots) {
                tradeSlots = Object.keys(otherPlayer.slots).filter(tradeSlot =>
                    tradeSlot.includes("trade")
                );
            }

            tradeSlots.forEach(tradeSlot => {
                if (otherPlayer.slots[tradeSlot]) {
                    autoSellToMerchItems.forEach(item => {
                        if (
                            otherPlayer.slots[tradeSlot].name === item.name &&
                            otherPlayer.slots[tradeSlot].price >= item.price &&
                            locate_item(item.name) !== -1
                        ) {
                            const mySlotNumber = locate_item(item.name);
                            if (mySlotNumber !== -1) {
                                trade_sell(otherPlayer, tradeSlot);
                                log("Sold " + item.name + " to merchant: " + otherPlayer.name);
                            }
                        }
                    });
                }
            });
        }
    }
}

const intervalId = setInterval(() => {
    let canRun = false;

    for (const name of validBuyers) {
        if (get_player(name)) {
            canRun = true;
            break;
        }
    }

    if (canRun) {
        MerchantSellTo();
    } else {
        console.log("No valid buyers nearby.");
    }
}, 3000);



//////////////////////

//const item1cap = "orba"
const item1cap = "orba"

var craftList112 = [item1cap,"carrotsword","pouchbow","basketofeggs"]; // tạm ngưng fireblade firestars pouchbow basketofeggs

setInterval(function()
			{
if (character.esize > 6)tryCraft();
	
    sellExtraItems([
        ["bow", 1],
        ["blade", 1],
        ["snowball", 1],
        ["smoke", 1],
        ["throwingstars", 5],


		
    ]);

if (character.esize > 6){
	
buyMissingItemsByLevel([
	["scroll0", 5000, 3000],
    ["scroll1", 150, 200],
    ["cscroll0",50, 300],
    ["cscroll1",50, 300], 
    ["scroll2",25, 60], 
   // ["coat", 13, 1, 6],      // chỉ đếm pants +0 → +6

]);

}	
	
    let [scrollSlot, scroll] = find_item(i => i.name === "mpot1");
	
if (character.map == "main" && distance(character, { x: 0, y: 0 }) < 400)
{
    if (!scroll && character.map != "winter_instance") { parent.buy("mpot1",100); }	
}
	let [scrollSlot1, scroll1] = find_item(i => i.name === "hpot1");
    if (!scroll1 && character.hp/character.max_hp< 0.5 ) { parent.buy("hpot1",1); }	
	
	
}, 500);


function sellExtraItems(itemPairs) {
    for (let p = 0; p < itemPairs.length; p++) {
        let name = itemPairs[p][0];
        let keep = itemPairs[p][1];

        // Tìm tất cả slot item level 0 hoặc không có level
        let slots = [];
        for (let i = 0; i < character.items.length; i++) {
            let it = character.items[i];
            if (it && it.name === name && (!it.level || it.level === 0)) {
                slots.push(i);
            }
        }

        // Nếu số slot > keep → bán phần dư
        if (slots.length > keep) {
            for (let s = keep; s < slots.length; s++) {
                let idx = slots[s];
                let it = character.items[idx];
                let qty = it.q || 1;
                sell(idx, qty);
                return; // mỗi tick chỉ bán 1 stack
            }
        }
    }
}


function buyMissingItemsByLevel(itemPairs) {
    // An toàn 1: inventory gần đầy → không mua
    if (character.esize < 1) return;

    // An toàn 2: không đủ gold → không mua
    if (character.gold < 1000000) return;

    for (let p = 0; p < itemPairs.length; p++) {
        let name    = itemPairs[p][0];
        let keep    = itemPairs[p][1];
        let buyQty  = itemPairs[p][2] || 1;
        let maxLvl  = itemPairs[p][3]; // có thể undefined

        let count = 0;

        for (let i = 0; i < character.items.length; i++) {
            let it = character.items[i];
            if (!it || it.name !== name) continue;

            // Nếu có giới hạn level → chỉ tính level ≤ maxLvl
            if (maxLvl !== undefined) {
                let lvl = it.level || 0;
                if (lvl > maxLvl) continue;
            }

            count += it.q || 1;
        }

        // Thiếu → mua bù
        if (count < keep) {
            buy(name, buyQty);
            return; // mỗi tick chỉ mua 1 loại
        }
    }
}





////ban cac mon do chi dinh bando
setInterval(function() {
	
// if( character.map == "main" && distance(character, {x: 62, y: 681}) < 450 )auto_craft("basketofeggs"); //auto ép đồ
	
if(1>0) for(const slot in character.items)
	{
var item = character.items[slot];
      // Kiểm tra level của item, nếu không có level thì mặc định là 0
      const level = item?.level ? item.level : 0;		
if (level >= 1)continue
		
if(["gphelmet","bwing","xmace","whiteegg","shoes1111","gloves","vitscroll","gslime","jacko","vitring","intring","intring","dexring","intearring","strearring","stramulet","smoke111","talkingskull","sstinger","elixirstr2","elixirstr1","elixirstr0","elixirdex2","elixirdex1","elixirdex0","elixirint2","elixirint1","elixirint0","elixirvit2","elixirvit1","elixirvit0","pclaw","carrotsword","snowball111","blade1111","svenom","wbasher","danhsachphahuyyyyyyyyyyyyyyyyyyyyyyyyy","rfangs","t2bow","hammer","basher","frankypants","seashell","pumpkinspice","eslippers","ecape11","lantern","pinkie","helmet","shoes",
            "glolipop","spear","dagger","helmet1","gloves1","coat1","shoes1","vboots","tombkey",
            "hhelmet","hboots","epyjamas","carrotsword1111","ringsj",
            "eears","harmor","hgloves","mittens1111","daggerofthedead11111",
            "staffofthedead","firestaff","swordofthedead","maceofthedead","pmaceofthedead",
            "pmace","fireblade1111","hpants","rapier","slimestaff","cclaw","pouchbow111","cape","oozingterror","harbringer","gbow","broom","sweaterhs","pants1","mittens","vgloves","fieldgen0","throwingstars","cupid","firecrackers","elixirpnres","wattire","wcap","wbreeches","wgloves","wshoes","tshirt2","tshirt0","tshirt1","tshirt3","t2quiver","horsecapeg","spikedhelmet","lspores","essenceofether","bandages","ectoplasm","bunnyelixir"].includes(character.items?.[slot]?.name)) sell(slot, character.items?.[slot]?.q ? character.items?.[slot]?.q : 1)	
	}

}, 1000);
//////


//// PHA HỦY ĐỂ CÓ ITEM +13

function auto_destroy_low_level_items() {
    for (const slot in character.items) {
        let item = character.items[slot];
        if (!item) continue;

        // Lấy level của item (mặc định = 0 nếu không có)
        const level = item.level ?? 0;

        // Nếu item có level >= 1 thì bỏ qua
        if (level >= 1) continue;

        // Danh sách item cần phá
        const destroyList = [
            "khongphahuynua"
        ];

        // Nếu item nằm trong danh sách thì phá
        if (destroyList.includes(item.name)) {
            destroy(slot);
        }
    }
}

// Gọi hàm liên tục mỗi 300ms
setInterval(auto_destroy_low_level_items, 1000);




// Tự động đổi các món đồ
setInterval(() => {
    if (character.q.exchange) return;
    if (character.esize < 5) return;

    // Danh sách item và số lượng yêu cầu tối thiểu để exchange
    const itemRequirements = {
        "gem0": 1,
        "gem1": 1,
        "candy0": 1,
        "candy1": 1,
        "mistletoe": 1,
        "xbox": 1,
        "ornament": 20,
        "candycane": 1,		
        "basketofeggs": 1,    
        "candypop": 10,      
        "armorbox": 1,
        "weaponbox": 1,
        "leather": 40,
        "goldenegg": 1,
		"seashell": 20,
		"brownenvelope": 1,
		"troll": 1,
		
    };

    const itemsToCheck = Object.keys(itemRequirements);
    let first_index = -1;

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];
        if (!item || !itemsToCheck.includes(item.name)) continue;

        const requiredAmount = itemRequirements[item.name] || 1;

        if (item.q >= requiredAmount) {
			
	// Dùng kỹ năng tăng tốc
	if (can_use("massexchangepp") && !character.s.massproductionpp)
		use_skill("massexchangepp");
	else if (can_use("massexchange") && !character.s.massproduction)
		use_skill("massexchange");
			
            exchange(i);
            break;
        } else if (first_index === -1) {
            first_index = i;
        } else {
            swap(first_index, i);
            break;
        }
    }
}, 1000);




function elixirUsage() {
    try {
        let requiredElixir =  "bunnyelixir11"
        // Use the required elixir if it's not currently equipped
            let item = locate_item(requiredElixir);
            if (item>=0) {
                use(item);
            }
 

    } catch (e) {
        console.error("Error in elixirUsage function:", e);
    }
}

// Run elixirUsage every 50 seconds
setInterval(elixirUsage, 10000);












// 1️⃣ Khai báo rule cho từng nhóm (mẫu nâng cấp)
var upgradeGroups = {
	group_basic: [ // đồ phổ thông
		{ levels: [0,1,2,3,4], scroll: 0, offering: 0 },
		{ levels: [5,6],     scroll: 1, offering: 0 },
		{ levels: [7],     scroll: 2, offering: 0 },
		{ levels: [8],       scroll: 2, offering: 1 }
	],
	group_basic00: [ // đồ rác
		{ levels: [1,2,3,4], scroll: 0, offering: 0 },
		{ levels: [5,6,7],     scroll: 1, offering: 0 },
		{ levels: [8],       scroll: 2, offering: 0 }
	],
	group_basic01: [ // đồ rác
		{ levels: [0,1,2,3,4,5,6,], scroll: 1, offering: 0 },
	//	{ levels: [7],     scroll: 2, offering: 1 },
	//	{ levels: [8],       scroll: 2, offering: 1 }
	//	{ levels: [9],       scroll: 2, offering: 2 }

	],
	group_basic02: [ // đồ rác
		{ levels: [0,1,2,3,4,5,6], scroll: 1, offering: 0 },
		{ levels: [7],     scroll: 2, offering: 1 },
	//	{ levels: [8],       scroll: 2, offering: 2 }
	],

	group_basic03: [ // đồ rác
		{ levels: [0,1,2,3], scroll: 0, offering: 0 },
		{ levels: [4,5,6,7],     scroll: 1, offering: 0 },
		{ levels: [8],       scroll: 2, offering: 1 }
	],	
	
	group_basic04: [ // đồ rác
		{ levels: [0,1,2,3,4,5], scroll: 1, offering: 0 },
		{ levels: [6],     scroll: 2, offering: 0 },
		{ levels: [7],       scroll: 2, offering: 1 }
	],	
	
	group_basic05: [ // đồ rác
		{ levels: [0,1,2,3], scroll: 0, offering: 0 },
		{ levels: [4,5,6],     scroll: 1, offering: 0 },
		{ levels: [7,8],       scroll: 2, offering: 1 }
	],	
	
	group_basic06: [ // đồ rác
		{ levels: [0,1,2,3,4,5,6], scroll: 0, offering: 0 },
	//	{ levels: [7,8],     scroll: 1, offering: 0 },
	//	{ levels: [9],       scroll: 2, offering: 1 }
	],
	
	group_basic07: [ // đồ rác
		{ levels: [0,1,2], scroll: 0, offering: 0 },
		{ levels: [3,4,5,6],     scroll: 1, offering: 0 },
//		{ levels: [7],       scroll: 1, offering: 1 },
//		{ levels: [8],       scroll: 2, offering: 1 },
//		{ levels: [9],       scroll: 2, offering: 2 },
	],	

	group_basic08: [ // đồ rác
		{ levels: [0,1,2,3,4], scroll: 1, offering: 0 },
		{ levels: [5],     scroll: 2, offering: 0 },
		{ levels: [6],     scroll: 2, offering: 1 },
		{ levels: [7],       scroll: 2, offering: 1 }
	//	{ levels: [8],       scroll: 2, offering: 2 }
	],
	
	group_weapon: [ // vũ khí & trang bị tấn công
		{ levels: [0,1,2,3,4], scroll: 1, offering: 0 },
		{ levels: [5],     scroll: 2, offering: 0 },
		{ levels: [6],       scroll: 2, offering: 1 }
	],

	group_weapon1: [ // vũ khí & trang bị tấn công
		{ levels: [0,1,2,3], scroll: 1, offering: 0 },
		{ levels: [4,5,6],     scroll: 2, offering: 0 },
	//	{ levels: [7,8],       scroll: 2, offering: 1 }
	],

	group_weapon2: [ // vũ khí & trang bị tấn công
		{ levels: [0,1,2,3,4], scroll: 2, offering: 0 },
	//	{ levels: [5,],     scroll: 2, offering: 1 },  //36% 
	//	{ levels: [6,7],       scroll: 2, offering: 2 }  //46% //26%
	],

	group_weapon3: [ // vũ khí & trang bị tấn công
		{ levels: [0,1,2], scroll: 1, offering: 0 },
		{ levels: [3,], scroll: 1, offering: 1 },
	//	{ levels: [4,], scroll: 2, offering: 0 }, //58
	//	{ levels: [5,],     scroll: 2, offering: 1 },  //43% 
	//	{ levels: [6,7],       scroll: 2, offering: 2 }  //48% //27%
	],

	group_weapon4: [ // vũ khí & trang bị tấn công
		{ levels: [0,1,], scroll: 1, offering: 0 },
		{ levels: [2,], scroll: 2, offering: 0 },
		{ levels: [3,4,], scroll: 2, offering: 1 },
	//	{ levels: [5,],     scroll: 2, offering: 1 },  //45%
	//	{ levels: [6,7],       scroll: 2, offering: 2 } // 48% //28%
	//	{ levels: [8],       scroll: 3, offering: 2 }   //18%
	],
	
	group_weapon5: [ // vũ khí & trang bị tấn công
		{ levels: [0,1,2,], scroll: 1, offering: 0 },
		{ levels: [3,], scroll: 1, offering: 1 }, 
		{ levels: [4],  scroll: 2, offering: 1 },  
		{ levels: [5],  scroll: 2, offering: 1 }, // 66 
	//	{ levels: [6],  scroll: 2, offering: 1 }, // 28
	//	{ levels: [7,8],  scroll: 2, offering: 2 },  28 13
	//	{ levels: [9],  scroll: 3, offering: 2 },  5.4

	],
	group_rare1: [ // đồ quý, phụ kiện hiếm // không dùng cho level cao vì cần phải "stacks" hủy bằng offeringp nữa mà để tăng rate
		{ levels: [0,1,2,3,4], scroll: 2, offering: 0 },
		// { levels: [8], scroll: 2, offering: 1 },
	],
	
	group_rare2: [ // đồ quý, phụ kiện hiếm // không dùng cho level cao vì cần phải "stacks" hủy bằng offeringp nữa mà để tăng rate
		{ levels: [0,1,2,3,4,], scroll: 1, offering: 0 },
		{ levels: [5,], scroll: 2, offering: 0 },
		{ levels: [6,], scroll: 2, offering: 1 },

		// { levels: [8], scroll: 2, offering: 1 },
	],	
	
	
	
	group_rare: [ // đồ quý, phụ kiện hiếm // không dùng cho level cao vì cần phải "stacks" hủy bằng offeringp nữa mà để tăng rate
		{ levels: [0,1,2], scroll: 2, offering: 0 },
		{ levels: [3], scroll: 2, offering: 1 },
	],
	group_vip: [ // đồ quý, phụ kiện hiếm
		{ levels: [0], scroll: 2, offering: 0 },
		{ levels: [1,2,3], scroll: 2, offering: 1 },
	],
	group_vip1: [ // đồ quý, phụ kiện hiếm
		{ levels: [0], scroll: 2, offering: 0 },
		{ levels: [1,2,3], scroll: 2, offering: 1 },
	],	
	group_vip2: [ // đồ quý, phụ kiện hiếm
		{ levels: [0,1], scroll: 2, offering: 0 },
		{ levels: [2,3], scroll: 2, offering: 1 },
	],	
	
	group_Supervip: [ // đồ quý, phụ kiện hiếm
		{ levels: [0,1,2], scroll: 2, offering: 1 },
	],
	
};

// 2️⃣ Gán item vào nhóm
var upgradeWhitelistVIPP = {
	group_basic: ["ololipop"],
	group_basic00: ["cclaw"],
	group_basic01: ["firebow","fireblade"],	
	group_basic02: ["gcape","eslippers11","ecape"],	
	group_basic03: ["mittens111","shield",],	
	group_basic04: ["angelwings","froststaff","mcape","daggerofthedead","tshirt4"],
	group_basic05: ["wingedboots","sshield"],	
	group_basic06: ["pants","coat","blade"],
	group_basic07: ["pouchbow"],	
	group_basic08: ["ecape11"],	
	group_weapon: ["bowofthedead","crossbow","oozingterror11111"],
	group_weapon1: ["firestars"],
	group_weapon2: ["spikedhelmet11"],
	group_weapon3: ["bcape"],
	group_weapon4: ["alloyquiver111"],
	group_weapon5: ["bataxe"],

	group_rare1: ["handofmidas","hdagger","xboots","xgloves",],
	group_rare2: ["sparkstaff",],
	group_rare: ["xarmor","xpants","t3bow","lmace"],
	group_vip: ["vattire","vstaff"],
	group_vip1: ["starkillers1111","vhammer","vdagger","xhelmet"],
	group_vip2: ["supermittens",],
	group_Supervip: ["fury",],

	

};





/////////

    let fastModeUntil = 0;


setInterval(function() {
	if(parent != null && parent.socket != null &&  character.esize < 22)
	{
		
		if  ( Date.now() > fastModeUntil )	upgradeVIP();
		compound_itemsVIP()
	}

}, 1700);


function upgradeVIP() {
	let candidates = [];
	
	            if (character.q?.upgrade)return
	

	for (let i = 0; i < character.items.length; i++) {
		let c = character.items[i];
		if (!c) continue;
		
			// 🔒 LOẠI ITEM HIẾM (shiny, gleaming, ...)
	    if (c.p1111) continue;

		// Tìm nhóm phù hợp
		let group = Object.keys(upgradeWhitelistVIPP).find(groupName =>
			upgradeWhitelistVIPP[groupName].includes(c.name)
		);
		if (!group) continue;

		let rules = upgradeGroups[group];
		let rule = rules.find(r => r.levels.includes(c.level));
		if (!rule) continue;

		candidates.push({
			slot: i,
			item: c,
			group,
			rule
		});
	}

	if (candidates.length === 0) return;

	// 🔽 Chọn item có level thấp nhất
	let target = candidates.reduce((a, b) => (a.item.level < b.item.level ? a : b));

	let rule = target.rule;
	let scrollname   = ["scroll0", "scroll1", "scroll2"][rule.scroll];
	let offeringname = ["0_La_Khong_dung", "offeringp", "offering"][rule.offering];

	let [scroll_slot, scroll] = find_item(i => i.name == scrollname);
	let [offering_slot, offering] = find_item(i => i.name == offeringname) || [null, null];

	if (!scroll) { parent.buy(scrollname); return; }
	
//Nếu rule.offering = 0 → bỏ qua luôn bước kiểm tra offering.
// Nếu rule.offering = 1 hoặc 2 mà không có offering trong túi → dừng không nâng, tránh lỗi.
	if (rule.offering > 0 && ( !offering_slot || offering_slot < 0 )  ) return;

	// Dùng kỹ năng tăng tốc
	if (can_use("massproductionpp") && !character.s.massproductionpp)
		use_skill("massproductionpp");
	else if (can_use("massproduction") && !character.s.massproduction)
		use_skill("massproduction");

	parent.socket.emit('upgrade', {
		item_num: target.slot,
		scroll_num: scroll_slot,
		offering_num: offering_slot,
		clevel: target.item.level
	});

	game_log(`🔨 Upgrading ${target.item.name}+${target.item.level} [${target.group}] using ${scrollname}${rule.offering>0 ? " + "+offeringname : ""}`);
}
















const compoundGroups = {
    jewelry: [
        { levels: [0], scroll: 2, offering: 0 },
        { levels: [1,2],     scroll: 2, offering: 1 },
    ],
    jewelry1: [
        { levels: [0], scroll: 1, offering: 0 },
        { levels: [1,],     scroll: 1, offering: 1 },
    ],

    jewelry2: [
        { levels: [2], scroll: 1, offering: 1 },
       // { levels: [1,2],     scroll: 2, offering: 1 },
    ],	
    jewelry3: [
        { levels: [3,4], scroll: 1, offering: 1 },
       // { levels: [1,2],     scroll: 2, offering: 1 },
    ],	
    jewelry4: [
        { levels: [0], scroll: 2, offering: 1 },
       // { levels: [1,2],     scroll: 2, offering: 1 },
    ],
	
    accessories: [
        { levels: [0,1], scroll: 1, offering: 0 },
    ],
    accessories1: [
        { levels: [0,], scroll: 1, offering: 0 },
        { levels: [1,2], scroll: 1, offering: 1 },
    ],
    rac: [
        { levels: [0,], scroll: 1, offering: 0 },
        { levels: [1,2], scroll: 1, offering: 0 },
    ],
	
	

};

const compoundWhitelistVIPP = {
    jewelry: ["lantern"],
    jewelry1: ["wbookhs"],
    jewelry2: ["cearring","cring"],
    jewelry3: ["strbelt","intbelt","dexbelt","ringsj"],
    jewelry4: ["rabbitsfoot"],
    accessories: ["spookyamulet"],
    accessories1: ["orbofstr","orbofdex"],
    rac: ["orbofvit","orbofint"],

};





function compound_itemsVIP() {
    let candidates = [];

    // 🔍 Quét toàn bộ túi
    for (let i = 0; i < character.items.length; i++) {
        let item = character.items[i];
        if (!item) continue;

        // Tìm nhóm phù hợp
        let groupName = Object.keys(compoundWhitelistVIPP).find(g =>
            compoundWhitelistVIPP[g].includes(item.name)
        );
        if (!groupName) continue;

        // Lấy rule theo nhóm
        let rules = compoundGroups[groupName];
        let rule = rules.find(r => r.levels.includes(item.level));
        if (!rule) continue;

        // Gom các item cùng tên + cùng cấp
        let sameItems = character.items
            .map((it, idx) => ({ it, idx }))
            .filter(x => x.it && x.it.name === item.name && x.it.level === item.level);

        // Phải đủ >=3 item mới ghép được
        if (sameItems.length >= 3) {
            candidates.push({
                name: item.name,
                groupName,
                rule,
                items: sameItems.slice(0, 3) // Lấy 3 item đầu
            });
        }
    }

    if (candidates.length === 0) return;

    // 🔽 Ưu tiên ghép item có cấp thấp nhất (tăng đều)
    let target = candidates.reduce((a, b) =>
        a.items[0].it.level < b.items[0].it.level ? a : b
    );

    let { rule } = target;
    let scrollName   = ["cscroll0", "cscroll1", "cscroll2"][rule.scroll];
    let offeringName = rule.offering > 0 ? ["offeringp", "offering"][rule.offering - 1] : null;

    let [scrollSlot, scroll] = find_item(i => i.name === scrollName);
    if (!scroll) { parent.buy(scrollName); return; }

    // 🛑 Nếu rule yêu cầu offering mà không có → dừng an toàn
    let offeringSlot = null;
    if (offeringName) {
        [offeringSlot] = find_item(i => i.name === offeringName) || [null];
        if (!offeringSlot || offeringSlot < 0   ) return;
    }

    // 💨 Dùng kỹ năng tăng tốc
    if (can_use("massproductionpp") && !character.s.massproductionpp)
        use_skill("massproductionpp");
    else if (can_use("massproduction") && !character.s.massproduction)
        use_skill("massproduction");

   // 🎯 Lấy 3 slot cần ghép
    let slots = target.items.map(x => x.idx);
    let clevel = target.items[0].it.level;

    // ⚒️ Thực hiện ghép (đúng cấu trúc gốc của game)
    parent.socket.emit("compound", {
        items: [slots[0], slots[1], slots[2]],  // 3 slot index
        scroll_num: scrollSlot,                 // slot chứa scroll
        offering_num: offeringSlot,             // slot chứa offering (có thể null)
        clevel: clevel                          // cấp hiện tại của item
    });

    game_log(`💎 Compounding ${target.name}+${target.items[0].it.level} [${target.groupName}] using ${scrollName}${offeringName ? " + " + offeringName : ""}`);
}
























///////////////////////////////

function tryCraft()
{
	//Iterate over everything we've configured to auto craft.
	for(var index in craftList112)
	{
		//What's the name of the item we want to craft?
		var craftName = craftList112[index];
		
		//Grab the crafting recipe.
		var craftDef = parent.G.craft[craftName];
		
		var cost = craftDef.cost;
		
		//Did we find a recipe?
		if(craftDef != null)
		{
			//Yeah? Do we have enough to pay for the recipe?
			if(cost < character.gold)
			{
				//Variable to track how many items we're missing from the recipe.
				var missing = 0;
				
				//Variable to hold the inventory slots of items that belong to the recipe.
				var craftSlots = [];
				
				//Variable to hold the item names of things we're missing from the recipe.
				var buyableMissing = [];
				
				//Iterate over every item in the recipe to check if we have it.
				for(var itemIndex in craftDef.items)
				{
					//Grab the item from the recipe, it'll say what and how many.
					var itemDef = craftDef.items[itemIndex];
					
					//What is the name of the item in the recipe?
					var itemName = itemDef[1];
					
					//How many of the item do we need.
					var itemQuantity = itemDef[0];
					
					//Grab information on the item we need.
					var item = parent.G.items[itemName];
					
					var level = null;
					
					//Is this item upgradeable?
					if(item.scroll == true)
					{
						//As of now we need level 0 items.
						//May need to change later.
						level = 0;
					}
					
					//Try to find the index of the item in our inventory
					var itemSearch = scanInventoryForItemIndex(itemName, level);
					
					//Do we have the item needed to craft?
					if(itemSearch == null)
					{
						//Mark that we're missing an item.
						missing++;
						
						//No? Then check to see if we can buy one.
						var basics = parent.G.npcs["basics"];
						
						if(basics.items.includes(itemName))
						{
							//Do we have enough to complete the crafting with the cost of the item included?
							cost += item.g;
							
							if(craftDef.cost < character.gold)
							{
								//Yeah? Mark it as something to buy.
								buyableMissing.push(itemName);
							}
							else
							{
								//Not enough gold to craft, clear the list of things to buy and stop.
								buyableMissing = [];
								break;
							}
						}
					}
					else
					{
						//Do we have the amount of the item that is required by the recipe?
						var invItem = character.items[itemSearch];
						
						if(invItem.q >= itemQuantity || itemQuantity == 1)
						{
							//Yeah? Then we'll mark it for use.
							craftSlots.push(itemSearch);
						}
						else
						{
							missing++;
						}
					}
				}
				
				//Are we missing anything?
				if(missing == 0)
				{
					//Craft it!
					var craftArray = [];
					
					for(id in craftSlots)
					{
						craftArray.push([id, craftSlots[id]]);
					}
					
					parent.socket.emit("craft", {
            			items: craftArray
					});
					break;
				}
				else
				{
					//Try to buy whatever we're missing.
					if(buyableMissing.length == missing)
					{
						for(var idBuy in buyableMissing)
						{
							//Buy an item we're missing, and break execution so that we can control how fast requests are sent to the server.
							var buyName = buyableMissing[idBuy];
							
							buy(buyName);
							break;
						}
					}
				}
			}
		}
	}
}





function scanInventoryForItemIndex(name, maxLevel)
{
	//Iterate over every slot in our inventory.
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		//Does the item name match?
		if(curSlot != null && curSlot.name == name)
		{
			//Does the level match?
			if(maxLevel == null || curSlot.level <= maxLevel)
			{
				//Return the inventory slot #.
				return i
			}
		}
	}
}




function scanItemIndex(name, maxLevel)
{
	//Iterate over every slot in our inventory.
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		//Does the item name match?
		if(curSlot != null && curSlot.name == name)
		{
			//Does the level match?
			if(curSlot.level == maxLevel)
			{
				//Return the inventory slot #.
				return i
			}
		}
	}
}






/////////////////////////////////////////////////////////


function has_high_level_item(name, min_level=1) {
    for (let i = 0; i < character.items.length; i++) {
        const item = character.items[i];
        if (item && item.name === name) {
            const level = item.level ? item.level : 0;
            if (level >= min_level) {
                return true; // đã có item đạt level yêu cầu
            }
        }
    }
    return false;
}



let destroyIndex = 0; // chỉ số coat sẽ phá (xoay vòng)

function destroy_one_coat_lv0() {
    // Lấy danh sách slot chứa coat lv0
    let slots = [];
    for (const slot in character.items) {
        let item = character.items[slot];
        if (item && item.name === "coat" && (item.level ?? 0) === 0) {
            slots.push(parseInt(slot));
        }
    }

    if (slots.length < 3 && character.esize > 4) return; // chỉ phá khi có ít nhất 6 coat lv0

    // Sắp xếp slot tăng dần
    slots.sort((a, b) => a - b);

    // Nếu destroyIndex vượt quá danh sách, quay lại đầu
    if (destroyIndex >= slots.length) {
        destroyIndex = 0;
    }

    // Lấy slot theo round-robin
    let slotToDestroy = slots[destroyIndex];

    // Tăng chỉ số cho lần kế tiếp
    destroyIndex++;

    // Xác minh và phá
    let item = character.items[slotToDestroy];
    if (item && item.name === "coat" && (item.level ?? 0) === 0) {
		  // game_log("🗑️ Xóa coat ở slot " + slotToDestroy);
        destroy(slotToDestroy);
    }
}


function auto_buy_coat() {
    // Nếu đã có coat >= 1 thì ngưng
	
    if (is_blacklisted_present()) {
        // game_log("🚫 Có người cấm trong map, dừng auto!");
        return;
    }
	
	
    if (has_high_level_item("coat", 1)) return;

    if (character.gold < 100000000 || character.map == "bank") return;

    // Gọi hàm phá coat lv0 (chỉ phá 1 cái mỗi vòng lặp)
    destroy_one_coat_lv0();

    // Luôn giữ cho trong túi có 2 coat để ép
    let coatCount = character.items.filter(i => i && i.name === "coat").length;
    if (coatCount < 5 && character.esize > 5) {
        buy("coat");
    }
}




function sell_coat_below100() {
    // Nếu đã có coat >= 1 thì ngưng
	
    if (is_blacklisted_present()) {
        // game_log("🚫 Có người cấm trong map, dừng auto!");
        return;
    }
	
	
    if (has_high_level_item("coat", 1)) return;

    if (character.gold > 100000000 || character.map == "bank") return;

    // Gọi hàm phá coat lv0 (chỉ phá 1 cái mỗi vòng lặp)
    for (const slot in character.items) {
        let item = character.items[slot];
        if (!item) continue;

        // Lấy level của item (mặc định = 0 nếu không có)
        const level = item.level ?? 0;

        // Nếu item có level >= 1 thì bỏ qua
        if (level >= 1) continue;

        // Danh sách item cần phá
        const destroyList = [
           "coat"
        ];

        // Nếu item nằm trong danh sách thì phá
        if (destroyList.includes(item.name)) {
            destroy(slot);
        }
    }

}


// tạm ngưng mua và phá hủy item
// Lặp 0.5 giây
// setInterval(auto_buy_coat, 420);
// Lặp 0.5 giây
// setInterval(sell_coat_below100, 12000);



const blacklistPlayers = ["6gunlaZe", "Ynhi", "haiz"];

// Hàm kiểm tra xem có người cấm trong map không
function is_blacklisted_present() {
    for (let name of blacklistPlayers) {
        if (get_player(name)) {
            return true;
        }
    }
    return false;
}

//////////////////////////////////////////////
//////////////////////////////////////////////




let bossTurn = 0; // để xoay lượt
const PLAYER_RADIUS = 400; // khoảng cách tính số người chơi
const PLAYER_THRESHOLD = 2; // bao nhiêu người thì gọi đồng đội
const HP_THRESHOLD = 0.95; // boss còn dưới 95% máu thì gọi đồng đội
let currentTargetBoss = null; // boss đang được kéo bởi đồng đội

async function checkAndMoveToBoss() {
    try {
        if (character.moving) return;

        // Nếu đang xử lý boss, chỉ theo dõi boss đó
        if (currentTargetBoss) {
            const alive = !!parent?.S?.[currentTargetBoss.type]?.live;
            if (alive) {
                game_log(`⏳ Boss ${currentTargetBoss.name} đang được đồng đội xử lý, chờ boss chết...`);
                return; // boss vẫn sống, không check boss khác
            } else {
                game_log(`✅ Boss ${currentTargetBoss.name} đã bị kill, reset trạng thái.`);
                currentTargetBoss = null; // boss đã chết, tiếp tục check boss mới
            }
        }

        // Danh sách boss
        const bosses = [
            { name: "Mr. Pumpkin", type: "mrpumpkin", pos: { map: "halloween", x: -161, y: 769 }, alive: !!parent?.S?.mrpumpkin?.live },
            { name: "Mr. Green",   type: "mrgreen",   pos: { map: "spookytown", x: 343, y: 1017 }, alive: !!parent?.S?.mrgreen?.live },
        ];

        // Xoay lượt kiểm tra
        const order = [
            ...bosses.slice(bossTurn % bosses.length),
            ...bosses.slice(0, bossTurn % bosses.length)
        ];

        game_log(`🔄 Lượt ${bossTurn + 1}: ưu tiên ${order[0].name}...`);
        const targetBoss = order.find(b => b.alive);

        if (!targetBoss) {
            game_log("❌ Không có boss nào hiện tại.");
            bossTurn++;
            return;
        }

        // Di chuyển tới boss
        game_log(`⚔️ ${targetBoss.name} xuất hiện! Di chuyển tới ngay...`);
        await smart_move(targetBoss.pos);
        game_log(`✅ Đã đến vị trí ${targetBoss.name}.`);

        // Tìm boss gần nhất đúng loại
        const bossEntity = get_nearest_monster({ type: targetBoss.type });
        if (!bossEntity) {
            game_log("⚠️ Không thấy boss trong tầm nhìn!");
            bossTurn++;
            return;
        }

        // Đếm số người chơi gần nhân vật
        let playerCount = 0;
        for (let id in parent.entities) {
            const current = parent.entities[id];
            if (!current.player) continue;
            if (parent.distance(character, current) < PLAYER_RADIUS) playerCount++;
        }

        game_log(`👥 Số người chơi xung quanh: ${playerCount}`);
        const bossHpPercent = bossEntity.hp / bossEntity.max_hp;

        // Kiểm tra điều kiện gọi đồng đội
        if (playerCount >= PLAYER_THRESHOLD && bossHpPercent <= HP_THRESHOLD) {
            let cmd = targetBoss.type === "mrgreen" ? "bossvip5" :
                      targetBoss.type === "mrpumpkin" ? "bossvip4" : "error";

            game_log(`🚨 Boss ${targetBoss.name} còn ${Math.floor(bossHpPercent * 100)}% HP, gửi lệnh đồng đội!`);
            send_cm("haiz", cmd);

            // Lưu boss này vào currentTargetBoss
            currentTargetBoss = targetBoss;

        } else {
            game_log(`ℹ️ Boss ${targetBoss.name}: ${Math.floor(bossHpPercent * 100)}% HP, ${playerCount} người quanh.`);
        }

        bossTurn++;
    } catch (e) {
        game_log("❌ Lỗi khi kiểm tra boss: " + e);
    }
}




// tạm ngưng do hết even
// Chạy ngay
//checkAndMoveToBoss();

// Kiểm tra lại mỗi 30 giây
//setInterval(checkAndMoveToBoss, 30 * 1000);







/////////////////////////////////////////////////////
// CHECK LUCKY SLOT + AUTO UPGRADE (NON-BLOCKING)
/////////////////////////////////////////////////////

(async () => {

    /*********************************************************
     * LISTEN q_data – CHỈ BẮT PERFECT 0000
     *********************************************************/
    parent.socket._callbacks.$q_data.length = 1;

    parent.socket.on("q_data", (event) => {
        const slot = event.num;
        const nums = event.p?.nums;
        if (!nums) return;
      // game_log(`Slot ${slot} nums: ${nums.join(",")}`);  
		
        if (
            nums[0] === 0 &&
            nums[1] === 0 &&
            nums[2] === 0 &&
            nums[3] === 0
        ) {
            const time = new Date().toLocaleString();
            game_log(`PERFECT 0000 | Slot ${slot} | ${time}`);
            ghichu(
                "PERFECT 0000 LOG",
                `Slot ${slot} hit 0000 at ${time}`,
                ""
            );
        }
    });

    /*********************************************************
     * TRY SWAP – SLOT BẬN THÌ BỎ QUA (KHÔNG BLOCK)
     *********************************************************/
    async function trySwapToSlot(itemSlot, targetSlot) {
        try {
            const targetItem = character.items[targetSlot];

            // né scroll đang chiếm slot
            if (targetItem && targetItem.name === "scroll0") {
                const empty = character.items.findIndex(it => it === null);
                if (empty === -1) return false;
                await swap(targetSlot, empty);
            }

            await swap(itemSlot, targetSlot);
            return true;

        } catch (e) {
            return false;
        }
    }

    /*********************************************************
     * UPGRADE RETRY – KHÔNG TREO, THÊM TIMEOUT
     *********************************************************/
    async function upgradeRetry(slot, scroll, timeout = 10000) {
        const start = Date.now();
        while (true) {
            if (Date.now() - start > timeout) {
                game_log(`Upgrade slot ${slot} TIMEOUT`);
                return false;
            }

            if (character.q?.upgrade != null) {
                await sleep(500);
                continue;
            }

            try {
                await upgrade(slot, scroll);
                game_log(`Upgrade slot ${slot} SUCCESS`);
                return true;
            } catch (e) {
                await sleep(500);
            }
        }
    }

    /*********************************************************
     * AUTO UPGRADE LOOP – KHÔNG BAO GIỜ ĐỨNG MÃ
     *********************************************************/
    async function autoUpgradeLoop() {
        for (;;) {
            if (character.esize <= 3 || character.map !== "main") {
                await sleep(1000);
                continue;
            }

            for (let i = 0; i < 42; i++) {

                if (character.q?.upgrade != null) {
                    await sleep(500);
                    continue;
                }

                // --- đảm bảo helmet ---
                let helmet = locate_item("helmet");
                if (helmet === -1) {
                    await buy("helmet");
                    helmet = locate_item("helmet");
                } else {
                    const h = character.items[helmet];
                    if (h && h.level === 7) {
                        await sell(helmet);
                        await buy("helmet");
                        helmet = locate_item("helmet");
                    }
                }

                // --- swap helmet vào slot i ---
                if (helmet !== i && helmet !== -1) {
                    const ok = await trySwapToSlot(helmet, i);
                    if (!ok) continue;
                }

                // --- đảm bảo scroll ---
                let scroll = locate_item("scroll0");
                if (scroll === -1) {
                    await buy("scroll0", 1000); // mua ít tránh lag
                    scroll = locate_item("scroll0");
                }

                // --- upgrade slot i ---
                if (helmet !== -1 && scroll !== -1) {
                    await upgradeRetry(i, scroll);
                }
            }

            await sleep(1000); // nghỉ 1s sau 1 vòng upgrade
        }
    }

    /*********************************************************
     * AUTO BUY & SELL HELMET – RIÊNG TASK // chỉ dùng khi muốn tìm lucky slot
     *********************************************************/
    async function helmetManager() {
        for (;;) {
            try {
                const helmets = character.items
                    .map((it, idx) => ({ item: it, slot: idx }))
                    .filter(it => it.item && it.item.name === "helmet");

                if (helmets.length <= 1) {
                    await buy("helmet");
                    game_log(`Đã mua thêm helmet vì chỉ còn ${helmets.length} chiếc`);
                }

                for (const h of helmets) {
                    if (h.item.level === 7) {
                        await sell(h.slot);
                        game_log(`Đã bán helmet level 7 ở slot ${h.slot}`);
                    }
                }
            } catch (e) {
                game_log(`Lỗi khi xử lý helmet: ${e}`);
            }

            await sleep(2000); // nghỉ 2s trước khi check lại
        }
    }

	

/*********************************************************
 * JOB: UPGRADE ITEM A Ở SLOT 31
 *********************************************************/
	
async function smartUpgradeManager() {
    const TARGET_SLOT = 31;
    const INTERVAL_NORMAL = 260000;
    const INTERVAL_FAST = 300;
	
	const UPGRADE_CONFIG = [
    {
        name: "coatxxx",
        min_level: 7,
        max_level: 8, // Chỉ nâng cấp nếu dưới level 9
        levels: {
            7: { scroll: "scroll1"},
            8: { scroll: "scroll1"}
        }
    },
	
    {
        name: "pouchbow",
        min_level: 7,
        max_level: 7, // Chỉ nâng cấp nếu dưới level 9
        levels: {
            7: { scroll: "scroll1", offering: "offeringp"},
        }
    },
		
    {
        name: "fireblade",
        min_level: 7,
        max_level: 7,
        levels: {
            7: { scroll: "scroll2", offering: "offeringp" },
            // ... thêm các level khác
        }
    }
    ];
	
	
    let lastRun = 0;

    for (;;) {
        try {
            if (character.q?.upgrade) {
                await sleep(500);
                continue;
            }

// --- A. TÍNH TOÁN INTERVAL ---
// Đếm xem có bao nhiêu item trong config đang đợi nâng cấp
let eligibleCount = 0;
let targetItemData = null;

for (let i = 0; i < character.items.length; i++) {
    const it = character.items[i];
    if (!it) continue;

    const cfg = UPGRADE_CONFIG.find(c =>
        c.name === it.name &&
        it.level >= c.min_level &&
        it.level < (c.max_level + 1)
    );

    if (cfg) {
        eligibleCount++;
        if (!targetItemData)
            targetItemData = { slot: i, ...cfg, currentLevel: it.level };
    }
}

// Nếu >3 item thì bật fast mode 60s
if (eligibleCount > 3 && Date.now() > fastModeUntil) {
    fastModeUntil = Date.now() + 60000;
}

// Nếu đang trong fast mode thì chạy nhanh
const currentInterval =
    Date.now() < fastModeUntil ? INTERVAL_FAST : INTERVAL_NORMAL;
			
			
			
            if (Date.now() - lastRun < currentInterval) {
                await sleep(500);
                continue;
            }

            // --- B. THỰC HIỆN UPGRADE ---
            if (!targetItemData) {
                await sleep(1000);
                continue;
            }

            // 1. Di chuyển vào slot đích (31)
            if (targetItemData.slot !== TARGET_SLOT) {
                if (!await trySwapToSlot(targetItemData.slot, TARGET_SLOT)) {
                    await sleep(500);
                    continue;
                }
            }

            // 2. Lấy thông tin scroll/offering dựa trên level hiện tại
            const levelSettings = targetItemData.levels[targetItemData.currentLevel];
            if (!levelSettings) {
                game_log(`Chưa cấu hình level ${targetItemData.currentLevel} cho ${targetItemData.name}`);
                await sleep(1000);
                continue;
            }

            const scrollSlot = locate_item(levelSettings.scroll);
            const offeringSlot = levelSettings.offering ? locate_item(levelSettings.offering) : -1;

            if (scrollSlot === -1) {
                game_log(`Thiếu ${levelSettings.scroll} để nâng cấp ${targetItemData.name}`);
                await sleep(5000);
                continue;
            }

            // 3. Tiến hành Upgrade
            game_log(`[UPGRADE] ${targetItemData.name} +${targetItemData.currentLevel} -> +${targetItemData.currentLevel + 1}`);
            
	// Dùng kỹ năng tăng tốc
	if (can_use("massproductionpp") && !character.s.massproductionpp)
		use_skill("massproductionpp");
	else if (can_use("massproduction") && !character.s.massproduction)
		use_skill("massproduction");
			
            // Nếu có offering thì dùng, không thì chỉ dùng scroll
            if (offeringSlot !== -1) {
                await upgrade(TARGET_SLOT, scrollSlot, offeringSlot);
            } else {
                await upgrade(TARGET_SLOT, scrollSlot);
            }

            lastRun = Date.now();

        } catch (e) {
            game_log(`Error: ${e}`);
        }
        await sleep(500);
    }
}


///////////////////////////
//////////////////////////

	
	
	
	
    // --- chạy song song 2 task ---
	
  //  autoUpgradeLoop();
  //  helmetManager();
	smartUpgradeManager()


})();

/// đã xong nhiệm vụ tìm ra lucky slot
////////////////////////////////////////////////
//////////////////////////////////////////////////////





//////////////////////////////////
function ghichu(title, mess, key_auto1) {
  const token = key_auto1;  // Thay bằng token của bạn
  const repoOwner = '6gunlaZe';  // Tên người sở hữu repo
  const repoName = 'game';  // Tên repository
  const issueTitle = title;
  const newLine = mess;  // Nội dung dòng mới cần thêm vào

  // Tìm kiếm các issue có tiêu đề trùng với title trong repository cụ thể
  fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(issueTitle)}+repo:${repoOwner}/${repoName}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.items.length === 0) {
      // Nếu không tìm thấy issue với tiêu đề này, tạo mới issue
      fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`,
        },
        body: JSON.stringify({
          title: issueTitle,
          body: newLine,  // Thêm nội dung dòng mới vào body
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Issue mới đã được tạo:', data);
      })
      .catch(error => {
        console.error('Lỗi khi tạo Issue:', error);
      });
    } else {
      // Nếu đã tồn tại issue, thêm dòng mới vào body của issue đầu tiên tìm được
      const issueNumber = data.items[0].number;  // Lấy số của issue đầu tiên
      const issueUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}`;

      // Lấy nội dung hiện tại của issue
      fetch(issueUrl, {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })
      .then(response => response.json())
      .then(issueData => {
        // Kiểm tra nếu issueData.body có giá trị, nếu không thì khởi tạo giá trị mới
        const updatedBody = (issueData.body || '') + '\n' + newLine; // Thêm dòng mới vào cuối body

        // Cập nhật lại nội dung của issue
        fetch(issueUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
          },
          body: JSON.stringify({
            title: issueData.title, // Giữ nguyên tiêu đề
            body: updatedBody,  // Cập nhật nội dung của issue
          }),
        })
        .then(response => response.json())
        .then(updatedData => {
          console.log('Issue đã được cập nhật:', updatedData);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật Issue:', error);
        });
      })
      .catch(error => {
        console.error('Lỗi khi lấy nội dung issue:', error);
      });
    }
  })
  .catch(error => {
    console.error('Lỗi khi tìm kiếm issue:', error);
  });
}


///////////////////////////////
////////////////////////////// LOG GOLD MỖI LẦN VÀO

function formatGold(gold) {
    const b = gold / 1_000_000_000;
    return `${gold} (${b.toFixed(2)} b)`;
}

function logGold() {
    
        const time = new Date().toLocaleString("vi-VN");

        ghichu(
            "GOLD CHANGE LOG",
            `→ ${formatGold(character.gold)}  | Time: ${time}`,
            ""
        );

   
}

// logGold()  //tạm ngưng log gold

/////////////////////////
/////////////////////////




let lastStr = "";

parent.socket.on("q_data", (event) => {

    const nums = event.p?.nums;
    if (!nums || nums.length !== 4) return;

    const str = nums.slice().reverse().join(""); // đảo ngược

    if (str === lastStr) return;

    lastStr = str;

    game_log(`Slot ${event.num} nums: ${str}`);

});


///////////////////////////////////////////////////
////////////////////////////////////////////////


