// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
////////////////
//// start_character("nhiY", 2); /// start_character("MuaBan", 6);
////  parent.api_call("disconnect_character", {name: "MuaBan"});
///  stop_character("MuaBan"); stop_character("haiz"); stop_character("nhiY");
/// start_character("haiz", 7); 
let host = 0  ///che do treo may host
const TenMinutesInMs = 10 * 60 * 1000
const Ten7MinutesInMs = 7 * 60 * 1000
let bankk = 0
let trieuhoi = 0
let started
let delayitem
let numHP = 0
let numMP = 0
let attachboss = 0
let check3shot = 0
let check5shot = 0
let checkboss = 0
let bossmode = 0
let save1 = 0
let banktime 
let bosstime = 0 
let timekillboss
let notefrankyYnhi = 0
let frankymode = 0
let frankyfight = 0
let frankysafe = 0
let frankyKILL = 0

    let farmX 
    let  farmY 
	var maptrain  
    var triancrep 

let frammode = 7
let modeYnhi = 2 ///1 = Ynhi //2 = haiz1 // 0 == nhiY
let killangioseal = 1
let safeframm = 0


if ( frammode == 0)
{
    triancrep = "poisio"; 
   farmX = -76 //character.real_x;
  farmY = 1390 //character.real_y;
 maptrain = "main"; 

}
else if ( frammode == 1 )
{
 triancrep = "bat"; 
 maptrain = "cave"; 
farmX = 1229
farmY = -776
}
else if ( frammode == 2 )
{
 triancrep = "crab"; 
 maptrain = "main"; 
farmX = -1131
farmY = 7
}
else if ( frammode == 3 )
{
 triancrep = "armadillo"; 
 maptrain = "main"; 
farmX = 617
farmY = 1784
}
else if ( frammode == 4 )
{
 triancrep = "porcupine"; 
 maptrain = "desertland"; 
farmX = -690
farmY = 65
}
else if ( frammode == 5 )
{
 triancrep = "arcticbee"; 
 maptrain = "winterland"; 
farmX = 1148
farmY = -900
}
else if ( frammode == 6 )
{
 triancrep = "ghost"; 
 maptrain = "halloween"; 
farmX = 239
farmY = -1217
}
else if ( frammode == 7 )
{
 triancrep = "tortoise"; 
 maptrain = "main"; 
farmX = -1068
farmY = 1135
}



   // let farmX = 372 //character.real_x;
   // let  farmY = -723 //character.real_y;

var bossss = "phoenix1"; 
var bossss1 = "greenjr1"; 
let bossHP = 165000  // gioi han hp cua boss - canh theo lv1
var bossarmy=[ "aaa", "bbb", "cccc"];  





setTimeout(function() {
    if (frankymode == 0) {
        smart_move({ map: maptrain, x: farmX, y: farmY });
    }
}, 10000);  // 10000 mili giây = 10 giây



setInterval(function() {
	
	const entity = get_entity(character.target)
	
 if (!smart.moving && !character.moving && !entity && frankymode == 0 ) {
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



function on_magiport(name){
    if(name == "nhiY"){
        accept_magiport(name);
    }
}



/////////////
function on_cm(name, data) {
	
	    if(name == "haiz")
	{
       if(data == "help") {
           stop_character("haiz")
		 }
		
	 if(data == "killboss") {
           stop_character("angioseal")
		 bosstime = 0
		 }
	}
///////////////////////	
		    if(name == "MuaBan")
	{
       if(data == "franky")
	   {
		   frankymode = 1	
	   }
	}
//////////////////////////////////////////	
}
////////


/////////


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


    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","firebow","crossbow","jacko", "pouchbow","orbg"];
	
	
    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);
//////

setInterval(() => {

if (character.ping > 600 )
{
	delayThreshold = character.ping / 2
}
	else
{
	delayThreshold = 220
}
	
    if(character.q.exchange) {
        return;
    }
    let first_index = -1;
    for(let i = 0; i < 42; i++) {
        if(character.items[i]?.name == "lostearring") {
            
                exchange(i);
   
        }
    }
}, 1000);




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
/////////////		

	

	
}, 40000); //40s trieu hoi 1 lan neu ko thay trong party, phai cho delay login









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
	var min_d=character.range + 125,target=null;

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




/////
function get_nearest_monster2(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=80,target=null;

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
		if(args.path_check && !can_move_to(current)) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) min_d=c_dist,target=current; //lua chon quai vat gan nhat
	}
	return target;
}
  


