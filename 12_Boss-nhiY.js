
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
let receivedData

//////////////////////////
let jrmode = 0
let foxmode = 0
let moveJR = 0
let notejr = 0
let done = 0
let Savedatasmart = {};
setInterval(function() {
//game_log("JR= " + jrmode)	
if (done == 1 || (godenbat == 1 && foxmode == 0) ) return
if (get_nearest_monster({type: "jr"}) && !get_player("haiz") && character.map == "spookytown" && distance(character, {x: -728, y: -123}) < 50){
send_cm("haiz","boss1") 
Savedatasmart = {};	
done = 1
}
else if ((!get_nearest_monster({type: "jr"}) && character.map == "spookytown" && distance(character, {x: -728, y: -123}) < 50) && (notejr == 1 || jrmode == 1 ))	{
	send_cm("haiz","stop")
parent.api_call("disconnect_character", {name: "nhiY"});
stop_character("nhiY")	
}
	
if (Object.keys(datasmart).length == 0 && Object.keys(Savedatasmart).length > 0) datasmart = Savedatasmart;
if(parent.S.icegolem && foxmode == 0){
	jrmode = 0
	return	
}
if (jrmode == 0) return
if (smart.moving && jrmode == 1 && moveJR == 1){
	datasmart = smart;
	Savedatasmart = smart;
        foxmode = 1
	jrmode = 0
	notejr = 1
}
if (smart.moving || foxmode == 1) return;
smart_move({ map: "spookytown", x: -728, y: -123 })
moveJR = 1	

	
}, 1000);





//FRAM FOXNIX
setInterval(function() {

if(parent.S.icegolem && foxmode == 0) return
	
superMOVE()
	

	
}, 2000);
////////////////////////

let datasmart = {};
function superMOVE() {
if (Object.keys(datasmart).length = 0) return

let checkdichuyen = datasmart
let lastMain = null;
let SM = 0;
if (checkdichuyen.plot && checkdichuyen.plot.some(p => p.x !== undefined && p.y !== undefined)) {
  SM = 1;  // Nếu có ít nhất một điểm có vị trí x, y hợp lệ
}

if (SM === 1) {

  let x = checkdichuyen.x;
  let y = checkdichuyen.y;
  let map = checkdichuyen.map;
	
	
for (let i = checkdichuyen.plot.length - 1; i >= 0; i--) {
    if (checkdichuyen.plot[i].map == character.map) {
        lastMain = checkdichuyen.plot[i];
        break;
    }
}
	

if (lastMain && character.mp > 1800 && distance(character, {x: lastMain.x, y: lastMain.y}) > 150) {
	use_skill("blink", [lastMain.x, lastMain.y])
if(lastMain.x == x && lastMain.y == y && character.map == map)stop()
if (lastMain &&  character.map == map && distance(character, {x: x, y: y}) < 30)stop()	
}


///////smarrtmove
const congdichuyen = findcongdichchuyen(checkdichuyen);
if(!smart.moving && congdichuyen != 1)smart_move({ map: congdichuyen.map, x: congdichuyen.x, y: congdichuyen.y })
 if (character.moving || smart.moving) return
if (character.mp > 2800 && foxmode == 1 && Object.keys(Savedatasmart).length == 0){
	mageMagiPort()
	datasmart = {};
}

////////
	
	
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
  if (lastMtunnelIndex + 1 < data.plot.length) {
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
            datasmart = smart;
            Savedatasmart = smart;
            runb = 0;
        }

        if (smart.moving || is_moving(character) || foxmode == 1) return;

        //////////
        if (get_nearest_monster({type: tsname})) {
            if (character.mp > 2800) {
                mageMagiPort();
                godenbat = 0;
                datasmart = {};
                Savedatasmart = {};
            }
            return;
        }

        //////////
        if (!is_moving(character)) runb = 0;
        if (step >= 4) {
            godenbat = 0;
            datasmart = {};
            Savedatasmart = {};
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
}, 4000);  // Đặt delay 4 giây (4000 milliseconds) trước khi bắt đầu




//////////// move gan leader
setInterval(function() {

	////////// moi paty - de nhan dien leader
//let leader = character.party;
//if (leader===undefined) 
	if (!character.party) {
    send_party_request("haiz");
    return
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
	if (character.map == "winterland" && !target2 && back == 0 && parent.party_list.includes("Ynhi") && character.hp > 6000 && character.mp > 3000 )
	{
		use_skill("blink", [800, 400])
	}
	else if (character.map == "winterland" && target2 && character.hp < 4000)
        {
		use_skill("blink", [0, 0])
	}

        if (target2)mageMagiPort()
        if (!target2 && character.hp < 6000)mageMagiPort()
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
    if (smart.moving || foxmode == 1 || godenbat == 1 || jrmode == 1) return;

	
	
    // Đảm bảo rằng nhận được thông tin hợp lệ
    if (receivedData && typeof receivedData === 'object' && receivedData.message === "location") {
        const targetMap = receivedData.map;  // Lấy tên bản đồ
        const targetX = receivedData.x;      // Lấy tọa độ X
        const targetY = receivedData.y;      // Lấy tọa độ Y

        // Kiểm tra nếu nhân vật đang ở đúng bản đồ
        if (character.map !== targetMap && character.map != "crypt") {

        } else {
            // Nếu đã ở đúng bản đồ, kiểm tra xem đã đến tọa độ mục tiêu chưa
            if (character.x !== targetX || character.y !== targetY) {
                // Nếu chưa đến, di chuyển đến tọa độ mới
                xmove(targetX, targetY);
            }
        }
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

    let itemsToExclude = ["sparkstaff","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","harbringer","jacko","slimestaff","orbg","froststaff"];

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
        && ((character.mp - G.skills.blink.mp) > 100)) {

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
     if (!currentTarget) currentTarget = get_nearest_monster({type: "jr"});

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

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
