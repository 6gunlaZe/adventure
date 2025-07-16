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
    bscorpion: [{ x: -408, y: -1241 }],
    boar: [{ x: 19, y: -1109 }],
    cgoo: [{ x: -221, y: -274 }],
    crab: [{ x: -11840, y: -37 }],
    ent: [{ x: -420, y: -1960 }],
    fireroamer: [{ x: -30, y: -800 }],
    ghost: [
  { type: "farm", x: -400, y: -1650 },
  { type: "safe", x: -84, y: -1428 }
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
    plantoid: [{ x: -780, y: -387 }], // [{ x: -840, y: -340 }]
    rat: [{ x: 6, y: 430 }],
    scorpion: [{ x: -495, y: 685 }],
    stoneworm: [{ x: 830, y: 7 }],
    spider: [{ x: 1159, y: -154 }],
    squig: [{ x: -1175, y: 422 }],
    wolf: [
  { type: "farm", x: 400, y: -2650, map: "winterland" },
  { type: "safe", x: 400, y: -2450, map: "winterland" }
    ],
    wolfie: [{ x: 113, y: -2014 }],
    xscorpion: [{ x: -495, y: 685 }],
    odino: [
  { type: "farm", x: -20, y: 675, map: "mforest" },
  { type: "safe", x: -240, y: 700, map: "mforest" }
    ],

};

const home = 'wolf';
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
	} else if (tomb > 0) { //dùng chung cho cả tomb và xmage
          Xmage()
	} else if (crab > 0) {
          crabgame()		
        } else {
		 handleHome();
                ///  walkInCircle(); // khi fram riêng
		// safeawwaitwalkInCircle()  //khi fram chung
        }
    } catch (e) {
        console.error(e);
    }

    setTimeout(eventer, delay1);
}
setTimeout(eventer, 6000);




const mode_follow_haiz = true; // nếu muốn quay quanh haiz ✅ Công tắc follow haiz

