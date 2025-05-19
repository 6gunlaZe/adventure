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
let cryts = 0
let receivedData

if (delayboss == undefined) delayboss = Date.now()



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

if (character.map != "crypt" || !leader)
{
cryts = 0	

	
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
	
	if (leader && distance(character, leader) < 40) return
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
cryts = 1	
}

}, 1000);








function on_magiport(name){
    if(name == "nhiY"){
        accept_magiport(name);
    }
}


//////////////
function on_cm(name, data) {


/////////////////////		
	    if(name == "haiz")
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





/////////////////////////////////

setInterval(() => {
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
	
}, 150);



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

changeitem({ slot: "gloves", name : "mittens", level : 9 });
	
 if (character.rip) { ///////auto hoi sinh
    respawn();
  }


}, 50000);



setTimeout(function() {
    changeitem({ slot: "orb", name : "tigerstone", level : 3 });
}, 3000);



changeitem({ slot: "gloves", name : "mittens", level : 9 });




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



	let delayitem2 = Date.now()
	let delayitem1 = Date.now()



function lowest_health_partymember() {
	if (Date.now() < 300 + delayitem2) return 
	delayitem2 = Date.now()
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
	if (Date.now() < 300 + delayitem1) return 
	delayitem1 = Date.now()
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





































var attack_mode=true

setInterval(function(){

	loot();

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
	
    if (lowest_health1 != null && lowest_health1.health_ratio < 0.6 && !is_on_cooldown("partyheal")
	&& character.mp>=G.skills.partyheal.mp) {
                use_skill("partyheal");
				 game_log("hoi mau ALL !!!!!");

	}

	
if( character.rip || smart.moving) return;
if (checkTimeBetweenCalls() === 1) return;	
	
///////////////////////////	
////	khong move gan leader se khong tim muc tieu tan cong	
const leader1 = get_player('haiz');
const range1 = character.range; // This may need tuning
const dist1 = distance(character, leader1);
if (dist1 > 200)
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
if ( currentTarget && cung1 && (distance(character,cung1) < character.range)) {
	//if(!can_attack(currentTarget) )kite(cung1,50);
   }
	
	////////////



if ( currentTarget && character.mp > 1200 &&  !is_on_cooldown("darkblessing") && !character.s["darkblessing"] )use_skill('darkblessing')
	
//////////// dung skill


	 	var target000= get_nearest_monster({type: "zapper000000000",});
		    if(target000&& character.mp > 500 && !is_on_cooldown("curse") &&  !target000.s["cursed"] )
            {
                use_skill("curse", target000);
				 game_log("curse - lowstart !!!!!!");
            }	
	
	
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
                    if (check_quai_A4_stop_attach() == 1) return
		set_message("Attacking");
		attack(currentTarget);
	}
	

},1000/5); // Loops every 1/4 seconds.


















