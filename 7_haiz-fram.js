

// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!
///VIPPPPPPPPPPPP
////////////////
game_log("Game vs 1.7");
let host
if (character.id == "haiz") host = 1
else host =0
game_log("tên nhân vât!! = " +character.id);
game_log("host = " +host);

let looop = 8
let foxmode = 1 //1 la nhiY 0 la angioseal
let framfocus = 1  //tập trung quanh 1 nhân vật khi fram
var nhanvatfram = "6gunlaZe"
const TenMinutesInMs = 10 * 60 * 1000
const Ten7MinutesInMs = 7 * 60 * 1000
let bankk = 0
let trieuhoi = 0

let checktimeparty = 0
let partychecktime
let banktime 
let bosstime = 0 
let timekillboss
let skillbua = 0
let skillriu = 0
let delayriu  = Date.now()
let delayBug  = Date.now()
let run = 1
let notefrankyYnhi = 0

let firtice = 0
let icemode = 0
let icefight = 0
	let	delayfram 
	let	backfram = 0
	let solo_ice = 0 ///0 =khong danh ice khi co 1 minh/// 1 = check va danh 1 minh
let check_ice = 0
	
	
let lastCallTime = 0; // Biến lưu trữ thời gian mốc
let delayThreshold = 200; // Ngưỡng thời gian 200ms
let killangioseal = 1
let autobuyPonty = 1 ///tu dong chuyen sv mua do ponty
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
let frankymode = 0
let frankyfight = 0
let frankysafe = 0


let modeYnhi = 1 ///1 = Ynhi //2 = haiz1 // 0 == nhiY
let frammode = 3
let soluongquai = 2

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
farmX = 674
farmY = 1802
}
else if ( frammode == 3 )
{
 triancrep = "ghost"; 
 maptrain = "halloween"; 
farmX = 324
farmY = -1319
}





if(!get_nearest_monster({type:'franky'}) && !get_nearest_monster({type:'icegolem'}) )smart_move({ map: maptrain, x: farmX, y: farmY })







function on_party_request(name) {
if (name == "MuaBan" || name == "haiz1" || name == "nhiY" || name == "Ynhi" || name == "6gunlaZe"  || name == "angioseal") {
            accept_party_request(name);
        }
        if ((name == "haiz" || name == "angioseal") && bosstime == 0 ) {
            accept_party_request(name);
        }	
	
	
    }



setInterval(function() {
	if (host == 0 ) return
	
if (character.ping > 600 )
{
	delayThreshold = character.ping / 2
}
	else
{
	delayThreshold = 220
}
	
if (bankk == 1 && Date.now() > banktime + Ten7MinutesInMs)
{
	bankk = 0
    start_character("MuaBan", 6);	
}	
//////////////////////////	Cho 10p danh boss
if (bosstime == 1 && Date.now() > (timekillboss + TenMinutesInMs) )
{	
	bosstime = 0
}	
//////////////////////	
	
//	if (parent.S.icegolem || parent.S.franky ) return
	
  if (trieuhoi == 0)
  {
	  trieuhoi = 1
if(!parent.party_list.includes("6gunlaZe")) start_character("6gunlaZe", 33);
if(!parent.party_list.includes("MuaBan")) start_character("MuaBan", 6);
	  
	  
if (modeYnhi == 0)	 
{
if(!parent.party_list.includes("nhiY")) start_character("nhiY", 14);
}
else if  (modeYnhi == 1)
{
if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 27);	
}
else if  (modeYnhi == 2)
{
if(!parent.party_list.includes("haiz1")) start_character("haiz1", 29);	
}
	  
  }

}, 1000); //trieu hoi 1 lan dau
///////////////////////////



 ///////////////////////// 
setInterval(function() {	
if (host == 0 ) return	
	
if (frankymode == 1 || firtice == 1 || evencheckmap == 1 ) return	
	
	
let region = server.region;
let serverIden = server.id

if (!parent.S.franky && !parent.S.icegolem) //khong co su kien thi moi chuyen sv
{
if ( region == "ASIA" && serverIden == "I" ) 
{
	game_log ("  SV  >>>>" + region + serverIden )
}
	else
	{
	change_server("ASIA", "I");	
	}
}	

if(bosstime == 0 && parent.party_list.includes("angioseal") && killangioseal == 1)stop_character("angioseal")
if(bosstime == 0 && parent.party_list.includes("nhiY") && killangioseal == 1 && foxmode == 1 && !smart.moving )stop_character("nhiY")
	
if(!parent.party_list.includes("6gunlaZe") ) start_character("6gunlaZe", 33);
	
/////////////////	
if (modeYnhi == 0 && frankymode == 0)	 
{
if(!parent.party_list.includes("nhiY")) start_character("nhiY", 14);
}
else if  (modeYnhi == 1 && frankymode == 0)
{
if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 27);	
}
else if  (modeYnhi == 2 && frankymode == 0)
{
if(!parent.party_list.includes("haiz1")) start_character("haiz1", 29);	
}
//nhiY 14 = fram rieng
//	nhiY 2 = binh mana di dong
//	

		
	
	
}, 80000); //40s trieu hoi 1 lan neu ko thay trong party, phai cho delay login



	



setInterval(function() {	
if (host == 0 ) return	
	
if (frankymode == 1 || firtice == 1 || evencheckmap == 1) return	

if (autobuyPonty != 1) return
	
	///////////
let randomNumber = getRandom(1, 100);	
let region = server.region;
let serverIden = server.id
		game_log("svvvvvvvv ! ! ==   " +randomNumber);


if (!parent.S.franky && !parent.S.icegolem) //khong co su kien thi moi chuyen sv
{
	
if (randomNumber < 40) {
    change_server("US", "I");
} else if (randomNumber > 80) {
    change_server("EU", "I");
} else if (randomNumber > 40 && randomNumber < 55) {
    change_server("EU", "II");
} else if (randomNumber > 55 && randomNumber < 70) {
    change_server("US", "III");
} else if (randomNumber > 70 && randomNumber < 80) {
    change_server("US", "II");
} else {
    change_server("ASIA", "I");
}	
	
}	
	
}, 2000000); //30p chuyen sv 1 lan


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/////////////////////
/////////////////////////

setInterval(function() {
	
if (host == 0 ) return	
	
    if (character.esize < 17) {
       
	
	const MuaBan = (parent.party_list ?? []).some(c => c === 'MuaBan');	
		
    if (!MuaBan) {
      start_character("MuaBan", 6);
		game_log("trieu hoi MuaBan!!");
	}
	}
	
	
}, 160000); //



