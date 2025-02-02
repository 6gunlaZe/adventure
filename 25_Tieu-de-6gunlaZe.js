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


map_key("A", "toggle_run_code");
stop_character("haiz"); 


setInterval(function() {
if(parent.party_list.includes("nhiY")) stop_character("nhiY");  
//if(!parent.party_list.includes("haiz")) start_character("haiz", 11);
if(!parent.party_list.includes("angioseal")) start_character("angioseal", 24);
}, 40000); //40s trieu hoi 1 lan neu ko thay trong party, phai cho delay login




//////////// move gan leader
setInterval(function() {

	    let leader = get_player("haiz");
	if (leader && distance(character, leader) < 10  &&  is_moving(character) ){
		stop()
	}
	
	if (leader && distance(character, leader) < 50  && smart.moving ){
		stop()
	move(leader.x,leader.y)
	}
	
	if (leader && distance(character, leader) > 100 && !is_moving(character)  ){
	xmove(leader.x,leader.y)
	}
	
    if (!leader && !smart.moving)smart_move(parent.party["haiz"]); 


	
	
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
else if (character.mp/character.max_mp < 0.5) {
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
	
	


	
	
	
    /// su dung skill supershot lên quai trong và ngoai tam ban
		
 if (is_in_range(currentTarget, "supershot") && character.mp > 500 && currentTarget.hp >10000  && !is_on_cooldown("supershot")  ) {
   

                use_skill("supershot", currentTarget);
                game_log("Supershot!!");
           }
	
	
	
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
	
	else if(can_attack(currentTarget))
	{
		set_message("Attacking");
		attack(currentTarget);
	}


	
	
	
	
	
	
},1000/8); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
