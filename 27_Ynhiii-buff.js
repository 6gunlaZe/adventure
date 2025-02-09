let started
let started1
let move1 = 0
let framboss = 0
let framboss1 = 0
let delayboss
let timemax = 7 * 60 * 1000
var idmap 
let rateheal
let delayitem
let stopgiudo = 0  // 1 = stop
var crepp = "ghost"
let receivedData
let delayaoe  = Date.now()
let framfocus = 1  //tập trung quanh 1 nhân vật khi fram
var nhanvatfram = "6gunlaZe"
let kitefram

if (delayboss == undefined) delayboss = Date.now()

	
let lastCallTime = 0; // Biến lưu trữ thời gian mốc
let delayThreshold = 200; // Ngưỡng thời gian 200ms



function checkTimeBetweenCalls(setMoc = 0) {
    const currentTime = Date.now(); // Lấy thời gian hiện tại

    // Nếu setMoc === 1, thì lưu thời gian hiện tại làm thời gian mốc
    if (setMoc === 1) {
        lastCallTime = currentTime;
       // console.log("Thời gian mốc đã được thiết lập: ", currentTime);
        return;
    }

    // Nếu không phải gọi để thiết lập thời gian mốc, kiểm tra thời gian giữa các lần gọi
    if (lastCallTime === 0) {
        // Lần đầu tiên gọi hàm, không có thời gian mốc
        lastCallTime = currentTime;
        return 0; // Lần đầu tiên, không cần kiểm tra
    }

    const timeDiff = currentTime - lastCallTime; // Tính thời gian giữa các lần gọi

    // Nếu thời gian giữa các lần gọi dưới delayThreshold (500ms), trả về 1 để bỏ qua
    if (timeDiff < delayThreshold) {
       // console.log(`Thời gian giữa các lần gọi quá ngắn: ${timeDiff}ms, bỏ qua.`);
        return 1; // Thời gian quá ngắn, bỏ qua
    }

    // Nếu thời gian đủ lâu, trả về 0
   // console.log(`Thời gian giữa các lần gọi là: ${timeDiff}ms, tiếp tục.`);
    return 0;
}


setInterval(function() {
	    let leader = get_player("haiz");
	
	if(parent.S.icegolem && !leader && !get_nearest_monster({type:'icegolem'}))
	{
        join('icegolem');
	}
	
	
	if ( character.map == "winterland" && distance(character, {x: 800, y: 400}) < 250 && !smart.moving && !parent.S.icegolem  )use_skill("town")
	
	
	
	if (!character.party) {
    send_party_request("haiz");
	}

	if (character.party && character.party != "haiz" ) {
    leave_party();
	}
	
if (!character.party)return	

if (smart.moving && receivedData && typeof receivedData === 'object' && receivedData.message === "location") {
        const Map = receivedData.map;  // Lấy tên bản đồ
        const X = receivedData.x;      // Lấy tọa độ X
        const Y = receivedData.y;      // Lấy tọa độ Y	
     if ( character.map == Map && distance(character, {x: X, y: Y}) < 150 ) xmove(X, Y); ////dưng lai khi duoc dich chuyen
	    
 }

	
if (leader && distance(character, leader) < 130) return



	
    // Nếu nhân vật đang di chuyển, không làm gì thêm
    if (smart.moving) return;
let leaderfram = get_player(nhanvatfram);
if (framfocus == 1 && leaderfram && distance(character, leaderfram) < 230 && distance(character, leader) < 230 && get_nearest_monster({type:crepp}))
{
	kitefram = 1
	return
}else kitefram = 0
	
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

}, 1000);








function on_magiport(name){
    if(name == "nhiY"){
        accept_magiport(name);
	    stop() 
    }
}


//////////////
function on_cm(name, data) {


/////////////////////		
	    if(name == "haiz" || name == "6gunlaZe")
	{
       if(data == "bosshelp") {

 if (!is_on_cooldown("partyheal") && character.mp > 450)use_skill("partyheal");

		 }

	}
///////////////////
    if(name == "haiz"){

		if (data == "goo" && character.map != "crypt")enter("crypt",idmap);

	}
	
	 if(name == "haiz" && data != "goo" && typeof data === 'string' ){
     idmap = data

	}
	
	 if(name == "haiz" && data != "goo" ){
     receivedData = data

	}
	
	
}
////////////////////////////////
/// check boss khi fram
setInterval(function() {

	
	
	if(character.esize < 10)
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


}, 20000);




/////////////////////////////////