setInterval(function() {
	
if (host == 0 ) return	
	
    if (character.esize > 25) {
       
	
	const MuaBan = (parent.party_list ?? []).some(c => c === 'MuaBan');	
		
    if (MuaBan) {
    //  parent.api_call("disconnect_character", {name: "MuaBan"});
	//	stop_character("MuaBan")
	start_character("MuaBan", 6);	
		game_log(" MuaBan da xong nhiem vu!!");
	}
	}
	

}, 9900000); // auto re connet mua ban moi 3h




























////////////////

setInterval(function() {
	
	const entity = get_entity(character.target)
	
 if (!smart.moving && !character.moving && !entity && numgo == 0 && help == 0 && framboss == 0 && frankymode == 0 && icemode == 0 ) {
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
	        draw_circle(character.real_x, character.real_y, 320);


}
}



setInterval(function() {

	///////////////////////////
	const entity = get_entity(character.target)
	
    if (!smart.moving && !character.moving && !entity && numfram == 0 ) {
	smart_move({ map: maptrain, x: farmX, y: farmY })
		game_log("Trainn !!!!!!");
			//		smart_move({ map: "winterland", x: 850, y: -40 });

		numfram = 1
    }
	/////////////////////////////////// auto loot
	

	//////////////////////////////////////
	
	
}, 3000); // ra bai quai lan dau




function on_magiport(name){
    if(name == "nhiY"){
        accept_magiport(name);
    }
}


function on_cm(name, data) {
/////////////////
    if(name == "MuaBan"){

			
	   if(data == "bank") {
        start_character("MuaBan", 10);	
		 banktime = Date.now()  
		   bankk = 1
	   }	
		
  if(data == "boss1" || data == "boss2"  || data == "boss3" || data == "boss4" || data == "boss5"  || data == "boss6" || data == "boss7") {
	  if (modeYnhi == 0)
	  {
		parent.api_call("disconnect_character", {name: "nhiY"});
		stop_character("nhiY");
	  }
	  else if (modeYnhi == 2)
	  {
	  	parent.api_call("disconnect_character", {name: "haiz1"});
		stop_character("haiz1");
	  }
	  else
	  {
		  if (foxmode == 0){
		parent.api_call("disconnect_character", {name: "Ynhi"});
		stop_character("Ynhi");  
		  }
		  else 
		  {
		parent.api_call("disconnect_character", {name: "6gunlaZe"});
		stop_character("6gunlaZe");    
		  }

			  
	  }
		  bosstime = 1
	    timekillboss = Date.now()
	  if (foxmode == 1)start_character("nhiY", 12);
	  if (foxmode == 0)start_character("angioseal", 21);	  
}
	
		
	 if(data == "boss1") {
	  framboss = 1
	   }
	 if(data == "boss2") {
	  framboss = 2
	   }
	 if(data == "boss3") {
	  framboss = 3
	   }	 
	 if(data == "boss4") {
	  framboss = 4
	   }
	 if(data == "boss5") {
	  framboss = 5
	   }	 
	 if(data == "boss6") {
	  framboss = 6
	 }
	 if(data == "boss7") {
	  framboss = 7
	   }		
		

       if(data == "franky")
	   {
		   frankymode = 1	
	stop_character("angioseal")	
	stop_character("nhiY")	
	stop_character("haiz1")	

       if(!parent.party_list.includes("6gunlaZe"))start_character("6gunlaZe", 33);
	    if(!parent.party_list.includes("Ynhi"))start_character("Ynhi", 28);
		   //cũ 31
	   }		
		
		
		
		
		
}
/////////////	
    if(name == "nhiY"){

		
       if(data == "yes") {
				game_log("mess !!!!!!");

		   	numboss = 1
				 }
					else
					{
						numboss = 0
					}
		
	if (numboss == 1 && numgo == 0) {
			const nhiY = (parent.party_list ?? []).some(c => c === 'nhiY');
    smart_move(parent.party["nhiY"]);  
						game_log("lest g !!!!!!");

      numgo = 1
	}
		
		       if(data == "no" && numgo == 1) {
				game_log("comback !!!!!!");
				   numgo = 0
				          smart_move(triancrep)
				 }

    }
	
	////////////////////////////////
 if(name == "6gunlaZe" && host == 0){
    // game_log("tin nhan = " +data);
       if(data == "help") {
	  help = 1
	   }
	 else
	 {
	  help = 0
	 }
	 
	 if(data == "boss1") {
	  framboss = 1
	   }
	 if(data == "boss2") {
	  framboss = 2
	   }
	 if(data == "boss3") {
	  framboss = 3
	   }	 
	 if(data == "boss4") {
	  framboss = 4
	   }
	 if(data == "boss5") {
	  framboss = 5
	   }	 
	 if(data == "boss6") {
	  framboss = 6
	 }
	 if(data == "boss7") {
	  framboss = 7
	   }	   
	 
	 
 }
	//////////////////////////
}

///////////////////////////


setInterval(function() {
////////////giui vi tri moi 2s
let checkdichuyen = smart;  // checkdichuyen sẽ là smart, đối tượng dữ liệu 
let SM = 0;
if (checkdichuyen.plot && checkdichuyen.plot.some(p => p.x !== undefined && p.y !== undefined)) {
  SM = 1;  // Nếu có ít nhất một điểm có vị trí x, y hợp lệ
}

if (SM === 1) {
  let x = checkdichuyen.x;
  let y = checkdichuyen.y;
  let map = checkdichuyen.map;

for (let char in parent.party) {
    // Kiểm tra các điều kiện để không gửi thông tin cho chính mình, MuaBan, hoặc nếu không phải là người chơi hợp lệ
    if (char !== character.name && char !== "MuaBan" ) {
		   
        send_cm(char, {
            message: "location",
            x: x,
            y: y,
            map: map
        });
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
		        continue;

		
	}
	    if (char !== character.name && char !== "MuaBan" && is_moving(character) ) {
			     
        send_cm(char, {
            message: "location",
            x: character.going_x,
            y: character.going_y,
            map: character.map
        });
			
        continue;
    }
}
	//////////////////////////////////
}
}, 1000);




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


setInterval(function() {
	
   const mast = get_player("6gunlaZe");
	if (help == 1 && !smart.moving && !mast ){
		
    smart_move(parent.party["6gunlaZe"]);  	
 use_skill("charge")
	use_skill("warcry")
	
	}
////////////////////////////////////
	const mast11 = (parent.party_list ?? []).some(c => c === 'angioseal');
	const foxmode11 = (parent.party_list ?? []).some(c => c === 'nhiY');
	const nearA = get_player("angioseal");
	const nearB = get_player("nhiY");

if (framboss > 0  && foxmode11 && foxmode == 1 )send_cm("nhiY", "foxmode");
	
	
if (framboss == 1 && !smart.moving && (  (mast11 && foxmode == 0)  || (foxmode11 && foxmode == 1)  ) && framboss1  <5   ){
	send_cm("angioseal", "boss1");
	smart_move({ map: "spookytown", x: -728, y: -123 }, () => {
framboss1 += 1
    });
}
if (framboss == 2 && !smart.moving && (  (mast11 && foxmode == 0)  || (foxmode11 && foxmode == 1)  ) && framboss1  <5 ){
	send_cm("angioseal", "boss2");
	smart_move({ map: "cave", x: 68, y: -1163 }, () => {
framboss1 += 1
    });
}	
if (framboss == 3 && !smart.moving && (  (mast11 && foxmode == 0)  || (foxmode11 && foxmode == 1)  ) && framboss1  <5 ){
	send_cm("angioseal", "boss3");
	smart_move({ map: "cave",  x: 982, y: 105 }, () => {
framboss1 += 1
    });
}		
if (framboss == 4 && !smart.moving && (  (mast11 && foxmode == 0)  || (foxmode11 && foxmode == 1)  ) && framboss1 <5  ){
	send_cm("angioseal", "boss4");
	smart_move({ map: "main", x: 1312, y: -200 }, () => {
framboss1 += 1
    });
}	
if (framboss == 5 && !smart.moving && (  (mast11 && foxmode == 0)  || (foxmode11 && foxmode == 1)  ) && framboss1 <5  ){
	send_cm("angioseal", "boss5");
	smart_move({ map: "main", x: 700, y: 1800 }, () => {
framboss1 += 1
    });
}	
if (framboss == 6 && !smart.moving && (  (mast11 && foxmode == 0)  || (foxmode11 && foxmode == 1)  ) && framboss1 <5  ){
	send_cm("angioseal", "boss6");
	smart_move({ map: "halloween", x: -140, y: 512 }, () => {
framboss1 += 1
    });
}	
if (framboss == 7 && !smart.moving && (  (mast11 && foxmode == 0)  || (foxmode11 && foxmode == 1)  ) && framboss1 <5  ){
	send_cm("angioseal", "boss7");
	smart_move({ map: "main", x: -1137, y: 455 }, () => {
framboss1 += 1
    });
}	
	
	
	


	
	
	
	
	
	
if ( (  (nearA && foxmode == 0) ||  (nearB && foxmode == 1)  ) && framboss1 > 0 && !smart.moving ){	
var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
if (targetsoloboss.length == 0) //danh xong
	{
		framboss1 = 0
		     if(foxmode == 0)stop_character("angioseal")
		framboss = 0
		 bosstime = 0
		smart_move({ map: maptrain, x: farmX, y: farmY }, () => {
		framboss = 0
		 if(foxmode == 1){
			 stop_character("nhiY")
			 if(!parent.party_list.includes("6gunlaZe")) start_character("6gunlaZe", 33);
		 }
		 bosstime = 0

    });	
		
		loot();
		        loot();
		        loot();

	}
		
}
///////////////	check giui da giet boss lan nua
if (framboss ==  0 && framboss1 ==  0 && mast11 && Kil_angioseal == 1 && host ==0 )send_cm("6gunlaZe", "killboss");
	///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ham nay tu dong không cho Angioseal choi
//////////////	
//////////////////////////////////// /  kiem soat khoang cach tanker khi san boss
   //Get the master from parent.entities
   const masternhiY = get_player("nhiY");
  //If the master is close, follow him
if(masternhiY && numgo == 1){
	  
   const kc = distance(character, masternhiY)

   if ( kc > 150 && kc <351){
    xmove(
      character.x+(masternhiY.x-character.x)/3,
      character.y+(masternhiY.y-character.y)/3
    );
   }  
}
/////////////////////////
	
}, 1000);





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

	if (!character.party && framboss == 0 && host == 0) {
    send_party_request("6gunlaZe");

}
	if(framboss > 0&& gunn && frankymode == 0 && host == 0 )leave_party();
	
	if (!character.party && frankymode == 0 && host == 0) {
    send_party_request("6gunlaZe");

}

}, 500);







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

    let itemsToExclude = ["hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "jacko","fireblade","tracker","glolipop","ololipop","mittens","xgloves","exoarm","hhelmet","mcape","helmet1","wbasher", "basher","bataxe","sweaterhs","tigerstone","sshield"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);



//////////////////////////////////////////////
let started1
function kite(taget, kite_range)
{

if (is_disabled(character) ) return
	
if (started1 == undefined) started1 = Date.now()
if (Date.now() < started1 + 330) return;
	
	const radius = kite_range ;
const  angle = Math.PI / 5.5 ;
    if (can_move_to(taget.real_x, taget.real_y)) {
        const angleFromCenterToCurrent = Math.atan2(character.y - taget.real_y, character.x - taget.real_x)
        const endGoalAngle = angleFromCenterToCurrent + angle
        const endGoal = { x: taget.real_x + radius * Math.cos(endGoalAngle), y: taget.real_y + radius * Math.sin(endGoalAngle) }
        move(endGoal.x, endGoal.y)

	
	}
 
	

}




function kiteSP(taget,sluong)
{
	
if (sluong <= 3) return
 var targets11 = getBestTargets({ max_range: 200, type: taget.mtype, havetarget: 1 })  //ham bo dem quai vat	
	
 var targets = getBestTargets({ max_range: 200,min_range: character.range - 20 , type: taget.mtype, minHP: 0.99 , fullHP:1 , number : 1 })  //ham bo dem quai vat
	  
		//////////// dung skill
if(character.mp > 100 &&  can_use("taunt") && targets && numboss == 0 && character.targets < 4 &&  (character.hp/character.max_hp > 0.67) && character.attack > 1000 && targets11.length <= sluong)
            {
				stop("moving")
				stop("smart")

                use_skill("taunt", targets);

            }	



}

//////

    
  


////////
function getBestTargets(options = {}) {
    const entities = []
     let number = 0
	  var army=[options.subtype, options.type, "aaa", "bbb", "cccc"];  
    for (const id in parent.entities) {
        const entity = parent.entities[id]
        if (entity.type !== "monster") continue
        if (entity.dead || !entity.visible) continue

 if (options.max_range && distance(character, entity) > options.max_range) continue
if (options.min_range && distance(character, entity) < options.min_range) continue
		
if (options.subtype && options.type && (army.indexOf(entity.mtype) == -1)   ) continue
if (!options.subtype && options.type &&entity.mtype != options.type   ) continue		
 if (options.type && entity.mtype !== options.type) continue
		 if (options.minHP && options.minHP*entity.max_hp > entity.hp) continue
		 if (options.fullHP && entity.hp < entity.max_hp) continue
		if (options.havetarget && !entity.target) continue
		if (options.Nohavetarget && entity.target) continue
		if (options.target && entity.target != options.target) continue
		if (options.targetNO && entity.target == options.targetNO) continue
		if (options.target1 && options.target2 && options.target3 && entity.target != options.target1 && entity.target != options.target2 && entity.target != options.target3)  continue
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






/////////////////////////////////////////////////
	

function changeitem(options = {}) {
	//them delay tranh lag
	
    var merch = get_player("MuaBan"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) return
	
	if (started == undefined) started = Date.now()
    if (Date.now() < started + delayy) return;

	if ( !options.slot ||  !options.name || !options.level ) return 
	
	if (character.slots[options.slot])
	{
	if (character.slots[options.slot].name == options.name && character.slots[options.slot].level == options.level) return 
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


//////////////

function ms_to_next_skill(skill) {
    const next_skill = parent.next_skill[skill]
    if (next_skill == undefined) return 0
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) - character.ping;
    return ms < 0 ? 0 : ms;
}






let delay = 200
//////////////////////////////////////////////////////////////////////////
var attack_mode= true

setInterval(function(){
  delay = ms_to_next_skill("attack"); 
	delay = delay/2
	//use_hp_or_mp();
	use_hp_or_mp1();
if (Date.now() < delayBug +30000 ) return	
/////////////////	
	let pings = Math.min(...parent.pings)
					// game_log("ping!!! = " +pings);

if (is_disabled(character) || pings >500)
{
	looop = 4
}
else
{
	looop = 8
}	

if (checkTimeBetweenCalls() === 1) return;
////////////////////
	 if(Object.keys(parent.chests).length >= 5)loot();
/////////////////////////	

	if(!attack_mode || character.rip || smart.moving) return;
///
		if(character.s["hardshell"] && is_moving(character) ) stop();
	
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

if (icemode == 0 && evenbossmode == 0)
{	
	
	
	if(!target)
	{
		var target= get_nearest_monster({type: "greenjr1"});
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


	
		///////////////goi dong doi toi skill boss
		var b1 = get_player("nhiY"); 

		 var target111= get_nearest_monster({type: sanbosss});
		
 if (target111 &&  b1 != null  ) {
	 
	    const d_b1 = distance(character, b1)
	 
	 
	  if (d_b1 < 250   ) {  /// lai gan moi kill
	 
                    game_log("kill boss nao ae");
	
	 	 var target= get_nearest_monster({type: sanbosss});

		   if(target) change_target(target); /// chuyen doi sang boss
		  
	  }
	 
	 
			

 }
////////////////////////////////////////
//game_log("!!!!!! =   "+ skillriu);

if (skillbua == 1 || skillriu == 1)
{
	if ( skillriu == 1 ){
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
	
	
}	
if (skillbua == 1 || skillriu == 1)	return		
	
	//////////////////// ne dung aoe len boss
var targets11 = getBestTargets({ max_range: 80 , type: "crabxx" , number : 1 }) 
var targets12 = getBestTargets({ max_range: 380 , type: "phoenix" , number : 1 }) 
var targets13 = getBestTargets({ max_range: 200 , type: "greenjr" , number : 1 }) //ham bo dem quai vat
			//game_log("framboss = "+ framboss);
  
		//////////// dung skill 

if(( targets12.length > 0 ) && framboss == 0 )
            {

					var target= get_nearest_monster({type: "phoenix"});
		  if(target) change_target(target);
		//	send_cm("6gunlaZe", "help");/// an toan tuyet doi
            }
	else if (character.targets = 1 && framboss > 0)
	{

	}
	else if (targets13.length > 0)
	{

	}	
	else
	{

				//	game_log("framboss = "+ framboss + character.targets);

	}
	
	
	/////////////// chay vong vong gom quai lai
 chuyendoithongminhFRAM(target)  
	
	if (framfocus == 0 ) kiteSP(target,soluongquai)
                 var cungf = get_player(nhanvatfram); 
	   	 var targets1 = getBestTargets({ max_range: character.range ,   type: target.mtype, })  //ham bo dem quai vat
		//  if(targets1 && character.targets > 2 ) change_target(targets1); //tro lai muc tieu ban dau o gan neu dang co dong muc tieu xung quanh
		if(targets1 ) {
			change_target(targets1);  
	               //  target = targets1
					  }
	if(!can_attack(target) && target && !character.s["hardshell"] && !character.s["sugarrush"]  && framfocus == 0  )kite(target,character.range + 3);
	if(!can_attack(target) && target && !character.s["hardshell"] && !character.s["sugarrush"]  && framfocus == 1 && cungf &&  distance(character,cungf)  < 200  )kite(cungf,character.range + 3);


     skillwarboss(target)

}	
	
else if (icemode == 1 )
	/////
{
chuyendoithongminh(target)	
//kiteSP(currentTarget)	
var f00 = get_player("haiz1")
let rateskill
if (target && target.attack >8000 )
{
	rateskill = 1.1
}
else
{
	rateskill = 0.85
}

if (target && f00 )VIPSuP(target,rateskill)	
if (target && !f00 ) soloTANK(target)
	
if (run == 1 && target && target.attack >8000 ) return //quai manh qua thi ne ra	
if (skillbua == 1) return	
	
	
if (icefight ==1)	
{
		var target= get_nearest_monster({type: "icegolem"});
		  if(target) change_target(target);
}	
	
	
}
/////////	
else if (evenbossmode == 1 )
	/////
{
chuyendoithongminh(target)	
//kiteSP(currentTarget)	
var f00 = get_player("haiz1")
let rateskill
if (target && target.attack >8000 )
{
	rateskill = 1.1
}
else
{
	rateskill = 0.85
}

if (target && f00 )VIPSuP(target,rateskill)	
if (target && !f00 ) soloTANK(target)
	
if (run == 1 && target && target.attack >8000 ) return //quai manh qua thi ne ra	
if (skillbua == 1) return	
	
	
if (boss_even_fight ==1)	
{
		var target= get_nearest_monster({type: "dragold"});
		  if(target) change_target(target);
}	
	
	
}
/////////		
	
	
	
	
	
//get_nearest_playerV_noMyparty(target)	
	
	/////////////////////////////////////
	if ( target && !is_in_range(target))
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
		            if(character.mp > 100 && !is_on_cooldown("taunt") && numgo == 1 )
            {
                use_skill("taunt", target);
				 game_log("phan no !!!!!!");
            }
var f02 = get_player("Ynhi")		
 if(f02 && target.attack >700 && character.mp > 100 && !is_on_cooldown("taunt") && (target.target == "Ynhi" || target.target == "nhiY" || target.target == "6gunlaZe" ))
            {
                use_skill("taunt", target);
				 game_log("phan no !!!!!!");
            }		
		
		
		/////////
		
		
		
		
		
		set_message("Attacking");
		attack(target);
		  delay = ms_to_next_skill("attack"); 
	}
 game_log("time = !!!!!! "+delay);

},delay); // Loops every 1/4 seconds.	
	
///  },1000/looop); // Loops every 1/4 seconds.


///////////
setInterval(function() {


		if(character.hp < 5000)
	{
		send_cm("angioseal", "bosshelp");
		send_cm("Ynhi", "bosshelp");

		game_log("help !!!!!!");
	}
	
		if(character.hp < 4000)
	{
		send_cm("angioseal", "bosshelp");
		send_cm("Ynhi", "bosshelp");

		game_log("help !!!!!!");
	}	

			if(character.hp < 3000)
	{
		send_cm("angioseal", "bosshelp");
		send_cm("Ynhi", "bosshelp");

		game_log("help !!!!!!");
	}	
				if(character.hp < 2000)
	{
		send_cm("angioseal", "bosshelp");
		send_cm("Ynhi", "bosshelp");

		game_log("help !!!!!!");
	}	
	skill_scare();
}, 700);



function skill_scare() {
	
if (is_on_cooldown("scare")) 
{
	changeitem({ slot: "orb", name : "tigerstone", level : 3 });
}
	 var targetsab11 = getBestTargets({ max_range: 80, type: triancrep , target : "haiz" })  //ham bo dem quai vat
	
if ( (targetsab11.length) >= 3 && !is_on_cooldown("scare") && soluongquai <= 3 ) 
{
	changeitem({ slot: "orb", name : "jacko", level : 1 });
	use_skill("scare");
	game_log("skill scare");

}	
	
	

if (character.hp > 5000) {
	return;
}


	 
if ( (targetsab11.length) == 0) {
	return;
}	
	 
if ( (targetsab11.length) >= 1 && character.hp < 5000 && !is_on_cooldown("scare") ) 
{
	changeitem({ slot: "orb", name : "jacko", level : 1 });
	use_skill("scare");
	game_log("skill scare");

}
}

function soloTANK(taget)
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
				 game_log("war !!!!!!");
	}

	    if (character.hp < 7000 &&  !is_on_cooldown("warcry") )
	{
		use_skill("warcry");
				 game_log("war kite !!!!!!");
	}			
				
	
            }	
 /////////////////////
		    if (character.hp < 7000 &&  !is_on_cooldown("hardshell") && taget.hp >8000 )
	{
		const dist1 = distance(character, taget);
    if (dist1 <= character.range)
	{
		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");
	}
		
	}	

      //////////////
	
	if (character.mp > 1300 &&  !is_on_cooldown("warcry") && !character.s["warcry"] )
	{
		use_skill("warcry");
				 game_log("war kite !!!!!!");
	}	
	
	
	 //////////////////////////////////
 	////
		if( character.hp > 10000 && character.mp > 840 && !is_on_cooldown("warcry") && taget )
            {
				   const dist1 = distance(character, taget);
    if (dist1 > character.range)
	{
		use_skill("warcry");
				 game_log("war !!!!!!");
	}
		
	
            }	
 //////
	
}
////////////////////////
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
				 game_log("war !!!!!!");
	}

	    if (character.hp < 7000 &&  !is_on_cooldown("warcry") )
	{
		use_skill("warcry");
				 game_log("war kite !!!!!!");
	}			
				
	
            }	
 /////////////////////
		    if (character.hp < 9000 &&  !is_on_cooldown("hardshell") && taget.hp >8000 && character.mp > 600)
	{
		const dist1 = distance(character, taget);
    if (dist1 <= character.range)
	{
		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");
	}
		
	}	

      //////////////
	
	if (character.mp > 1300 &&  !is_on_cooldown("warcry") && !character.s["warcry"] )
	{
		use_skill("warcry");
				 game_log("war kite !!!!!!");
	}	
	
	
	 //////////////////////////////////
 	////
		if( character.hp > 10000 && character.mp > 840 && !is_on_cooldown("warcry") && taget )
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
	
	
	 var targetsab = getBestTargets({ max_range: character.range, type: taget.mtype , })  //ham bo dem quai vat
		if ( (taget && !is_on_cooldown("hardshell") && targetsab.length >=4 && character.hp < 13000 && character.mp > 600 )  || (taget && !is_on_cooldown("hardshell") && targetsab.length >=2 && character.hp < 7000 && character.mp > 600 ) )
	{
		//game_log("check1!");
		
		const dist1 = distance(character, taget);
    if (dist1 <= character.range + 5 && taget.target == "haiz")
	{
		use_skill("hardshell");
				 game_log("war hardshell !!!!!!");
		if(is_moving(character))stop()
	}
		
	}	

      //////////////
	 var targetsab1 = getBestTargets({ max_range: 150, type: taget.mtype , subtype: "armadillo"  , targetNO : "haiz" })  //ham bo dem quai vat
	if ( (targetsab1.length) <= 4 &&  (targetsab1.length) >1 &&  taget && !is_on_cooldown("agitate") && character.hp > 13000 && frankymode == 0 && character.mp > 700 && character.attack > 1000 )
	{
	//  use_skill("agitate");

	}
	