function soloboss(options = {}) {
    const entities = []
     let number = 0
	var bossarmy=["grinch11", "greenjr" , "jr11" , "osnake11"]; 
	
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




/////////////// vong tron fram
setInterval(function() {

	if (!character.party) {
    send_party_request("haiz");

    }	
	
//	 game_log("K/C vi tri ban dau la " +distance(character, {x: farmX, y: farmY}));
if ( distance(character, {x: farmX, y: farmY}) > 50 && !smart.moving && frankymode == 0  )xmove(farmX,farmY)
	
//draw_circle(character.x - 2, character.y - 2, 1, 15);
	
}, 800); // di chuyen ve trung tam neu o xa moi 5s
/////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////
////

function use_hp_or_mp1()
{


	if (started == undefined) started = Date.now()
    if ( Date.now() < started + 1000) return
	
	
	

	
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	
	

///////


if (character.hp/character.max_hp< 0.6 && character.mp > 50) {
     if(can_use("use_hp"))use_skill("use_hp");
	numHP += 1
	        started = Date.now()
	// game_log("use_hp");
} 
else if ( (character.max_mp - character.mp) > 400) {
	  if(can_use("use_mp"))use_skill("use_mp");
	        started = Date.now()
	// game_log("use_mp");
	numMP += 1
}
  else if (  character.hp/character.max_hp< 0.8 ) 
  {
     if(can_use("use_hp"))use_skill("use_hp");
	started = Date.now();
	  return
  }
  else if (character.max_mp>character.mp && can_use("use_mp") ) 
  {
	  use_skill("regen_mp");    
	started = Date.now();
	  return
  }
	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}

///////////
	


////////////////////////////////////////////////////////
setInterval(function() {
looting()	
}, 4000);
function looting() {
	    let chests = get_chests();
    let chestIds = Object.keys(chests);
    if (chestIds.length > 20) {
	  shift(0, 'goldbooster');   
        for (let id of chestIds) {
            loot(id);   
	    }
    }
    setTimeout(shifting, 550);

}
function shifting() {
    shift(0, 'xpbooster');
}

//////////////////////////////////////////////////////////////////////////
var attack_mode= true

setInterval(function(){
	use_hp_or_mp1();
	if (checkTimeBetweenCalls() === 1) return;

	let makecreap = 0

	let Mule = get_player("Ynhi");
	if (distance(character, Mule) <= character.range )safeframm = 1;
	else 	safeframm = 0
	
	
	if(!attack_mode || character.rip || is_moving(character)) return;

	//  var target=get_targeted_monster();
if (frankymode == 1)
{
	franky()
	 return
}	
	
	// lua chon 2 loai quai de fram
	
		const entity1 = get_entity(character.target) // co the doi taget thu cong
	
	 var target
	
	if (entity1) {
		target = entity1
	}


	
	if(!target)
	{
		var target= get_nearest_monster({type: "grinch11"});
		if(target) change_target(target);
		else
		{
		
		
		var target= get_nearest_monster({type: "greenjr1"});
		if(target) change_target(target);
		else
		{
			
		var target= get_nearest_monster({type: "jr1"});
		  if(target) change_target(target);
		else
		{
			
		var target= get_nearest_monster({type: "tinyp1"});
		if(target) change_target(target);
		else
		{
		
		
		var target= get_nearest_monster({type: "greenjr1"});
		if(target) change_target(target);
		else
		{
			
		var target= get_nearest_monster({type: "osnake1"});
		  if(target) change_target(target);
		else
		{

			
			
			
		var target= get_nearest_monster1({type: triancrep});
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
	}
	
	/////
	
    /// su dung skill supershot lên quai trong và ngoai tam ban
		
 if (is_in_range(target, "supershot") && character.mp > 500 && target.hp >10000000  && !is_on_cooldown("supershot")  ) {
   

                use_skill("supershot", target);
                game_log("Supershot!!");
           }
	
	

		var b1 = get_player("nhiY"); 
	var b2 = get_player("haiz");// 
	  
	//////////check cac loai boss
  var  targetsoloboss = soloboss({ max_range: character.range, number : 1 })  //ham bo dem quai vat
var targets	
if (frammode == 0 || frammode == 2 || frammode == 4 || frammode == 5 || frammode == 7)
{
if (character.hp > 3300){	
targets = getBestTargets({ max_range: character.range, type: triancrep, subtype : "frog11" , number : 3 })  //ham bo dem quai vat	
}
else
{
targets = get_nearest_monster1({type: triancrep});
}
	
}
else if ( (frammode == 1 || frammode == 3 || frammode == 6 ) && character.targets <=3 && b2 && distance(character, b2) < 350 ) //fram bat
	{
	if (safeframm == 1)targets = getBestTargets({ max_range: character.range, type: triancrep, subtype : "croc" , havetarget: 1, fire:1 })  //ham bo dem quai vat
		else
            {
                targets = get_nearest_monster1({type: triancrep});
            }
// if (safeframm == 1 && character.targets <= 3)targets =getBestTargets({ max_range: character.range, type: triancrep, subtype : "croc" , fire:1, number : 3  }) 
 if ( character.targets <=0 && safeframm == 1 ) //thu hut quai vat toi thieu từ bên ngoài ma khong giam dame
 {
	 			////   game_log("thu hut quai vat");

	var target11 = get_nearest_monster1({type: triancrep, NO_target: 1});
	change_target(target11)
      if(can_attack(target11))attack(target11);
       return

 }

		
	}
else
{
targets = get_nearest_monster1({type: triancrep});
}
		
	////////
	
	
	const targetsboss = getBestTargets({ max_range: (character.range + 300), type: bossss, maxHP: bossHP })  //ham bo dem quai vat
	    
	  

	
	    /// su dung skill 3 shot lên quai  gan nhat - chua lua chon duoc quai

 if (targets.length >= 3  && character.mp > 330  && !is_on_cooldown("3shot")       ) {
                  check3shot =1;
				}
	else
	{
		check3shot =  0;
	}
	
	///

 if (targets.length >= 5  && character.mp > 430  && !is_on_cooldown("5shot")       ) {
                  check5shot =1;
				}
	else
	{
		check5shot =  0;
	}
	
	////////////////////////////////////	

//game_log("so TG  " +character.targets);	
	
	///////////////goi dong doi toi skill boss

 if (targetsboss.length >0 && 10<2) {
 	checkboss = 1
	   game_log("so TG  " +character.targets);
 }
	else
	{
		checkboss = 0
	}

	
	
	
		
		
		  attachboss = 0; //reset checker
		
 if (targetsboss.length >0 &&  b1 != null  &&  b2 != null   ) {
	 
	    const d_b1 = distance(character, b1)
        const d_b2 = distance(character, b2)
	 
	 
	  if (d_b1 < 150 &&  d_b2 < 150   ) {  /// lai gan moi kill
	 
                    game_log("kill boss nao ae");
		  attachboss = 1

		  
	  }
	 
	 
			

 }
	
	
	if (attachboss == 1){
		var target= get_nearest_monster({type: bossss,});

		   if(target) change_target(target); /// chuyen doi sang boss
	}
	else
	{
		if(targetsoloboss.length == 0 && check5shot == 1 ){
			use_skill("5shot", targets);
					//game_log("555555555555555 !!!!!!");
		}
		
	     if(targetsoloboss.length == 0 && check3shot == 1 && check5shot ==0 ){
			 use_skill("3shot", targets);
			 				//	game_log("333333333333 !!!!!!");

		 }
		// neu check duoc taget boss thi khong dung 3shot 
	}
	
	
	
	
	//////////

if(character.hp < 2500)
	{
		send_cm("angioseal", "bosshelp");
		send_cm("Ynhi", "bosshelp");

		game_log("help !!!!!!");
	}	
	
	///////////////

	//distance(character, entity)
	if(!is_in_range(target))
	{
///////////// di chuyen toi thieu hieu qua toi da		
var khoangcach =  (distance(character, {x: target.real_x, y: target.real_y}))  ;	var kcconthieu1 =  (distance(character, {x: target.real_x, y: target.real_y}) +1) - character.range + (5);	
var kcconthieu =  (distance(character, {x: target.real_x, y: target.real_y}) +1) - character.range + 50*(kcconthieu1/character.range);

		
		
		xmove(
		character.x+(target.x-character.x)*(kcconthieu/khoangcach),
		character.y+(target.y-character.y)*(kcconthieu/khoangcach)
			);
		// Walk half the distance
	}
///////////////	
	
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}


	
	
	
	
	
	
},1000/8); // Loops every 1/4 seconds.


/////////////





setInterval(function() {
skill_scare()
}, 500);

function skill_scare() {
	
if (is_on_cooldown("scare")) 
{
	changeitem({ slot: "orb", name : "orbg", level : 2 });
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







///////
function getBestTargets(options = {}) {
    const entities = []
	     let number = 0

     var army=[options.subtype, options.type, "aaa", "bbb", "cccc"];  
  

    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
		
if (options.subtype && options.type && (army.indexOf(entity.mtype) == -1)   ) continue
if (!options.subtype && options.type &&entity.mtype != options.type   ) continue
			

if (options.maxHP && entity.max_hp > options.maxHP) continue
if (options.HP && entity.hp > options.HP) continue
 		if (options.target && entity.target != options.target) continue
		if (options.havetarget && !entity.target ) continue
		if (options.Nohavetarget && entity.target ) continue
		if (options.fire && entity.s.burned  ) continue
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
////////////////////////////////////////////////////
/////////////////////////////////////////













/////////////

function get_nearest_playerV()
{
	// Just as an example
	var min_d=400,target=0;

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(!current.player) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) target +=1;
	}
	game_log("so luong nguoi choi la: " + target)
	return target;
}



/////////////////////////////////////

function franky()
{
	if (frankymode == 0 || smart.moving) return
var BOSS = "franky"
let SOLUONG = 5  ///so nguoi choi xung quanh de kich hoat
	
if(parent.party_list.includes("Ynhi") && notefrankyYnhi == 0 )  
      {
	send_cm("Ynhi", "franky");	
	notefrankyYnhi = 1
	  }
	
	//move map fk
if(character.map == "level2w" && !parent.S.franky  &&  !is_moving(character)  )	
		{
frankymode = 0
frankyfight = 0
frankysafe = 0
			frankyKILL = 0
			notefrankyYnhi = 0
			stop_character("Ynhi") 
				smart_move({ map: maptrain, x: farmX, y: farmY })
		}

	////////////
	if(character.map != "level2w")smart_move({ map: "level2w", x: -8, y: 13 }, () => {
  //
    });	
	if ( distance(character, {x: -8, y: 13}) > 80 && !smart.moving)xmove(-8,13)
	var targetfk
	targetfk= get_nearest_monster({type: BOSS});

	///gioi han vong tron fight + check member
		var f1 = get_player("Ynhi"); 
		var f2 = get_player("6gunlaZe"); 
	if(get_nearest_playerV() >= SOLUONG && f1 && f2)frankyfight =1
	else frankyfight =0;
	
	////Cac dieu kien rut lui
 var targets = getBestTargets({ max_range: character.range, type: BOSS, subtype : "nerfedmummy" , target1: "Ynhi" , target2: "haiz" , target3: "6gunlaZe" })


 	    /// su dung skill 3 shot lên quai  gan nhat - chua lua chon duoc quai

 if (targets.length >= 3  && character.mp > 330  && !is_on_cooldown("3shot")       ) {
                  check3shot =1;
				}
	else
	{
		check3shot =  0;
	}
	
	///

 if (targets.length >= 5  && character.mp > 430  && !is_on_cooldown("5shot")       ) {
                  check5shot =1;
				}
	else
	{
		check5shot =  0;
	}
	
	////////////////////////////////////	
 
 
 
	
if (character.hp > 4000 && frankyfight ==1 )frankysafe = 1
	else frankysafe = 0;

if (frankysafe == 0)skill_scare();	
	
	
	////fight
	
	if (frankyfight == 1 && frankysafe == 1)
{	
	
	if ( distance(character, {x: -8, y: 13}) > 30 && !smart.moving )xmove(-8,13)
	

		if( check5shot == 1 )use_skill("5shot", targets);
	    if(check3shot == 1 && check5shot ==0 )use_skill("3shot", targets);
	

       	var target1= get_nearest_monster1({type: BOSS,});
if(can_attack(target1) && (target1.target == "6gunlaZe" || target1.target == "Ynhi" || target1.target == "haiz")  )
	{
attack(target1);
	}

     var target2= get_nearest_monster2({type: BOSS,});
if(can_attack(target2) && target2.target )
	{
attack(target2);
		
	
if(target2 && (character.mp > G.skills.huntersmark.mp) && is_in_range(target2, "huntersmark") && !is_on_cooldown("huntersmark") && !target2.s.marked && (target2.hp > (character.attack * 10)) )
    {
        use_skill("huntersmark", target2);
        game_log("huntersmark!!");   
	}			
		
		
		
	}	
	
if (frankyKILL == 0 && targets.length == 0)
{
frankyKILL = 1
 use_skill("supershot", target1);	
}

		//game_log("AAAAAAAAAAA "+ targets.length );

	
}

	
}
/////////////

















// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround















