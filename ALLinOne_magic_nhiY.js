// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
////////////////
let delaymageMagiPort = Date.now();
const TenMinutesInMs = 300 * 60 * 1000
let started
let numHP = 0
let numMP = 0
let stopgiudo = 0  // 1 = stop
let back = 0
let receivedData = {
    map: character.map,  // Tên bản đồ mặc định
    x: character.x,                // Tọa độ x mặc định
    y: character.y,                // Tọa độ y mặc định
};
//////////////////////////
let jrmode = 0
let foxmode = 0
let notejr = 0
let done = 0
let datasmart = {};
let Savedatasmart = {};

setTimeout(function() {
setInterval(function() {
//game_log("JR= " + jrmode)	
if (done == 1 || (godenbat == 1 && foxmode == 0) ) return
if (get_nearest_monster({type: "jr"}) && !get_player("haiz") && character.map == "spookytown" && distance(character, {x: -728, y: -123}) < 50){

	var nearest = get_nearest_monster({type: "jr"})
	if (nearest && is_in_range(nearest)) attack(nearest); 

	
if(character.mp > 2000 && nearest && nearest.target){
	mageMagiPort()	
        done = 1
}
}
else if ((!get_nearest_monster({type: "jr"}) && character.map == "spookytown" && distance(character, {x: -728, y: -123}) < 50) && (notejr == 1 || jrmode == 1 ))	{
	send_cm("haiz","stop")
parent.api_call("disconnect_character", {name: "nhiY"});
stop_character("nhiY")	
}
	
if(parent.S.icegolem && foxmode == 0){
	jrmode = 0
	return	
}
if (jrmode == 0) return

if (smart.moving || foxmode == 1) return;
smart_move({ map: "spookytown", x: -785, y: -308 })

	
}, 1000);
}, 4000);




async function superMOVE(checkdichuyen) {
	return //hàm vip copy ở cuối thay  thế
  let x = checkdichuyen.x;
  let y = checkdichuyen.y;
  let map = checkdichuyen.map;
	let lastMain = null;

	
for (let i = checkdichuyen.plot.length - 1; i >= 0; i--) {
    if (checkdichuyen.plot[i].map == character.map) {
        lastMain = checkdichuyen.plot[i];
        break;
    }
}
	

if (lastMain && character.mp > 3300 && !is_on_cooldown("blink") && distance(character, {x: lastMain.x, y: lastMain.y}) > 150) {
	await use_skill("blink", [lastMain.x, lastMain.y])
}
else if (lastMain && character.mp > 1600 && !is_on_cooldown("blink") && distance(character, {x: lastMain.x, y: lastMain.y}) > 150 && (character.max_hp - character.hp) >300)	
{
	await use_skill("blink", [lastMain.x, lastMain.y])
}

/////// smartmove
const congdichuyen = findcongdichchuyen(checkdichuyen);

// Log thông tin khi tìm được con đường di chuyển
game_log(`Tìm thấy con đường di chuyển: ${JSON.stringify(congdichuyen)}`);

if ( congdichuyen !== 1 && congdichuyen.s) {
    // Log trước khi gọi transport
    game_log(`Đang di chuyển đến bản đồ ${congdichuyen.map} với con đường ${congdichuyen.s}`);
    
    // Gọi hàm transport để di chuyển
 
	
	                   try {
 await  transport(congdichuyen.map, congdichuyen.s);
                    } catch (error) {
						game_log("Quá trình xử lý. lỗi");
                         smart_move({ map: congdichuyen.map, x: congdichuyen.x, y: congdichuyen.y });
                    } 
	
	
}


}




let saveS = {};
/////////////////////////////////////////////////////////////
let checkMoveStart = null;  // Biến để theo dõi setInterval
let isCheckingMoveStart = false; // Cờ để kiểm tra xem có đang kiểm tra di chuyển hay không