////////////	
			if ( Date.now() > delayriu + 2000)
		{
 var targetsabc = getBestTargets({ max_range: 165, type: taget.mtype , target : "haiz" }) 
  var targetsabcd = getBestTargets({ max_range: 165, type: taget.mtype , Nohavetarget : 1 }) //ham bo dem quai vatv
	if ( character.hp > 12000 && character.mp > 1050 && !is_on_cooldown("cleave") && (targetsabc.length + targetsabcd.length)  <=soluongquai && skillriu == 0 && character.attack > 1000 && framboss == 0 && ms_to_next_skill("attack") > 95	
 )
	{
		skillriu = 1	
	delayriu = Date.now()
	
	}	
}
//////////
	

}


function get_nearest_playerV_noMyparty(currentTarget)
{
	// Just as an example
	var min_d=2000,target=0;

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(!current.player) continue;
    if(current.id == "haiz1" || current.id == "Ynhi" || current.id == "6gunlaZe" || current.id == "haiz" || current.id == "nhiY"   ) continue;
		if(current.target == currentTarget.id) target +=1;
	}
	game_log("so luong nguoi choi kill boss la: " + target)
	return target;
}





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
/////////////////////////////////////

function franky()
{
	if (frankymode == 0 || smart.moving) return
var BOSS = "franky"
let SOLUONG = 3  ///so nguoi choi xung quanh de kich hoat


	var targetfk
	targetfk= get_nearest_monster({type: BOSS});

	///gioi han vong tron fight + check member
		var f1 = get_player("Ynhi"); 
		var f2 = get_player("6gunlaZe"); 

//////////////bo chay khi moi nguoi chay het
if(targetfk && get_nearest_playerV_noMyparty(targetfk) <=1 && character.hp < 9000)
{

smart_move({ map: maptrain, x: farmX, y: farmY })
frankymode = 0
frankyfight = 0
frankysafe = 0
 stop_character("6gunlaZe")  
}



	
//////////
if ( checktimeparty == 0)
{
partychecktime = Date.now()
checktimeparty = 1	
}

if (Date.now() > partychecktime + 60000){
partychecktime = Date.now()
	
	stop_character("angioseal")	
	stop_character("nhiY")	
	stop_character("haiz1")	
checktimeparty = 0	
 if(!parent.party_list.includes("6gunlaZe"))start_character("6gunlaZe", 33);
 if(!parent.party_list.includes("Ynhi"))start_character("Ynhi", 28);
}




//////////



	//move map fk
if(character.map == "level2w" && !parent.S.franky  &&  !is_moving(character)  )	
		{
frankymode = 0
frankyfight = 0
frankysafe = 0
				if (modeYnhi != 1)stop_character("Ynhi") 
				smart_move({ map: maptrain, x: farmX, y: farmY })
		}

	////////////
	if(character.map != "level2w")smart_move({ map: "level2w", x: 12, y: 5 }, () => {
  //
    });	
	if ( distance(character, {x: 12, y: 5}) > 80 && !smart.moving)xmove(12,5)

	if(targetfk && get_nearest_playerV(targetfk) >= SOLUONG && f1 && f2)frankyfight =1
	else frankyfight =0;
	
 var targets13 = getBestTargets({ max_range: character.range+10, type: BOSS, subtype : "nerfedmummy" , target1: "6gunlaZe" , target2: "haiz" , target3: "Ynhi" })

	 if (targets13.length <= 4)
	{
	changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
    changeitem({ slot: "offhand", name : "fireblade", level : 9 });
	}	
	else
	{
	changeitem({ slot: "mainhand", name : "ololipop", level : 9 });
    changeitem({ slot: "offhand", name : "ololipop", level : 8 });
	}		
	
	
	////Cac dieu kien rut lui
var targetf1	
var targetf2 

if (f1)
{
targetf1 = getBestTargets({ max_range: 180 , target: "Ynhi" , number : 1 }) 
skillwarboss(targetf1)	
if(targetf1 && (f1.hp/f1.max_hp) < 0.75 && character.mp > 100 && !is_on_cooldown("taunt") )use_skill("taunt", targetf1);

}        
		
if (f2)
{
targetf2 = getBestTargets({ max_range: 180 , target: "6gunlaZe" , number : 1 }) 
skillwarboss(targetf2)	
if(targetf2 && (f2.hp/f2.max_hp) < 0.85 && character.mp > 100 && !is_on_cooldown("taunt") )use_skill("taunt", targetf2);
	
}  
	
if (targetfk && f1 && f2 && (targetfk.target == "Ynhi" || targetfk.target == "6gunlaZe") )use_skill("taunt", targetfk);
	
	
if (targetfk && f1 && f2 && targetfk.target != "Ynhi" && targetfk.target != "6gunlaZe" && character.hp > 10000 && f1.hp > 4500 && f2.hp > 4500 && frankyfight ==1 )frankysafe = 1
	else frankysafe = 0;

if (frankysafe == 0)skill_scare();	
	
	

	
	////fight
	
	if (frankyfight == 1 && frankysafe == 1)
{		
	if ( distance(character, {x: 12, y: 5}) > 30 && !smart.moving )xmove(12,5)
	skillwarboss(targetfk)	
	if(targetfk && !is_in_range(targetfk))
	{
		move(
			character.x+(targetfk.x-character.x)/2,
			character.y+(targetfk.y-character.y)/2
			);
		// Walk half the distance
	}
	else if( targetfk && can_attack(targetfk) && targetfk.target)
	{

		set_message("Attacking");
		attack(targetfk);
	}
}

	
}
/////////////





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
	
