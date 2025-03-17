let frankymode = 0
let lastUpdateTime = performance.now();
let lastSwapTime = 0;
const swapCooldown = 500;
let receivedData
let evenmuaban
const locations = {
	armadillo: [{ x: 617, y: 1784 }],
    bat: [{ x: 1200, y: -782 }],
    bigbird: [{ x: 1343, y: 248 }],
    bscorpion: [{ x: -408, y: -1241 }],
    boar: [{ x: 19, y: -1109 }],
    cgoo: [{ x: -221, y: -274 }],
    crab: [{ x: -11840, y: -37 }],
    ent: [{ x: -420, y: -1960 }],
    fireroamer: [{ x: 222, y: -827 }],
    ghost: [{ x: -405, y: -1642 }],
    gscorpion: [{ x: 390, y: -1422 }],
    iceroamer: [{ x: 823, y: -45 }],
    mechagnome: [{ x: 0, y: 0 }],
    mole: [{ x: 14, y: -1072 }],
    mummy: [{ x: 256, y: -1417 }],
    oneeye: [{ x: -270, y: 160 }],
    pinkgoblin: [{ x: 366, y: 377 }],
    poisio: [{ x: -121, y: 1360 }],
    prat: [{ x: -280, y: 552 }], //[{ x: 6, y: 430 }]
    pppompom: [{ x: 292, y: -189 }],
    plantoid: [{ x: -780, y: -387 }], // [{ x: -840, y: -340 }]
    rat: [{ x: 6, y: 430 }],
    scorpion: [{ x: -495, y: 685 }],
    stoneworm: [{ x: 830, y: 7 }],
    spider: [{ x: 1247, y: -91 }],
    squig: [{ x: -1175, y: 422 }],
    wolf: [{ x: 433, y: -2745 }],
    wolfie: [{ x: 113, y: -2014 }],
    xscorpion: [{ x: -495, y: 685 }]
};

const home = 'armadillo';
const mobMap = 'main';
const destination = {
    map: mobMap,
    x: locations[home][0].x,
    y: locations[home][0].y
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




async function eventer() {
    const delay = 500;
    try {
        if (folowhaizevents) {
             handlebossPro(evenmuaban)
	} else if (framboss > 0) {
		
        } else if (!get_nearest_monster({ type: home }) || ( character.map == mobMap &&  distance(character, {x: locations[home][0].x, y: locations[home][0].y}) > 100 ) ) {
           handleHome();
        } else {
            walkInCircle();
        }
    } catch (e) {
        console.error(e);
    }

    setTimeout(eventer, delay);
}
eventer();



function handleHome() {
	var f1 = get_player("haiz"); 
    if ( f1 && get_nearest_monster({type: "franky"})) {
	     folowhaizevents = true;
	    return
    }
    if (!smart.moving) {
        smart_move(destination);
        game_log(`Moving to ${home}`);
    }
}





const targetNames = ["Ynhi","haiz", "nhiY"];

// không được để return trong hàm loop
async function attackLoop() {
	//if (character.moving)return
    let delay = null; // Default delay
    const X = locations[home][0].x; // X coordinate of home location
    const Y = locations[home][0].y; // Y coordinate of home location
    const now = performance.now();
//game_log("m")
    const rangeThreshold = 50; // phạm vi tấn công boom
    const leader = get_player("haiz");
    	
    try {

var tagetskill = getBestTargets({ max_range: character.range, havetarget: 1, cus:1 , NoMark: 1 , number : 1 , HPmin: 20000 }) 
	    if (tagetskill.length == 1)use_skill("huntersmark", tagetskill);
	    
const { targets, inRange: monstersInRangeList , characterRange:  monsterscharacterRange } = getPrioritizedTargets(targetNames, X, Y, rangeThreshold);
//game_log("monstersInRangeList.length" +monstersInRangeList.length)		
//game_log("characterRange" +monsterscharacterRange.length)		

            // ưu tiên kill những quái vật đang nhắm vào đồng đội mình hoặc đồng đội mình đang nhắm vào.
            if (monstersInRangeList.length >= 5 && character.mp > 430 ) {
                weaponSet("boom");
                await use_skill("5shot", monstersInRangeList.slice(0, 5));
                delay = ms_to_next_skill("attack");
		    
            } else if (monsterscharacterRange.length >= 5 && character.mp > 430 ) {
                weaponSet("dead");
                await use_skill("5shot", monsterscharacterRange.slice(0, 5));
                delay = ms_to_next_skill("attack");
		    
            } else if (monsterscharacterRange.length >= 3 && character.mp > 330 ) {
                weaponSet("dead");
                await use_skill("3shot", monsterscharacterRange.slice(0, 3));
                delay = ms_to_next_skill("attack");
		    
            } else if (targets.length > 0 && targets.length < 3 ) {
                weaponSet("single");
                await attack(targets[0]);
                delay = ms_to_next_skill("attack");
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
                await attack(currentTarget);
                delay = ms_to_next_skill("attack");
	}  
    }
	    }

	    
//if (targets.length > 0 || leaderTarget )return không được để return trong hàm loop
if (targets.length == 0  && !leaderTarget )
{		
var targets1 = getBestTargets({ max_range: character.range, type: home, subtype: "frog11", number: 3 }); // Hàm gọi quái vật

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
	weaponSet("dead");
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
	    
	    

    } catch (e) {
        //console.error(e);
    }
    setTimeout(attackLoop, delay);
}

