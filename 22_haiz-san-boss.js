// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
//////////////// start_character("angioseal", 21); 
var idmap
let delayitem
let skillbua = 0
let run = 1



map_key("Z", "snippet", 'send_cm("MuaBan","reset")');
map_key("S", "snippet", 'send_cm("MuaBan","mode1")');
map_key("D", "snippet", 'send_cm("MuaBan","mode2")');
map_key("F", "snippet", 'send_cm("MuaBan","mode3")');


game_log(" press 'Z' to reload hero")

game_log(" press 'S' Ynhi ");
game_log(" press 'D' haiz1 ");
game_log(" press 'F' 6gunlaZe ");



//////////// move gan leader
setInterval(function() {
////////////chen ke vi 2 mon do giong nhau nen bi nhan nham vi tri



/////////////////////////
	
if (character.map == "crypt")	
{
	idmap = character.in
send_cm("haiz1","goo")
send_cm("Ynhi","goo")

send_cm("haiz1",idmap)
send_cm("Ynhi",idmap)
 //game_log(idmap)

}

}, 2000);

///////////

var draw_debug = true;

function on_draw(){
  if(draw_debug){
      clear_drawings();
/////////
///////////
	        draw_circle(character.real_x, character.real_y, 320);


}
}




	
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
////////////giui vi tri moi 2s
let checkdichuyen = smart;  // checkdichuyen sẽ là smart, đối tượng dữ liệu 
let SM = 0;
if (checkdichuyen.plot && checkdichuyen.plot.some(p => p.x !== undefined && p.y !== undefined)) {
  SM = 1;  // Nếu có ít nhất một điểm có vị trí x, y hợp lệ
}

 game_log(SM)
	
	
if (SM === 1) {
  let x = checkdichuyen.x;
  let y = checkdichuyen.y;
  let map = checkdichuyen.map;

for (let char in parent.party) {
    // Kiểm tra các điều kiện để không gửi thông tin cho chính mình, MuaBan, hoặc nếu không phải là người chơi hợp lệ
    if (char !== character.name && char !== "MuaBan"  ) {
        send_cm(char, {
            message: "location",
            x: x,
            y: y,
            map: map

        });
					 game_log("map" + map)

		        continue;
	}	
	
}
	

	
}	
else
{

/////////////////////	
for (let char in parent.party) {
    // Kiểm tra các điều kiện để không gửi thông tin cho chính mình, MuaBan, hoặc nếu không phải là người chơi hợp lệ
    if (char !== character.name && char !== "MuaBan" && !is_moving(character) ) {
        send_cm(char, {
            message: "location",
            x: character.x,
            y: character.y,
            map: character.map

        });
								 game_log("mapcharacter")

		        continue;

		
	}
	    if (char !== character.name && char !== "MuaBan" && is_moving(character) ) {
        send_cm(char, {
            message: "location",
            x: character.going_x,
            y: character.going_y,
            map: character.map

        });
									 game_log("mapcharacter")

        continue;
    }
}
	//////////////////////////////////
}
}, 1300);








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
///////////////////////////////////////// dang dame
let rate = 1

if (taget && taget.mtype == "a2" )
{
	rate = 10
}
	else
	{
		rate = 0.75
	}

if(character.hp/character.max_hp< rate)
{
	changeitem({ slot: "gloves", name : "xgloves", level : 6 });
		changeitem({ slot: "helmet", name : "hhelmet", level : 7 });

}
else
	{
		changeitem({ slot: "gloves", name : "mittens", level : 9 });
			changeitem({ slot: "helmet", name : "helmet1", level : 8 });

	}
/////////////////////////////////////////////////// hut mauuuu
	if(character.s["hardshell"] )
	{
	changeitem({ slot: "chest", name : "mcape", level : 7 });	
	}
else
{
changeitem({ slot: "chest", name : "sweaterhs", level : 8 });
}
///////////////////////////////////	 defffffffff
if (character.hp/character.max_hp >= 0.2 && skillbua == 0 && taget && taget.mtype != "franky")
{	
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
changeitem({ slot: "offhand", name : "fireblade", level : 9 });	
}
	else if (character.hp/character.max_hp >= 0.2 && skillbua == 0 && taget && taget.mtype == "franky")
	{
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
changeitem({ slot: "offhand", name : "ololipop", level : 9 });		
	}
else if (character.hp/character.max_hp < 0.2 && skillbua == 0 )
	{
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });		
changeitem({ slot: "offhand", name : "exoarm", level : 1 });		
	}
