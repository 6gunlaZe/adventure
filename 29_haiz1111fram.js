// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
////////////////
const delayy = 300 
let started
let loop = 9
let numfram = 0
let numboss = 0
let numgo = 0
let hutquai = 0
var sanbosss = "phoenix"; 
var triancrep 
var maptrain
let farmX 
let farmY 
let help = 0
let framboss = 0
let framboss1 = 0
let Kil_angioseal = 1 // tu dong dang xuat nhan vat angioseal
let delayfram = Date.now()
let backfram = 0
let skillbua = 0
let skillriu = 0
let delayriu  = Date.now()


let frammode = 3


if ( frammode == 0)
{
 triancrep = "snake"; 
 maptrain = "halloween"; 
farmX = 316
farmY = -720

}
else if ( frammode == 1 )
{
 triancrep = "bat"; 
 maptrain = "cave"; 
farmX = 1262
farmY = -829
}
else if ( frammode == 2 )
{
 triancrep = "croc"; 
 maptrain = "main"; 
farmX = 655
farmY = 1813
}
else if ( frammode == 3 )
{
 triancrep = "spider"; 
 maptrain = "main"; 
farmX = 976
farmY = -134
}


////////////////////////////////tro ve sau khi san icegolem {x: 800, y: 400})
	if ( character.map == "winterland" && distance(character,  {x: 800, y: 400}) < 250 && !smart.moving   )
	{
		use_skill("town")
		delayfram = Date.now()
		backfram = 1
	}
else
{
smart_move({ map: maptrain, x: farmX, y: farmY })	
			game_log("Trainn111 !!!!!!");

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
	
	const entity = get_entity(character.target)
	
 if (!smart.moving && !character.moving && !entity && numgo == 0 && help == 0 && framboss == 0 ) {
	smart_move({ map: maptrain, x: farmX, y: farmY })
		game_log("Trainn !!!!!!");
		
		//	smart_move({ map: "winterland", x: 850, y: -40 });
		
		
    }
	
	
	
	
}, 300000); // ra bai quai every 5p



setInterval(function() {

 if (character.rip) { ///////auto hoi sinh
    respawn();
  }

}, 420000);


var draw_debug = true;

function on_draw(){
  if(draw_debug){
      clear_drawings();
/////////
	  if(character.s["sugarrush"] )
	  {
	  
		  loop = 20
	const entity1x = get_entity(character.target) // co the doi taget thu cong
	 var targetxx
	if (entity1x) {
		targetxx = entity1x
		 if(can_attack(targetxx))attack(targetxx)	
	}
		  
		  
		  
	  }
	  else
	  {
	     loop = 9
	  }
///////////
	     //   draw_circle(character.real_x, character.real_y, 320);


}
}



setInterval(function() {

	///////////////////////////
	const entity = get_entity(character.target)
	
  //  if (!smart.moving && !character.moving && !entity && numfram == 0 ) {
//	smart_move({ map: maptrain, x: farmX, y: farmY })
//		game_log("Trainn !!!!!!");
			//		smart_move({ map: "winterland", x: 850, y: -40 });

//		numfram = 1
//    }
	/////////////////////////////////// auto loot
if (!is_moving(character) && backfram == 1 && Date.now() > (delayfram +20000) )
{
	smart_move({ map: maptrain, x: farmX, y: farmY })
			backfram = 0
			game_log("Trainn 222 !!!!!!");

}

	//////////////////////////////////////
	
	
}, 3000); // ra bai quai lan dau




function on_cm(name, data) {


}

///////////////////////////

