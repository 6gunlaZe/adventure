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
let datahero

game_log("Game vs 1.5");

setInterval(function() {

	
if(!parent.party_list.includes("Ynhi") ) start_character("Ynhi", 28);
//if(!parent.party_list.includes("haiz1") ) start_character("haiz1", 32);	
if(!parent.party_list.includes("6gunlaZe") ) start_character("6gunlaZe", 25);

}, 40000);


//////////////////////////////////////////


let z = 1;  
let bat = 0
let bossA = 0

/// auto ham nguc cryt
setInterval(function() {

if (character.map != "crypt") return;

	
 if (smart.moving) return;
	
let toado = [
  { x: 0, y: -250, z: 1 },
  { x: 0, y: -475, z: 2 },
  { x: -200, y: -500, z: 3 },
  { x: -200, y: -800, z: 4 },
  { x: -200, y: -1075, z: 5 },
  { x: 70, y: -1090, z: 6 },
  { x: 360, y: -1090, z: 7 },
  { x: 720, y: -1090, z: 8 },
  { x: 720, y: -860, z: 9 },
  { x: 720, y: -625, z: 10 },
	{ x: 930, y: -600, z: 11 },
	{ x: 970, y: -400, z: 12 },
	{ x: 380, y: -1470, z: 13 },
	{ x: 720, y: -1470, z: 14 },
	{ x: 1050, y: -1470, z: 15 },
	{ x: 1410, y: -1470, z: 16 },
	{ x: 1760, y: -1470, z: 17 },
	{ x: 1790, y: -1740, z: 18 },
	{ x: 2090, y: -1740, z: 19 },
	{ x: 2320, y: -1740, z: 20 },

];


 var  targetkill = solobosskill({ max_range: 400}) 
 var  targetNO = solobossNO({ max_range: 400}) 
let z = 1;    
game_log("checkk boss can kill !!!!!!  "+ targetkill.length   );	
game_log("checkk boss NO kill!!!!!!  "+  targetNO.length  );	



    if (targetkill.length === 1 && targetNO.length == 0 ) {
      // Lệnh riêng của bạn khi targetkill = 1
	    if (character.mp > 100 &&  can_use("taunt") &&  (targetkill.target == "Ynhi" || targetkill.target == "nhiY" || targetkill.target == "6gunlaZe" ) )
             use_skill("taunt", targetkill);

	/////////////////////////////////    
    } else if (targetkill.length === 0 && targetNO.length == 0) {
      // Lấy đối tượng có z tương ứng
      let result = toado.find(item => item.z === z);

      if (result) {
        xmove(result.x, result.y);  // Di chuyển tới vị trí (x, y)
      }

      // Tăng z khi targetkill = 0
      if (z < 10) {
        z++;
      }
    } else if (targetkill.length >= 2  || targetNO.length > 0) {
      // Quay lại 
      if (z > 1) {
        z--;
      }
      // Lấy đối tượng có z tương ứng
      let result = toado.find(item => item.z === z);

      if (result) {
        xmove(result.x, result.y);  // Di chuyển tới vị trí (x, y)
      }

	    
    }

















	
}, 5000);




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

	//////////check cac loai boss
//  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 })  //ham bo dem quai vat
// targetsoloboss.length == 0	





function solobossNO(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["a0", "a1", "a4", "a5" , "a6" , "a8"]; 
	
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























/////////////////////////////////////////////
//////////// move gan leader
setInterval(function() {

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
				 game_log("test 3 !!!!!!");

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
	
	
	
///////////////////////////////////////////////	
	if(!currentTarget)
	{
		var currentTarget1 = solobosskill({ max_range: 120, number : 1}) 
		if(currentTarget1.length == 1) {
			change_target(currentTarget1);
			 game_log("test 1 !!!!!!");
		}
	}	




	
////////////////////////////////
if(currentTarget)chuyendoithongminh(currentTarget)	
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
if (currentTarget && !f00 ) soloTANK(currentTarget)
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


function soloTANK(taget)
{
 
			 game_log("test 2 !!!!!!");

		if(character.mp > 100 && !is_on_cooldown("charge") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 >  character.range)
	{
		                use_skill("charge");
		 game_log("toc do kite !!!!!!");
	}

            }	
 //////
	////

		    if (taget.target && taget.target == "haiz" &&  !is_on_cooldown("hardshell") && character.mp > 600 && distance(character, taget) < character.range )
	{

		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");

	}	

      //////////////
	
	if (character.mp > 1300 &&  !is_on_cooldown("warcry") && !character.s["warcry"] )
	{
		use_skill("warcry");
				 game_log("war kite !!!!!!");
	}	
	
	
	 //////////////////////////////////
 	////

 //////

if ( taget.target && taget.target == "haiz" && !character.s["hardshell"] && character.mp > 200 && !is_on_cooldown("stomp") && distance(character, taget) < (taget.range + 7) && is_on_cooldown("hardshell") )skillbua = 1
	
if (character.mp > 900  && !is_on_cooldown("stomp")  && taget.target && taget.target != "haiz"  )skillbua = 1
	
if ( character.mp > 1200 && !is_on_cooldown("stomp") && taget.target ) skillbua = 1	

if ( taget.target && taget.target != "haiz" && !is_on_cooldown("taunt") && !taget.s["stunned"] && character.mp > 400 )use_skill("taunt", taget);

	
}
////////////////////////







// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