if (targetboss.target && targetboss.target == "haiz" && !character.s["hardshell"] && distance(character, targetboss) < (targetboss.range + 14) && !is_on_cooldown("hardshell") && character.mp > 500 && !targetboss.s["stunned"]  ) use_skill("hardshell");
	
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



function chuyendoithongminhFRAM(taget)
{

if (skillbua == 1 || skillriu == 1)return
let arr = ["phoenix", "mvampire", "jr","greenjr", "grinch", "fvampire","stompy", "mvampire", "jr"]; ///các boss dùng kiếm lửa
let magic = 0
var targetstype = getBestTargets({ max_range: character.range , type: taget.mtype , target : "haiz" , number : 1}) 
var targetsabc = getBestTargets({ max_range: character.range + 5, type: taget.mtype }) 
if (targetstype.damage_type == "magical")magic = 1;

if (arr.includes(taget.mtype))
{
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
  if (character.hp/character.max_hp >= 0.3)changeitem({ slot: "offhand", name : "fireblade", level : 9 });	
else
{
if (magic = 0)
{
  changeitem({ slot: "offhand", name : "exoarm", level : 1 });		
}
else
{
  changeitem({ slot: "offhand", name : "sshield", level : 7 });		
}
}


}
else
{
  if (character.hp/character.max_hp >= 0.3)
  {
     changeitem({ slot: "mainhand", name : "ololipop", level : 9 });
     changeitem({ slot: "offhand", name : "ololipop", level : 8 });
  }
  else
{
if (magic = 0)
{
	changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
  changeitem({ slot: "offhand", name : "exoarm", level : 1 });		
}
else
{
	changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
  changeitem({ slot: "offhand", name : "sshield", level : 7 });		
}
}


}


if(character.hp/character.max_hp< 0.6  )
{
	changeitem({ slot: "gloves", name : "xgloves", level : 6 });
	changeitem({ slot: "helmet", name : "hhelmet", level : 7 });

}

else 
	{
		changeitem({ slot: "gloves", name : "mittens", level : 9 });
		changeitem({ slot: "helmet", name : "helmet1", level : 8 });
	}



//////////////////////////////
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
	changeitem({ slot: "chest", name : "mcape", level : 8 });	
	}
