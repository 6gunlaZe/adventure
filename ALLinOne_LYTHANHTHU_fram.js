let frankymode = 0
let lastUpdateTime = performance.now();
let lastSwapTime = 0;
const swapCooldown = 500;
let receivedData
let evenmuaban
var idmap
let cryts = 0  ///mode săn boss ở hầm ngục
let tomb = 0  ///mode săn boss ở hầm ngục
let crab = 0  ///mode săn crabxx
let landaucyp = 2; ///mode lần đầu trong crypt

const locations = {
	armadillo: [{ x: 617, y: 1784 }],
    bat: [{ x: 1200, y: -782 }],
    bigbird: [{ x: 1343, y: 248 }],
    bscorpion: [
  { type: "farm", x: -427, y: -1235, map: "desertland" },
  { type: "safe", x: -635, y: -1312, map: "desertland" }
    ],	
    boar: [
  { type: "farm", x: -17, y: -1108, map: "winterland" },
  { type: "safe", x: 6, y: -855, map: "winterland" }
    ],
    cgoo: [{ x: -221, y: -274 }],
    crab: [{ x: -11840, y: -37 }],
    ent: [{ x: -420, y: -1960 }],
    fireroamer: [
  { type: "farm", x: 114, y: -883, map: "desertland" },
  { type: "safe", x: -30, y: -800, map: "desertland" }
    ],	
    fireroamer11111: [
  { type: "farm", x: 400, y: -960, map: "desertland" },
  { type: "safe", x: 470, y: -960, map: "desertland" }
    ],	
    ghost: [
  { type: "farm", x: -400, y: -1650 , map: "halloween" },
  { type: "safe", x: -284, y: -1528 , map: "halloween" }
    ],
    gscorpion: [{ x: 390, y: -1422 }],
    iceroamer: [{ x: 823, y: -45 }],
    mechagnome: [
  { type: "farm", x: 0, y: 0 },
  { type: "safe", x: -152, y: 2 }
    ],
    mole: [{ x: 4, y: -282 }],  //-282
    mummy: [{ x: 256, y: -1417 }],
    booboo: [
  { type: "farm", x: 350, y: -675 },
  { type: "safe", x: 158, y: -660 }
    ],
    oneeye: [{ x: -270, y: 160 }],
    pinkgoblin: [{ x: 366, y: 377 }],
    poisio: [{ x: -121, y: 1360 }],
    prat: [{ x: -280, y: 552 }], //[{ x: 6, y: 430 }]
    pppompom: [{ x: 292, y: -189 }],
    plantoid: [
  { type: "farm", x: -800, y: -366, map: "desertland" },
  { type: "safe", x: -600, y: -180, map: "desertland" }
    ],	
	rat: [{ x: 6, y: 430 }],
    scorpion: [{ x: -495, y: 685 }],
    stoneworm: [{ x: 830, y: 7 }],
    spider: [
  { type: "farm", x: 1297, y: -146, map: "main" },
  { type: "safe", x: 1290, y: -80, map: "main" }
    ],    squig: [{ x: -1175, y: 422 }],
    wolf: [
  { type: "farm", x: 400, y: -2650, map: "winterland" },
  { type: "safe", x: 400, y: -2450, map: "winterland" }
    ],
    wolfie: [
  { type: "farm", x: 62, y: -1974, map: "winterland" },
  { type: "safe", x: -2, y: -1799, map: "winterland" }
    ],
	
    xscorpion: [{ x: -495, y: 685 }],
    odino: [
  { type: "farm", x: -20, y: 675, map: "mforest" },
  { type: "safe", x: -240, y: 700, map: "mforest" }
    ],
    ent: [
  { type: "farm", x: -39, y: -1953, map: "desertland" },
  { type: "safe", x: -66, y: -1862, map: "desertland" }
    ],	
	

};


const f1111 = 'haiz';  ///tank fram check f1 có mới ra chỗ fram 

const home = 'plantoid';
const farmLocation = locations[home].find(p => p.type === "farm");
const mobMap = farmLocation?.map || "main"; // fallback nếu không có

const destination = {
    map: mobMap,
    x: locations[home][0].x,
    y: locations[home][0].y
};
const safeSpot = locations[home].find(p => p.type === "safe");
const safeDestination = {
    map: mobMap,
    x: safeSpot?.x ?? 0,
    y: safeSpot?.y ?? 0
};


let angle = 0;
const speed = 3; // normal 2 or .65
let folowhaizevents = false;



const boundaryOur = Object.values(G.maps[mobMap].monsters).find(e => e.type === home).boundary;
const [topLeftX, topLeftY, bottomRightX, bottomRightY] = boundaryOur;
const centerX = (topLeftX + bottomRightX) / 2;
const centerY = (topLeftY + bottomRightY) / 2;

let framboss = 0
let folowhaiz = 0
let gobaltaget = null;
let bossvip = 0

const priorityEvents = ["dragold",]; //ưu tiên chạy tới trước khi thấy boss live mà không chờ haiz


async function eventer() {
    const delay1 = 500;
    let tank = get_player("Ynhi");

    try {
        if (folowhaizevents) {
             handlebossPro(evenmuaban)
	} else if (framboss > 0) {
		
	} else if (bossvip > 0) {
          Handelbossvip()
	} else if (cryts > 0) {
          crytsgame()
	} else if (crab > 0) {
          crabgame()	
	} else if (tomb > 0) { //dùng chung cho cả tomb và xmage
          Xmage()
		  spider_game()	

    } else if (priorityEvents.some(e => parent?.S?.[e]?.live)) {
			     folowhaizevents = true;
    // const activeEvent = priorityEvents.find(e => parent?.S?.[e]?.live);
		
			
    } else {
		 handleHome();
        }
    } catch (e) {
        console.error(e);
    }

    setTimeout(eventer, delay1);
}

setTimeout(eventer, 14000);



 //  const mode_follow_haiz = false;
     const mode_follow_haiz = true; // nếu muốn quay quanh haiz ✅