/// 
setInterval(function() {

	if(character.esize < 7)
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

///////////





function soloboss(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["phoenix", "greenjr" , "jr" , "mvampire"]; 
	
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
///  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 }) 
// targetsoloboss.length > 0






////////////////////////////////////////////////////////////////////////////////////////////////
setInterval(function() {

	const gunn = (parent.party_list ?? []).some(c => c === '6gunlaZe');

	if (!character.party && framboss == 0) {
    send_party_request("haiz");

}
	if(framboss > 0&& gunn )leave_party();


}, 500);


function on_party_request(name) {
        if ( name == "angioseal") {
            accept_party_request(name);
        }
    }





////////////////////////////////chuyen do tu dong cho nhan vat muaban

setInterval(function() {
    let lootMule = get_player("MuaBan");

		 //giui vang when in range
    var merch = get_player("MuaBan"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) {
		        send_gold(merch,character.gold)

    }
	//
	
	
    if (lootMule == null) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }

    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "fireblade","tracker","glolipop","ololipop","mittens","xgloves","exoarm","hhelmet","mcape","helmet1","wbasher","jacko","bataxe","basher"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);



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
	

 var targets = getBestTargets({ max_range: 200,min_range: character.range - 20 , type: taget.mtype, minHP: 0.7 , target: "haiz" , number : 1 })  //giam tai cho haiz
	  
		//////////// dung skill
if(character.mp > 100 &&  can_use("taunt") && targets && numboss == 0 && character.targets < 3 &&  (character.hp/character.max_hp > 0.67) )
            {
				stop("moving")
				stop("smart")

                use_skill("taunt", targets);

            }	



}



function getBestTargets(options = {}) {
    const entities = []
     let number = 0
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		if (options.target && entity.target != options.target) continue
		if (options.targetNO && entity.target == options.targetNO) continue
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		///
			number = 1 + number
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}

////////////////////////////////////////////


	

function changeitem(options = {}) {
	//them delay tranh lag
	
    var merch = get_player("MuaBan"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) return
	
	if (started == undefined) started = Date.now()
    if (Date.now() < started + delayy) return;

	if ( !options.slot ||  !options.name || !options.level ) return 
	
	if (character.slots[options.slot])
	{
	if (character.slots[options.slot].name == options.name) return 
	}
	
	started = Date.now()
checkTimeBetweenCalls(1);  // Thiết lập thời gian mốc

	let vitri = 100
	
	        for (let i = 0; i < character.isize; i++) {
            const item = character.items[i]
            if (!item) continue // No item in this slot

            if (item.name == options.name && item.level == options.level) {
                // This is an item we want to use!
                    vitri = i //tim ra vi tri mon do
						//game_log("vitri la "+vitri);

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




///////////////////////////


function use_hp_or_mp1()
{
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	
	
if (character.mp < 600 && character.hp > 2500 ) use_skill("use_mp");
  else if (character.hp/character.max_hp< 0.8 && character.mp > 100 ) use_skill("use_hp");
  else if (character.mp/character.max_mp < 0.75) use_skill("use_mp");

	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}



////////////////////////////////////////////////////////
setInterval(function() {
looting()	
}, 500);
function looting() {
    if(Object.keys(parent.chests).length >= 2) 
	{
     shift(0, 'goldbooster');
    loot();
    setTimeout(shifting, 250);
	}
}
function shifting() {
    shift(0, 'xpbooster');
}

//////////////////////////////////////////////////////////////////////////
var attack_mode= true

setInterval(function(){

	//use_hp_or_mp();
	use_hp_or_mp1();
////////////////////
	if (checkTimeBetweenCalls() === 1) return;

	 if(Object.keys(parent.chests).length >= 5)loot();
/////////////////////////	

	if(!attack_mode || character.rip || smart.moving) return;
///
		if(character.s["hardshell"] && is_moving(character) ) stop();
	
	//  var target=get_targeted_monster();
	// lua chon 2 loai quai de fram
	
	const entity1 = get_entity(character.target) // co the doi taget thu cong
	
	 var target
	
	if (entity1) {
		target = entity1
	}

	
	if(!target)
	{
		var target= get_nearest_monster({type: "greenjr"});
		if(target) {
			change_target(target);
						//////////// dung skill
		            if(character.mp > 100 && !is_on_cooldown("taunt"))
            {
                use_skill("taunt", target);
				 game_log("phan no !!!!!!");
            }
		/////////

		}
		else
		{
		
		
		var target= get_nearest_monster({type: "jr"});
		if(target) {
			change_target(target);
						//////////// dung skill
		            if(character.mp > 100 && !is_on_cooldown("taunt"))
            {
                use_skill("taunt", target);
				 game_log("phan no !!!!!!");
            }
		/////////
		}	
		else
		{
			
		var target= get_nearest_monster({type: "phoenix"});
		if(target && framboss > 0) {
			change_target(target);
						//////////// dung skill
		            if(character.mp > 100 && !is_on_cooldown("taunt"))
            {
                use_skill("taunt", target);
				 game_log("phan no !!!!!!");
            }
		/////////
		}	
		else
		{	
		
		var target= get_nearest_monster({type: "mvampire"});
		if(target && framboss > 0) {
			change_target(target);
						//////////// dung skill
		            if(character.mp > 100 && !is_on_cooldown("taunt"))
            {
                use_skill("taunt", target);
				 game_log("phan no !!!!!!");
            }
		/////////
		}	
		else
		{		
			
		var target= get_nearest_monster({type: triancrep});
		  if(target) change_target(target);
		else
		{

		 var target= get_nearest_monster({type: "osnake"});
		  if(target) change_target(target);
		else
		{
			
			
			
			
			

			set_message("No Monsters");
			return;
		  }
		}
		}
		}
		}
		}
	}
	
	///////////////////////////////////
	
	chuyendoithongminh(target)
		if (skillbua == 1 || skillriu == 1) return	
     skillwarboss(target)


	
	

	
	/////////////// chay vong vong gom quai lai
   
	
	 kiteSP(target)

	   	 var targets1 = getBestTargets({ max_range: character.range ,   type: target.mtype, })  //ham bo dem quai vat
		//  if(targets1 && character.targets > 2 ) change_target(targets1); //tro lai muc tieu ban dau o gan neu dang co dong muc tieu xung quanh
		if(targets1 ) {
			change_target(targets1);  
	               //  target = targets1
					  }
	if(!can_attack(target) && target && !character.s["hardshell"] && !character.s["sugarrush"]    )kite(target,character.range + 3);
	

		if(character.hp < 4000)
	{
		send_cm("angioseal", "bosshelp");
		send_cm("Ynhi", "bosshelp");

		game_log("help !!!!!!");
	}
	/////////////////////////////////////

	/////////////////////////////////////
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		
	
		
		

		
		
		
		
		
		set_message("Attacking");
		attack(target);
	}


	
	
},1000/7); // Loops every 1/4 seconds.


///////////




function skillwarboss(taget)
{
 

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
		if(character.mp > 440 && !is_on_cooldown("warcry") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 > character.range)
	{
		use_skill("warcry");
				// game_log("war !!!!!!");
	}

	    if (character.hp < 7000 &&  !is_on_cooldown("warcry") && character.mp > 740 )
	{
		use_skill("warcry");
				// game_log("war kite !!!!!!");
	}			
				
	
            }	
 /////////////////////
		    if (character.hp < 5000 &&  !is_on_cooldown("hardshell") && taget.hp >5000 && character.mp > 640 )
	{
		const dist1 = distance(character, taget);
    if (dist1 <= character.range)
	{
		use_skill("hardshell");
				// game_log("war hardshell !!!!!!");
	}
		
	}	

      //////////////
	
	
	
	
	 //////////////////////////////////
 	////
		if( character.hp > 10000 && character.mp > 840 && !is_on_cooldown("warcry") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 > character.range)
	{
		use_skill("warcry");
				// game_log("war !!!!!!");
	}
		
	
            }	
 //////
	 /////////////////////
	
	
	 var targetsab = getBestTargets({ max_range: character.range, type: taget.mtype , })  //ham bo dem quai vat
		if ( taget && !is_on_cooldown("hardshell") && targetsab.length >=4 && character.hp < 7000 && character.mp > 700 )
	{
		//game_log("check1!");
		
		const dist1 = distance(character, taget);
    if (dist1 <= character.range + 5 && taget.target == "haiz1")
	{
		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");
		if(is_moving(character))stop()
	}
		
	}	

      //////////////
	 var targetsab1 = getBestTargets({ max_range: 300, type: taget.mtype , targetNO : "haiz" })  //ham bo dem quai vat
	if ( (targetsab1.length) >= 3 &&  taget && !is_on_cooldown("agitate")  )
	{
//	use_skill("agitate");

	}
	
	
	
	if ( !character.s["hardshell"] && character.mp > 200 && !is_on_cooldown("stomp") && targetsab.length >=3  && is_on_cooldown("hardshell") )skillbua = 1

	
	
		var targetsabc = getBestTargets({ max_range: 180, type: taget.mtype , }) 
	
		if ( Date.now() > delayriu + 4000)
		{		
	if ( character.hp > 8000 && character.mp > 850 && !is_on_cooldown("cleave") && targetsabc.length >=4 )
	{
		skillriu = 1	
	delayriu = Date.now()
	
	}
		}
	
	
	
	
	
	
	
	
	
	
	
	
}


////////////////////////////////////////////////////////

function chuyendoithongminh(taget)
{

if (skillbua == 0 && skillriu == 0 && taget && taget.mtype != "franky")
{	
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
changeitem({ slot: "offhand", name : "fireblade", level : 8 });	
}

///////////////////////////////	tang dame

	if ( skillbua == 1){
		if (character.esize == 0){
		 skillbua = 0
			 game_log("fulll tui do !!!!!!");
			return
			
		}
		if (character.slots["offhand"])unequip( "offhand");

        changeitem({ slot: "mainhand", name : "basher", level : 6 });
		
			if (character.slots["mainhand"] && character.slots["mainhand"].name == "basher")use_skill("stomp");
				       
	}
	
	
		if ( skillbua == 1 &&  is_on_cooldown("stomp")){
		          skillbua = 0
	      }
		
/////////////////////////////////////////////////////		
	///////////////////////////////	tang dame

	if ( skillriu == 1){
		if (character.esize == 0){
		 skillriu = 0
			 game_log("fulll tui do !!!!!!");
			return
			
		}
		if (character.slots["offhand"])unequip( "offhand");

        changeitem({ slot: "mainhand", name : "bataxe", level : 4 });
		
			if (character.slots["mainhand"] && character.slots["mainhand"].name == "bataxe")use_skill("cleave");
				       
	}
	
	
		if ( skillriu == 1 &&  is_on_cooldown("cleave")){
		          skillriu = 0
	      }
		
/////////////////////////////////////////////////////	
	
	
	
//////////////////////////////
}









/////////////


// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