else
{
changeitem({ slot: "chest", name : "sweaterhs", level : 8 });
}
///////////////////////////////////	 defffffffff
if (character.hp/character.max_hp >= 0.2 && skillbua == 0 && skillriu == 0 && taget && taget.mtype != "franky")
{	
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
changeitem({ slot: "offhand", name : "fireblade", level : 9 });	
}
	else if (character.hp/character.max_hp >= 0.2 && skillbua == 0 && skillriu == 0 && taget && taget.mtype == "franky")
	{
changeitem({ slot: "mainhand", name : "fireblade", level : 9 });
changeitem({ slot: "offhand", name : "ololipop", level : 9 });		
	}
else if (character.hp/character.max_hp < 0.2 && skillbua == 0 && skillriu == 0 )
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
	
	
	
	
//////////////////////////////
}



///////////
setInterval(function() {
	icegolem()
	
	if ( character.map == "winterland" && distance(character,  {x: 800, y: 400}) < 250 && !smart.moving && !parent.S.icegolem  )
	{
		use_skill("town")
		delayfram = Date.now()
		backfram = 1
	}	
	
	
}, 10000);

let boqua = 0

function icegolem()
{
        if (boss_even_fight == 1) return;
	
	
	////////////////////////////////tro ve sau khi san icegolem
if (!is_moving(character) && backfram == 1 && Date.now() > (delayfram +9000) )
{
	smart_move({ map: maptrain, x: farmX, y: farmY })
				backfram = 0
	            icemode = 0
	            firtice = 0
		stop_character("Ynhi")
		stop_character("nhiY") 
}
//////////////////bo chay khi it nguoi
if (backfram == 1) return	
	if (boqua == 1) return;
var icee = get_nearest_monster({type: "icegolem"})
if(icee && get_nearest_playerV(icee) < 2 && icemode == 1 )
   {
        use_skill("town")
		delayfram = Date.now()
		backfram = 1
	   send_cm("nhiY","back")
	   boqua = 1
   }
if (backfram == 1) return	
	
	
	
	
////////////////////////////////////////////////////	
	
ICEcheckHPMYSv(["icegolem"] , 15000000)
if (solo_ice == 0)	
{
game_log ("check = " + check_ice)
if ((check_ice == 1 && solo_ice == 0) || firtice == 1
 )  ///check dung sv dang danh ice
{
	game_log ("dung sv roiii")
}
	else
	{
			game_log ("Can chuyen qua SV khac")
	return
	}
}	
	
	

	
	
game_log ("San boss thoi")

if(parent.S.icegolem && firtice == 0 )
	{
stop_character("6gunlaZe") 
stop_character("angioseal") 
stop_character("haiz1") 
stop_character("nhiY") 
stop_character("Ynhi") 
firtice = 1
partychecktime = Date.now()
start_character("Ynhi", 28);
start_character("nhiY", 12);		
	}

if (Date.now() > partychecktime + 60000){
partychecktime = Date.now()
	
stop_character("6gunlaZe") 
stop_character("angioseal") 
stop_character("haiz1") 
	
if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 28);
if(!parent.party_list.includes("nhiY")) start_character("nhiY", 12);
}
	
	
	
	
if (get_nearest_monster({type:'icegolem'}))	icemode = 1
	
	
	