async function handleHome() {
if (smart.moving) return;


    if (parent?.S?.holidayseason && !character?.s?.holidayspirit) {
        if (!smart.moving) {
            smart_move({ to: "town" }, () => {
                parent.socket.emit("interaction", { type: "newyear_tree" });
            });
        }
	}
	

	
	var f1 = get_player("haiz"); 
    if ( f1 && get_nearest_monster({type: "franky"})) {
	     folowhaizevents = true;
	    return
    }

    if (parent?.S?.wabbit?.live && !character?.s?.easterluck && 1 == 2 ) {
        let wabbit = parent.S.wabbit;
        if (wabbit && wabbit.live && !smart.moving) {
            try {
                await smart_move({ x: wabbit.x, y: wabbit.y, map: wabbit.map });
                let target_monster = get_nearest_monster({ type: "wabbit" });
                if (target_monster) {
                    change_target(target_monster);
                }
            } catch (error) {
                console.log("Không thể di chuyển đến wabbit, sử dụng 'use_town'");
                await smart_move(destination);
            }
            game_log("Đang di chuyển đến wabbit");
        }
        return;
    }


 //   const tank = get_player(f1111);
	const tank = get_player("Ynhi");

    // Nếu chưa có tank, tank chết, hoặc tank quá xa → rút về điểm an toàn
    if (!tank || tank.rip || distance(character, tank) > 300) {
        if (!smart.moving) {
            try {
                await smart_move(safeDestination);
            } catch (error) {
                console.log("Không thể đi tới safeDestination, dùng town.");
                await use_skill("town");
            }
        }
        return;
    }

    // Khi có tank gần, thì tới điểm farm nếu chưa đúng chỗ
    if (
        character.map !== mobMap ||
        (!smart.moving && distance(character, { x: locations[home][0].x, y: locations[home][0].y }) > 100)
    ) {
        try {
            await smart_move(destination);
        } catch (error) {
            console.log("Không thể đi tới destination, dùng town.");
            await use_skill("town");
        }
        return;
    }

    // Khi đang ở vị trí farm → quay vòng
    if (!smart.moving) {
        const radius = 15;
        let center = locations[home][0];
        if (mode_follow_haiz) {
            const haiz = f1;
            if (haiz) center = { x: haiz.x, y: haiz.y };
        }

        const currentTime = performance.now();
        const deltaTime = currentTime - lastUpdateTime;
        lastUpdateTime = currentTime;

        const deltaAngle = speed * (deltaTime / 1000);
        angle = (angle + deltaAngle) % (2 * Math.PI);

        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const targetX = center.x + offsetX;
        const targetY = center.y + offsetY;

        if (!character.moving && lastUpdateTime > 100) {
            await xmove(targetX, targetY);
        }
    }


	
	


}



function getLowestHpPercentTarget(targets) {
    if (!targets || targets.length === 0) return null;
    let lowest = targets[0];
    for (let i = 1; i < targets.length; i++) {
        const currentPercent = targets[i].hp / targets[i].max_hp;
        const lowestPercent = lowest.hp / lowest.max_hp;
        if (currentPercent < lowestPercent) {
            lowest = targets[i];
        }
    }
    return lowest;
}


/*

const targetNames = ["haiz","6gunlaZe","nhiY","tienV","Ynhi","LyThanhThu1"];


async function attackLoop() {
	//if (character.moving)return
    let delay = null; // Default delay

    try {
        let nearest = null;


if (
        character.map == mobMap &&
        distance(character, { x: locations[home][0].x, y: locations[home][0].y }) < 250
    ) 
{	
        // Find the nearest monster based on the targetNames
        for (let i = 0; i < targetNames.length; i++) {
          nearest = get_nearest_monster_v2({
          target: targetNames[i],
           max_distance: character.range,
         check_low_hp: true
         });
            if (nearest) break;
        }
}

        if (!nearest) {
            for (let i = 0; i < targetNames.length; i++) {
                nearest = get_nearest_monster_v2({
                    target: targetNames[i],
					statusEffects: ["cursed"],
                    max_distance: character.range,
                    check_max_hp: true,  // Checking for monster with max HP
                });
                if (nearest) break;
            }
        }
		

	    
        if (!nearest) {
            for (let i = 0; i < targetNames.length; i++) {
                nearest = get_nearest_monster_v2({
                    target: targetNames[i],
                    max_distance: character.range,
                    check_max_hp: true,  // Checking for monster with max HP
                });
                if (nearest) break;
            }
        }

    if (!nearest) {
        // Target hiện tại
        let currentTarget = get_targeted_monster();

        // Tìm target theo thứ tự ưu tiên
        let priorityTarget = null;

        for (let name of targetNames) {
            const player = get_player(name);
            if (!player) continue;

            const t = get_target_of(player);
            if (t && !t.dead) {
                priorityTarget = t;
                break; // dừng ngay khi tìm được target hợp lệ đầu tiên
            }
        }

        // Đổi target nếu cần
        if (priorityTarget) {
			if (currentTarget !== priorityTarget)change_target(priorityTarget);
            nearest = priorityTarget;
        }
     }



	if ( nearest && !is_in_range(nearest))
	{
          gobaltaget = nearest;
	}
	    
        // If a monster is found and is in range, execute the attack
        if (nearest && is_in_range(nearest) && !smart.moving) {
            await attack(nearest); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack
        }

	    
    } catch (e) {
        //console.error(e);
    }
	 setTimeout(attackLoop, delay/2 || 250); // Default delay if undefined
}

attackLoop();

*/



function findByNames(opts) {
    for (const name of targetNames) {
        const t = get_nearest_monster_v2({
            target: name,
            ...opts
        });
        if (t) return t;   // ✅ dừng sớm
    }
    return null;
}



const targetNames = ["haiz", "6gunlaZe", "nhiY", "tienV", "Ynhi", "LyThanhThu1"];

// ================= GLOBAL STATE =================
let combatState = {
    target: null,
    lastUpdate: 0
};

// ================= TARGET LOOP (Chuyên tìm mục tiêu) =================
function targetLoop() {
    try {
        let nearest = null;

        // 1️⃣ Ưu tiên targetNames gần nhà và sắp chết
        if (
            character.map === mobMap &&
            distance(character, locations[home][0]) < 250
        ) {
    nearest = findByNames({
        max_distance: character.range,
        check_low_hp: true
    });
        }

        // 2️⃣ Ưu tiên cursed
        if (!nearest) {
    nearest = findByNames({
        statusEffects: ["cursed"],
        max_distance: 50,
        check_max_hp: true
    });
        }


        // 2️⃣.5 Boss mạnh – cần buff
        const buff = get_player("Ynhi");
        const bossDanger = ["dragold","stompy","skeletor","xmagefz","xmagefi","xmagen","xmagex","mrgreen","mrpumpkin","icegolem","franky"];

        if (!nearest && buff && distance(character, buff) < 170) {
            for (const m of bossDanger) {
                const t = get_nearest_monster({ type: m });
                if (t) {
                    nearest = t;
                    break;
                }
            }
        }

		
        // 3️⃣ Ưu tiên đánh theo mục tiêu của đồng đội khi có quái mạnh với máu lúc full > 50k
        if (!nearest) {
            for (const name of targetNames) {
                const player = get_player(name);
                if (player) {
                    const t = get_target_of(player);
                    if (t && !t.dead && t.type == "monster"  && t.max_hp > 50000  && distance(character, t) <= character.range ) {
                        nearest = t;
                        break;
                    }
                }
            }
        }

        // 4️⃣ Quái thường theo targetNames
        if (!nearest) {
    nearest = findByNames({
        max_distance: character.range,
        check_max_hp: true
    });
        }

        combatState.target = nearest;
        combatState.lastUpdate = Date.now();

        // Cập nhật biến global di chuyển nếu ngoài tầm
        if (nearest && !is_in_range(nearest)) {
            gobaltaget = nearest;
        }

    } catch (e) {}
    setTimeout(targetLoop, 250); // Kiểm tra mục tiêu mỗi 250ms
}