function changeitem(options = {}) {
	

	if ( !options.slot ||  !options.name || !options.level ) return 
	if (character.slots[options.slot])
	{
	if (character.slots[options.slot].name == options.name && character.slots[options.slot].level == options.level) return 
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
///////////////////////////////////	 
if (taget && !taget.s["frozen"])
{	
changeitem({ slot: "mainhand", name : "froststaff", level : 8 });
}
	else
	{
if (character.id == "Ynhi")changeitem({ slot: "mainhand", name : "oozingterror", level : 8 });		
	}

//////////////////////////////
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

































////////////////////////////////////////////////////////////////////////////////
// Extra range to add to a monster's attack range to give more wiggle room
const rangeBuffer = 60;

// How far away we want to consider monsters
const calcRadius = 300;

// Types of monsters we want to avoid
const avoidTypes = ["a0","a2", "a3","a6", "a7","a8","a9","vbat"];

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
	if (cryts == 0)return
    if (drawDebug) {
        clear_drawings();
    }

    // Try to avoid monsters
    const avoiding = avoidMobs();

    if (!avoiding) {
        if ((!lastMove || new Date() - lastMove > 100)  && cryts > 0) {
		let host = get_player("haiz")
		const target = get_target();
                let check = !!target && !target.rip;

           if(host && !smart.moving && check && distance(character, host) > 120 )xmove(host.real_x, host.real_y); // Move to current position (no goal used)
	   else if (host && !smart.moving && !check )xmove(host.real_x, host.real_y);
            lastMove = new Date();
        }
    }

}
setInterval(avoidance, 70);


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
        if (calculatedRange > (character.range + 5)) {
            return character.range + 10;
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
// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland




/////////////////////////////////////////////////
/////////////////////////////////////////////////


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

    deff: [
        { itemName: "xhelmet", slot: "helmet", level: 7, l: "l" },
    ],
    nodeff: [
        { itemName: "helmet1", slot: "helmet", level: 9, l: "l" },
    ],
    gold: [
        { itemName: "handofmidas", slot: "gloves", level: 7 },
    ],
    luck: [
        { itemName: "crossbow", slot: "mainhand", level: 8, l: "l" },
        { itemName: "mittens", slot: "gloves", level: 9 },
	{ itemName: "alloyquiver", slot: "offhand", level: 8, l: "l" },
    ],
    healmax: [
        { itemName: "coat", slot: "chest", level: 10, l: "l" },
        { itemName: "exoarm", slot: "offhand", level: 1, l: "l" },
    ],
    fram: [
        { itemName: "sweaterhs", slot: "chest", level: 8, l: "l" },
        { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
    ],
    xp: [
        { itemName: "talkingskull", slot: "orb", level: 4, l: "l" },
        //{ itemName: "tshirt3", slot: "chest", level: 7, l: "l" },
    ],
    vatly: [
        { itemName: "exoarm", slot: "offhand", level: 1, l: "l" },
    ],
    phep: [
        { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
    ],
    orb: [
        { itemName: "orbofdex", slot: "orb", level: 5, l: "l" },
        //{ itemName: "tshirt9", slot: "chest", level: 7, l: "l" },
    ],
    nogold: [
        { itemName: "mittens", slot: "gloves", level: 9 },
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
        (player1 && player1.hp < 8000) ||
        (player2 && player2.hp < 5000) ||
        (player3 && player3.hp < 5000)
    ) {
        return 1;
    }

    return 0;
}
// if (check_viem_xung_quanh() == 1) targetedForMoreThanOneSecond = true;


function check_quai_A4_stop_attach() {
    var quai = get_nearest_monster({type: "a4"});
    if (quai && is_in_range(quai) && character.hp / character.max_hp < 0.7 && is_on_cooldown("scare")) {
        return 1;
    } else {
        return 0;
    }
}


function scare() {
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);
    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;

// if (check_viem_xung_quanh() == 1) targetedForMoreThanOneSecond = true;  ///chỉ mở lại khi muốn kill a4
	
    for (id in parent.entities) {
        var current = parent.entities[id];
        if ((   (current.mtype == 'zapper0' || current.mtype == 'a4' ) || character.hp < 4700 || (smart.moving && character.map != "crypt") ) && current.target == character.name) {
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




let eTime = 0;
let checkdef = 0;
let checkheall = 0;

function ChuyendoiITEM() {

     const leader = get_player("haiz");
     const damer = get_player("6gunlaZe");
	const currentTime = performance.now();
	if (currentTime - eTime < 50)return
	
	if(checkdef == 0 && character.hp/character.max_hp < 0.64)
	{
	checkdef = 1
        eTime = currentTime;
        equipSet('deff');	
		return
	}
	if(checkdef == 1 && character.hp/character.max_hp > 0.78)
	{
        eTime = currentTime;
        equipSet('nodeff');		
	checkdef = 0	
		return
	}

	if(checkheall == 0 && character.hp > 8000 && ((leader && leader.hp < 10000) || (damer && damer.hp < 5000)))
	{
	checkheall = 1
        eTime = currentTime;
        equipSet('healmax');
		return
	}
	if(checkheall == 1 && ((leader && leader.hp > 14000) && (damer && damer.hp > 7000)) )
	{
        eTime = currentTime;
        equipSet('fram');
	checkheall = 0	
		return
	}


const mobstype = Object.values(parent.entities)
    .filter(entity => 
        entity.visible && entity.target && entity.target == character.name &&  
        !entity.dead && entity.damage_type == "physical" &&  
        distance(character, entity) <= 100  // Kiểm tra nếu khoảng cách 
    );	
	
const mobstype1 = Object.values(parent.entities)
    .filter(entity => 
        entity.visible && entity.target && entity.target == character.name &&  
        !entity.dead && entity.damage_type == "magical" &&  
        distance(character, entity) <= 100  // Kiểm tra nếu khoảng cách 
    );		
	
	
if ( mobstype.length >= 1 && checkheall == 0 && checkdef == 0) {
	eTime = currentTime;
        equipSet('vatly');
}
else if (mobstype1.length >= 1 && character.hp < 8000)
	{
	eTime = currentTime;
        equipSet('phep');
	}

}

setInterval(ChuyendoiITEM, 100);









// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