///////////////////////////////	tang dame

	if ( skillbua == 1){
		if (character.esize == 0){
		 skillbua = 0
			 game_log("fulll tui do !!!!!!");
			return
			
		}
		if (character.slots["offhand"])unequip( "offhand");

        changeitem({ slot: "mainhand", name : "basher", level : 5 });
		
			if (character.slots["mainhand"] && character.slots["mainhand"].name == "basher")use_skill("stomp");
				       
	}
	
	
		if ( skillbua == 1 &&  is_on_cooldown("stomp")){
		          skillbua = 0
	      }
		
		
	
	
	
	
//////////////////////////////
}



//////////////////////////////////////////////

function kite(taget, kite_range)
{

	const radius = kite_range ;
const  angle = Math.PI / 5.5 ;
    if (can_move_to(taget.real_x, taget.real_y)) {
        const angleFromCenterToCurrent = Math.atan2(character.y - taget.real_y, character.x - taget.real_x)
        const endGoalAngle = angleFromCenterToCurrent + angle
        const endGoal = { x: taget.real_x + radius * Math.cos(endGoalAngle), y: taget.real_y + radius * Math.sin(endGoalAngle) }
        move(endGoal.x, endGoal.y)

	
	}
 
	

}



function kiteSP(taget)
{


		//////////// dung skill
	if(character.hp > 1500 && character.mp > 100 && !is_on_cooldown("taunt") && taget && taget.target != "haiz" )
            {
                use_skill("taunt", taget);
				 game_log("phan no kite !!!!!!");
            }	
 
	
	////
		if(character.mp > 100 && !is_on_cooldown("charge") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 >  character.range + 10)
	{
		                use_skill("charge");
		 game_log("toc do kite !!!!!!");
	}

            }	
 //////
	////
		if( character.hp > 12000 && character.mp > 840 && !is_on_cooldown("warcry") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 > character.range)
	{
		use_skill("warcry");
				 game_log("war !!!!!!");
	}
		
	
            }	
 //////
	 /////////////////////
		if ( taget && !is_on_cooldown("hardshell") && taget.hp >5000 )
	{
		const dist1 = distance(character, taget);
    if (dist1 <= character.range + 5 && taget.target == "haiz")
	{
		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");
		if(is_moving(character))stop()
	}
		
	}	

      //////////////
	
//	 !currentTarget.s["cursed"]
   	if( !character.s["hardshell"] && character.hp < 11000 && character.mp > 340 &&  skillbua == 0 &&  !is_on_cooldown("stomp") && taget){
		skillbua = 1

			}
		


	
	///////////
//	!character.s.hasOwnProperty("massproductionpp")


///////////////////
}



function getBestTargets(options = {}) {
    const entities = []

    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		
		
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}








function soloboss(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["a0", "a1" , "a2" , "a3", "a4", "a5" , "a6" , "a7", "a8", "bat"]; 
	
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

	//////////check cac loai boss
//  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 })  //ham bo dem quai vat
// targetsoloboss.length == 0	







///////////////////////////////////////


function use_hp_or_mp1()
{
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	
	
if (character.mp < 600 && character.hp > 2500 ) use_skill("use_mp");
  else if (character.hp/character.max_hp< 0.97 && character.mp > 100 ) use_skill("use_hp");
  else if (character.mp/character.max_mp < 0.75) use_skill("use_mp");

	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}


function on_party_request(name) {
        if (name == "MuaBan" || name == "nhiY" || name == "Ynhi" || name == "angioseal"  || name == "6gunlaZe"  || name == "haiz1") {
            accept_party_request(name);
        }
    }
//////////////////////////////////////////////////////////////////////////
var attack_mode= true

setInterval(function(){

	//use_hp_or_mp();
	use_hp_or_mp1();
	loot();
	
	if(character.s["hardshell"] && is_moving(character) ) stop();
	
	if(!attack_mode || character.rip ||  is_moving(character)) return;
	
if (checkTimeBetweenCalls() === 1) return;


	const entity1 = get_entity(character.target) // co the doi taget thu cong
	
	 var currentTarget
	
	if (entity1) {
		currentTarget = entity1
	}
	
	
////////////	/
	 var  targetsoloboss11x = soloboss({ max_range: 800}) 
 var  targetsoloboss = soloboss({ max_range: 800, number : 1 })  //ham bo dem quai vat
// targetsoloboss.length == 0		
	
if (targetsoloboss.length == 0 )
{
	if(!currentTarget)
	{
		var currentTarget= get_nearest_monster({type: "vbat"});
		if(currentTarget && targetsoloboss.length == 0) {
			change_target(currentTarget);
		}
	}
}	
	
// game_log("checkk boss !!!!!!"+targetsoloboss11x.length);	
	
	
	
	
////////////////////////////////
chuyendoithongminh(currentTarget)	
//kiteSP(currentTarget)	
var f00 = get_player("haiz1")
let rateskill
if (currentTarget && currentTarget.attack >8000 )
{
	rateskill = 1.1
}
else
{
	rateskill = 0.85
}

if (currentTarget && f00 )VIPSuP(currentTarget,rateskill)		
if (run == 1 && currentTarget && currentTarget.attack >8000 ) return //quai manh qua thi ne ra	
if (skillbua == 1) return	
//	if(!can_attack(currentTarget) && currentTarget && !character.s["hardshell"] )kite(currentTarget,character.range + 15);
//////////////////////////////////////////////	

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
		            if(character.mp > 100 && !is_on_cooldown("taunt") && currentTarget.target == "Ynhi" )
            {
                use_skill("taunt", currentTarget);
				 game_log("phan no !!!!!!");
            }
		
		
		
		/////////
		set_message("Attacking");
		attack(currentTarget);
	}
	
	
	

	
	
	
	
	////////////////////////////////////////////////////// moi paty
	if (!character.party) {
    send_party_request("6gunlaZe");

}
	//////////////////////////////////////////////
		
	
	

	
},1000/8); // Loops every 1/4 seconds.





