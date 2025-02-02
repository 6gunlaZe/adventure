let started
let started1
let move1 = 0
let framboss = 0
let framboss1 = 0
let delayboss
let timemax = 7 * 60 * 1000

let receivedData

if (delayboss == undefined) delayboss = Date.now()

//////////// move gan leader
setInterval(function() {

	////////// moi paty - de nhan dien leader
//let leader = character.party;
//if (leader===undefined) 
	if (!character.party) {
    send_party_request("haiz");

}
	///////////////////////// qua 7 phut ve haiz 1 lan
        if ( Date.now() > delayboss + timemax) {
		if(!parent.party_list.includes("haiz")) send_party_request("6gunlaZe");
            smart_move(parent.party["haiz"]); 
			delayboss = Date.now()
		}
	////////////// delay 5s de di chuyen theo ham framboss
	if (started1 == undefined) started1 = Date.now()
    if ( Date.now() < started1 + 5000) return		
	/////////////
  
	
	
		    let leader = get_player("haiz");

	if (leader && distance(character, leader) < 10  &&  is_moving(character) ){
		stop()
	}
	
	if (leader && distance(character, leader) < 30  && smart.moving ){
		stop()
	move(leader.x,leader.y)
	}
	
	if (leader && distance(character, leader) < 70) return
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

	
}, 1500);

///////////



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

	////////////////////////////////
 if(name == "haiz"){

	 if(data == "boss1") {
	  framboss = 1
	   }
	 if(data == "boss2") {
	  framboss = 2
	   }
	 if(data == "boss3") {
	  framboss = 3
	   }	 
	 if(data == "boss4") {
	  framboss = 4
	   }
	 if(data == "boss5") {
	  framboss = 5
	   }	 
	 if(data == "boss6") {
	  framboss = 6
	   }
	 if(data == "boss7") {
	  framboss = 7
	   }	 
 }
	//////////////////////////		
	
if(name == "haiz" && data != "goo" ){
     receivedData = data
}	
	
}






setInterval(function() {
	

if (framboss == 1 && framboss1 == 0 ){
	smart_move({ map: "spookytown", x: -728, y: -123 }, () => {
framboss1 += 1
    });
}
if (framboss == 2 && framboss1 == 0 ){
	smart_move({ map: "cave", x: 68, y: -1163 }, () => {
framboss1 += 1
    });
}	
if (framboss == 3 && framboss1 == 0){
	smart_move({ map: "cave",  x: 982, y: 105 }, () => {
framboss1 += 1
    });
}		
if (framboss == 4 && framboss1 == 0 ){
	smart_move({ map: "main", x: 1312, y: -200 }, () => {
framboss1 += 1
    });
}	
if (framboss == 5  && framboss1 == 0 ){
	smart_move({ map: "main", x: 700, y: 1800 }, () => {
framboss1 += 1
    });
}	
if (framboss == 6 && framboss1 == 0 ){
	smart_move({ map: "halloween", x: -140, y: 512 }, () => {
framboss1 += 1
    });
}	
if (framboss == 7 && framboss1 == 0 ){
	smart_move({ map: "main", x: -1137, y: 455 }, () => {
framboss1 += 1
    });
}	
	

}, 500);












/////////////////////////////////

setInterval(() => {
	skill_scare()
	if (started == undefined) started = Date.now()
    if ( Date.now() < started + 1000) return
	if(is_on_cooldown("use_hp")) return 

if (character.hp/character.max_hp< 0.3 && character.mp > 50) {
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
	
}, 150);









setInterval(function() {

 if (character.rip) { ///////auto hoi sinh
    respawn();
  }


}, 5000);









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
    let lootMule = get_player("haiz");

		 //giui vang when in range
    var merch = get_player("haiz"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) {
        send_gold(merch,character.gold)
    }
	//
	
    if (lootMule == null) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }

    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","harbringer","jacko","slimestaff","orbg","froststaff","firestaff"];

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

	if( character.rip || character.moving || smart.moving) return;
///////////////////////////////////////////////	hoi mau
	    var lowest_health = lowest_health_partymember();
	    var lowest_health1 = lowest_health_partymember1();
	//	game_log(lowest_health.name +">>>>>  "+lowest_health.name );

    //If we have a target to heal, heal them
    if (lowest_health != null && lowest_health.health_ratio < 0.8) {
        if ( distance(character,{x: lowest_health.real_x, y: lowest_health.real_y}) < character.range) {
            heal(lowest_health);
				 game_log("hoi mau!!!!!");

        }
	}
	
    if (lowest_health1 != null && lowest_health1.health_ratio < 0.5) {
                use_skill("partyheal");
				 game_log("hoi mau ALL !!!!!");

	}

	
	
	
///////////////////////////	
////	khong move gan leader se khong tim muc tieu tan cong	
const leader1 = get_player('haiz');
const range1 = character.range; // This may need tuning
const dist1 = distance(character, leader1);
if (dist1 > range1 * 2)
  return false;	
/////////////////	

if(!attack_mode || character.rip ) return;



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
if ( currentTarget && cung1 && (distance(character,cung1) < character.range)) {
	if(!can_attack(currentTarget) )kite(cung1,20);
   }
	
	////////////
	
//////////// dung skill
		    if(currentTarget && character.mp > 500 && !is_on_cooldown("curse") && currentTarget.target == "haiz" && !currentTarget.s["cursed"] )
            {
                use_skill("curse", currentTarget);
				 game_log("curse - lowstart !!!!!!");
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
	else if(can_attack(currentTarget) && currentTarget.target == "haiz")
	{

		set_message("Attacking");
		attack(currentTarget);
	}
	

},1000/8); // Loops every 1/4 seconds.































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

	

	if ( !options.slot ||  !options.name ) return 
	
	if (character.slots[options.slot])
	{
	if (character.slots[options.slot].name == options.name) return 
	}

	let vitri = 100
	
	        for (let i = 0; i < character.isize; i++) {
            const item = character.items[i]
            if (!item) continue // No item in this slot

            if (item.name == options.name && item.level == options.level) {
                // This is an item we want to use!
                    vitri = i //tim ra vi tri mon do
						game_log("vitri la "+vitri);

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

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
