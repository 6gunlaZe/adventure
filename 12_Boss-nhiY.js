
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
	use_skill("blink", [0, 0])
	mageMagiPort()
	}
	
	
	//////////////
		
	if(parent.S.icegolem && back == 0 && !get_nearest_monster({type:'icegolem'}))
	{
        join('icegolem');
	}
////////////////////////////////////////////	
if(parent.S.icegolem)
	{
	  var target2= get_nearest_monster({type: "icegolem",});	
		
	if (character.map != "winterland")smart_move("winterland")
	if (character.map == "winterland" && !target2 && back == 0 )use_skill("blink", [800, 400])
	///check member

	mageMagiPort()
	
	
	
	}
	if(parent.S.icegolem) return //su kien ice thi se tu hoat dong không có di theo lederr
	
////////////////////////////////////////////////	
	
	if ( character.map == "winterland" && distance(character, {x: 800, y: 400}) < 250 && !smart.moving && !parent.S.icegolem  )use_skill("town")
		
	
    if (!character.party) return // No party

	    let leader = get_player("haiz");
	if (leader && distance(character, leader) < 10  &&  is_moving(character) ){
		stop()
	}
	
	if (leader && distance(character, leader) < 30  && smart.moving ){
		stop()
	move(leader.x,leader.y)
	}
	
	if (leader && distance(character, leader) > character.range && !is_moving(character) && !character.target ){
	xmove(leader.x,leader.y)
	}
	
    if (!leader && !smart.moving && character.map != "crypt")smart_move(parent.party["haiz"]); 


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

    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","harbringer","jacko","slimestaff","orbg","froststaff","firestaff"];

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

        for (let char in parent.party) {
            if (char !== character.name //Don't magiport self
                && char !== "MuaBan" //Don't magiport the Merchant
                && (!get_player(char))) {
                use_skill("magiport", char);
                return;
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

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