// Hàm di chuyển và chờ cập nhật smart
async function moveWithSmartAndSuperMOVE() {
	if(parent.S.icegolem && foxmode == 0) return
    // Nếu có vị trí mới, di chuyển đến đó trước
    if (receivedData) {
        const { map, x, y } = receivedData;

        // Kiểm tra nếu nhân vật đang ở đúng bản đồ
		if ( (godenbat == 0 && jrmode == 0) || foxmode == 1)
		{
        if (character.map !== map) {
			 if ( checkSmartPosition(saveS) ==2 || smart.moving ) return
            // Nếu không ở bản đồ mục tiêu, di chuyển đến bản đồ đó
            smart_move({
                map: map,
                x: x,
                y: y
            });
        } else {
            // Nếu đã ở đúng bản đồ, kiểm tra xem đã đến tọa độ mục tiêu chưa
            if (character.x !== x || character.y !== y) {
                // Nếu chưa đến, di chuyển đến tọa độ mới
				 if ( checkSmartPosition(saveS) ==2 || smart.moving ) return
                xmove(x, y);
            }
        }
	}

	    

        // Kiểm tra nếu chưa có checkMoveStart đang chạy
        if (!isCheckingMoveStart) {
            isCheckingMoveStart = true;
           game_log("1 value: ");
            // Kiểm tra quá trình di chuyển mỗi 100ms
            checkMoveStart = setInterval(async () => {

                // Kiểm tra điều kiện của smart (SM = 1)
				let checker = 100
				               checker = checkSmartPosition(saveS);
                let checkdichuyen = smart;
                let SM = 0;
//game_log("saveS.plot: " + JSON.stringify(saveS.plot));
game_log("Checker value: " + checker);

                if (checkdichuyen.plot && checker != 2 && checkdichuyen.plot.some(p => p.x !== undefined && p.y !== undefined)) {
                    SM = 1;  // Nếu có ít nhất một điểm có vị trí x, y hợp lệ
					saveS = JSON.parse(JSON.stringify(checkdichuyen));
                }
			   game_log("check1111111 ======"+checker)
								game_log("loop")

                // Nếu có dữ liệu hợp lệ (SM = 1), dừng di chuyển hiện tại nếu đang di chuyển và thực hiện superMOVE
                if (SM === 1 || checker == 2 ) {
                    // Dừng di chuyển hiện tại nếu đang di chuyển
                    if (smart.moving) {
                    }
               game_log("check ======"+checker)
                    // Cập nhật datasmart với dữ liệu từ smart
                    
                   if(parent.S.icegolem && foxmode == 0) return
                    // Thực hiện di chuyển thông minh với superMOVE
                    try {
                        await superMOVE(saveS);  // Di chuyển tới các điểm đã tính toán trong smart
                    } catch (error) {
                        console.error('Error during superMOVE:', error);
                    }               
		}
		    else 
		{
	                 if(!smart.moving && character.mp > 2000 && foxmode == 1 &&  Date.now() > (delaymageMagiPort + 7000)  )mageMagiPort()
		}

            }, 1000);  // Kiểm tra mỗi 1000ms
        }
    }
}

// Kiểm tra và di chuyển tới vị trí mới nhất mỗi 2s
setInterval(() => {
    moveWithSmartAndSuperMOVE();  // Di chuyển đến vị trí mới nhất nếu có
}, 2000);  // Kiểm tra và di chuyển mỗi 2 giây
//////////////////////////////////////




function checkSmartPosition(data) {
    // Kiểm tra nếu data.plot tồn tại và có ít nhất một phần tử
    if (data.plot && data.plot.length > 0) {
        // Lấy vị trí cuối cùng trong data.plot (dữ liệu truyền vào)
        const lastPlot = data.plot[data.plot.length - 1];

        // Kiểm tra xem vị trí của data có khớp với vị trí cuối cùng trong data.plot không
        if (data.map === lastPlot.map && 
            distance(character, {x: lastPlot.x, y: lastPlot.y}) < 150) {
            // Nếu vị trí khớp, trả về 1
            return 1;
        } else {
           
		if(smart.moving)
		{
			return 2;  // Nếu vị trí không khớp và còn lastPlot, trả về 2
		}
		else
		{
			return 4;  // Nếu vị trí không khớp và còn lastPlot, trả về 4 khi bị lỗi di chuyển để lấy lại smart mới
		}
            
        }
    } else {
        // Nếu không có plot, hoặc plot rỗng, trả về 1
        return 3;
    }
}




