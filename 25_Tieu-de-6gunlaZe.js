// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
////////////////
//// start_character("nhiY", 2); /// start_character("MuaBan", 6);
////  parent.api_call("disconnect_character", {name: "MuaBan"});
///  stop_character("MuaBan");
/// start_character("haiz", 7); 
const TenMinutesInMs = 10 * 60 * 1000
let started
let numHP = 0
let numMP = 0
var idmap
let receivedData
let delayboss = Date.now()






//////////// move gan leader
setInterval(function() {

	    let leader = get_player("haiz");
	

	
	if (!character.party) {
    send_party_request("haiz");
	}

	if (character.party && character.party != "haiz" ) {
    leave_party();
	}
	

	
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

	
	
}, 500);

///////////



function on_cm(name, data) {


	
	
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









function getBestTargets(options = {}) {
    const entities = []

    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
 if (options.type && entity.mtype !== options.type) continue
		
		
        entities.push(entity)
    }

    // We can prioritize the entities however we want now, whereas before it was only by distance
    entities.sort((a, b) => {
        // Has a target -> higher priority
        if (a.target && !b.target) return -1
        if (b.target && !a.target) return 1

        // Lower HP -> higher priority
        if (a.hp !== b.hp) return a.hp - b.hp

        // Closer -> higher priority
        const d_a = distance(character, a)
        const d_b = distance(character, b)
        if (d_a !== d_b) return d_a - d_b

        return 0
    })

    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}













////

function use_hp_or_mp1()
{


	if (started == undefined) started = Date.now()
    if ( 1 > 2 && Date.now() > started + TenMinutesInMs) {
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


if (character.hp/character.max_hp< 0.8 && character.mp > 50) {
   use_skill("use_hp");
	numHP += 1
} 
else if (character.mp/character.max_mp < 0.7) {
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
	

//
function on_party_request(name) {
        if (name == "MuaBan" || name == "nhiY"  || name == "haiz" || name == "angioseal") {
            accept_party_request(name);
        }
    }








var attack_mode= true

setInterval(function(){

	//use_hp_or_mp();
	use_hp_or_mp1();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;

	//  var target=get_targeted_monster();
	// lua chon 2 loai quai de fram
	
		const entity1 = get_entity(character.target) // co the doi taget thu cong
	
	 var target
	

	
		////	khong move gan leader se khong tim muc tieu tan cong	
const leader1 = get_player('haiz');
const range1 = character.range; // This may need tuning
const dist1 = distance(character, leader1);
if (dist1 > 260)
  return false;	
/////////////////	

    // Current target and target of leader.
    var currentTarget = get_targeted_monster();
    var leaderTarget = get_target_of(leader1)
    
    // Change the target.
    if (!currentTarget || currentTarget != leaderTarget){ 
        // Current target is empty or other than the leader's.
        change_target(leaderTarget);
        currentTarget = get_targeted_monster();
    }
	
////////////	



	if(!currentTarget)
	{
		var currentTarget1 = get_nearest_monster_solobosskill() 
		if(currentTarget1) {

 if (is_in_range(currentTarget1, "supershot") && character.mp > 500 && currentTarget1.hp >10000  && !is_on_cooldown("supershot") && Date.now() > delayboss + 100000 ) {
                delayboss = Date.now()
                use_skill("supershot", currentTarget1);
                game_log("Supershot!!");
           }			

			
		}
	}	



	
    /// su dung skill supershot lên quai trong và ngoai tam ban

	
	
if(currentTarget && (character.mp > G.skills.huntersmark.mp) && is_in_range(currentTarget, "huntersmark") && !is_on_cooldown("huntersmark") && !currentTarget.s.marked && (currentTarget.hp > (character.attack * 10)) )
    {
        use_skill("huntersmark", currentTarget);
        game_log("huntersmark!!");   
	}	

	


	//distance(character, entity)
	if(!is_in_range(currentTarget) && currentTarget)
	{
///////////// di chuyen toi thieu hieu qua toi da		
var khoangcach =  (distance(character, {x: currentTarget.real_x, y: currentTarget.real_y}))  ;	var kcconthieu1 =  (distance(character, {x: currentTarget.real_x, y: currentTarget.real_y}) +1) - character.range + (5);	
var kcconthieu =  (distance(character, {x: currentTarget.real_x, y: currentTarget.real_y}) +1) - character.range + 50*(kcconthieu1/character.range);

		
		
		xmove(
		character.x+(currentTarget.x-character.x)*(kcconthieu/khoangcach),
		character.y+(currentTarget.y-character.y)*(kcconthieu/khoangcach)
			);
		// Walk half the distance
	}
///////////////	
	
	else if(can_attack(currentTarget) && currentTarget.target)
	{
		set_message("Attacking");
		attack(currentTarget);
	}


	
	
	
	
	
	
},1000/8); // Loops every 1/4 seconds.





function solobosskill(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=[ "a2" , "a3", "a7", "vbat"]; 
	
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
        var bossarmy=[ "a2" , "a3", "a7", "vbat"]; 
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





setInterval(function() {
skill_scare()
}, 500);

function skill_scare() {
	
if (is_on_cooldown("scare")) 
{
	changeitem({ slot: "orb", name : "orbg", level : 3 });
}
	
if (character.targets == 0 || character.hp > 4000) {
	return;
}

if (character.targets >= 1 && character.hp < 3000 && !is_on_cooldown("scare") ) 
{
	changeitem({ slot: "orb", name : "jacko", level : 1 });
	use_skill("scare");
	game_log("skill scare");

}
	
if (character.targets >= 3 && !is_on_cooldown("scare") ) 
{
	changeitem({ slot: "orb", name : "jacko", level : 1 });
	use_skill("scare");
	game_log("skill scare");
}



	
}










// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