// ================= ATTACK LOOP (Chuyên thực hiện đánh) =================
function attackLoop() {
    let delay = 20;

    try {
        // Kiểm tra target cũ quá 5s thì bỏ
        if (combatState.target && Date.now() - combatState.lastUpdate > 5000) {
            combatState.target = null;
        }

        const t = combatState.target;

        if (!t || smart.moving || is_disabled(character)) {
            return setTimeout(attackLoop, 40);
        }

        const ms = ms_to_next_skill("attack");

        // Tấn công tối ưu dựa trên Ping và Cooldown
        if (ms < Math.max(10, character.ping / 10) && is_in_range(t)) {
            attack(t);
        }

        // Tính toán delay vòng lặp tiếp theo cực nhanh
        if (ms > 200) delay = 80;
        else if (ms > 100) delay = 40;
        else if (ms > 60) delay = 20;
        else delay = 5;

    } catch (e) {}
    setTimeout(attackLoop, delay);
}

// Chạy cả 2 vòng lặp
targetLoop();
attackLoop();






//l: "l"  == L lock
let isEquipping = false; // Flag kiểm soát trạng thái

async function equipBatch(data) {
    if (isEquipping) {
       // game_log("equipBatch is already running. Skipping.");
        return;
    }
    isEquipping = true; // Đánh dấu đang chạy

    if (!Array.isArray(data)) {
        game_log("Can't equipBatch non-array");
        isEquipping = false;
        return handleEquipBatchError("Invalid input: not an array");
    }
    if (data.length > 15) {
        game_log("Can't equipBatch more than 15 items");
        isEquipping = false;
        return handleEquipBatchError("Too many items");
    }

    let validItems = [];

    for (let i = 0; i < data.length; i++) {
        let itemName = data[i].itemName;
        let slot = data[i].slot;
        let level = data[i].level;
        let l = data[i].l;

        if (!itemName) {
            game_log("Item name not provided. Skipping.");
            continue;
        }

        let found = false;
        if (parent.character.slots[slot]) {
            let slotItem = parent.character.items[parent.character.slots[slot]];
            if (slotItem && slotItem.name === itemName && slotItem.level === level && slotItem.l === l) {
                found = true;
            }
        }

        if (found) {
            game_log(`Item ${itemName} is already equipped in ${slot} slot. Skipping.`);
            continue;
        }

        for (let j = 0; j < parent.character.items.length; j++) {
            const item = parent.character.items[j];
            if (item && item.name === itemName && item.level === level && item.l === l) {
                validItems.push({ num: j, slot: slot });
                break;
            }
        }
    }

    if (validItems.length === 0) {
        isEquipping = false;
        return; // Không có vật phẩm hợp lệ
    }

    try {
        parent.socket.emit("equip_batch", validItems);
        await parent.push_deferred("equip_batch");
    } catch (error) {
        console.error("Error in equipBatch:", error);
        handleEquipBatchError("Failed to equip items");
    }

    isEquipping = false; // Reset flag khi hoàn tất
}






const equipmentSets = {


    luck: [
        { itemName: "wshoes", slot: "shoes", level: 8, l: "l"  },
        { itemName: "wcap", slot: "helmet", level: 8, l: "l" },
        { itemName: "wgloves", slot: "gloves", level: 9, l: "l" },
        { itemName: "wattire", slot: "chest", level: 8, l: "l" },	    
        { itemName: "wbreeches", slot: "pants", level: 7, l: "l" },

        { itemName: "rabbitsfoot", slot: "orb", level: 1, l: "l" },
    ],
    def_fire: [
        { itemName: "orboffire", slot: "orb", level: 3, l: "l" },
    ],
    dame: [
        { itemName: "orbofdex", slot: "orb", level: 4, l: "l" },

        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },
        { itemName: "fury", slot: "helmet", level: 8, l: "l" },
        { itemName: "supermittens", slot: "gloves", level: 8, l: "l" },
        { itemName: "coat", slot: "chest", level: 10, l: "l" },	    
        { itemName: "pants", slot: "pants", level: 10, l: "l" },
		
    ],

};


function ChuyendoiITEM() {
    let needFireDef = false;
    let needNormalDef = false;
    let needLuck = false;

    for (const e of Object.values(parent.entities)) {
        if (!e.visible || e.dead || distance(character, e) > 400) continue;

        // Nguy hiểm cao nhất
        if (e.mtype === "xmagefi") {
            needFireDef = true;
            break;
        }

        // Coop gần chết → ưu tiên luck
        if (e.cooperative && e.hp < 350000) {
            needLuck = true;
        }

        // Bị đánh + máu thấp → cần def
        if (e.target === character.name && character.hp < 4500) {
            needNormalDef = true;
        }
    }

    if (needFireDef) {
      //  equipSet('def_fire');
    } else if (needNormalDef) {
      //  equipSet('def');
    } else if (needLuck) {
        equipSet('luck');
    } else {
        equipSet('dame');
    }
}

setInterval(ChuyendoiITEM, 700); // chỉ áp cho trang bị





function equipSet(setName) {
    const set = equipmentSets[setName];
    if (set) {
        equipBatch(set);
    } else {
        console.error(`Set "${setName}" not found.`);
    }
}



//////////////////////////////////////////////////////////////////
let lastSwitchTime = 0; // Timestamp of the last switch
const switchCooldown = 750; // Cooldown period in milliseconds (0.75 seconds)

// Function to check if the cooldown period has passed
function CD() {
    return performance.now() - lastSwitchTime > switchCooldown;
}

// Utility function to handle cooldown check and equipment switch
const weaponSet = (set) => {
    if (CD()) {
        equipSet(set);
        lastSwitchTime = performance.now();
    }
};




// Helper function to handle errors
function handleEquipBatchError(message) {
    game_log(message);
    // You may decide to implement a delay or other error handling mechanism here
    return Promise.reject({ reason: "invalid", message });
}



function ms_to_next_skill(skill) {
    const next_skill = parent.next_skill[skill]
    if (next_skill == undefined) return 0
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) + 15;
    return ms < 0 ? 0 : ms;
}