async function handleHome() {
if (smart.moving) return;

	
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
        const radius = 40;
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

const targetNames = ["6gunlaZe","Ynhi","haiz","nhiY"];

// không được để return trong hàm loop
async function attackLoop() {
	//if (character.moving)return
    let delay = null; // Default delay
    const now = performance.now();
//game_log("m")
    const rangeThreshold = 50; // phạm vi tấn công boom
    const leader = get_player("haiz");
     const healerr = get_player("Ynhi");

	let codame = true;
if (character.slots["mainhand"] && character.slots["mainhand"].name == "cupid"){
    codame = false;
}


	
let X, Y;
if (healerr && distance(character, healerr) < 150 ) {
    X = healerr.x;
    Y = healerr.y;
} else {
    X = character.x;
    Y = character.y;
}
	
    let stopAttack = (check_quai_A4_stop_attach() == 1);
	
    try {
 if (!stopAttack) {	    

var tagetskill = getBestTargets({ max_range: character.range, havetarget: 1, cus:1 , NoMark: 1 , number : 1 , HPmin: 20000 }) 
	    if ( tagetskill.length == 1 && character.map != "winter_instance" )use_skill("huntersmark", tagetskill);
var hutquai = getBestTargets({ max_range: character.range, type: "wolf11", Nohavetarget:1,  number: 1 }); // Hàm check hút quái
 var KILLdauTien = getBestTargets({ max_range: character.range, type: "a1111111", subtype: "a5",  number: 1 }); // Hàm check hút quái
                                                               // không cần ưu tiên a1 vì trong getPrioritizedTargets đã có ưu tiên boss
	    
const { targets, inRange: monstersInRangeList , characterRange:  monsterscharacterRange } = getPrioritizedTargets(targetNames, X, Y, rangeThreshold);
//game_log("monstersInRangeList.length" +monstersInRangeList.length)		
//game_log("characterRange" +monsterscharacterRange.length)		
	let fieldgen0 = get_nearest_monster({ type: "fieldgen0" });


	 
            if( (leader && leader.hp < 9500) || (healerr && healerr.hp < 6300) || (fieldgen0 && (fieldgen0.hp / fieldgen0.max_hp) <= 0.7)  ){
		weaponSet("heal");

let healTargets = lowest_health_partymember(0.9, true);
if (healTargets.length >= 3 && character.mp > 330 && !is_on_cooldown("3shot")   ) {
	 if(!codame)await use_skill("3shot", healTargets.slice(0, 3));
	delay = ms_to_next_skill("attack");  
} else if (healTargets.length >= 1) {
	 if(!codame)await attack(healTargets[0]);
	delay = ms_to_next_skill("attack");  
}

	   }else if (KILLdauTien.length >= 1 && character.mp > 100 ){
		    // ưu tiên kill những quái vật nguy hiem trong tầm bắn.
			weaponSet("single");
               if(codame) await attack(KILLdauTien[0]);
	           delay = ms_to_next_skill("attack");
	    }else if (hutquai.length >= 1 && character.mp < 200 && character.targets <2 ){
		    	weaponSet("dead");
              if (codame) await attack(hutquai[0]);
	           delay = ms_to_next_skill("attack");
		    
	    }else if ((character.hp < 6500 && smart.moving) || character.hp < 4500 ){
              //khi máu yếu và đang di chuyển thông minh không làm gì cả
	    }else if (monstersInRangeList.length >= 5 && character.mp > 530 && leader && leader.hp > 10000) {
                
		    if ( get_nearest_monster({ type: "franky" }) && leader && leader.hp < 16000 ) weaponSet("franky")
		    else weaponSet("boom");
              if (codame)  await use_skill("5shot", monstersInRangeList.slice(0, 5));
                delay = ms_to_next_skill("attack");
		    
            } else if (monsterscharacterRange.length >= 5 && character.mp > 530 && leader && leader.hp > 10000) {
                
		    if ( get_nearest_monster({ type: "franky" }) && leader && leader.hp < 16000 ) weaponSet("franky")
		    else weaponSet("shot5");
              if (codame)  await use_skill("5shot", monsterscharacterRange.slice(0, 5));
                delay = ms_to_next_skill("attack");
		    
            } else if (monsterscharacterRange.length >= 3 && character.mp > 430  && leader && leader.hp > 10000) {
                
		    if ( get_nearest_monster({ type: "franky" }) && leader && leader.hp < 16000 ) weaponSet("franky")
		    else weaponSet("dead");
		if (codame)  await use_skill("3shot", monsterscharacterRange.slice(0, 3));
                delay = ms_to_next_skill("attack");

            } else if (monsterscharacterRange.length > 1) {
                
		    if ( get_nearest_monster({ type: "franky" }) && leader && leader.hp < 16000 ) weaponSet("franky")
		    else weaponSet("singleAOE");
		if (codame)   await attack(monsterscharacterRange[0]);
                delay = ms_to_next_skill("attack");
            } else if (monsterscharacterRange.length > 0 && monsterscharacterRange.length < 3 ) {
		       if ( (leader && leader.hp < 13000) || (healerr && healerr.hp < 6000) )
                           {
		weaponSet("heal");
            const possibleTargets1 = [leader, healerr].filter(t => t); // bỏ null
            let healTarget1 = getLowestHpPercentTarget(possibleTargets1);
            await attack(healTarget1);
            delay = ms_to_next_skill("attack");    
                           }
                       else
                      {
                weaponSet("single");
                 if (codame)   await attack(monsterscharacterRange[0]);
                delay = ms_to_next_skill("attack");
		      }
            }else
	    {

    // Current target and target of leader.
    var currentTarget = get_targeted_monster();
    var leaderTarget = get_target_of(leader)
		    
    if (leaderTarget && leaderTarget.target ){
    // Change the target.
    if (!currentTarget || currentTarget != leaderTarget){ 
        // Current target is empty or other than the leader's.
        change_target(leaderTarget);
        currentTarget = get_targeted_monster();
    }
	if( currentTarget && is_in_range(currentTarget))
	{
		weaponSet("single");
             if (codame)   await attack(currentTarget);
                delay = ms_to_next_skill("attack");
	}  
    }
	    }

	    
//if (targets.length > 0 || leaderTarget )return không được để return trong hàm loop
if (targets.length == 0  && !leaderTarget )
{		
var targets1 = getBestTargets({ max_range: character.range, type: "quá mạnh", subtype: "scorpion", number: 1 }); // Hàm gọi quái vật fram chính // tùy chỉnh number: 3

let check3shot = 0;
let check5shot = 0;

// Kiểm tra điều kiện cho "3shot"
if (targets1.length >= 3 && character.mp > 330 && !is_on_cooldown("3shot")) {
    check3shot = 1;
} else {
    check3shot = 0;
}

// Kiểm tra điều kiện cho "5shot"
if (targets1.length >= 5 && character.mp > 430 && !is_on_cooldown("5shot")) {
    check5shot = 1;
} else {
    check5shot = 0;
}

// Sử dụng kỹ năng "5shot" nếu đủ điều kiện
if (check5shot === 1) {
	weaponSet("shot5");
    await use_skill("5shot", targets1);
	                delay = ms_to_next_skill("attack");

}
// Sử dụng kỹ năng "3shot" nếu không sử dụng "5shot" 
else if (check3shot === 1 ) {
	weaponSet("dead");
    await use_skill("3shot", targets1);
	                delay = ms_to_next_skill("attack");
}
else if (targets1.length < 3 && targets1.length > 0 )
{
	weaponSet("dead");
                await attack(targets1[0]);
                delay = ms_to_next_skill("attack");
}

	    
}
	    
        } else {
            // Dừng tấn công, có thể hồi phục hoặc đứng yên
        }	    

    } catch (e) {
        //console.error(e);
    }
	setTimeout(attackLoop, delay || 250); // Default delay if undefined
}

attackLoop();




function lowest_health_partymember(hp_threshold = 1.0, return_full_list = false) {


	let party = [];

	// Lấy các thành viên trong party nếu có
	if (parent.party_list.length > 0) {
		for (let id in parent.party_list) {
			let member = parent.party_list[id];
			let entity = parent.entities[member];
                        if (member === "MuaBan" || member === "6gunlaZe") continue; // ❌ Bỏ qua nếu là MuaBan hoặc 6gunlaZe
			if (member === character.name) entity = character;

			if (entity && distance(character, entity) < character.range) {
				party.push({ name: member, entity });
			}
		}
	} else {
		// Không có party, thêm chính mình
		party.push({ name: character.name, entity: character });
	}

	// Thêm fieldgen0 
	let fieldgen0 = get_nearest_monster({ type: "fieldgen0" });
	if (fieldgen0 && distance(character, fieldgen0) < character.range ) {
		party.push({ name: "fieldgen0", entity: fieldgen0 });
	}

	// Tính tỷ lệ máu
	for (let member of party) {
		if (member.entity && member.entity.max_hp > 0) {
			member.entity.health_ratio = member.entity.hp / member.entity.max_hp;
		} else {
			member.entity.health_ratio = 1;
		}
	}

	// Lọc nếu cần
	party = party.filter(m => m.entity.health_ratio < hp_threshold);

	// Sắp xếp tăng dần theo % máu
	party.sort((a, b) => a.entity.health_ratio - b.entity.health_ratio);

	// Trả về cả danh sách hay chỉ người thấp nhất
	if (return_full_list) {
		return party.map(p => p.entity); // trả về danh sách entity đã lọc và sort
	} else {
		return party.length > 0 ? party[0].entity : null;
	}
}




//l: "l"  == L lock
let isEquipping = false; // Flag kiểm soát trạng thái

async function equipBatch(data) {
    if (isEquipping) {
        game_log("equipBatch is already running. Skipping.");
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

    dps: [
        { itemName: "dexearring", slot: "earring2", level: 5, l: "l" },
        { itemName: "orbofdex", slot: "orb", level: 5, l: "l" },
        { itemName: "suckerpunch", slot: "ring1", level: 2, l: "l" },
        { itemName: "suckerpunch", slot: "ring2", level: 2, l: "u" },
    ],
    luck: [
        { itemName: "mearring", slot: "earring2", level: 0, l: "u" },
        { itemName: "rabbitsfoot", slot: "orb", level: 2, l: "l" },
        { itemName: "ringhs", slot: "ring2", level: 0, l: "l" },
        { itemName: "ringofluck", slot: "ring1", level: 0, l: "l" }
    ],
     singleAOE: [
        { itemName: "bowofthedead", slot: "mainhand", level: 9, l: "l" },
        { itemName: "supermittens", slot: "gloves", level: 7 },
        { itemName: "alloyquiver", slot: "offhand", level: 8, l: "l" },
    ],
    single: [
        { itemName: "firebow", slot: "mainhand", level: 9, l: "l" },
        { itemName: "supermittens", slot: "gloves", level: 7 },
	{ itemName: "t2quiver", slot: "offhand", level: 8, l: "l" },
    ],
    dead: [
        { itemName: "bowofthedead", slot: "mainhand", level: 9, l: "l" },
        { itemName: "mittens", slot: "gloves", level: 9 },
	{ itemName: "alloyquiver", slot: "offhand", level: 8, l: "l" },
    ],
    boom: [
        { itemName: "bowofthedead", slot: "mainhand", level: 9, l: "l" },
       // { itemName: "crossbow", slot: "mainhand", level: 8, l: "l" },
        //{ itemName: "pouchbow", slot: "mainhand", level: 9, l: "l" },
        { itemName: "alloyquiver", slot: "offhand", level: 8, l: "l" },
    ],
    heal: [
        { itemName: "cupid", slot: "mainhand", level: 7, },
    ],
    shot5: [
        { itemName: "firebow", slot: "mainhand", level: 9, l: "l" },
        { itemName: "mittens", slot: "gloves", level: 9 },
	{ itemName: "alloyquiver", slot: "offhand", level: 8, l: "l" },
    ],
    stealth: [
        { itemName: "stealthcape", slot: "cape", level: 0, l: "l" },
    ],
    franky: [
        { itemName: "crossbow", slot: "mainhand", level: 8, l: "l" },
        { itemName: "mittens", slot: "gloves", level: 9 },
	{ itemName: "alloyquiver", slot: "offhand", level: 8, l: "l" },
    ],
    def_fire: [
        { itemName: "orboffire", slot: "orb", level: 3, l: "l" },
    ],
    orb: [
        { itemName: "orbofdex", slot: "orb", level: 4, l: "l" }
    ],
    stat: [
        { itemName: "coat", slot: "chest", level: 12, l: "s" }
    ],
};


function ChuyendoiITEM() {
    const mobsInRange = Object.values(parent.entities).filter(entity =>
        entity.visible &&
        entity.target === character.name &&
        !entity.dead &&
        distance(character, entity) <= 400
    );

    const FireMobs = mobsInRange.filter(mob =>
        mob.mtype === "xmagefi"
    );

    if (FireMobs.length > 0) {
        equipSet('def_fire');
    } else {
        equipSet('orb');
    }
}

setInterval(ChuyendoiITEM, 700);





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
    let optimal_hp = args.check_max_hp ? 0 : 999999999; // Set initial optimal HP based on whether we're checking for max or min HP

    for (let id in parent.entities) {
        let current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;
        if (args.type && current.mtype != args.type) continue;
        if (args.min_level !== undefined && current.level < args.min_level) continue;
        if (args.max_level !== undefined && current.level > args.max_level) continue;
        if (args.target && !args.target.includes(current.target)) continue;
        if (args.no_target && current.target && current.target != character.name) continue;

        // Status effects (debuffs/buffs) check
        if (args.statusEffects && !args.statusEffects.every(effect => current.s[effect])) continue;

        // Min/max XP check
        if (args.min_xp !== undefined && current.xp < args.min_xp) continue;
        if (args.max_xp !== undefined && current.xp > args.max_xp) continue;

        // Attack power limit
        if (args.max_att !== undefined && current.attack > args.max_att) continue;

        // Path check
        if (args.path_check && !can_move_to(current)) continue;

        // Distance calculation
        let c_dist = args.point_for_distance_check
            ? Math.hypot(args.point_for_distance_check[0] - current.x, args.point_for_distance_check[1] - current.y)
            : parent.distance(character, current);

        if (args.max_distance !== undefined && c_dist > args.max_distance) continue;

        // Generalized HP check (min or max)
        if (args.check_min_hp || args.check_max_hp) {
            let c_hp = current.hp;
            if ((args.check_min_hp && c_hp < optimal_hp) || (args.check_max_hp && c_hp > optimal_hp)) {
                optimal_hp = c_hp;
                target = current;
            }
            continue;
        }

        // If no specific HP check, choose the closest monster
        if (c_dist < min_d) {
            min_d = c_dist;
            target = current;
        }
    }
    return target;
}





function getSupershotTarget() {
	if (smart.moving) return null;
    const ynhi = get_player("Ynhi");
    const haiz = get_player("haiz");
        if (!ynhi || (ynhi && distance(character, ynhi) > 150 ) ) return null;
	
    const validNames = ["wolf"]; // ✅ Chỉ bắn mấy quái đặc biệt này

// Lọc các quái đủ điều kiện cơ bản
let candidates = Object.values(parent.entities).filter(e =>
    e.type === "monster" &&
    !e.dead &&
    validNames.includes(e.mtype) &&
    e.hp > 10000 &&
    is_in_range(e, "supershot") &&
    distance(character, e) <= 450 &&
    distance(character, e) > (character.range + 20) // ✅ Nằm ngoài tầm đánh một khoảng
);


    // ✅ Lọc theo vị trí của Ynhi và Haiz
    candidates = candidates.filter(mob => {
        // Nếu có Ynhi, mà quái nằm TRONG tầm đánh của Ynhi → bỏ qua
        if (ynhi && distance(ynhi, mob) <= ynhi.range) return false;

        // Nếu có Haiz, mà quái ở gần quá (< 200) → bỏ qua
        if (haiz && distance(haiz, mob) <= 200) return false;

        return true; // Chỉ giữ nếu không bị loại bởi 2 điều kiện trên
    });

    // ✅ Nếu còn quái hợp lệ, chọn quái xa nhất (ưu tiên kéo về)
    if (candidates.length > 0) {
        candidates.sort((a, b) => distance(character, b) - distance(character, a));
        return candidates[0];
    }

    return null; // ❌ Không có mục tiêu phù hợp
}


async function skillLoop() {
    try {
        const target = getSupershotTarget();

        if (
            target &&
            character.mp > 550 &&
            !is_on_cooldown("supershot")
        ) {
            await use_skill("supershot", target);
            game_log("💥 Supershot vào " + target.mtype + " HP: " + target.hp);
        }
    } catch (e) {
        //console.log("Skill loop error:", e);
    }

    setTimeout(skillLoop, 2000); // lặp 2s
}

skillLoop();









function handleSnowball() {
	if(character.map != "crypt" && character.map != "tomb" && character.map != "winter_instance")return
const avoidTypes1 = ["a0","a2","a3","a6", "a7","a8","a9","vbat","stompy","skeletor","crabxx","gpurplepro"];

	    const leader = get_player("haiz");
if ( (leader && leader.hp > 13000)  || !leader) return
	
  if (can_use("snowball")) {
    const currentTime = new Date().getTime(); // Lấy thời gian hiện tại (ms)
	  
    for (const id in parent.entities) {
      const entity = parent.entities[id];
      
      // Kiểm tra loại quái vật
      if (entity.type !== "monster") continue;
	    
      // Kiểm tra xem mtype của quái vật có thuộc danh sách cần tránh không
      if (!avoidTypes1.includes(entity.mtype)) continue;
	    
      // Kiểm tra xem quái vật có chết hoặc không thể thấy không
      if (entity.dead || !entity.visible) continue;
      if (!entity.target) continue;
      // Kiểm tra mtype của quái vật có phải là "goo" không
      if (entity.mtype == "vbat") continue;
      if (entity.mtype == "a3") continue;
      if (entity.mtype == "a7") continue;
      // Kiểm tra quái vật có bị đóng băng không
      if (entity.s["frozen"]) continue;
      
      // Kiểm tra khoảng cách với quái vật có lớn hơn 200 không
      if (distance(character, entity) > 200) continue;
      
      // Kiểm tra xem quái vật đã bị bắn tuyết
      if (entity.snowballed) {
        // Kiểm tra thời gian debuff đã hết 5 giây chưa
        if (currentTime - entity.snowballedTime > 3700) {
          // Debuff đã hết, cho phép bắn lại
          entity.snowballed = false; // Xóa cờ snowballed
        } else {
          // Nếu debuff chưa hết, bỏ qua
          continue;
        }
      }
      
      // Sử dụng kỹ năng snowball vào quái vật
      use_skill("snowball", entity);
      
      // Đánh dấu quái vật là đã bị bắn tuyết và lưu thời gian bắn tuyết
      entity.snowballed = true;
      entity.snowballedTime = currentTime; // Lưu thời gian bắn tuyết (ms)
      
      // Dừng vòng lặp sau khi sử dụng kỹ năng vào một quái vật
      break;
    }
  }
}

// Gọi hàm `handleSnowball` mỗi 100ms
setInterval(handleSnowball, 100);



function check_viem_xung_quanh() {  ///chỉ áp dụng khi có zapper0 xung quanh để kiểm soát hp
    // Kiểm tra mục tiêu đầu tiên
    var zapper0 = getBestTargets({ max_range: 300, type: "zapper0", number: 1 }); 

    // Nếu không có mục tiêu nào => return 0 luôn
    if (zapper0.length === 0) return 0;

    // Lấy thông tin 3 người chơi
    const player1 = get_player("haiz");
    const player2 = get_player("Ynhi");
    const player3 = get_player("6gunlaZe");

    // Kiểm tra nếu có bất kỳ ai máu thấp hơn ngưỡng
    if (
        (player1 && player1.hp < 12000) ||
        (player2 && player2.hp < 9000) ||
        (player3 && player3.hp < 7000) || (player2 && player2.mp < 4000)
    ) {
        return 1;
    }

    return 0;
}
// if (check_viem_xung_quanh() == 1) targetedForMoreThanOneSecond = true;

function check_quai_A4_stop_attach() {
    var quai = get_nearest_monster({type: "a4"});
    if (quai && is_in_range(quai) && (check_viem_xung_quanh() == 1 || is_on_cooldown("scare") )) {
        return 1;
    } else {
        return 0;
    }
}
// if (check_viem_xung_quanh() == 1) targetedForMoreThanOneSecond = true;


function scare() {
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);
    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;
	    const leader = get_player("haiz");
	    const a1 = get_nearest_monster({type: "a1"});
// if (check_viem_xung_quanh() == 1) targetedForMoreThanOneSecond = true;  ///chỉ mở lại khi muốn kill a4
	
    for (id in parent.entities) {
        var current = parent.entities[id];
        if ((  ( current.mtype == 'gpurplepro' || current.mtype == 'zapper0' || current.mtype == 'a4' || (current.mtype == 'nerfedbat' && leader && a1 && distance(leader, a1) < 175 ) )  || character.hp < 6000 || (smart.moving && character.map != "crypt") ) && current.target == character.name) {
            mobnum++;
            targetedForMoreThanOneSecond = true;
        }
else if (current.target == character.name && 
         (current.mtype != 'nerfedbat' || (current.mtype == 'nerfedbat' && a1 && distance(character, a1) < 225)))
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
  else if (character.hp/character.max_hp< 0.8 && character.mp > 100 ) use_skill("use_hp");
  else if (character.mp/character.max_mp < 0.75) use_skill("use_mp");

	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}

setInterval(function() {
use_hp_or_mp1()
}, 200);







function get_nearest_monster1(args) ///săn boss franky, ice
{
 let checkkill = 0
	var heal = get_player("Ynhi"); 
	var min_d=character.range + 225,target=null;
  if(!heal) return target;
	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;
	if(args && args.type=="monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
	if(args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(current.type!="monster" || !current.visible || current.dead) continue;
		if(args.type && current.mtype!=args.type) continue;
		if(args.min_xp && current.xp<args.min_xp) continue;
		if(args.max_att && current.attack>args.max_att) continue;
		if(args.target && current.target!=args.target) continue;
		if(args.no_target && current.target && current.target!=character.name) continue;
		if(args.NO_target && current.target) continue;

	    checkkill = get_nearest_playerV_noMyparty(current)
	    if (checkkill < 2)continue


		
		if(args.path_check && !can_move_to(current)) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) min_d=c_dist,target=current; //lua chon quai vat gan nhat
	}
	return target;
}















function get_nearest_playerV_noMyparty(currentTarget)
{
	// Just as an example
	var min_d=2000,target=0;

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(!current.player) continue;
    if(current.id == "haiz1" || current.id == "Ynhi" || current.id == "6gunlaZe" || current.id == "haiz" || current.id == "nhiY"   ) continue;
		if(current.target == currentTarget.id) target +=1;
	}
	game_log("so luong nguoi choi kill boss la: " + target)
	return target;
}




