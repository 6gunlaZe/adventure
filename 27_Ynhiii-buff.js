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
var crepp = "odino"
let receivedData
let delayaoe  = Date.now()
let framfocus = 1  //tập trung quanh 1 nhân vật khi fram
var nhanvatfram = "haiz"
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
	let tranferr = get_player("nhiY");

	if ( character.map == "winterland" && distance(character, {x: 800, y: 400}) < 250 && !leader  ){
	use_skill("town")
	 return	
	}
	
	if (!character.party) {
    send_party_request("haiz");
	}

	if (character.party && character.party != "haiz" ) {
    leave_party();
	}
	
if (!character.party)return	

if (smart.moving && receivedData && typeof receivedData === 'object' && receivedData.message === "location" && tranferr) {
        const Map = receivedData.map;  // Lấy tên bản đồ
        const X = receivedData.x;      // Lấy tọa độ X
        const Y = receivedData.y;      // Lấy tọa độ Y	
     if ( character.map == Map && distance(character, {x: X, y: Y}) < 150 ) xmove(X, Y); ////dưng lai khi duoc dich chuyen
	    
 }

let leaderfram = get_player(nhanvatfram);
if (framfocus == 1 && leaderfram && distance(character, leaderfram) < 230 && distance(character, leader) < 230 && get_nearest_monster({type:crepp}))
{
	kitefram = 1
	return
}else kitefram = 0
	
	
if (leader && distance(character, leader) < 130) return



	
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
	if ( targetMap == "goobrawl" && character.map !== targetMap) parent.socket.emit('join', { name: "goobrawl" });
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

 if (!is_on_cooldown("partyheal") && character.mp > 550)use_skill("partyheal");

		 }

	}
///////////////////
    if(name == "haiz"){

		if (data == "goo" && character.map != "crypt")enter("crypt",idmap);
		if (data == "goo1" && character.map != "tomb")enter("tomb",idmap);
		if (data == "goo2" && character.map != "winter_instance")enter("winter_instance",idmap);

	}
	
	 if(name == "haiz" && data != "goo" && data != "goo1" && data != "goo2" && typeof data === 'string' ){
     idmap = data

	}
	
	 if(name == "haiz" && data != "goo" && data != "goo1" && data != "goo2" ){
     receivedData = data

	}
	
	
}
////////////////////////////////
/// check boss khi fram
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
						//game_log("so luong  la "+soluongmp);

            }
            if (item.name == "hpot1" ) {
                // This is an item we want to use!
                    soluonghp += item.q//tim ra vi tri mon do
						//game_log("so luong  la "+soluonghp);

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


}, 40000);




/////////////////////////////////