function get_nearest_monster_v2(args = {}) {
    let min_d = 999999, target = null;
    let optimal_hp = args.check_max_hp ? 0 : 999999999;

let lowHpValue = 0;
let lowHpTarget = null;


    for (let id in parent.entities) {
        let current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;
        if (args.type && current.mtype != args.type) continue;
        if (args.min_level !== undefined && current.level < args.min_level) continue;
        if (args.max_level !== undefined && current.level > args.max_level) continue;
        if (args.target && current.target !== args.target) continue;
        if (args.no_target && current.target && current.target != character.name) continue;

        if (args.statusEffects && !args.statusEffects.every(effect => current.s[effect])) continue;

        if (args.min_xp !== undefined && current.xp < args.min_xp) continue;
        if (args.max_xp !== undefined && current.xp > args.max_xp) continue;

        if (args.max_att !== undefined && current.attack > args.max_att) continue;

        if (args.path_check && !can_move_to(current)) continue;

        let c_dist = args.point_for_distance_check
            ? Math.hypot(args.point_for_distance_check[0] - current.x, args.point_for_distance_check[1] - current.y)
            : parent.distance(character, current);

        if (args.max_distance !== undefined && c_dist > args.max_distance) continue;

// ------------ NEW FEATURE: CHECK LOW HP (ANTI OVERKILL) ----------------
if (args.check_low_hp) {

    // 1. Xác định ngưỡng "sắp chết" theo max_hp của quái
    const hpThreshold =
        current.max_hp >= 800000 ? 45000 :
        current.max_hp >= 200000 ? 20000 :
                                   7000;

    // 2. Chỉ xét quái:
    //    - Đã vào vùng sắp chết (<= threshold)
    //    - Nhưng chưa quá thấp máu (>= 1500) để tránh overkill
    if (current.hp <= hpThreshold && current.hp >= 2800) {

        // 3. Trong vùng này, chọn con có HP LỚN NHẤT
        if (current.hp > lowHpValue) {
            lowHpValue = current.hp;
            lowHpTarget = current;
        }
    }

    // 4. Vẫn tiếp tục loop để quét hết toàn bộ mob
    continue;
}
/////////////////////////

        // Nếu đang check max HP
        if (args.check_max_hp) {
            let c_hp = current.hp;
            if (c_hp > optimal_hp) {
                optimal_hp = c_hp;
                target = current;
            }
            continue;
        }

        // Mặc định: chọn quái gần nhất
        if (c_dist < min_d) {
            min_d = c_dist;
            target = current;
        }
    }

// Nếu bật check_low_hp → chỉ lấy quái HP thấp, không fallback HP cao
if (args.check_low_hp) {
    if (lowHpTarget) return lowHpTarget;
    return null;  // không có quái HP thấp thì trả null
}


    return target;
}



const QUICK_DAGGERS = ["daggerofthedead", "vdagger"];
const QUICK_FISTS   = ["cclaw", "pclaw"];

async function skillLoop() {
    try {
        const target = get_target();
        const inRange =
            target && !target.dead && 
            distance(character, target) <
            character.range + (character.xrange || 0);

        // 1. Invis
        if (!is_on_cooldown("invis") && !character.s.invis && inRange && !smart.moving ) {
            use_skill("invis");
        }

        // 2. Rspeed party
        if (!is_on_cooldown("rspeed") && parent.party_list) {
            for (let id in parent.party_list) {
                const member = parent.party_list[id];
                let entity = parent.entities[member];
                if (member === character.name) entity = character;

                if (
                    entity &&
                    character.mp > 500 &&
                    distance(character, entity) < 300 &&
                    (!entity.s?.rspeed || entity.s.rspeed.ms < 300000)
                ) {
                    use_skill("rspeed", entity);
                    break;
                }
            }
        }

        // 3. Quick attack
        let quickSkill = null;
        const mhName = character.slots.mainhand?.name;

        if (QUICK_DAGGERS.includes(mhName)) quickSkill = "quickstab";
        else if (QUICK_FISTS.includes(mhName)) quickSkill = "quickpunch";

        if (
            quickSkill &&
            inRange &&
            !is_on_cooldown(quickSkill) &&
            character.mp > 750
        ) {
            await use_skill(quickSkill, target);
        }

    } catch (e) {
        console.log("skillLoop error:", e);
    }

    setTimeout(skillLoop, 100);
}

skillLoop();






function scare() {
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);
    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;
	    const leader = get_player("haiz");
	    const a1 = get_nearest_monster({type: "a1"});
	
    for (id in parent.entities) {
        var current = parent.entities[id];
	    
	        if (!current || current.type !== "monster") continue; //fix loi

        if ((  ( current.mtype == 'gpurplepro' || current.mtype == 'zapper0' || current.mtype == 'a4' || (current.mtype == 'nerfedbat' && leader && a1 && distance(leader, a1) < 125 ) )  || character.hp < 5000 || (smart.moving && character.map != "crypt") ) && current.target == character.name) {
            mobnum++;
            targetedForMoreThanOneSecond = true;
        }
else if (current.target == character.name && 
         (current.mtype != 'nerfedbat' || (current.mtype == 'nerfedbat' && a1 && distance(character, a1) < 120)))  // lưu ý Ynhi có thể đã hút ago hết từ khi mình bắn super shot
{
    mobnum++;    
}

    }



    if ((mobnum > 0 && targetedForMoreThanOneSecond) || mobnum > 2 ){
        if (!is_on_cooldown("scare")) {
            setTimeout(() => {
                if (!is_on_cooldown("scare")) {
                    equip(slot);
                    use("scare");
                    equip(slot);
                }
            }, 200); // 1000 milliseconds = 1 second
        }
    }
}
setInterval(scare, 1000);  // Gọi lại scare() sau mỗi 1.5 giây



function use_hp_or_mp1()
{
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	
	
if (character.mp < 600 && character.hp > 2500 ) use_skill("use_mp");
  else if (character.hp/character.max_hp< 0.5 && character.mp > 130 ) use_skill("use_hp");
  else if (character.mp/character.max_mp < 0.95) use_skill("use_mp");

	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}

setInterval(function() {
use_hp_or_mp1()
}, 200);






async function moveLoop() {
    let delay = 500;
    try {

if (!character.party)send_party_request("haiz");

if(gobaltaget && !is_in_range(gobaltaget) && distance(character, gobaltaget)  < 300 && !smart.moving && gobaltaget.visible && !gobaltaget.dead)
{
		move(
			character.x+(gobaltaget.x-character.x)/2,
			character.y+(gobaltaget.y-character.y)/2
			);
		// Walk half the distance
}
else
{
	gobaltaget = null;
}

	    
if (!folowhaizevents){


	
	





	    
}
    } catch (e) {
        console.error(e);
    }
    setTimeout(moveLoop, delay);
}

moveLoop();