async function moveLoop() {
    let delay = 1000;
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



async function walkInCircle() {
    if (!smart.moving) {
        const center = locations[home][0];
        const radius = 45;

        // Calculate time elapsed since the last update
        const currentTime = performance.now();
        const deltaTime = currentTime - lastUpdateTime;
        lastUpdateTime = currentTime;

        // Calculate the new angle based on elapsed time and speed
        const deltaAngle = speed * (deltaTime / 1000); // Convert milliseconds to seconds
        angle = (angle + deltaAngle) % (2 * Math.PI);

        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const targetX = center.x + offsetX;
        const targetY = center.y + offsetY;

        if (!character.moving && lastUpdateTime > 100) {
            await xmove(targetX, targetY);
        }

        // drawCirclesAndLines(center, radius);
    }
}


let followHaizMode = true; // ✅ Công tắc follow haiz
async function safeawwaitwalkInCircle() {
    let tank = get_player("Ynhi");
    let center;

    if (!tank || tank.rip || ( tank && !tank.rip && distance(character, tank) > 170 ) ) {
        if (!smart.moving) {
            smart_move(safeDestination);
        }
        return;
    }

    if (smart.moving) return;

    // ✅ Nếu chưa đúng map hoặc quá xa home → smart_move về
    if (character.map !== mobMap || distance(character, { x: locations[home][0].x, y: locations[home][0].y }) > 50) {
        smart_move(destination);
        return;
    }

    // ✅ Chọn trung tâm quay
    if (followHaizMode) {
        let haiz = get_player("haiz");
        if (haiz) {
            center = { x: haiz.x, y: haiz.y };
        } else {
            center = locations[home][0]; // fallback nếu không thấy haiz
        }
    } else {
        center = locations[home][0];
    }

    const radius = 45;
    const currentTime = performance.now();
    const deltaTime = currentTime - lastUpdateTime;
    lastUpdateTime = currentTime;

    // ✅ Tính góc mới
    const deltaAngle = speed * (deltaTime / 1000);
    angle = (angle + deltaAngle) % (2 * Math.PI);

    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    const targetX = center.x + offsetX;
    const targetY = center.y + offsetY;

    if (!character.moving && deltaTime > 100) {
        await xmove(targetX, targetY);
    }
}





function getPrioritizedTargets(targetNames, homeX, homeY, rangeThreshold) {
    // === 1. Xác định danh sách quái vật "ưu tiên đặc biệt" ===
    const priorityMtypes = ["franky", "a1", "fvampire", "stompy", "crabxx","a4"];
    const isPriorityMtype = (monster) => priorityMtypes.includes(monster.mtype);

    // === 2. Lọc tất cả các quái vật đang tấn công người trong party ===
    const targets = Object.values(parent.entities)
        .filter(monster =>
            monster.type === "monster" &&         // Chỉ lấy quái (loại entity là "monster")
            monster.target &&                     // Chỉ lấy quái đang có mục tiêu
            targetNames.includes(monster.target)  // Mục tiêu đó phải là người trong party
        )

        // === 3. Sắp xếp quái theo nhiều lớp ưu tiên ===
        .sort((a, b) => {
            // --- Ưu tiên 1: Quái đặc biệt (boss, rare mob, v.v.) ---
            const isPriorityA = isPriorityMtype(a) ? -1 : 0;
            const isPriorityB = isPriorityMtype(b) ? -1 : 0;
            if (isPriorityA !== isPriorityB) return isPriorityA - isPriorityB;

            // --- Ưu tiên 2: Quái đang tấn công người quan trọng hơn trong party ---
            const priorityA = targetNames.indexOf(a.target);
            const priorityB = targetNames.indexOf(b.target);
            if (priorityA !== priorityB) return priorityA - priorityB;

            // --- Ưu tiên 3: Quái gần vị trí home hơn ---
            const distA = Math.hypot(a.x - homeX, a.y - homeY);
            const distB = Math.hypot(b.x - homeX, b.y - homeY);
            if (distA !== distB) return distA - distB;

            // --- Ưu tiên 4: Quái yếu hơn (HP thấp hơn) ---
            return a.hp - b.hp;
        });

    // === 4. Phân loại quái vật theo phạm vi tấn công ===
    const inRange = [];         // Trong phạm vi ưu tiên (rangeThreshold)
    const characterRange = [];  // Trong phạm vi kỹ năng của nhân vật
    const outOfRange = [];      // Ngoài cả 2 phạm vi

    for (const monster of targets) {
        const distance = Math.hypot(monster.x - homeX, monster.y - homeY);

        if (distance <= rangeThreshold) {
            inRange.push(monster);            // Quái trong phạm vi ưu tiên
            characterRange.push(monster);     // Và cũng nằm trong tầm đánh
        } else if (distance <= character.range) {
            characterRange.push(monster);     // Trong tầm đánh, nhưng ngoài phạm vi ưu tiên
        } else {
            outOfRange.push(monster);         // Không đánh được
        }
    }

    // === 5. Trả về danh sách đầy đủ và ba nhóm riêng biệt ===
    return {
        targets: [...inRange, ...outOfRange, ...characterRange], // Danh sách tổng hợp (ưu tiên inRange đầu tiên)
        inRange,
        outOfRange,
        characterRange
    };
}







function checkPVPandARENA() {

if (character.map != "arena")return
const friend = ["MuaBan", "haiz" , "haiz1" , "Ynhi", "nhiY", "6gunlaZe"];
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
parent.api_call("disconnect_character", {name: "6gunlaZe"});
stop_character("6gunlaZe")	
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
    // Thêm boss mới ở đây
};


function Handelbossvip() {
    if (smart.moving || bossvip === 0) return;

    const info = bossVipInfo[bossvip];
    if (!info) return;

    const f1 = get_player("Ynhi");
    const f2 = get_player("haiz");

    const target = get_target();
    const check = !!target && !target.rip;

    // Nếu không có mục tiêu hoặc ngoài tầm bắn, và đồng đội ở gần → tìm boss
    if ((!check || (check && !is_in_range(target))) && f1 && f2 && distance(character, f1) < 150 && distance(character, f2) < 150) {
        const currentTarget1 = get_nearest_monster_solobosskill?.() ?? get_nearest_monster({ type: info.type });

        if (currentTarget1) {
            if (
                is_in_range(currentTarget1, "supershot") &&
                character.mp > 500 &&
                currentTarget1.hp > 10000 &&
                !is_on_cooldown("supershot")
            ) {
                use_skill("supershot", currentTarget1);
                game_log("💥 Supershot!!");
            }

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
		var currentTarget1 = get_nearest_monster_solobosskill()  ////đối tượng tổng không có a5
		var currentTargeta5 = get_nearest_monster_solobosskilla5()  ///đối tượng a5
                var currentTargeta4 = get_nearest_monster_solobosskilla4()  ///đối tượng a4
                var checkzapper = getBestTargets({ max_range: 320, type: "zapper0", number: 1 }); // Hàm check hút quái
                var checka4 = getBestTargets({ max_range: 300, type: "a4", number: 1 }); // Hàm check hút quái

		if(currentTarget1 && checka4.length == 0) {

                 if (is_in_range(currentTarget1, "supershot") && character.mp > 500 && currentTarget1.hp >10000  && !is_on_cooldown("supershot") && Date.now() > delayboss + 10000 ) {
                delayboss = Date.now()
                use_skill("supershot", currentTarget1);
                game_log("Supershot!!");
                                    }

		}
		else if(currentTargeta5) { ///chưa đủ mạnh để giết khi nó đứng 1 mình

                 if (is_in_range(currentTargeta5, "supershot") && character.mp > 500 && currentTargeta5.hp >10000  && !is_on_cooldown("supershot") && Date.now() > delayboss + 10000 ) {
                delayboss = Date.now()
                use_skill("supershot", currentTargeta5);
                game_log("Supershot!!");
                                    }

		}
		else if(currentTargeta4 && checkzapper.length == 0) { ///chưa đủ mạnh để giết

                 if (is_in_range(currentTargeta4, "supershot") && character.mp > 500 && currentTargeta4.hp >10000  && !is_on_cooldown("supershot") && Date.now() > delayboss + 10000 ) {
                delayboss = Date.now()
                use_skill("supershot", currentTargeta4);
                game_log("Supershot!!");
                                    }

		}
		else
		{
		currentTarget1 = getBestTargets({ max_range: character.range, type: "vbat", subtype: "frog11", number: 1 });
		if(currentTarget1)use_skill("piercingshot", currentTarget1);	
		}


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




// dùng cho các even quái yếu không nguy hiểm
function handlebossPro(eventType) { 

if (eventType === undefined || eventType === null) {
	folowhaizevents = false;
  return; // Trả về nếu eventType không xác định
}

// Tiếp tục xử lý nếu eventType có giá trị hợp lệ

if (eventType == "goobrawl" || eventType ==  "crabxx"|| eventType == "franky" )
{
    if (parent?.S?.[eventType]) {
	    
       if (eventType == "goobrawl"){
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







setTimeout(function() {
    if (get_nearest_monster({type: "phoenix"})  && distance(character, {x: 500, y: 1800}) < 350  && character.map == "main" ) {
 send_cm("MuaBan", "phoenix1");
    }
}, 10000);  // 10000 mili giây = 10 giây




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
    };

    // Các lệnh gán biến trạng thái
    const flagCommands = {
        crypt: () => { cryts = 1; },
        tomb: () => { tomb = 1; },
        mage: () => { tomb = 1; },
        landau1: () => { landaucyp = 1; },
        landau0: () => { landaucyp = 0; },
        bossvip1: () => { bossvip = 1; },
        bossvip2: () => { bossvip = 2; },
        bossvip3: () => { bossvip = 3; },
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
    // Mặc định: lưu vào receivedData
    else {
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


    let itemsToExclude = ["pumpkinspice","mittens","supermittens","snowball","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","crossbow","jacko", "pouchbow","orbg","cupid"];
	
	
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
						game_log("so luong  la "+soluongmp);

            }
            if (item.name == "hpot1" ) {
                // This is an item we want to use!
                    soluonghp += item.q//tim ra vi tri mon do
						game_log("so luong  la "+soluonghp);

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
    if (chestIds.length > 20 || character.map == "crypt" || character.map == "tomb" || character.map == "winter_instance") {
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


function get_nearest_monster_solobosskilla4(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=450 ,target=null;
        var bossarmy=["a444444"]; 
	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;
	if(args && args.type=="monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
	if(args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if ( (bossarmy.indexOf(current.mtype) == -1)   ) continue
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



function get_nearest_monster_solobosskilla5(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=450 ,target=null;
        var bossarmy=["a555555555555"]; 
	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;
	if(args && args.type=="monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
	if(args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if ( (bossarmy.indexOf(current.mtype) == -1)   ) continue
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


///////
function getBestTargets(options = {}) {
    const entities = []
	     let number = 0

     var army=[options.subtype, options.type, "wabbit", "bbb", "cccc"];  
  

    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
		
if (options.subtype && options.type && (army.indexOf(entity.mtype) == -1)   ) continue
if (!options.subtype && options.type &&entity.mtype != options.type   ) continue
			

if (options.maxHP && entity.max_hp > options.maxHP) continue
if (options.HP && entity.hp > options.HP) continue
	    if (options.HPmin && entity.hp < options.HPmin) continue
 		if (options.target && entity.target != options.target) continue
		if (options.havetarget && !entity.target ) continue
		if (options.Nohavetarget && entity.target ) continue
		if (options.fire && entity.s.burned  ) continue
	        if (options.cus && !entity.s["cursed"]  ) continue
	    	if (options.NoMark && entity.s.marked ) continue
		if (options.targetNO && entity.target == options.targetNO) continue     
 		if (options.target1 && options.target2 && options.target3 && entity.target != options.target1 && entity.target != options.target2 && entity.target != options.target3)  continue
	//  if(army.indexOf(entity.mtype) == -1) continue
		///check list khong co se tra ve -1
      //  !target2.s.marked 
		
		
		if ( options.number &&   (number+1) > options.number ) return entities;
		/// lon hon so luong thi bo qua
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}





// Hàm gửi item đến loot mule
function sendItems(name) {
    // Lấy thông tin loot mule có tên "haiz"
    let lootMule = get_player(name);

    // Kiểm tra xem loot mule có tồn tại và trong khoảng cách 250 đơn vị hay không
    if (!lootMule || distance(character, lootMule) > 250) {
        // Nếu loot mule không tồn tại hoặc quá xa, dừng lại
        //console.log("Loot mule out of range for item transfer.");
        return;
    }

    // Duyệt qua tất cả các item của nhân vật
    character.items.forEach((item, index) => {
        // Kiểm tra nếu item là "cryptkey" và không bị khóa (l và s đều không có giá trị)
        if (item && item.name == "cryptkey" && !item.l && !item.s) {
            // Gửi item cho loot mule với số lượng item (hoặc 1 nếu không có số lượng)
            send_item(lootMule, index, item.q ?? 1);
        }
    });
}

// Gọi hàm sendItems mỗi 30 giây (30000 mili giây)
setInterval(() => sendItems("haiz"), 30000);








////////////////////////////////////////////////////
/////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Extra range to add to a monster's attack range to give more wiggle room
const rangeBuffer = 90;  // Thêm vào tầm đánh của quái để tránh xa hơn một chút

// How far away we want to consider monsters
const calcRadius = 300;  // Bán kính xét quái để tránh

// Types of monsters we want to avoid
const avoidTypes = ["a0","a2","a3","a6", "a7","a8","a9","vbat","stompy","skeletor","crabxx","gpurplepro","gbluepro","gredpro","ggreenpro"];

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
        } else if (validTarget && distance(character, host) > (character.range - 30)) {
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

function kite(taget, kite_range) {
	const radius = kite_range;
	if (smart.moving || !taget) return;

	const angle = Math.PI / 3.5 * checkwwall;
	const reverseAngle = Math.PI / 3.5 * -checkwwall;

	const angleFromCenterToCurrent = Math.atan2(character.y - taget.real_y, character.x - taget.real_x);

	const endGoal = {
		x: taget.real_x + radius * Math.cos(angleFromCenterToCurrent + angle),
		y: taget.real_y + radius * Math.sin(angleFromCenterToCurrent + angle)
	};

	const endGoal1 = {
		x: taget.real_x + radius * Math.cos(angleFromCenterToCurrent + reverseAngle),
		y: taget.real_y + radius * Math.sin(angleFromCenterToCurrent + reverseAngle)
	};

	if (can_move_to(endGoal.x, endGoal.y)) {
		xmove(endGoal.x, endGoal.y);
	} else if (can_move_to(endGoal1.x, endGoal1.y)) {
		xmove(endGoal1.x, endGoal1.y);
		checkwwall = -checkwwall;
	} else {
		xmove(taget.real_x, taget.real_y); // fallback, dù đây không phải kite
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
