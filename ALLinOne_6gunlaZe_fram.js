let frankymode = 0
let lastUpdateTime = performance.now();
let lastSwapTime = 0;
const swapCooldown = 500;
let receivedData
let evenmuaban
var idmap
let cryts = 0  ///mode săn boss ở hầm ngục
let crab = 0  ///mode săn crabxx

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
    mole: [{ x: 4, y: -282 }],  //-282
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
    spider: [{ x: 1299, y: -154 }],
    squig: [{ x: -1175, y: 422 }],
    wolf: [{ x: 433, y: -2745 }],
    wolfie: [{ x: 113, y: -2014 }],
    xscorpion: [{ x: -495, y: 685 }]
};

const home = 'spider';
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
let bossvip = 0


async function eventer() {
    const delay = 500;

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
        } else if (  (!get_nearest_monster({ type: home }) || ( character.map == mobMap &&  distance(character, {x: locations[home][0].x, y: locations[home][0].y}) > 100 ) )) {
           handleHome();
        } else {
          ///  walkInCircle(); // khi fram riêng
		safeawwaitwalkInCircle()  //khi fram chung
        }
    } catch (e) {
        console.error(e);
    }

    setTimeout(eventer, delay);
}
setTimeout(eventer, 6000);

async function handleHome() {
	var f1 = get_player("haiz"); 
    if ( f1 && get_nearest_monster({type: "franky"})) {
	     folowhaizevents = true;
	    return
    }

    if(  parent?.S?.wabbit.live && !character?.s?.easterluck  ) {
        let wabbit = parent.S.wabbit;
        if(wabbit && wabbit.live && !smart.moving) {
            smart_move({ x: wabbit.x, y: wabbit.y, map: wabbit.map }).then(() => {
                let target_monster = get_nearest_monster({ type : "wabbit" });
                if (target_monster) {
                    change_target(target_monster);
                }
            });
        }
	    return
    }

    if (!smart.moving) {
                    try {
                // Sử dụng smart_move để di chuyển đến vị trí, nếu không thành công thì bắt lỗi
                await smart_move(destination);
            } catch (error) {
                // Nếu không thể di chuyển (ví dụ: không có đường đi), thì dùng 'use_town'
                console.log("Không thể di chuyển đến đích, sử dụng 'use_town'");
                await use_skill("town");  // Quay lại thành phố
            }
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
var hutquai = getBestTargets({ max_range: character.range, type: "scorpion", Nohavetarget:1,  number: 1 }); // Hàm check
	    
const { targets, inRange: monstersInRangeList , characterRange:  monsterscharacterRange } = getPrioritizedTargets(targetNames, X, Y, rangeThreshold);
//game_log("monstersInRangeList.length" +monstersInRangeList.length)		
//game_log("characterRange" +monsterscharacterRange.length)		

            // ưu tiên kill những quái vật đang nhắm vào đồng đội mình hoặc đồng đội mình đang nhắm vào.

	    if (hutquai.length >= 1 && character.mp > 330 && character.targets <2 ){
		    	weaponSet("dead");
               await attack(hutquai[0]);
	           delay = ms_to_next_skill("attack");
	    }else if (monstersInRangeList.length >= 5 && character.mp > 430 && leader && leader.hp > 10000) {
                weaponSet("boom");
                await use_skill("5shot", monstersInRangeList.slice(0, 5));
                delay = ms_to_next_skill("attack");
		    
            } else if (monsterscharacterRange.length >= 5 && character.mp > 430 && leader && leader.hp > 10000) {
                weaponSet("dead");
                await use_skill("5shot", monsterscharacterRange.slice(0, 5));
                delay = ms_to_next_skill("attack");
		    
            } else if (monsterscharacterRange.length >= 3 && character.mp > 330  && leader && leader.hp > 10000) {
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
var targets1 = getBestTargets({ max_range: character.range, type: "spider", subtype: "scorpion", number: 3 }); // Hàm gọi quái vật

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
        { itemName: "supermittens", slot: "gloves", level: 7 },
	{ itemName: "t2quiver", slot: "offhand", level: 7, l: "l" },
    ],
    dead: [
        { itemName: "crossbow", slot: "mainhand", level: 8, l: "l" },
        { itemName: "mittens", slot: "gloves", level: 8 },
	{ itemName: "alloyquiver", slot: "offhand", level: 6, l: "l" },
    ],
    boom: [
        { itemName: "pouchbow", slot: "mainhand", level: 9, l: "l" },
        { itemName: "alloyquiver", slot: "offhand", level: 6, l: "l" },
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


function handleSnowball() {
	if(character.map != "crypt")return

  if (can_use("snowball")) {
    const currentTime = new Date().getTime(); // Lấy thời gian hiện tại (ms)
	  
    for (const id in parent.entities) {
      const entity = parent.entities[id];
      
      // Kiểm tra loại quái vật
      if (entity.type !== "monster") continue;
	    
      // Kiểm tra xem mtype của quái vật có thuộc danh sách cần tránh không
      if (!avoidTypes.includes(entity.mtype)) continue;
	    
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





function scare() {
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);
    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;

    for (id in parent.entities) {
        var current = parent.entities[id];
        if ((character.hp <5000 || smart.moving ) && current.target == character.name) {
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


async function safeawwaitwalkInCircle() {
	let tank = get_player("Ynhi");
	 let playerPosition

if (!tank || tank.rip){
    if (!smart.moving) {
smart_move({ map: "main", x: 971, y: -66 })
    }
}else
{
	if (smart.moving) return
if( character.map != mobMap  || (  character.map == mobMap  && distance(character, {x: locations[home][0].x, y: locations[home][0].y}) > 50  ))smart_move(destination)	

    if (!smart.moving) {
        let center = locations[home][0];
        const radius = 45;

	   // Tọa độ người chơi (giả sử)
	 //   let mainfram = get_player("haiz"); 
     //  if(mainfram) center = { x: mainfram.x, y: mainfram.y }; 

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



function Handelbossvip() {
if (smart.moving)return
	let f1 = get_player("Ynhi");
	let f2 = get_player("haiz");

		const target = get_target();
                let check = !!target && !target.rip;
	
	if((!check || (check && !is_in_range(target)) ) && f1 && f2 && distance(character, f1) < 150 && distance(character, f2) < 150)
	{

		var currentTarget1 = get_nearest_monster_solobosskill() 
		if(currentTarget1) {
                 if (is_in_range(currentTarget1, "supershot") && character.mp > 500 && currentTarget1.hp >10000  && !is_on_cooldown("supershot") ) {
                use_skill("supershot", currentTarget1);
                game_log("Supershot!!");
                                    }
		}
	}

var monster
if (bossvip == 1)
{
        monster = get_nearest_monster({ type: "stompy" }); 
if ( !monster && distance(character, { x: 434, y: -2557 }) <= 150 && character.map === 'winterland')
        {
	bossvip = 0
        }				
}
else if (bossvip == 2)
{
        monster = get_nearest_monster({ type: "skeletor" }); 
if ( !monster && distance(character, { x: 666, y: -555 }) <= 150 && character.map === 'arena')
        {
	bossvip = 0
        }		
}

}





let delayboss = Date.now()
function crytsgame() {
if (smart.moving && character.map != "crypt")return
if (character.map != "cave" && character.map != "crypt" )smart_move({ map: "cave", x: -194, y: -1281 })	
if (character.map == "cave" && distance(character, {x: -194, y: -1281}) > 30)smart_move({ map: "cave", x: -194, y: -1281 })

    var currentTarget = get_targeted_monster();
	if(!currentTarget)
	{
		var currentTarget1 = get_nearest_monster_solobosskill() 
		if(currentTarget1) {

                 if (is_in_range(currentTarget1, "supershot") && character.mp > 500 && currentTarget1.hp >10000  && !is_on_cooldown("supershot") && Date.now() > delayboss + 10000 ) {
                delayboss = Date.now()
                use_skill("supershot", currentTarget1);
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



function moveToTargetLocation(receivedData) {
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

if (name == "haiz") {
    // Kiểm tra nếu data là "goo" và character.map không phải là "crypt"
    if (data == "goo" && character.map != "crypt") {
        enter("crypt", idmap);
    }
    // Kiểm tra nếu data là "crypt", "crypt1", "crypt2", hoặc "crypt3" và gán giá trị cho cryts
    else if (data == "crypt") {
        cryts = 1;
    }
    else if (data == "bossvip1") {
        bossvip = 1;
    }
    else if (data == "bossvip2") {
        bossvip = 2;
    }
    // Nếu data là "crabxx"
    else if (data == "crabxx") {
        crab = 1;
    }
    // Nếu data là chuỗi khác ngoài "goo", "crypt", "crypt1", "crypt2", "crypt3", và "crabxx"
    else if (typeof data === 'string' && data != "goo" && data != "crypt" && data != "crypt1" && data != "crypt2" && data != "crypt3" && data != "crabxx") {
        idmap = data;
    }
    // Các trường hợp còn lại (không phải "goo", "crypt", "crypt1", "crypt2", "crypt3", "crabxx")
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


    let itemsToExclude = ["mittens","supermittens","snowball","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","crossbow","jacko", "pouchbow","orbg"];
	
	
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

	

	
}, 40000); 




////////////////////////////////////////////////////////
setInterval(function() {
looting()	
}, 4000);
function looting() {
	    let chests = get_chests();
    let chestIds = Object.keys(chests);
    if (chestIds.length > 20 || character.map == "crypt") {
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
        var bossarmy=[ "a2" , "a3", "a7", "vbat", "stompy", "skeletor"]; 
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
const rangeBuffer = 90;

// How far away we want to consider monsters
const calcRadius = 300;

// Types of monsters we want to avoid
const avoidTypes = ["a0","a1","a2","a3","a4","a6", "a7","a8","a9","vbat","stompy","skeletor","crabxx"];

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
    if (drawDebug) {
        clear_drawings();
    }

    // Try to avoid monsters
    const avoiding = avoidMobs();

    if (!avoiding) {
        if ((!lastMove || new Date() - lastMove > 100)  && (cryts > 0 || crab > 0 || bossvip > 0 || folowhaizevents ) ) {
		let host = get_player("haiz")
		const target = get_target();
                let check = !!target && !target.rip;

           if(host && !smart.moving && check && distance(character, host) > (character.range - 30) )xmove(host.real_x, host.real_y); // Move to current position (no goal used)
	   else if (host && !smart.moving && (!check || (check && !is_in_range(target))) )xmove(host.real_x, host.real_y);
            lastMove = new Date();

		////////////////////////////////////
		if (!host && !smart.moving){
moveToTargetLocation(receivedData)
		}
        }
    }

}
setInterval(avoidance, 80);

function avoidMobs() {
    let maxWeight = -Infinity;
    let maxWeightAngle = 0;

    const monstersInRadius = getMonstersInRadius();
    const avoidRanges = getAnglesToAvoid(monstersInRadius);
    const inAttackRange = isInAttackRange(monstersInRadius);

    // If we are in attack range or need to avoid monsters, find the safest direction to move
    if (inAttackRange || (!can_move_to(character.real_x, character.real_y))) {
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 60) {
            let weight = 0;

            const position = pointOnAngle(character, angle, 75);

            if (can_move_to(position.x, position.y)) {
                let rangeWeight = 0;
                let inRange = false;

                for (const id in monstersInRadius) {
                    const entity = monstersInRadius[id];
                    const monsterRange = getRange(entity);
                    const distToMonster = distanceToPoint(position.x, position.y, entity.real_x, entity.real_y);
                    const charDistToMonster = distanceToPoint(character.real_x, character.real_y, entity.real_x, entity.real_y);

                    if (charDistToMonster < monsterRange) {
                        inRange = true;
                        if (distToMonster > charDistToMonster) {
                            rangeWeight += distToMonster - charDistToMonster;
                        }
                    }
                }

                if (inRange) {
                    weight = rangeWeight;
                }

                const intersectsRadius = angleIntersectsMonsters(avoidRanges, angle);
                if (!can_move_to(character.real_x, character.real_y)) {
                    weight -= distanceToPoint(position.x, position.y, character.real_x, character.real_y) / 10;
                }

                if (!intersectsRadius) {
                    if (weight > maxWeight) {
                        maxWeight = weight;
                        maxWeightAngle = angle;
                    }
                }
            }
        }

        const movePoint = pointOnAngle(character, maxWeightAngle, 20);
        if (!lastMove || new Date() - lastMove > 100) {
            lastMove = new Date();
            move(movePoint.x, movePoint.y);
        }

        if (drawDebug) {
            draw_line(character.real_x, character.real_y, movePoint.x, movePoint.y, 2, 0xF20D0D);
        }

        return true;
    }

    return false;
}

function getRange(entity) {
    if (entity.type !== "character") {
        
        calculatedRange = (parent.G.monsters[entity.mtype]?.range || 100) + rangeBuffer;
        ////tùy chỉnh lại cho tay dài
        if (calculatedRange > (character.range + 15)) {
            return character.range + 15;
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