function getPrioritizedTargets(targetNames, homeX, homeY, rangeThreshold, args = {}) {

    const priorityMtypes = ["franky", "a1", "fvampire", "stompy", "crabxx", "a4", "mrpumpkin", "mrgreen"];
    const isPriorityMtype = (m) => priorityMtypes.includes(m.mtype);
    const hasStatus = (m, effects) => m.s && effects.every(e => m.s[e]);

    // === 1. Lọc quái đang đánh party ===
    let targets = Object.values(parent.entities)
        .filter(m =>
            m.type === "monster" &&
            m.target &&
            (targetNames.includes(m.target) || m.cooperative === true)
        );

    // === 2. SORT CHÍNH – phục vụ 2 phát mạnh ===
    targets.sort((a, b) => {

        // 1. cursed
        const cursedA = hasStatus(a, args.statusEffects || []);
        const cursedB = hasStatus(b, args.statusEffects || []);
        if (cursedA !== cursedB) return cursedA ? -1 : 1;

        // 2. boss
        const bossA = isPriorityMtype(a);
        const bossB = isPriorityMtype(b);
        if (bossA !== bossB) return bossA ? -1 : 1;

        // 3. bảo vệ party
        const pA = targetNames.indexOf(a.target);
        const pB = targetNames.indexOf(b.target);
        if (pA !== pB) return pA - pB;

        // 4. gần home
        const dA = Math.hypot(a.x - homeX, a.y - homeY);
        const dB = Math.hypot(b.x - homeX, b.y - homeY);
        if (dA !== dB) return dA - dB;

        // 5. quái trâu hơn đứng trước
        return b.hp - a.hp;
    });

// === 3. CHÈN QUÁI FINISHER ===
if (targets.length >= 2) {
    const finisherIndex = targets.findIndex(m =>
        m.hp >= 1800 &&
        m.hp <= 7000 &&
        !hasStatus(m, args.statusEffects || []) &&
        !isPriorityMtype(m)
    );

    if (finisherIndex > 1) {
        const [finisher] = targets.splice(finisherIndex, 1);

        if (targets.length >= 2) {
            // Có từ 3 quái ban đầu → chèn slot 2 & 3
            targets.splice(1, 0, finisher);
            targets.splice(2, 0, finisher);
        } else {
            // Chỉ có 2 quái → giữ như cũ
            targets.splice(1, 0, finisher);
        }
    }
}


    // === 4. Phân loại theo range ===
    const inRange = [];
    const characterRange = [];
    const outOfRange = [];

    for (const m of targets) {
        const d = Math.hypot(m.x - homeX, m.y - homeY);
        if (d <= rangeThreshold) {
            inRange.push(m);
            characterRange.push(m);
        } else if (d <= character.range) {
            characterRange.push(m);
        } else {
            outOfRange.push(m);
        }
    }

    return {
        targets: [...inRange, ...outOfRange, ...characterRange],
        inRange,
        outOfRange,
        characterRange
    };
}






function checkPVPandARENA() {

if (character.map != "arena")return
const friend = ["MuaBan", "haiz" , "haiz1" , "Ynhi", "nhiY", "6gunlaZe","tienV","LyThanhThu"];
const PVPInRange = Object.values(parent.entities)    //trả về các đối tượng kẻ thù
    .filter(entity => 
	 entity.player  &&   
        !friend.includes(entity.name) &&       //không phải bạn bè thì chọn đối tượng đó
        entity.visible &&                      // Kiểm tra nếu thực thể đang hiển thị
        distance(character, entity) <= 500     // Nếu không phải vbat, kiểm tra khoảng cách <= 400
 
    );

	
if(PVPInRange.length >= 1)
{
send_cm("haiz","stop")
parent.api_call("disconnect_character", {name: "LyThanhThu"});
stop_character("LyThanhThu")	
}


	
    // Đây là công việc bạn muốn thực hiện mỗi 1 giây
    console.log("Vòng lặp chạy mỗi giây...");
}

// Thiết lập vòng lặp mỗi 1 giây (1000ms)
setInterval(checkPVPandARENA, 1000); // 1000ms = 1 giây





function crabgame() {
if (parent?.S?.["crabxx"])
{
if (smart.moving)return
if (!get_nearest_monster({ type: "crabxx" }))smart_move({ map: "main", x: -976, y: 1785 })	
}
else
{
crab = 0	
}
	
}




const bossVipInfo = {
    1: { type: "stompy", map: "winterland", x: 434, y: -2557 },
    2: { type: "skeletor", map: "arena", x: 666, y: -555 },
    3: { type: "mechagnome", map: "cyberland", x: 0, y: 0 },
    4: { type: "mrpumpkin", map: "halloween", x: -161, y: 769 },
    5: { type: "mrgreen", map: "spookytown", x: 271, y: 1023 },

	
    // Thêm boss mới ở đây
};


function Handelbossvip() {
    if (smart.moving || bossvip === 0) return;

    const info = bossVipInfo[bossvip];
    if (!info) return;

    const f1 = get_player(f1111);
    const f2 = get_player("haiz");

    const target = get_target();
    const check = !!target && !target.rip;

    // Nếu không có mục tiêu hoặc ngoài tầm bắn, và đồng đội ở gần → tìm boss
    if ((!check || (check && !is_in_range(target))) && f1 && f2 && distance(character, f1) < 150 && distance(character, f2) < 150) {
        const currentTarget1 = get_nearest_monster_solobosskill?.() ?? get_nearest_monster({ type: info.type });

        if (currentTarget1) {
              /// skill ??

            if (!target) change_target(currentTarget1);
        }
    }

    // Nếu đến đúng khu vực boss nhưng không thấy boss → reset bossvip
    if (
        character.map === info.map &&
        distance(character, { x: info.x, y: info.y }) <= 150 &&
        !get_nearest_monster({ type: info.type })
    ) {
        bossvip = 0;
        game_log(`✅ Boss ${info.type} đã hết!`);
    }
}





function Xmage() {
if (character.map != "winter_instance") return

	
	
}


function spider_game() {
if (character.map != "spider_instance") return

    // Danh sách ưu tiên
    let prio = ["spiderbr","spiderr","spiderbl"];
    let target = null;

    // Tìm theo thứ tự ưu tiên
    for (let name of prio) {
        target = get_nearest_monster({ type: name });
        if (target) break;
    }

    // Nếu có target thì dùng skill
    if (target ) {
       // ??
    }

	
}



let delayboss = Date.now()
function crytsgame() {
if (smart.moving && character.map != "crypt")return
if (character.map != "cave" && character.map != "crypt" )smart_move({ map: "cave", x: -194, y: -1281 })	
if (character.map == "cave" && distance(character, {x: -194, y: -1281}) > 30)smart_move({ map: "cave", x: -194, y: -1281 })

		let host = get_player("haiz")
		let healerr = get_player("Ynhi")

    var currentTarget = get_targeted_monster();
	if((!currentTarget || (currentTarget && distance(character, currentTarget) > character.range + 50) ) && host && distance(character, host) < 180 && healerr && distance(character, healerr) < 180  )
	{


		//làm gì ở đây nhỉ


	}

}




async function moveToTargetLocation(receivedData) {
    if (receivedData && typeof receivedData === 'object' && receivedData.message === "location") {
        const { map: targetMap, x: targetX, y: targetY } = receivedData;

        // Nếu không ở đúng bản đồ, thử di chuyển đến bản đồ đích
        if (character.map !== targetMap && character.map !== "crypt") {
            try {
                // Sử dụng smart_move để di chuyển đến vị trí, nếu không thành công thì bắt lỗi
                await smart_move({ map: targetMap, x: targetX, y: targetY });
            } catch (error) {
                // Nếu không thể di chuyển (ví dụ: không có đường đi), thì dùng 'use_town'
                console.log("Không thể di chuyển đến đích, sử dụng 'use_town'");
                await use_skill("town");  // Quay lại thành phố
            }
        } else {
            // Nếu đã ở đúng bản đồ, kiểm tra và di chuyển đến tọa độ nếu chưa đến
            const distance = Math.hypot(character.x - targetX, character.y - targetY);
            if (distance > 5) {
                xmove(targetX, targetY);  // Di chuyển mà không cần bắt lỗi
            }
        }
    }
}