// Hàm tìm đối tượng cuối cùng có map là "mtunnel"
function findcongdichchuyen(data) {
  // Tìm đối tượng cuối cùng có "map": "mtunnel"
  let lastMtunnelIndex = -1;
  for (let i = data.plot.length - 1; i >= 0; i--) {
    if (data.plot[i].map === character.map) {
      lastMtunnelIndex = i;
      break;
    }
  }
  
  // Nếu không tìm thấy "mtunnel", trả về đối tượng đầu tiên
  if (lastMtunnelIndex === -1) {
    return data.plot[0];
  }

  // Kiểm tra đối tượng tiếp theo sau "mtunnel"
  if (lastMtunnelIndex + 1 < data.plot.length && distance(character, {x: data.plot[lastMtunnelIndex].x, y: data.plot[lastMtunnelIndex].y}) < 30) {
    // Trả về đối tượng tiếp theo nếu có
    return data.plot[lastMtunnelIndex + 1];
  } else {
    // Nếu không có đối tượng nào sau "mtunnel", trả về 1
    return 1;
  }
}

// Gọi hàm và lưu kết quả vào biến mới
//const nextValue = findcongdichchuyen(data);




// Trình sát
var tsname = "goldenbat"
let godenbat = 0  // == 1 là có check batkinggold
let step = 1
let runb = 0
let checkbat = 0

// Delay 4 giây trước khi bắt đầu
setTimeout(function() {
    setInterval(function() {
        if (godenbat == 0 || foxmode == 1) return;
        if (parent.S.icegolem) {
            godenbat = 0;
            return;
        }

        if (smart.moving && runb == 1) {
            runb = 0;
        }

        if (smart.moving || is_moving(character) || foxmode == 1) return;

        //////////
        if (get_nearest_monster({type: tsname})) {
            if (character.mp > 2800) {
                mageMagiPort();
                godenbat = 0;
            }
            return;
        }

        //////////
        if (!is_moving(character)) runb = 0;
        if (step >= 4) {
            godenbat = 0;
        }

        game_log("v7");
        game_log(step);
        game_log(runb);

        if (step == 1 && runb == 0) {
            smart_move({ map: "cave", x: 1154, y: 55 });
            step = 2;
            runb = 1;
        }
        if (step == 2 && runb == 0) {
            smart_move({ map: "cave", x: -261, y: -454 });
            step = 3;
            runb = 1;
        }
        if (step == 3 && runb == 0) {
            smart_move({ map: "cave", x: 325, y: -1118 });
            step = 4;
            runb = 1;
        }
    }, 2000);  // Tiếp tục với setInterval sau 4 giây delay
}, 6000);  // Đặt delay 4 giây (4000 milliseconds) trước khi bắt đầu




//////////// move gan leader
setInterval(function() {

	////////// moi paty - de nhan dien leader
//let leader = character.party;
//if (leader===undefined) 
	if (!character.party) {
    send_party_request("haiz");

}
    if (character.moving || smart.moving) return // We're already moving somewhere
	
if (back == 1)
	{
	if (character.map == "winterland" && distance(character, {x: 0, y: 0}) > 250)use_skill("blink", [0, 0])
	if (character.mp > 2000) mageMagiPort()
	}
	
	
	//////////////
		
	if(parent.S.icegolem && back == 0 && !get_nearest_monster({type:'icegolem'}))
	{
        join('icegolem');
	}
////////////////////////////////////////////	
if(parent.S.icegolem && foxmode == 0)
	{
	  var target2= get_nearest_monster({type: "icegolem",});	
		
	if (character.map != "winterland")smart_move("winterland")
	if (character.map == "winterland" && !target2 && back == 0 )use_skill("blink", [800, 400])
	///check member

	mageMagiPort()
	
	
	
	}
	if(parent.S.icegolem && foxmode == 0) return //su kien ice thi se tu hoat dong không có di theo lederr
	
////////////////////////////////////////////////	
	
	if ( character.map == "winterland" && distance(character, {x: 800, y: 400}) < 250 && !smart.moving && !parent.S.icegolem  )use_skill("town")
		
	
    if (!character.party) return // No party

	    let leader = get_player("haiz");
	if (character.party && character.party != "haiz" ) {
    leave_party();
	}
	

	if (leader && distance(character, leader) < 30  && !smart.moving ){
		stop()
	}
	



}, 2000);