attackLoop();







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
    single: [
        { itemName: "firebow", slot: "mainhand", level: 9, l: "l" },
        //{ itemName: "coat", slot: "chest", level: 12, l: "s" }
    ],
    dead: [
        { itemName: "crossbow", slot: "mainhand", level: 8, l: "l" },
        //{ itemName: "tshirt9", slot: "chest", level: 7, l: "l" }
    ],
    boom: [
        { itemName: "pouchbow", slot: "mainhand", level: 9, l: "l" },
        //{ itemName: "tshirt9", slot: "chest", level: 7, l: "l" }
    ],
    heal: [
        { itemName: "cupid", slot: "mainhand", level: 8, l: "l" },
    ],
    xp: [
        { itemName: "talkingskull", slot: "orb", level: 4, l: "l" },
        //{ itemName: "tshirt3", slot: "chest", level: 7, l: "l" },
    ],
    stealth: [
        { itemName: "stealthcape", slot: "cape", level: 0, l: "l" },
    ],
    cape: [
        { itemName: "gcape", slot: "cape", level: 9, l: "l" },
    ],
    orb: [
        { itemName: "orbofdex", slot: "orb", level: 5, l: "l" },
        //{ itemName: "tshirt9", slot: "chest", level: 7, l: "l" },
    ],
    mana: [
        { itemName: "tshirt9", slot: "chest", level: 7, l: "l" }
    ],
    stat: [
        { itemName: "coat", slot: "chest", level: 12, l: "s" }
    ],
};







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
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) - character.ping;
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





function scare() {
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);
    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;

    for (id in parent.entities) {
        var current = parent.entities[id];
        if (character.hp <5000 && current.target == character.name) {
            mobnum++;
            targetedForMoreThanOneSecond = true;
        }
    }

    if (mobnum > 0 && targetedForMoreThanOneSecond) {
        if (!is_on_cooldown("scare")) {
            setTimeout(() => {
                if (!is_on_cooldown("scare")) {
                    equip(slot);
                    use("scare");
                    equip(slot);
                }
            }, 1000); // 1000 milliseconds = 1 second
        }
    }
}
setInterval(scare, 1500);  // Gọi lại scare() sau mỗi 1.5 giây



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