// dùng để mặc định trở về khi even kết thúc kiểm tra từng loại even phù hợp thao tác tham gia
function handlebossPro(eventType) { 

if (eventType === undefined || eventType === null) {
	folowhaizevents = false;
  return; // Trả về nếu eventType không xác định
}

// Tiếp tục xử lý nếu eventType có giá trị hợp lệ

if (eventType == "goobrawl" || eventType ==  "crabxx"|| eventType == "franky" )
{
    if (parent?.S?.[eventType]) {
	    
       if (eventType == "goobrawl"  ){
		    if (character.map == "goobrawl" && smart.moving)stop("smart");
	        if (character.map !== "goobrawl")parent.socket.emit('join', { name: eventType });
      }

}
	else 
    {
	    folowhaizevents = false;
    }
}
	else{


if (parent?.S?.[eventType]?.live) {

}
	else 
    {
	    folowhaizevents = false;
    }

	
	}

}










setTimeout(() => {
     if (character.rip) { ///////auto hoi sinh 10s khi khởi động
    respawn();
  }
}, 10000);




setInterval(function() {

 if (character.rip) { ///////auto hoi sinh
    respawn();
  }

}, 120000);


function on_magiport(name){
    if(name == "nhiY"){
        accept_magiport(name);
    }
}


/////////////
function on_cm(name, data) {
	

	if(name == "MuaBan")
	{
           if(data)
	   {
		   evenmuaban = data
		   folowhaizevents = true;
	   }
	}

if (name === "haiz") {
    // Lệnh chuyển map nếu chưa đúng map
    const teleportCommands = {
        goo: "crypt",
        goo1: "tomb",
        goo2: "winter_instance",
        goo3: "spider_instance",
		
    };

    // Các lệnh gán biến trạng thái
    const flagCommands = {
        crypt: () => { cryts = 1; },
        tomb: () => { tomb = 1; },
        spidergame: () => { tomb = 1; },
        mage: () => { tomb = 1; },
        landau1: () => { landaucyp = 1; },
        landau0: () => { landaucyp = 0; },
        bossvip1: () => { bossvip = 1; },
        bossvip2: () => { bossvip = 2; },
        bossvip3: () => { bossvip = 3; },
        bossvip4: () => { bossvip = 4; },
        bossvip5: () => { bossvip = 5; },		
        crabxx: () => { crab = 1; },
    };

    // Tổng hợp tất cả key đặc biệt để loại trừ khi gán idmap
    const knownKeys = [
        ...Object.keys(teleportCommands),
        ...Object.keys(flagCommands)
    ];

    // Ưu tiên xử lý lệnh dịch chuyển
    if (teleportCommands[data]) {
        const targetMap = teleportCommands[data];
        if (character.map !== targetMap) {
            enter(targetMap, idmap);
        }
    }
    // Nếu là các lệnh gán trạng thái
    else if (flagCommands[data]) {
        flagCommands[data]();
    }
    // Nếu là chuỗi hợp lệ và không phải lệnh đặc biệt → coi như idmap
    else if (typeof data === "string" && !knownKeys.includes(data)) {
        idmap = data;
    }
    // Chỉ lưu vào receivedData nếu data đúng là một object tọa độ
    else if (typeof data === "object" && data.message === "location") {
        receivedData = data;
    }
}



	
}




	
////////


setInterval(function() {
    let lootMule = get_player("MuaBan");

		 //giui vang when in range
    var merch = get_player("MuaBan"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) {
        send_gold(merch,character.gold)
    }
	//
	
    if (lootMule == null) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }


    let itemsToExclude = ["pants","coat","pumpkinspice","mittens","supermittens","snowball","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","crossbow","jacko", "pouchbow","orbg","cupid"];
	
	
    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);
//////



setInterval(function() {
	
if (character.map == "crypt") return
	
		if(character.esize < 7 || !character.s.mluck || character.s.mluck.f !== "MuaBan")
	{
		send_cm("MuaBan", "full");
		game_log("lay do !!!!!!");
	}


	let soluonghp = 0
	let soluongmp = 0
   /////////
	        for (let i = 0; i < character.isize; i++) {
            const item = character.items[i]
            if (!item) continue // No item in this slot

            if (item.name == "mpot1" ) {
                // This is an item we want to use!
                    soluongmp += item.q//tim ra vi tri mon do
						// game_log("so luong  la "+soluongmp);

            }
            if (item.name == "hpot1" ) {
                // This is an item we want to use!
                    soluonghp += item.q//tim ra vi tri mon do
						// game_log("so luong  la "+soluonghp);

            }				
			}
	/////////		
	
	if( (soluonghp < 7000 ) )
	{
		send_cm("MuaBan", "hp");
		game_log("re filll !!!!!!");
	}
		if( ( soluongmp < 7000) )
	{
		send_cm("MuaBan", "mp");
		game_log("re filll !!!!!!");
	}
/////////////		

	

	
}, 20000); 




////////////////////////////////////////////////////////
setInterval(function() {
looting()	
}, 4000);
function looting() {
	    let chests = get_chests();
    let chestIds = Object.keys(chests);
    if (chestIds.length > 20 ) {
	  shift(0, 'goldbooster');   
        for (let id of chestIds) {
            loot(id);   
	    }
    }
    setTimeout(shifting, 550);

}
function shifting() {
    shift(0, 'xpbooster');
}

//////////////////////////////////////////////////////////////////////////




function get_nearest_monster_solobosskill(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=450 ,target=null;
        var bossarmy=[ "a2" , "a3", "a7", "vbat", "stompy", "skeletor","a8","a6","a1"]; 
	var bossarmylevel=["a6","a1"]; 
	let landaucheck = landaucyp
	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;
	if(args && args.type=="monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
	if(args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if ( (bossarmy.indexOf(current.mtype) == -1)   ) continue
	if (current.mtype === "a3" && landaucheck == 1) continue;
        if (current.mtype === "a1" && current.level > 2) continue;
        if (current.mtype === "a6" && current.level > 4) continue;
        if (current.mtype === "a8" && current.level > 6) continue;
		if(current.type!="monster" || !current.visible || current.dead) continue;
		if(args.type && current.mtype!=args.type) continue;
		if(args.min_xp && current.xp<args.min_xp) continue;
		if(args.max_att && current.attack>args.max_att) continue;
		if(args.target && current.target!=args.target) continue;
		if(args.no_target && current.target && current.target!=character.name) continue;
		if(args.NO_target && current.target) continue;
		if(args.path_check && !can_move_to(current)) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) min_d=c_dist,target=current; //lua chon quai vat gan nhat
	}
	return target;
}



// ===== CONFIG =====
const ITEM_WHITELIST = [
    "cryptkey",
    "tombkey",
    "frozenkey",
    "orboffire",
    "orboffrost",
    "orbofplague",
    "orbofresolve",

];