//////////////////
function get_nearest_playerV(currentTarget)
{
	// Just as an example
	var min_d=2000,target=0;

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(!current.player) continue;
		if(current.target == currentTarget.id) target +=1;
	}
	game_log("so luong nguoi choi kill boss la: " + target)
	return target;
}

/////////////////////////////////////



function VIPSuP(taget,rate)
{

var f0 = get_player("haiz1")
var targetboss = taget	
var supBOSS
let safetank = 1
let ratehp = rate	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && !is_on_cooldown("taunt") && !is_on_cooldown("hardshell") && character.mp > 600 && f0.hp/f0.max_hp < ratehp ) use_skill("taunt", targetboss);
	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && !is_on_cooldown("taunt") &&  character.s["hardshell"] && character.mp > 600 && character.hp > 7500 && f0.hp/f0.max_hp < ratehp ) use_skill("taunt", targetboss);	
	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && !is_on_cooldown("taunt") && character.mp > 600 && f0.hp/f0.max_hp < 0.4 ) use_skill("taunt", targetboss); //chi co o main tank	
	
if (targetboss.target && targetboss.target == "haiz" && !character.s["hardshell"] && distance(character, targetboss) < (targetboss.range + 14) && !is_on_cooldown("hardshell") && character.mp > 500 && !targetboss.s["stunned"] && character.hp/character.max_hp < ratehp ) use_skill("hardshell");
	
if (targetboss.target && targetboss.target == "haiz1" && !f0.s["hardshell"] && distance(f0, targetboss) < (targetboss.range + 10) && is_on_cooldown("taunt") && is_on_cooldown("hardshell") && !character.s["hardshell"] && character.mp > 900 && f0.hp/f0.max_hp < ratehp && !is_on_cooldown("warcry") &&  !character.s["warcry"] )use_skill("warcry"); //support them rieng cho thang de
	
	
if (targetboss.target && targetboss.target == "haiz" && !character.s["hardshell"] && is_on_cooldown("hardshell") && targetboss.range <120 ) 
{
	kite(targetboss,targetboss.range + 50);
	run = 1
}
		else
	{
		run = 0;
	}
	
	
	
if (is_on_cooldown("hardshell") || character.mp < 550)safetank = 0	

	
if ( f0.hp/f0.max_hp < ratehp )	
{	
if ( targetboss.target && targetboss.target == "haiz" && !character.s["hardshell"] && character.mp > 200 && !is_on_cooldown("stomp") && distance(character, targetboss) < (targetboss.range + 7) && is_on_cooldown("hardshell") )skillbua = 1
	
if (character.mp > 900 && is_on_cooldown("hardshell") && !is_on_cooldown("stomp") && !f0.s["hardshell"] && !targetboss.s["stunned"] && distance(f0, targetboss) < (targetboss.range + 20))skillbua = 1
	
if ( character.mp > 1200 && !is_on_cooldown("stomp") && !targetboss.s["stunned"] && !f0.s["hardshell"] && !character.s["hardshell"]  ) skillbua = 1	
}	
	
	
if (run == 1 && supBOSS )	
{
			var target3 = get_nearest_monster({type: supBOSS});
             if(target3 && is_in_range(target3))attack(target3);
}		
	
	

	
///////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////

		if(character.mp > 100 && !is_on_cooldown("charge") && run == 1 && safetank == 0 )use_skill("charge");



if( character.mp > 1400 && !is_on_cooldown("warcry") && taget &&  !character.s["warcry"] )use_skill("warcry");


	///////////
//	!character.s.hasOwnProperty("massproductionpp")


///////////////////
}










// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