setInterval(() => {
	
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
if ((character.max_mp-character.mp) <300)use_skill("partyheal");

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





function degToRad(deg) {
    return deg * Math.PI / 180;
}

let checkwwall = 1;
const maxAttempts = 5;

// Góc phụ để thử nếu hướng chính bị chặn (theo độ lệch nhỏ hơn)
const extraAngles = [20, 35, 70].map(degToRad); // + (rồi đảo thành - sau)

function kite(taget, kite_range = 20) {
    if (smart.moving || !taget) return;

    const originalPosition = {
        x: taget.real_x,
        y: taget.real_y
    };

    for (let i = 0; i < maxAttempts; i++) {
        const radius = kite_range + i * 5;
        const angleFromTarget = Math.atan2(character.y - taget.real_y, character.x - taget.real_x);

        // 1️⃣ Ưu tiên hướng chính (theo checkwwall)
        const mainOffset = degToRad(51.4) * checkwwall;
        const mainAngle = angleFromTarget + mainOffset;

        const mainGoal = {
            x: taget.real_x + radius * Math.cos(mainAngle),
            y: taget.real_y + radius * Math.sin(mainAngle)
        };

        if (can_move_to(mainGoal.x, mainGoal.y)) {
            move(mainGoal.x, mainGoal.y);
            return;
        }

        // 2️⃣ Nếu không đi được, thử các góc phụ (±20°, ±35°, ±70°)
        for (let angle of extraAngles) {
            for (let dir of [1, -1]) {
                const offset = angle * dir;
                const tryAngle = angleFromTarget + offset;
                const tryGoal = {
                    x: taget.real_x + radius * Math.cos(tryAngle),
                    y: taget.real_y + radius * Math.sin(tryAngle)
                };

                if (can_move_to(tryGoal.x, tryGoal.y)) {
                    // ✅ Nếu hướng phụ thành công → đảo hướng chính cho lần sau
                    checkwwall *= -1;
                    move(tryGoal.x, tryGoal.y);
                    return;
                }
            }
        }
    }

    // ❗Fallback: nếu tất cả đều thất bại → dùng vị trí trong receivedData
    if (receivedData && typeof receivedData === 'object' && receivedData.message === "location") {
        const targetMap = receivedData.map;
        const targetX = receivedData.x;
        const targetY = receivedData.y;

        if (character.map !== targetMap && character.map !== "crypt") {
            smart_move({ map: targetMap, x: targetX, y: targetY });
        } else {
            xmove(targetX, targetY);
        }
    }
}








	let delayitem2 = Date.now()
	let delayitem1 = Date.now()


function lowest_health_partymember() {
	if (Date.now() < 300 + delayitem2) return;
	delayitem2 = Date.now();

	let party = [];

	// Lấy các thành viên trong party nếu có
	if (parent.party_list.length > 0) {
		for (let id in parent.party_list) {
			let member = parent.party_list[id];
			let entity = parent.entities[member];

			if (member == character.name) entity = character;

			if (entity && distance(character, { x: entity.real_x, y: entity.real_y }) < character.range) {
				party.push({ name: member, entity: entity });
			}
		}
	} else {
		// Không có party, thêm chính mình
		party.push({ name: character.name, entity: character });
	}

	// THÊM: nếu có quái "fieldgen0" bị thương nặng thì đưa vào danh sách
	let fieldgen0 = get_nearest_monster({ type: "fieldgen0" });
	if (fieldgen0 && (fieldgen0.hp / fieldgen0.max_hp) <= 0.6) {
		party.push({ name: "fieldgen0", entity: fieldgen0 });
	}

	// Tính tỉ lệ máu
	for (let id in party) {
		let member = party[id];
		if (member.entity) {
			member.entity.health_ratio = member.entity.hp / member.entity.max_hp;
		} else {
			member.entity = { health_ratio: 1 }; // giả lập
		}
	}

	// Sắp xếp theo tỉ lệ máu tăng dần
	party.sort(function (a, b) {
		return a.entity.health_ratio - b.entity.health_ratio;
	});

	// Trả về entity có máu thấp nhất
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

    let itemsToExclude = ["hotchocolate","elixirluck","snowball","wbookhs","mittens","handofmidas","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","harbringer","jacko","slimestaff","tigerstone","froststaff","wbook1"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);











setTimeout(function() {
    changeitem({ slot: "orb", name : "tigerstone", level : 3 });
}, 3000);



changeitem({ slot: "gloves", name : "mittens", level : 9 });


setInterval(function() {
lootAllChests()
}, 4000);

function shifting() {
    shift(0, 'xpbooster');
//changeitem({ slot: "gloves", name : "mittens", level : 9 });
equipSet('nogold');
}

function lootAllChests() {
    let chests = get_chests();
    let chestIds = Object.keys(chests);

    if (chestIds.length > 10 && character.cc < 200 ) {
	//changeitem({ slot: "gloves", name : "handofmidas", level : 7 });
        equipSet('gold');
	    if (character.slots["gloves"] && character.slots["gloves"].name == "handofmidas"){
	  shift(0, 'goldbooster');   
        for (let id of chestIds) {
            loot(id);
        }
	 setTimeout(shifting, 550);  
	    }
	 
    }
    
}








let delayBug = Date.now() 	
var attack_mode=true

setInterval(function(){

	// loot();
if (checkTimeBetweenCalls() === 1) return;

///////////////////////////////////////////////	hoi mau
	let didHealParty = false;
	    var lowest_health = lowest_health_partymember();
	    var lowest_health1 = lowest_health_partymember1();
	//	game_log(lowest_health.name +">>>>>  "+lowest_health.name );

	
	if (character.id == "angioseal"){
		rateheal =0.9
	}
	else
	{
		rateheal = 0.85
	}
    //If we have a target to heal, heal them
    if (lowest_health != null && lowest_health.health_ratio < rateheal) {
        if ( distance(character,{x: lowest_health.real_x, y: lowest_health.real_y}) < character.range) {
            heal(lowest_health);
				// game_log("hoi mau!!!!!");
                  didHealParty = true;
        }
	}
	
    if (lowest_health1 != null && lowest_health1.health_ratio < 0.6 && character.mp > 650) {
	    if ( Date.now() > delayaoe + 260)
	    {
                use_skill("partyheal");
		    delayaoe  = Date.now()
				// game_log("hoi mau ALL !!!!!");
	    }
	}

// hồi máu cho người chơi xung quanh
if (!didHealParty) { 
    const targetToHeal = Object.values(parent.entities)
        .filter(entity =>
            entity.player &&
            entity.visible &&
	    get_nearest_monster({type: "franky"}) &&
            !entity.dead &&
            entity.hp < entity.max_hp * 0.4 && 
            distance(character, entity) <= 50
        )
        .reduce((lowest, mob) => (!lowest || mob.hp < lowest.hp) ? mob : lowest, null);

    if (targetToHeal) {
        heal(targetToHeal);
       // game_log("heal mob!!! ");
    }
}



	
	
if( character.rip || smart.moving) return;
	
	
///////////////////////////	
////	khong move gan leader se khong tim muc tieu tan cong	
const leader1 = get_player('haiz');
const range1 = character.range; // This may need tuning
const dist1 = distance(character, leader1);
/////////////////	

if(!attack_mode || character.rip ) return;
if (Date.now() < delayBug +1000 ) return	

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
			//game_log("🟢🔵 Move 0: okeeeee!")
if ( currentTarget && cung1 && (distance(character,cung1) < character.range) && kitefram == 0) {
	if(!can_attack(currentTarget) )
	{
		// game_log("🟢 Move 1: Checked!")
		if (currentTarget.mtype == "franky" || currentTarget.mtype == "nerfedmummy" )
		{
			//game_log("🔵 Move 3: Pending")
		kite(cung1,30);
		}
		else
		{
			//game_log("🟠 Move 4: Completed")
		kite(cung1,50);	
		}
	}
	else
	{
		kite(cung1,40);
	}
   }
else if (cung1 && (distance(character,cung1) < 300 )  )
	{
		//game_log("🟡 Move 2: In Progress")
				kite(cung1,30);
	}
	else
{
			//game_log("🟡🟠 Move 7: In")
				kite(cung1,25);
}


	
if ( currentTarget && cung && kitefram == 1) {
	if(!can_attack(currentTarget) )kite(cung,25);
   }

	
	
	////////////
	if ( currentTarget && character.mp > 1200 &&  !is_on_cooldown("darkblessing") && !character.s["darkblessing"] )use_skill('darkblessing')
///////////////////////////	

  
if (character.party) {
    let party = get_party();
    let bestTarget = null;
    let highestThreat = 0;

    for (let char_name in party) {
        if (character.name == char_name) continue;

        let player = get_player(char_name);
        if (!player || player.rip) continue;

        let threats = Object.values(parent.entities).filter(e =>
            e.type === "monster" &&
            e.target === char_name &&
            !e.dead &&
            e.attack > 3500 &&
            distance(player, e) < 250
        );

        let threatCount = threats.length;
        if (threatCount === 0) {
           // log(`❌ Bỏ qua ${char_name} - không bị quái nào tấn công`);
            continue;
        }

        let score = threatCount * 2;

        if (player.hp < 8500) {
            score += 2;
            // log(`⚠️ ${char_name} đang thấp máu (${player.hp}/${player.max_hp})`);
        }

        if (distance(character, player) > 240) {
            // log(`❌ Bỏ qua ${char_name} - quá xa`);
            continue;
        }

        // log(`🔍 Đánh giá ${char_name} | Quái: ${threatCount}, HP: ${player.hp}, Điểm: ${score}`);

        if (score > highestThreat) {
            highestThreat = score;
            bestTarget = char_name;
        }
    }

    // Chỉ absorb nếu có mục tiêu và priest đủ máu
    if (bestTarget) {
        if (!is_on_cooldown("absorb")) {
            if (character.hp >= 8500) {
                log(`🛡 Dùng absorb lên ${bestTarget} (điểm: ${highestThreat})`);
                use_skill("absorb", bestTarget);
            } else {
                log(`❌ Không dùng absorb - HP priest thấp (${character.hp}/${character.max_hp})`);
            }
        } else {
          //  log(`⏳ absorb đang hồi chiêu`);
        }
    } else {
      //  log("✅ Không có ai cần absorb lúc này.");
    }
}




	

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
	
	
	var target1xc= get_nearest_monster1({comuctieu: 1 ,  lonnhat: 1});  //nhonhat : 1
		    if(target1xc&& character.mp > 500 && !is_on_cooldown("curse") &&  !target1xc.s["cursed"] && character.map != "winter_instance" )
            {
                use_skill("curse", target1xc);
				 game_log("curse - low!!!!!!");
            }

	
		    if(currentTarget&& character.mp > 500 && !is_on_cooldown("curse") && currentTarget.target == "haiz" &&  !currentTarget.s["cursed"] && character.map != "winter_instance")
            {
                use_skill("curse", currentTarget);
				 game_log("curse - lowstart !!!!!!");
            }
	
 if(currentTarget)chuyendoithongminh(currentTarget)	
////////////////////////
var checkvar = get_player("6gunlaZe"); 
	
var target11= get_nearest_monster1({type: crepp, subtype: "bigbird" , NO_target: 1});

	if (checkvar && cung1 ){
if (!target1 && character.targets <= 6 && target11 && character.hp/character.max_hp > 0.75 && cung1.hp > 12700 && cung1.mp > 200) //////////////////////////////////////////////////////////////////////////////hút quái cho framer
{
	change_target(target11)
      if(can_attack(target11))attack(target11);
       return
}
	}
	else
	{
if (!target1 && character.targets <= 1 && target11 && character.hp > 4000) //////////////////////////////////////////////////////////////////////////////hút quái cho framer
{
	change_target(target11)
      if(can_attack(target11))attack(target11);
       return
}
	}
	
////////////////////////	
	if( currentTarget && !is_in_range(currentTarget))
	{
		// Walk half the distance
	}
	else if(can_attack(currentTarget) && currentTarget.target)
	{

		set_message("Attacking");
		attack(currentTarget);
	}
	

},1000/8); // Loops every 1/4 seconds.















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
parent.api_call("disconnect_character", {name: "Ynhi"});
stop_character("Ynhi")	
}


	
    // Đây là công việc bạn muốn thực hiện mỗi 1 giây
    console.log("Vòng lặp chạy mỗi giây...");
}

// Thiết lập vòng lặp mỗi 1 giây (1000ms)
setInterval(checkPVPandARENA, 1000); // 1000ms = 1 giây







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








function chuyendoithongminh(taget)
{

// if (character.id == "Ynhi")changeitem({ slot: "mainhand", name : "harbringer", level : 9 });		
	

//////////////////////////////
}












/////
function get_nearest_monster1(args)
{
    if (!args) args = {};
    if (args && args.target && args.target.name) args.target = args.target.name;
    if (args && args.type == "monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
    if (args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

    var army = [args.subtype, args.type, "scorpion"];
    var min_d = character.range, target = null;

    // HP mặc định cho lọc
    let hpp = args.nhonhat ? 1000000000 : 0; // Nếu nhonhat thì bắt đầu từ lớn, nếu lonnhat thì từ nhỏ

    for (let id in parent.entities)
    {
        let current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;

        // Kiểm tra mtype
        if (args.subtype && args.type && army.indexOf(current.mtype) === -1) continue;
        if (!args.subtype && args.type && current.mtype !== args.type) continue;

        if (args.min_xp && current.xp < args.min_xp) continue;
        if (args.max_att && current.attack > args.max_att) continue;
        if (args.target && current.target !== args.target) continue;
        if (args.no_target && current.target && current.target !== character.name) continue;
        if (args.NO_target && current.target) continue;
        if (args.comuctieu && !current.target) continue;
        if (args.path_check && !can_move_to(current)) continue;
        if (args.cus && !current.s["cursed"]) continue;

        let c_dist = parent.distance(character, current);

        // Tìm quái HP nhỏ nhất
        if (args.nhonhat && current.hp < hpp) {
            hpp = current.hp;
            target = current;
            continue;
        }

        // Tìm quái HP lớn nhất
        if (args.lonnhat && current.hp > hpp) {
            hpp = current.hp;
            target = current;
            continue;
        }

        // Nếu không lọc theo HP, chọn con gần nhất
        if (!args.nhonhat && !args.lonnhat && c_dist < min_d) {
            min_d = c_dist;
            target = current;
        }
    }

    return target;
}



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
	{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "helmet1", slot: "helmet", level: 9, l: "l" },
        { itemName: "sweaterhs", slot: "chest", level: 8, l: "l" },
    ],
    gold: [
        { itemName: "handofmidas", slot: "gloves", level: 7 },
    ],
    luck: [ //quái đang mạnh quá sức nên giảm luck
	{ itemName: "lmace", slot: "mainhand", level: 7, l: "l" },
        { itemName: "oxhelmet", slot: "helmet", l: "l" },
        { itemName: "spookyamulet", slot: "amulet", l: "l"},
	{ itemName: "mshield", slot: "offhand", level: 7, l: "l" },
        { itemName: "cdragon", slot: "chest", l: "l" },
        { itemName: "rabbitsfoot", slot: "orb", level: 0, l: "l" },
    ],
    healmax: [
	{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "coat", slot: "chest", level: 10, l: "l" },
        { itemName: "exoarm", slot: "offhand", level: 1, l: "l" },
    ],
    fram: [
	{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "sweaterhs", slot: "chest", level: 8, l: "l" },
      //  { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
        { itemName: "exoarm", slot: "offhand", level: 1, l: "l" },
        { itemName: "helmet1", slot: "helmet", level: 9, l: "l" },
        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "tigerstone", slot: "orb", level: 3},	    
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
    Unluck: [
        { itemName: "helmet1", slot: "helmet", level: 9, l: "l" },
        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "coat", slot: "chest", level: 10, l: "l" },	  
	{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "tigerstone", slot: "orb", level: 3},	    
        { itemName: "exoarm", slot: "offhand", level: 1, l: "l" },

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









function scare() {
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);
    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;

    for (id in parent.entities) {
        var current = parent.entities[id];
        if ((character.hp < 4700 || (smart.moving && character.map != "crypt") ) && current.target == character.name) {
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
let checkluckk = 0;

function ChuyendoiITEM() {
     const leader = get_player("haiz");
     const damer = get_player("6gunlaZe");
	const currentTime = performance.now();
const mobsInRange = Object.values(parent.entities).filter(entity => 
    entity.visible &&
    entity.target === character.name &&
    !entity.dead &&
    distance(character, entity) <= 100
);

// Tách theo loại damage
const physicalMobs = mobsInRange.filter(mob => mob.damage_type === "physical");
const magicalMobs = mobsInRange.filter(mob => mob.damage_type === "magical");
// Tách theo máu
const lowHpMobs = mobsInRange.filter(mob =>
    mob.hp < 6000 &&
    mob.target === character.name &&
    leader &&
    distance(character, leader) <= 100 &&
    mob.mtype !== "nerfedmummy" &&
    mob.mtype !== "nerfedbat"
);

	

	if (currentTime - eTime < 50)return

	if((character.max_hp < 10000 && character.hp/character.max_hp < 0.9 && lowHpMobs.length == 0) ||  (character.max_hp < 10000 && character.hp/character.max_hp < 0.75))
	{
        eTime = currentTime;
        equipSet('fram');	
		return
	}

	
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

	if(checkheall == 0 && character.hp/character.max_hp > 0.65 && ((leader && leader.hp < 10000) || (damer && damer.hp < 5000)))
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

	if(lowHpMobs.length == 0 && checkluckk > 0)
	{
        eTime = currentTime;
        game_log("🎯 Unluck"); 	
        equipSet('Unluck');	
		checkluckk -= 1
		return
	}


if ( lowHpMobs.length >= 1) {
	eTime = currentTime;
        game_log("🔄 luck") ;	
        equipSet('luck');
	checkluckk =5
	return
}

	
if ( physicalMobs.length >= 1 && checkheall == 0 && checkdef == 0) {
	eTime = currentTime;
        equipSet('vatly');
}
else if (magicalMobs.length >= 1 && character.hp/character.max_hp < 0.65)
	{
	eTime = currentTime;
        equipSet('phep');
	}

}

setInterval(ChuyendoiITEM, 70);








// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