setInterval(() => {
	skill_scare()
	
	if (character.ping > 600 )
{
	delayThreshold = character.ping / 2
}
	else
{
	delayThreshold = 220
}
	
	if (started == undefined) started = Date.now()
    if ( Date.now() < started + 1000) return
	if(is_on_cooldown("use_hp")) return 

if (character.hp < 2100 && character.mp > 100) {
     if(can_use("use_hp"))use_skill("use_hp");
	        started = Date.now()
	 game_log("use_hp");
} 
else if (character.mp/character.max_mp < 0.9) {
	  if(can_use("use_mp"))use_skill("use_mp");
	        started = Date.now()
	 game_log("use_mp");
}
  else if (character.max_mp>character.mp && can_use("use_mp") ) 
  {
	  use_skill("regen_mp");      
	started = Date.now();
	  return
  }
  else if (character.max_mp>character.mp && can_use("use_mp") ) 
  {
	  use_skill("regen_mp");    
	started = Date.now();
	  return
  }
	
}, 200);









setInterval(function() {

 if (character.rip) { ///////auto hoi sinh
    respawn();
  }


}, 50000);







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







function lowest_health_partymember() {
    var party = [];
    if (parent.party_list.length > 0) {
		for(id in parent.party_list)
		{
			var member = parent.party_list[id];
			var entity = parent.entities[member];
			
			if(member == character.name)
			{
				entity = character;
			}
			
			if(entity != null && ( distance(character,{x: entity.real_x, y: entity.real_y}) < character.range))
			{
					//	game_log(entity.name + "1");
				party.push({name: member, entity: entity});
			}
		}
    }
	else
	{
		//Add Self to Party Array
		party.push(
		{
			name: character.name,
			entity: character
		});
	}

    //Populate health percentages
    for (id in party) {
        var member = party[id];
        if (member.entity != null) {
            member.entity.health_ratio = member.entity.hp / member.entity.max_hp;
        }
        else {
            member.health_ratio = 1;
        }
    }
	
    //Order our party array by health percentage
    party.sort(function (current, next) {
        return current.entity.health_ratio - next.entity.health_ratio;
    });
	

    //Return the lowest health
    return party[0].entity;
}




function lowest_health_partymember1() {
    var party = [];
    if (parent.party_list.length > 0) {
		for(id in parent.party_list)
		{
			var member = parent.party_list[id];
			var entity = parent.entities[member];
			
			if(member == character.name)
			{
				entity = character;
			}
			
			if(entity != null && ( distance(character,{x: entity.real_x, y: entity.real_y}) < 300))
			{
					//	game_log(entity.name + "1");
				party.push({name: member, entity: entity});
			}
		}
    }
	else
	{
		//Add Self to Party Array
		party.push(
		{
			name: character.name,
			entity: character
		});
	}

    //Populate health percentages
    for (id in party) {
        var member = party[id];
        if (member.entity != null) {
            member.entity.health_ratio = member.entity.hp / member.entity.max_hp;
        }
        else {
            member.health_ratio = 1;
        }
    }
	
    //Order our party array by health percentage
    party.sort(function (current, next) {
        return current.entity.health_ratio - next.entity.health_ratio;
    });
	

    //Return the lowest health
    return party[0].entity;
}