if ( icemode == 0 || smart.moving) return	
	

	
var BOSS = "icegolem"
let SOLUONG = 2  ///so nguoi choi xung quanh de kich hoat
	
	
	//move map fk
if(!parent.S.icegolem  &&  !is_moving(character) && character.hp/character.max_hp >= 0.8 && character.mp/character.max_mp>= 0.75 && backfram == 0 )	
		{
        use_skill("town")
		stop_character("Ynhi")
		stop_character("nhiY") 
		delayfram = Date.now()
		backfram = 1
		}

	


//////////////////////	
	
	
	
	
	
	////////////
	
	var targetfk
	targetfk= get_nearest_monster({type: BOSS});



	///gioi han vong tron fight + check member
		var f1 = get_player("Ynhi"); 
		var f2 = get_player("nhiY"); 
	if((targetfk && get_nearest_playerV(targetfk) >= SOLUONG && f1 && f2) || ( targetfk && targetfk.target && get_nearest_playerV(targetfk) >= SOLUONG + 7  ))icefight =1
	else icefight =0;
	
	
}




/////////////////////////////////////auto chuyen sv tim boss - lua chon boss


async function checkServersForMonsters(monsters,monsters1) {
  // Safety Checks
  if (!Array.isArray(monsters)) return;
  if (monsters.length == 0) return;
  if (!Array.isArray(monsters1)) return;
  if (monsters1.length == 0) return;
		if (frankymode == 1)  return;
        if (check_ice == 1) return;
	    if (icemode == 1) return;
        if (boss_even_fight == 1) return;

	
	
let validObjects0
let validObjects
let validObjects1
	 let hpcheck =120000000
	 let hpcheck1 =14000000

  // Query API
  const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");

  const response = await fetch(url);
  if (response.status == 200) {
    const data = await response.json();
  //  parent.S2 = data;
validObjects0 = data.filter(obj => obj.hp !== undefined  && obj.serverIdentifier != "PVP" );	
validObjects = data.filter(obj => obj.hp !== undefined && obj.hp < (hpcheck-18000 )    && obj.serverIdentifier != "PVP" );	  	  
  }
  // Query API1
  const url1 = "https://aldata.earthiverse.ca/monsters/" + monsters1.join(",");

  const response1 = await fetch(url1);
  if (response1.status == 200) {
    const data1 = await response1.json();
  //  parent.S3 = data1;

validObjects1 = data1.filter(obj => obj.hp !== undefined && obj.hp < hpcheck1  && obj.serverIdentifier != "PVP");

  }
///////////////////////////////////////////////////////	  
if (validObjects.length > 0) // co nguoi dang kill franky
{
  let minHpObject = validObjects.reduce((min, obj) => obj.hp < min.hp ? obj : min);
	
let sR =minHpObject.serverRegion;
let sI =minHpObject.serverIdentifier;
game_log ("chuyen fr  SV  >>>>" + sR + sI )

let region = server.region;
let serverIden = server.id	
	
	
if ( sI != "PVP" && !(sR == region  && sI == serverIden) ) 
{
change_server(sR, sI);
}

}
	
else if (validObjects1.length > 0)	///co nguoi dang kill icegolem
{

let minHpObject = validObjects1.reduce((min, obj) => obj.hp < min.hp ? obj : min);
	
let sR =minHpObject.serverRegion;
let sI =minHpObject.serverIdentifier;
game_log ("chuyen ice  SV  >>>>" + sR + sI )

let region = server.region;
let serverIden = server.id	
	
	
if ( sI != "PVP" && !(sR == region  && sI == serverIden) ) 
{
change_server(sR, sI);
}
		
}
	
else if (validObjects0.length > 0)	///cho doi nguoi qua kill frannky
{	  

let minHpObject = validObjects0.reduce((min, obj) => obj.hp < min.hp ? obj : min);
	
let sR =minHpObject.serverRegion;
let sI =minHpObject.serverIdentifier;
game_log ("chuyen wait SV  >>>>" + sR + sI )

let region = server.region;
let serverIden = server.id	
	
	
if ( sI != "PVP" && !(sR == region  && sI == serverIden) ) 
{
change_server(sR, sI);
}		

	
}
	  else
	  {
	  	  game_log ("khong tim thay doi tuong")
	  }
	  
	  
/////////////////////////////////  
 
 
}