function getPrioritizedTargets(targetNames, homeX, homeY, rangeThreshold) {
    // Step 1: Filter and sort all valid monster targets
    const targets = Object.values(parent.entities)
        .filter(monster =>
            monster.type === "monster" && // Ensure the entity is a monster
            monster.target &&             // Có một mục tiêu đang bị tấn công
            targetNames.includes(monster.target) // Mục tiêu của quái vật phải nằm trong danh sách ưu tiên targetNames (các nhân vật của party mình)
        )
        .sort((a, b) => {
            // Step 2: Sort monsters by priority, distance, and HP Quái vật nào gần hơn sẽ được ưu tiên hơn. mục tiêu có lượng HP cao hơn sẽ được ưu tiên hơn
            const priorityA = targetNames.indexOf(a.target);
            const priorityB = targetNames.indexOf(b.target);

            if (priorityA !== priorityB) return priorityA - priorityB;

            const distA = Math.hypot(a.x - homeX, a.y - homeY);
            const distB = Math.hypot(b.x - homeX, b.y - homeY);

            if (distA !== distB) return distA - distB;

            return b.hp - a.hp; // Highest HP last
        });

    // Step 3: Separate monsters into in-range and out-of-range categories
    const inRange = [];
    const outOfRange = [];
    const characterRange = [];
    
 for (const monster of targets) {
    const distance = Math.hypot(monster.x - homeX, monster.y - homeY);

    // Kiểm tra nếu quái vật trong phạm vi rangeThreshold
    if (distance <= rangeThreshold) { 
        inRange.push(monster);  // Thêm quái vật vào inRange
        characterRange.push(monster);  // Thêm quái vật vào characterRange
    } else if (distance <= character.range) {
        // Nếu quái vật trong phạm vi của nhân vật nhưng ngoài phạm vi rangeThreshold
        characterRange.push(monster);  // Thêm quái vật vào characterRange
    } else {
        // Nếu quái vật ngoài phạm vi của cả rangeThreshold và character.range
        outOfRange.push(monster);  // Thêm quái vật vào outOfRange
    }
}


    // Step 4: Return the combined targets and categorized lists
    return {
        targets: [...inRange, ...outOfRange, ...characterRange],  // Combined list with inRange prioritized
        inRange,
        outOfRange,
	characterRange
    };
}







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

	    


let leader = get_player("haiz");
if (leader && distance(character, leader) < 50) return
    // Nếu nhân vật đang di chuyển, không làm gì thêm
    if (smart.moving) return;

	
    // Đảm bảo rằng nhận được thông tin hợp lệ
    if (receivedData && typeof receivedData === 'object' && receivedData.message === "location") {
        const targetMap = receivedData.map;  // Lấy tên bản đồ
        const targetX = receivedData.x;      // Lấy tọa độ X
        const targetY = receivedData.y;      // Lấy tọa độ Y

        // Kiểm tra nếu nhân vật đang ở đúng bản đồ
        if (character.map !== targetMap && character.map != "crypt") {
            // Nếu không ở bản đồ mục tiêu, di chuyển đến bản đồ đó
            smart_move({
                map: targetMap,
                x: targetX,
                y: targetY
            });
        } else {
            // Nếu đã ở đúng bản đồ, kiểm tra xem đã đến tọa độ mục tiêu chưa
            if (character.x !== targetX || character.y !== targetY) {
                // Nếu chưa đến, di chuyển đến tọa độ mới
                xmove(targetX, targetY);
            }
        }
    }	    


}
	else 
    {
	    folowhaizevents = false;
    }
}
	else{


if (parent?.S?.[eventType]?.live) {


let leader = get_player("haiz");
if (leader && distance(character, leader) < 50) return
    // Nếu nhân vật đang di chuyển, không làm gì thêm
    if (smart.moving) return;

	
    // Đảm bảo rằng nhận được thông tin hợp lệ
    if (receivedData && typeof receivedData === 'object' && receivedData.message === "location") {
        const targetMap = receivedData.map;  // Lấy tên bản đồ
        const targetX = receivedData.x;      // Lấy tọa độ X
        const targetY = receivedData.y;      // Lấy tọa độ Y

        // Kiểm tra nếu nhân vật đang ở đúng bản đồ
        if (character.map !== targetMap && character.map != "crypt") {
            // Nếu không ở bản đồ mục tiêu, di chuyển đến bản đồ đó
            smart_move({
                map: targetMap,
                x: targetX,
                y: targetY
            });
        } else {
            // Nếu đã ở đúng bản đồ, kiểm tra xem đã đến tọa độ mục tiêu chưa
            if (character.x !== targetX || character.y !== targetY) {
                // Nếu chưa đến, di chuyển đến tọa độ mới
                xmove(targetX, targetY);
            }
        }
    }	    


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

}, 420000);


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

	 if(name == "haiz"){
     receivedData = data
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


    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","crossbow","jacko", "pouchbow","orbg"];
	
	
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
	

		if(character.esize < 7)
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

	

	
}, 40000); 




////////////////////////////////////////////////////////
setInterval(function() {
looting()	
}, 4000);
function looting() {
	    let chests = get_chests();
    let chestIds = Object.keys(chests);
    if (chestIds.length > 20) {
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



///////
function getBestTargets(options = {}) {
    const entities = []
	     let number = 0

     var army=[options.subtype, options.type, "aaa", "bbb", "cccc"];  
  

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
////////////////////////////////////////////////////
/////////////////////////////////////////
