

// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
////////////////

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
let jrmode = 1
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
send_cm("haiz","boss1") 
done = 1
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
smart_move({ map: "spookytown", x: -728, y: -123 })

	
}, 1000);
}, 4000);




async function superMOVE(checkdichuyen) {
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
else if (lastMain && character.mp > 1600 && !is_on_cooldown("blink") && distance(character, {x: lastMain.x, y: lastMain.y}) > 150 && character.hp <3000)	
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
    // Nếu có vị trí mới, di chuyển đến đó trước
    if (receivedData) {
        const { map, x, y } = receivedData;

        // Kiểm tra nếu nhân vật đang ở đúng bản đồ
		if ( godenbat == 0 && jrmode == 0)
		{
        if (character.map !== map) {
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
                    
                   if(parent.S.icegolem) return

                    // Thực hiện di chuyển thông minh với superMOVE
                    try {
                        await superMOVE(saveS);  // Di chuyển tới các điểm đã tính toán trong smart
                    } catch (error) {
                        console.error('Error during superMOVE:', error);
                    }               
		}
		    else 
		{
			var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
	                 if(!smart.moving && targetsoloboss.length > 0 && character.mp > 2800 && foxmode == 1)mageMagiPort()
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
            distance(character, {x: lastPlot.x, y: lastPlot.y}) < 50) {
            // Nếu vị trí khớp, trả về 1
            return 1;
        } else {
            // Nếu vị trí không khớp và còn lastPlot, trả về 2
            return 2;
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
let godenbat = 1  // == 1 là có check batkinggold
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
	
	if (leader && distance(character, leader) < 10  &&  is_moving(character) ){
		stop()
	}
	
	if (leader && distance(character, leader) < 30  && smart.moving ){
		stop()
	move(leader.x,leader.y)
	}
	
	if (leader && distance(character, leader) < 70 & foxmode == 0) return
    // Nếu nhân vật đang di chuyển, không làm gì thêm



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
		attack(currentTarget);
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
	
	
	


	
	
	
	
	
},1000/8); // Loops every 1/4 seconds.







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