// ===== SEND FUNCTION =====
function sendItems(name) {
    let lootMule = get_player(name);
    if (!lootMule || distance(character, lootMule) > 250) return;

    character.items.forEach((item, index) => {
        if (!item) return;

        if (
            ITEM_WHITELIST.includes(item.name) &&
            !item.l &&                // không locked
            !item.s                   // không sealed
        ) {
            send_item(lootMule, index, item.q ?? 1);
        }
    });
}

setInterval(() => sendItems("haiz"), 30000);







////////////////////////////////////////////////////
/////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Extra range to add to a monster's attack range to give more wiggle room
const rangeBuffer = 90;  // Thêm vào tầm đánh của quái để tránh xa hơn một chút

// How far away we want to consider monsters
const calcRadius = 300;  // Bán kính xét quái để tránh

// Types of monsters we want to avoid
const avoidTypes = ["khong"];

const avoidPlayers = false; // Set to false to not avoid players at all
const playerBuffer = 0; // Additional range around players
const avoidPlayersWhitelist = []; // Players to avoid differently
const avoidPlayersWhitelistRange = 30; // Set to null to not avoid whitelisted players
const playerRangeOverride = 3; // Overrides how far to avoid, set to null to use player range
const playerAvoidIgnoreClasses = ["merchant"]; // Classes we don't want to avoid

// Tracking when we send movements to avoid flooding the socket
let lastMove;

// Whether we want to draw the various calculations visually
const drawDebug = false;


function avoidance() {
    if (drawDebug) clear_drawings();
   // game_log("⛔ Đang kiểm tra tránh quái...");

    const avoiding = avoidMobs();
    if (avoiding || smart.moving) return;

    const needToMove = (tomb > 0 || cryts > 0 || crab > 0 || bossvip > 0 || folowhaizevents);
    const target = get_target();
    const validTarget = target && !target.rip;
    const a1Nearby = get_nearest_monster({ type: "a1" });

    if (!needToMove || (lastMove && new Date() - lastMove <= 100)) return;

    const host = get_player("haiz");
    const tooFarFromHost = !host || distance(character, host) >= 300;

    if (tooFarFromHost) {
       // game_log("⚠️ Không tìm thấy host, di chuyển theo dữ liệu mục tiêu!");
        moveToTargetLocation(receivedData);
        return;
    }

   // game_log("🎯 Theo dõi 'haiz': " + host.name);

    const isInCrypt = character.map === "crypt";
    const frankyNearby = get_nearest_monster({ type: "franky" });

    if (!character.moving) {
        if (isInCrypt && (!validTarget || !is_in_range(target))) {
          //  game_log("🔄 Di chuyển về phía host (crypt, không có mục tiêu gần)");
            xmove(host.real_x, host.real_y);
        } else if (a1Nearby && is_in_range(a1Nearby)) {
           // game_log("⚠️ Phát hiện quái a1 gần — di chuyển theo host");
            xmove(host.real_x, host.real_y);
        } else if (validTarget && distance(character, host) > 100 ) {
          //  game_log("📏 Quá xa host + có mục tiêu, di chuyển theo");
            isInCrypt ? xmove(host.real_x, host.real_y) : kite(host, 20);
        } else if (!validTarget || !is_in_range(target)) {
          //  game_log("💨 Không có mục tiêu hoặc ngoài tầm — di chuyển về host");
            isInCrypt ? xmove(host.real_x, host.real_y) : kite(host, 20);
        } else if (frankyNearby) {
          //  game_log("😨 Gần quái Franky! Kite!");
            kite(host, 30);
        } else {
         //   game_log("🚶 Đứng yên nhưng không có gì đặc biệt, bám host");
            isInCrypt ? xmove(host.real_x, host.real_y) : kite(host, 20);
        }
    }

    lastMove = new Date();
}

setInterval(avoidance, 80);


let checkwwall = 1;
let lastKiteTime = 0;
const KITE_INTERVAL = 450; // ms
//phiên bản tay ngăn
function kite(taget, kite_range) {

    const now = performance.now();
    if (now - lastKiteTime < KITE_INTERVAL) return;
    lastKiteTime = now;

    let radius;
    const currentMap = character.map;

    if (currentMap === "winter_instance") {
        radius = character.range;
    } else if (currentMap === "mapB") {
        radius = 60;
    } else {
        radius = kite_range;
    }

    if (smart.moving || !taget) return;

    let currentTarget = get_targeted_monster();

    const angle = Math.PI / 3.5 * checkwwall;
    const reverseAngle = -angle;

    const angleFromCenterToCurrent =
        Math.atan2(character.y - taget.real_y,
                   character.x - taget.real_x);

    const endGoal = {
        x: taget.real_x + radius * Math.cos(angleFromCenterToCurrent + angle),
        y: taget.real_y + radius * Math.sin(angleFromCenterToCurrent + angle)
    };

    const endGoal1 = {
        x: taget.real_x + radius * Math.cos(angleFromCenterToCurrent + reverseAngle),
        y: taget.real_y + radius * Math.sin(angleFromCenterToCurrent + reverseAngle)
    };

    // ===== FUNCTION CHECK RANGE (chỉ dùng khi có quái) =====
    function inAttackRange(pos) {
        if (!currentTarget) return true; // không có quái → luôn hợp lệ
        const dx = pos.x - currentTarget.real_x;
        const dy = pos.y - currentTarget.real_y;
        return (dx * dx + dy * dy) <= (character.range - 5) * (character.range - 5);
    }

    const canMain = can_move_to(endGoal.x, endGoal.y) && inAttackRange(endGoal);
    const canReverse = can_move_to(endGoal1.x, endGoal1.y) && inAttackRange(endGoal1);

    // 1️⃣ Ưu tiên hướng chính
    if (canMain) {
        xmove(endGoal.x, endGoal.y);
    }
    // 2️⃣ Thử hướng ngược
    else if (canReverse) {
        xmove(endGoal1.x, endGoal1.y);
        checkwwall = -checkwwall;
    }
    // 3️⃣ Fallback: lao về leader
    else {
        xmove(taget.real_x, taget.real_y);
        checkwwall = -checkwwall;
    }
}