// Check now, and every 10p
setInterval(() => {
	checkServersForMonsters(["franky"] ,["icegolem"] );

}, 80000); // 60s check 1lan


////////////////////////////////////



async function ICEcheckHPMYSv(monsters,HP) {
  // Safety Checks
  if (!Array.isArray(monsters)) return;
  if (monsters.length == 0) return;
 // if (!parent.S.icegolem) return;
	
	
	
let check	
let region = server.region;
let serverIden = server.id	
	let validObjects

  // Query API
  const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");

  const response = await fetch(url);
  if (response.status == 200) {
    const data = await response.json();
  //  parent.S2 = data;
validObjects = data.filter(obj => obj.hp !== undefined && obj.hp < HP && obj.serverRegion ==region  && obj.serverIdentifier == serverIden);	  	  
  }
/////////////	
if (validObjects.length > 0) // 
{
  let minHpObject = validObjects.reduce((min, obj) => obj.hp < min.hp ? obj : min);
	
let sR =minHpObject.serverRegion;
let sI =minHpObject.serverIdentifier;
game_log ("tim thay  >>>>" + sR + sI )
check_ice = 1
}
	else {
		game_log ("khong tim thay doi tuong")
      check_ice = 0
	     }
////////////	
	
}



async function BosscheckHPMYSv(monsters,HP) {
  // Safety Checks
  if (!Array.isArray(monsters)) return;
  if (monsters.length == 0) return;
 // if (!parent.S.icegolem) return;
	
	
	
let check	
let region = server.region;
let serverIden = server.id	
	let validObjects

  // Query API
  const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");

  const response = await fetch(url);
  if (response.status == 200) {
    const data = await response.json();
  //  parent.S2 = data;
validObjects = data.filter(obj => obj.hp !== undefined && obj.hp < HP && obj.serverRegion ==region  && obj.serverIdentifier == serverIden);	  	  
  }
/////////////	
if (validObjects.length > 0) // 
{
  let minHpObject = validObjects.reduce((min, obj) => obj.hp < min.hp ? obj : min);
	
let sR =minHpObject.serverRegion;
let sI =minHpObject.serverIdentifier;
game_log ("tim thay  >>>>" + sR + sI )
return evencheckmap = 1
}
	else {
		game_log ("khong tim thay doi tuong boss sv minh")
return evencheckmap = 0
}
////////////	
	
}