setInterval(function() {
    let lootMule = get_player("MuaBan");

		 //giui vang when in range
    var merch = get_player("MuaBan"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) {
        send_gold(merch,character.gold)
    }
	//
	
    if (lootMule == null || stopgiudo == 1) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }

    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","harbringer","jacko","slimestaff","orbg","froststaff","firestaff","wbook1"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);
































var attack_mode=true

setInterval(function(){

	loot();
if (checkTimeBetweenCalls() === 1) return;

///////////////////////////////////////////////	hoi mau
	    var lowest_health = lowest_health_partymember();
	    var lowest_health1 = lowest_health_partymember1();
	//	game_log(lowest_health.name +">>>>>  "+lowest_health.name );

	
	if (character.id == "angioseal"){
		rateheal =0.9
	}
	else
	{
		rateheal = 0.8
	}
    //If we have a target to heal, heal them
    if (lowest_health != null && lowest_health.health_ratio < rateheal) {
        if ( distance(character,{x: lowest_health.real_x, y: lowest_health.real_y}) < character.range) {
            heal(lowest_health);
				 game_log("hoi mau!!!!!");

        }
	}
	
    if (lowest_health1 != null && lowest_health1.health_ratio < 0.6) {
	    if ( Date.now() > delayaoe + 260)
	    {
                use_skill("partyheal");
		    delayaoe  = Date.now()
				 game_log("hoi mau ALL !!!!!");
	    }
	}

	
if( character.rip || character.moving || smart.moving) return;
	
	
///////////////////////////	
////	khong move gan leader se khong tim muc tieu tan cong	
const leader1 = get_player('haiz');
const range1 = character.range; // This may need tuning
const dist1 = distance(character, leader1);
if (dist1 > range1 * 2)
  return false;	
/////////////////	

if(!attack_mode || character.rip ) return;


//	if (leader1 && dist1 < 200 && leader1.hp > 5000  && character.mp > 300 && character.targets >= 1 && !is_on_cooldown("absorb")   )use_skill("absorb", "haiz");

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
    
		///////////
		var cung1 = get_player("haiz"); 
	var cung = get_player(nhanvatfram); 
if ( currentTarget && cung1 && (distance(character,cung1) < character.range) && kitefram == 0) {
	if(!can_attack(currentTarget) )kite(cung1,50);
   }
if ( currentTarget && cung && kitefram == 1) {
	if(!can_attack(currentTarget) )kite(cung,15);
   }
	
	////////////
	if ( currentTarget && character.mp > 1200 &&  !is_on_cooldown("darkblessing") && !character.s["darkblessing"] )use_skill('darkblessing')

//////////// dung skill
	
	 	var target1= get_nearest_monster({type: "franky",});
		    if(target1&& character.mp > 500 && !is_on_cooldown("curse") &&  !target1.s["cursed"] )
            {
                use_skill("curse", target1);
				 game_log("curse - lowstart !!!!!!");
            }	

	 	var target2= get_nearest_monster({type: "icegolem",});
		    if(target2&& character.mp > 500 && !is_on_cooldown("curse") &&  !target2.s["cursed"] )
            {
                use_skill("curse", target2);
				 game_log("curse - lowstart !!!!!!");
            }		
	
	 	var target3= get_nearest_monster({type: "crabxx",});
		    if(target3&& character.mp > 500 && !is_on_cooldown("curse") &&  !target3.s["cursed"] )
            {
                use_skill("curse", target3);
				 game_log("curse - lowstart !!!!!!");
            }		
	
	
	
	
		    if(currentTarget&& character.mp > 500 && !is_on_cooldown("curse") && currentTarget.target == "haiz" &&  !currentTarget.s["cursed"] )
            {
                use_skill("curse", currentTarget);
				 game_log("curse - lowstart !!!!!!");
            }
	
 if(currentTarget)chuyendoithongminh(currentTarget)	
////////////////////////
var target11= get_nearest_monster1({type: crepp,  NO_target: 1});	
if (!target1 && character.targets <= 8 && target11 && character.hp > 3000)
{
	change_target(target11)
      if(can_attack(target11))attack(target11);
       return
}
	
	
////////////////////////	
	if( currentTarget && !is_in_range(currentTarget))
	{
		move(
			character.x+(currentTarget.x-character.x)/2,
			character.y+(currentTarget.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(currentTarget) && currentTarget.target)
	{

		set_message("Attacking");
		attack(currentTarget);
	}
	

},1000/8); // Loops every 1/4 seconds.



























////////////
setInterval(function() {

skill_scare();

}, 200);



function skill_scare() {
	
if (is_on_cooldown("scare")) 
{
	changeitem({ slot: "orb", name : "orbg", level : 3 });
}
	
if (character.targets == 0) {
	return;
}

if (character.targets >= 1 && character.hp < 3000 && !is_on_cooldown("scare") ) 
{
	changeitem({ slot: "orb", name : "jacko", level : 1 });
	use_skill("scare");
	game_log("skill scare");

}
}



function changeitem(options = {}) {
	

	if ( !options.slot ||  !options.name || !options.level ) return 
	if (character.slots[options.slot])
	{
	if (character.slots[options.slot].name == options.name) return 
	}	
////////	
	if (delayitem == undefined) delayitem = Date.now()
	if (Date.now() < 300 + delayitem) return 
	delayitem = Date.now()
	checkTimeBetweenCalls(1);  // Thiết lập thời gian mốc

//////////		
	
	
	let vitri = 100
	
	        for (let i = 0; i < character.isize; i++) {
            const item = character.items[i]
            if (!item) continue // No item in this slot

            if (item.name == options.name && item.level == options.level) {
                // This is an item we want to use!
                    vitri = i //tim ra vi tri mon do
            }
				
			}
				
	if (vitri == 100 ) return ///ko co mon do dung yeu cau
	
	
	
	
	if (!character.slots[options.slot] || character.slots[options.slot].name != options.name) { 
        unequip(options.slot);
        equip(vitri, options.slot); 
		 game_log("change: " + options.name)
    }
	

//	changeitem({ slot: "mainhand", name : "firebow", level : 6 });
}
















function chuyendoithongminh(taget)
{

if (character.id == "Ynhi")changeitem({ slot: "mainhand", name : "harbringer", level : 8 });		
	

//////////////////////////////
}












/////
function get_nearest_monster1(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=character.range ,target=null;

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
		if(args.path_check && !can_move_to(current)) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) min_d=c_dist,target=current; //lua chon quai vat gan nhat
	}
	return target;
}











// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