function avoidMobs() {
    let maxWeight = -Infinity; // Trọng số cao nhất tìm được
    let maxWeightAngle = 0;    // Góc tương ứng với trọng số cao nhất

    const monstersInRadius = getMonstersInRadius();        // Lấy danh sách quái nguy hiểm trong vùng
    const avoidRanges = getAnglesToAvoid(monstersInRadius); // Các góc nguy hiểm cần tránh
    const inAttackRange = isInAttackRange(monstersInRadius); // Đang trong tầm đánh quái?

    // Các khoảng cách sẽ kiểm tra để tính an toàn (gần, trung, xa)
    const distancesToCheck = [
        { d: 75, w: 1 },     // Gần, trọng số thấp
        { d: 120, w: 1.5 },  // Trung bình, trọng số cao hơn
        { d: 180, w: 2 }     // Xa, trọng số cao nhất
    ];

    // Nếu đang bị nguy hiểm (bị quái áp sát hoặc kẹt địa hình)
    if (inAttackRange || (!can_move_to(character.real_x, character.real_y))) {
        // Duyệt 360 độ quanh nhân vật, mỗi lần tăng 3 độ
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 60) {
            let totalWeight = 0;
            let safeAngle = false;

            // Kiểm tra mỗi khoảng cách trên góc hiện tại
            for (const check of distancesToCheck) {
                const position = pointOnAngle(character, angle, check.d); // Tọa độ giả định khi đi theo góc đó

                if (can_move_to(position.x, position.y)) {
                    let rangeWeight = 0;
                    let inRange = false;

                    // Duyệt qua từng quái để xem hướng này có giúp né xa hơn không
                    for (const id in monstersInRadius) {
                        const entity = monstersInRadius[id];
                        const monsterRange = getRange(entity);
                        const distToMonster = distanceToPoint(position.x, position.y, entity.real_x, entity.real_y);
                        const charDistToMonster = distanceToPoint(character.real_x, character.real_y, entity.real_x, entity.real_y);

                        // Nếu đang trong vùng nguy hiểm
                        if (charDistToMonster < monsterRange) {
                            inRange = true;
                            if (distToMonster > charDistToMonster) {
                                // Càng rời xa quái càng được cộng điểm
                                rangeWeight += (distToMonster - charDistToMonster);
                            }
                        }
                    }

                    if (inRange) {
                        totalWeight += rangeWeight * check.w; // Nhân với trọng số của khoảng cách
                    }

                    safeAngle = true; // Ít nhất có 1 điểm trong hướng này đi được
                }
            }

            // Nếu hướng này không trùng với góc nguy hiểm và có điểm đi được
            const intersectsRadius = angleIntersectsMonsters(avoidRanges, angle);
            if (safeAngle && !intersectsRadius) {
                if (totalWeight > maxWeight) {
                    maxWeight = totalWeight;
                    maxWeightAngle = angle;
                }
            }
        }

        // Sau khi duyệt hết, chọn hướng tốt nhất và di chuyển
        const movePoint = pointOnAngle(character, maxWeightAngle, 20); // Di chuyển mỗi lần 20 đơn vị

        if (!lastMove || new Date() - lastMove > 100) {
            lastMove = new Date();
            move(movePoint.x, movePoint.y);
        }

        // Nếu bật chế độ vẽ debug
        if (drawDebug) {
            draw_line(character.real_x, character.real_y, movePoint.x, movePoint.y, 2, 0xF20D0D); // Đường né màu đỏ
        }

        return true; // Đã xử lý né
    }

    return false; // Không cần né
}




function getRange(entity) {
    if (entity.type !== "character") {
        
        calculatedRange = (parent.G.monsters[entity.mtype]?.range || 100) + rangeBuffer;
        ////tùy chỉnh lại cho tay dài
        if (calculatedRange > (character.range - 15)) {
            return character.range - 40;
        }
        return calculatedRange;
	    
    } else {
        if (avoidPlayersWhitelist.includes(entity.id) && avoidPlayersWhitelistRange != null) {
            return avoidPlayersWhitelistRange;
        } else if (playerRangeOverride != null) {
            return playerRangeOverride + playerBuffer;
        } else {
            return (entity.range || 100) + playerBuffer;
        }
    }
}

function isInAttackRange(monstersInRadius) {
    return monstersInRadius.some(monster => {
        const monsterRange = getRange(monster);
        const charDistToMonster = distanceToPoint(character.real_x, character.real_y, monster.real_x, monster.real_y);
        return charDistToMonster < monsterRange;
    });
}

function angleIntersectsMonsters(avoidRanges, angle) {
    return avoidRanges.some(range => isBetween(range[1], range[0], angle));
}

function getAnglesToAvoid(monstersInRadius) {
    const avoidRanges = [];
    for (const id in monstersInRadius) {
        const monster = monstersInRadius[id];
        const monsterRange = getRange(monster);
        const tangents = findTangents({ x: character.real_x, y: character.real_y }, { x: monster.real_x, y: monster.real_y, radius: monsterRange });

        if (!isNaN(tangents[0].x)) {
            const angle1 = angleToPoint(character, tangents[0].x, tangents[0].y);
            const angle2 = angleToPoint(character, tangents[1].x, tangents[1].y);
            avoidRanges.push(angle1 < angle2 ? [angle1, angle2] : [angle2, angle1]);

            if (drawDebug) {
                draw_line(character.real_x, character.real_y, tangents[0].x, tangents[0].y, 1, 0x17F20D);
                draw_line(character.real_x, character.real_y, tangents[1].x, tangents[1].y, 1, 0x17F20D);
            }
        }

        if (drawDebug) {
            draw_circle(monster.real_x, monster.real_y, monsterRange, 1, 0x17F20D);
        }
    }
    return avoidRanges;
}

function getMonstersInRadius() {
    return Object.values(parent.entities).filter(entity => {
        const distanceToEntity = distanceToPoint(entity.real_x, entity.real_y, character.real_x, character.real_y);
        const range = getRange(entity);
        return (entity.type === "monster" && avoidTypes.includes(entity.mtype) && distanceToEntity < calcRadius) ||
            (avoidPlayers && entity.type === "character" && !entity.npc && !playerAvoidIgnoreClasses.includes(entity.ctype) &&
                (!avoidPlayersWhitelist.includes(entity.id) || avoidPlayersWhitelistRange != null) &&
                (distanceToEntity < calcRadius || distanceToEntity < range));
    });
}

function normalizeAngle(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function isBetween(angle1, angle2, target) {
    if (angle1 <= angle2) {
        return angle2 - angle1 <= Math.PI ? angle1 <= target && target <= angle2 : angle2 <= target || target <= angle1;
    } else {
        return angle1 - angle2 <= Math.PI ? angle2 <= target && target <= angle1 : angle1 <= target || target <= angle2;
    }
}

function findTangents(point, circle) {
    const dx = circle.x - point.x;
    const dy = circle.y - point.y;
    const dd = Math.sqrt(dx * dx + dy * dy);
    const a = Math.asin(circle.radius / dd);
    const b = Math.atan2(dy, dx);

    const ta = { x: circle.x + circle.radius * Math.sin(b - a), y: circle.y - circle.radius * Math.cos(b - a) };
    const tb = { x: circle.x - circle.radius * Math.sin(b + a), y: circle.y + circle.radius * Math.cos(b + a) };

    return [ta, tb];
}

function offsetToPoint(x, y) {
    const angle = angleToPoint(x, y) + Math.PI / 2;
    return angle - characterAngle();
}

function pointOnAngle(entity, angle, distance) {
    return { x: entity.real_x + distance * Math.cos(angle), y: entity.real_y + distance * Math.sin(angle) };
}

function entityAngle(entity) {
    return (entity.angle * Math.PI) / 180;
}

function angleToPoint(entity, x, y) {
    const deltaX = entity.real_x - x;
    const deltaY = entity.real_y - y;
    return Math.atan2(deltaY, deltaX) + Math.PI;
}

function characterAngle() {
    return (character.angle * Math.PI) / 180;
}

function distanceToPoint(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