///////////




var draw_debug = true;

function on_draw(){
  if(draw_debug){
      clear_drawings();

      draw_circle(character.real_x, character.real_y, character.range);
  }
}


//////////////
function on_cm(name, data) {


/////////////////////		

///////////////////
    if(name == "haiz"){

		if (data == "goo" && character.map != "crypt")enter("crypt",idmap);

	}
	
	 if(name == "haiz" && data != "goo" && typeof data === 'string' ){
     idmap = data

	}
	
	
	if(name == "haiz" && data == "back" ){
    back = 1
		
	}

	 if(name == "haiz" && data != "goo" && data != "back" && data != "foxmode" && data != "jr"){
		 if (data.message === "location")receivedData = data
		else datasmart = data

	}


	if(name == "haiz" && data == "foxmode" ){
           foxmode = 1
	}
	if(name == "haiz" && data == "jr" ){
           jrmode = 1
	}
	
	
}


setInterval(function() {

 if (character.rip) { ///////auto hoi sinh
    respawn();
  }


}, 50000);



setInterval(function() {
    let lootMule = get_player("haiz");

		 //giui vang when in range
    var merch = get_player("haiz"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) {
        send_gold(merch,character.gold)
    }
	//
	
    if (lootMule == null || stopgiudo == 1) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }

    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","harbringer","jacko","slimestaff","orbg","froststaff"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);


function kite(taget, kite_range)
{

	const radius = kite_range ;
const  angle = Math.PI / 9.5 ;
    if (can_move_to(taget.real_x, taget.real_y)) {
        const angleFromCenterToCurrent = Math.atan2(character.y - taget.real_y, character.x - taget.real_x)
        const endGoalAngle = angleFromCenterToCurrent + angle
        const endGoal = { x: taget.real_x + radius * Math.cos(endGoalAngle), y: taget.real_y + radius * Math.sin(endGoalAngle) }
        move(endGoal.x, endGoal.y)

	
	}
 
	

}


function mageMagiPort() {
    if (character.ctype !== "mage") return;

    if (!is_on_cooldown("magiport")
        && character.mp > G?.skills?.magiport?.mp
        && ((character.mp - G.skills.magiport.mp) > 100)) {

let keys = Object.keys(parent.party).reverse();
for (let char of keys) {
    // Kiểm tra các điều kiện và không thực hiện magiport với một số nhân vật nhất định
    if (char !== character.name  // Không magiport chính mình
        && char !== "MuaBan"     // Không magiport người bán hàng
        && (!get_player(char))) { // Nếu không phải là người chơi
        use_skill("magiport", char);
       // return;
    }
}

	    
    }
}




function use_hp_or_mp1()
{
	
	
	if (started == undefined) started = Date.now()
    if (Date.now() > started + TenMinutesInMs) {
        show_json({
            numHP: numHP,
            numMP: numMP,
            level: character.level,
            server: server
        })
        started = Date.now()
        numHP = 0
        numMP = 0
    }
	
	
	

	
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	
	

///////


if (character.hp/character.max_hp< 0.7) {
   use_skill("use_hp");
	numHP += 1
} 
else if (character.mp/character.max_mp < 0.9) {
	use_skill("use_mp");
	numMP += 1
}
  else if (character.max_mp>character.mp) return use_skill("regen_mp");
  else if (character.max_mp>character.mp) return use_skill("regen_mp");
	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}

///////////







var attack_mode= true

setInterval(function(){

	//use_hp_or_mp();
	use_hp_or_mp1();
	loot();

////	khong move gan leader se khong tim muc tieu tan cong	
const leader1 = get_player('haiz');
const range1 = character.range; // This may need tuning
const dist1 = distance(character, leader1);
if (dist1 > range1 * 2)
  return false;	
/////////////////	
	
	
	
	
	
	if(!attack_mode || character.rip || smart.moving) return;


	
	
	    // Party leader
    
    
    // Current target and target of leader.
    var currentTarget = get_targeted_monster();
    var leaderTarget = get_target_of(leader1)
    
    // Change the target.
    if (!currentTarget || currentTarget != leaderTarget){ 
        // Current target is empty or other than the leader's.
        change_target(leaderTarget);
        currentTarget = get_targeted_monster();
    }
    

		var cung1 = get_player("haiz"); 
if ( currentTarget && cung1 && (distance(character,cung1) < character.range)) {
	if(!can_attack(currentTarget) )kite(currentTarget,80);
   }	
	
	
	if( currentTarget && !is_in_range(currentTarget))
	{
		move(
			character.x+(currentTarget.x-character.x)/2,
			character.y+(currentTarget.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(currentTarget))
	{
		//////////// dung skill
		            if(character.mp > 700 &&  !is_on_cooldown("reflection") && cung1 && currentTarget.target == "haiz" )
            {
               use_skill("reflection", cung1);
				 game_log("reflection !!!!!!");
            }
		
		
		
		/////////
		set_message("Attacking");
		// attack(currentTarget);
	}
	
	
	
	//////buff xa thu
	 rangerObj = parent.entities["6gunlaZe"]
     if (is_in_range(rangerObj, "energize")) {
    let amount = rangerObj.max_mp - rangerObj.mp;
    	 if(character.mp > (rangerObj.max_mp - rangerObj.mp + 200)     
                   && !rangerObj.rip
			&& rangerObj.mp < 300
                  && !is_on_cooldown("energize")){
                use_skill("energize", rangerObj.name, amount);
                game_log("Mage energized " + rangerObj.name);
           }
}

	
	
	//////
	
	
	


	
	
	
	
	
},1000/4); // Loops every 1/4 seconds.







const targetNames = ["6gunlaZe", "Ynhi","haiz", "nhiY"];


async function attackLoop() {
	//if (character.moving)return
    let delay = null; // Default delay
    const leader1 = get_player('haiz');

	

    try {
        let nearest = null;

        // Find the nearest monster based on the targetNames
        for (let i = 0; i < targetNames.length; i++) {
            nearest = get_nearest_monster_v2({
                target: targetNames[i],
                check_min_hp: true,  // Checking for monster with minimum HP
                max_distance: character.range,  // Consider monsters within 50 units
                statusEffects: ["cursed"], // Check for these debuffs
            });
            if (nearest) break;
        }

	    
        if (!nearest) {
            for (let i = 0; i < targetNames.length; i++) {
                nearest = get_nearest_monster_v2({
                    target: targetNames[i],
                    max_distance: character.range,
                    check_min_hp: true,
                });
                if (nearest) break;
            }
        }


      if (!nearest) {
    // Current target and target of leader.
    var currentTarget = get_targeted_monster();
    var leaderTarget = get_target_of(leader1)
    
    // Change the target.
    if (!currentTarget || currentTarget != leaderTarget){ 
        // Current target is empty or other than the leader's.
        change_target(leaderTarget);
        nearest = get_targeted_monster();
    }

      }

        // If a monster is found and is in range, execute the attack
        if (nearest && is_in_range(nearest)) {
            await attack(nearest); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack
        }

	    
    } catch (e) {
        //console.error(e);
    }
	 setTimeout(attackLoop, delay || 250); // Default delay if undefined
}

attackLoop();






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




function ms_to_next_skill(skill) {
    const next_skill = parent.next_skill[skill]
    if (next_skill == undefined) return 0
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) - character.ping;
    return ms < 0 ? 0 : ms;
}




function soloboss(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["phoenix", "greenjr" , "jr" , "mvampire"]; 
	
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		
		if ( (bossarmy.indexOf(entity.mtype) == -1)   ) continue
		////khong co trong list thi bo qua
		// game_log(entity.mtype + distance(character, entity));
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		/// lon hon so luong thi bo qua
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}
///  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 }) 








// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround





function smart_move_logic() { return; }

let last_blink = Date.now(); // Lưu thời gian lần "blink" gần nhất

setInterval(async function() {
    // Kiểm tra các điều kiện để không di chuyển nếu có quái vật, không đang di chuyển, đang vận chuyển hoặc vừa sử dụng "blink"
	  //  game_log("000000000000000", "#A1C4F5");
	if(parent.S.icegolem && foxmode == 0) return

    if ( !is_moving(character) || is_transporting(character) || mssince(last_blink) < 1000) return;

   // game_log("Đang kiểm tra", "#A1C4F5");

    // Nếu chưa tìm đường, bắt đầu tìm đường
    if (!smart.searching) {
     //   game_log("Bắt đầu tìm đường...", "#A1C4F5");
        start_pathfinding();
        return;
    }

	
    // Nếu chưa tìm thấy lộ trình, tiếp tục tìm đường
    if (!smart.found) {
     //   game_log("không có di chuyển thông minh...", "#A1C4F5");
       continue_pathfinding();
        return;
    }

    // Nếu không còn lộ trình hoặc lộ trình rỗng, kết thúc di chuyển
    if (!smart.plot || !smart.plot.length) {
     //   game_log("Không còn lộ trình để di chuyển. Dừng lại.", "#FFB84D");
        smart.moving = false;
        smart.on_done(true); // Gọi callback khi hoàn thành di chuyển
        return;
    }

    // Nếu nhân vật đã đến điểm tiếp theo trong lộ trình, xóa điểm đó khỏi lộ trình
    if (character.map == smart.plot[0].map && character.x == smart.plot[0].x && character.y == smart.plot[0].y) {
    //    game_log("Đã đến điểm tiếp theo. Xóa điểm khỏi lộ trình.", "#FFB84D");
        smart.plot.splice(0, 1);
        return;
    }

    // Nếu điểm tiếp theo yêu cầu phương tiện di chuyển, gọi hàm transport
    if (smart.plot[0].transport) {
     //   game_log("Cần phương tiện di chuyển. Đang chuyển đến bản đồ tiếp theo...", "#A1C4F5");
        transport(smart.plot[0].map, smart.plot[0].s);
        smart.plot.splice(0, 1); // Xóa điểm đã đến khỏi lộ trình
        last_blink = Date.now(); // Cập nhật thời gian "blink"
        return;
    }

// Kiểm tra nếu có thể sử dụng "blink" đến điểm trong lộ trình
for (let i = smart.plot.length - 1; i >= 0; i--) {
    // Kiểm tra xem điểm tiếp theo có cùng bản đồ với nhân vật không
    if (smart.plot[i].map == character.map) {
        // Kiểm tra cooldown của "blink" và MP của nhân vật
        if (!is_on_cooldown("blink") && character.mp >= 1600) {
         //   game_log("Đang sử dụng kỹ năng blink để dịch chuyển đến điểm tiếp theo: (" + smart.plot[i].x + ", " + smart.plot[i].y + ")", "#A1C4F5");
            
            // Nếu khoảng cách nhỏ hơn 150 và có thể di chuyển đến điểm, thực hiện di chuyển trực tiếp
            if (distance(character, {x: smart.plot[i].x, y: smart.plot[i].y}) < 200 ) {
            //    game_log("Khoảng cách gần, di chuyển trực tiếp đến: (" + smart.plot[i].x + ", " + smart.plot[i].y + ")", "#A1C4F5");
                move(smart.plot[i].x, smart.plot[i].y);
            } else {
                // Nếu không thể di chuyển trực tiếp, sử dụng kỹ năng blink
            //    game_log("Khoảng cách xa, sử dụng blink đến: (" + smart.plot[i].x + ", " + smart.plot[i].y + ")", "#A1C4F5");
                use_skill("blink", [smart.plot[i].x, smart.plot[i].y]);
            }
            
            // Xóa điểm đã sử dụng "blink" hoặc đã di chuyển khỏi lộ trình
            smart.plot.splice(0, i + 1); 
            last_blink = new Date(); // Cập nhật thời gian "blink"
        }
	    else
	{
	move(smart.plot[0].x, smart.plot[0].y);
	}
        return; // Kết thúc vòng lặp sau khi thực hiện di chuyển hoặc "blink"
    }
}

    // Nếu quá 10 giây không di chuyển, thông báo lỗi và quay lại điểm ban đầu
    if (mssince(last_blink) >= 10000) {
        game_log("Mất lộ trình... Hết thời gian chờ... Quay lại điểm xuất phát.", "#CF5B5B");
        smart_move({ map: smart.map, x: smart.x, y: smart.y }, smart.on_done); // Quay lại điểm ban đầu
    }
}, 50); // Gọi hàm mỗi 50ms

// Hàm tính thời gian kể từ thời điểm "time" đến hiện tại
function mssince(time) {
    return Date.now() - time;
}
















