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
let numfram = 0
var sanbosss = "phoenix"; 
var sancreep = "arcticbee"; 
var maptrain = "winterland"; 
let farmX = 1202
let farmY = -876	
let idmod = 0
let idmodhp = 0







	
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





setInterval(function() {
	
	const entity = get_entity(character.target)
	
    if (!smart.moving && !character.moving && !entity ) {
     //  smart_move(sancreep)
		smart_move({ map: maptrain, x: farmX, y: farmY })

		game_log("Trainn !!!!!!");
    }
}, 300000); // ra bai quai every 60s


setInterval(function() {
	mageMagiPort()
	const entity = get_entity(character.target)
	
    if (!smart.moving && !character.moving && !entity && numfram == 0 ) {
     //  smart_move(sancreep)
		smart_move({ map: maptrain, x: farmX, y: farmY })

		game_log("Trainn !!!!!!");
		numfram = 1 
    }
}, 3000); // ra bai quai lan dau








var draw_debug = true;

function on_draw(){
  if(draw_debug){
      clear_drawings();
/////////
	   draw_circle(farmX, farmY, 50,  9, 0xf39c12);
///////////
	        draw_circle(character.real_x, character.real_y, character.range);


}
}

/////////////// vong tron fram
setInterval(function() {

	 game_log("K/C vi tri ban dau la " +distance(character, {x: farmX, y: farmY}));
if ( !smart.moving && distance(character, {x: farmX, y: farmY}) > 50 && character.map == maptrain   )xmove(farmX,farmY)
	
//draw_circle(character.x - 2, character.y - 2, 1, 15);
	
}, 800); // di chuyen ve trung tam neu o xa moi 5s
/////////////////////////////////////////////////////////////////
////////////////////////////////////



function get_nearest_monster1(args) ///mod
{
	//args:
	// max_att - max attack
	// min_xp - min XP
	// target: Only return monsters that target this "name" or player object
	// no_target: Only pick monsters that don't have any target
	// path_check: Checks if the character can move to the target
	// type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
	var min_d=(character.range) ,target=null;

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


/////////////



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

    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "tracker","harbringer"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);




//////////// move gan leader
setInterval(function() {

	////////// moi paty - de nhan dien leader
//let leader = character.party;
//if (leader===undefined) 
	if (!character.party) {
    send_party_request("haiz");

}


	
}, 2000);

///////////

/// check boss khi fram
setInterval(function() {
	var checkbosstg= get_nearest_monster({type: sanbosss});
	if(checkbosstg){
		send_cm("haiz", "yes");
		game_log("bossss !!!!!!");
		
	}
	else 
	{
		send_cm("haiz", "no");
				game_log("NO bossss !!!!!!");

	}
	
	
	if(character.esize < 10)
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

function changeitem(options = {}) {

	if ( !options.slot ||  !options.name || !options.level ) return 
	
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






/////////////////


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


if (character.hp/character.max_hp< 0.8 && character.mp > 100 ) {
   use_skill("use_hp");
	numHP += 1
} 
else if (character.mp/character.max_mp< 0.8) {
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

	use_hp_or_mp1();

	
	if(!attack_mode || character.rip || is_moving(character)) return;


	
		//  var target=get_targeted_monster();
	// lua chon 2 loai quai de fram
	// var target= get_nearest_monster({type:"grinch"});
	
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
		
		
		var target= get_nearest_monster({type: "greenjr"});
		if(target) change_target(target);
		else
		{
			
		var target= get_nearest_monster({type: "stoneworm1"});
		  if(target) change_target(target);
		else
		{

		 var target= get_nearest_monster1({type: sancreep});
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
	
	/////
	//////////////////////////

	
			///////////////goi dong doi toi skill boss
		var c1 = get_player("6gunlaZe"); 
		var b1 = get_player("haiz"); 

		 var target111= get_nearest_monster({type: sanbosss});
		
 if (target111 &&  b1 != null  ) {
	 
	    const d_b1 = distance(character, b1)
	 
	 
	  if (d_b1 < 150   ) {  /// lai gan moi kill
	 
                    game_log("kill boss nao ae");
	
	 	 var target= get_nearest_monster({type: sanbosss});

		   if(target) change_target(target); /// chuyen doi sang boss
		  
	  }
	 
	 
			

 }

	///////////////
	//Energize Partymenber

	if (c1 != null) 
	{
	let mpssp = character.mp - 100
	let mpneeed = c1.max_mp - c1.mp
    let mpskill = mpssp
		
		if (mpssp > mpneeed)
		{
			mpskill = mpneeed
		}
		
		
		 if(character.mp > 300
                   
                   && c1 != null
                   && is_in_range(c1, "energize")
                  && !is_on_cooldown("energize")){
                use_skill("energize", c1, mpskill );
                game_log("Mage energized " + c1.name);
          }

	}
///////////////////
cleanLowHP(target)
	

	////////////////////////////
	
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
		//////////// dung skill
		            if(character.mp > 3500 && target.hp >7000 )
            {
                use_skill("burst", target);
				 game_log("Burst !!!!!!");
            }
		
		
		
		/////////
		set_message("Attacking");
		attack(target);
	}
	

	
	



	
	
	
	
},1000/8); // Loops every 1/4 seconds.




///////////////////////////////////////////////////////////////////////

function cleanLowHP(taget)
{

 var targets = getBestTargets({ max_range: character.range , type: taget.mtype , fullHP:700 , number : 1 })  //ham bo dem quai vat con duoi 100 mau cung chung loai
	  
		//////////// dung skill
if( can_use("cburst") && targets.length == 1 )
            {
				
		if(character.mp > (idmodhp*2 +70) ) 
		{
////
    let targetData = []
    targetData.push([idmod, (idmodhp*2 +20)])
    use_skill('cburst', targetData)	
					
 game_log("Burst mana !!!!!! >" + (idmodhp*2 +20));
////				
		}
				
            }	
 
 
	
	
/////////	

	
	
////// 

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
		 if (options.fullHP && entity.hp > options.fullHP) continue
		
if (entity.id == idmod)continue //tranh lap lai 1 muc tieu >>chi dung cho NhiY Fram
		///
		if ( options.number &&   (number+1) > options.number ) return entities;
		///
			number = 1 + number
		idmod = entity.id;
		idmodhp = entity.hp
        entities.push(entity)
    }


    // We will return all entities, so that this function can be used with skills that target multiple entities in the future
    return entities
}

////////////////////////////////////////////



















// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