/////////////////////////////////
///////////
setInterval(function() {
	evenboss("dragold",24000000)
}, 7000);

let evenfram = 0
let evenbossmode = 0
let even1s = 0
let boss_even_fight = 0
let evencheckmap = 0

function evenboss(name,hp_real)
{
	
		if (frankymode == 1)  return;
        if (check_ice == 1) return;
	    if (icemode == 1) return;
	if ( smart.moving) return	

if (evenfram == 0) return
var bossname = name
		var f1 = get_player("Ynhi"); 
		var f2 = get_player("angioseal"); 
		var targetfk
	targetfk= get_nearest_monster({type: bossname});
	const dist1 = distance(character, targetfk);

	////////////////////////////////tro ve sau khi san boss
if (!is_moving(character) && backfram == 1 )
{
	smart_move({ map: maptrain, x: farmX, y: farmY })
				backfram = 0
	            evenbossmode = 0
}
//////////////////bo chay khi it nguoi
if (backfram == 1) return		
if( get_nearest_monster({type: bossname}) && get_nearest_playerV(targetfk) < 3 )
   {
           use_skill("town")

   }
if (backfram == 1) return	
	

	
	
let SOLUONG = 3  ///so nguoi choi xung quanh de kich hoat
	
	
if ( evenbossmode == 1 && !get_nearest_monster({type:bossname})  &&  !is_moving(character) && character.hp/character.max_hp >= 0.8 && character.mp/character.max_mp>= 0.75 && backfram == 0 )	
		{
		stop_character("Ynhi")
		stop_character("angioseal") 
		backfram = 1
		}	
////////////////////////////////////////////////////	
	
BosscheckHPMYSv([bossname] , hp_real);

game_log ("check = " + evencheckmap)
if (evencheckmap == 1 )  ///check dung sv dang danh bôss
{
	game_log ("dung sv roiii")
}
	else
	{
			game_log ("Can chuyen qua SV khac")
	return
	}
	
	
	

	
	
game_log ("San boss thoi")

if(even1s == 0 )
	{
stop_character("6gunlaZe") 
stop_character("angioseal") 
stop_character("haiz1") 
stop_character("nhiY") 
stop_character("Ynhi") 
even1s = 1
partychecktime = Date.now()
start_character("Ynhi", 28);
start_character("angioseal", 28);		
	}

if (Date.now() > partychecktime + 60000){
partychecktime = Date.now()
	
stop_character("6gunlaZe") 
stop_character("nhiY") 
stop_character("haiz1") 
	
if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 28);
if(!parent.party_list.includes("angioseal")) start_character("angioseal", 28);
}
	
	
	
	
if(!smart.moving && !get_nearest_monster({type:bossname}))
	{
smart_move({ map: "cave", x: 801, y: -753 })
	}
if (get_nearest_monster({type:bossname})) evenbossmode = 1
	
	

if ( evenbossmode == 0 || smart.moving) return	
	

stop_character("MuaBan") 
	




	///gioi han vong tron fight + check member

	if( (get_nearest_playerV(targetfk) >= SOLUONG && f1 && f2 && targetfk  ))boss_even_fight =1
	else boss_even_fight =0;
	
	
}

/////////////////////

async function checkServersForBosseven(monsters) {
  // Safety Checks
  if (!Array.isArray(monsters)) return;
  if (monsters.length == 0) return;
		if (frankymode == 1)  return;
        if (check_ice == 1) return;
	    if (icemode == 1) return;
        if (boss_even_fight == 1) return;

	
	
let validObjects


  // Query API
  const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");

  const response = await fetch(url);
  if (response.status == 200) {
    const data = await response.json();
  //  parent.S2 = data;
validObjects = data.filter(obj => obj.hp !== undefined && obj.hp < 24000000 && obj.serverIdentifier != "PVP" );	  	  
  }
  // Query API1


 
///////////////////////////////////////////////////////	  
if (validObjects.length > 0) // co nguoi dang kill 
{
  let minHpObject = validObjects.reduce((min, obj) => obj.hp < min.hp ? obj : min);
	
let sR =minHpObject.serverRegion;
let sI =minHpObject.serverIdentifier;
game_log ("chuyen  SV  >>>>" + sR + sI )

let region = server.region;
let serverIden = server.id	
	
	
if ( sI != "PVP" && !(sR == region  && sI == serverIden) ) 
{
change_server(sR, sI);
}

}
	
	  else
	  {
	  	  game_log ("khong tim thay doi tuong evennnnn")
	  }
	  
	  
/////////////////////////////////  
 
 
}


// Check now, and every 10p
setInterval(() => {
	if (evenfram == 0) return

	checkServersForBosseven(["dragold"] );

}, 30000); // 60s check 1lan








// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround



////////////
//////////






///////////
