//smart_move({to:"potions"});
/////// tu dong ra bai quai
/// stop_character("MuaBan");
///// start_character("MuaBan", 6); 
// "gem0" , "ornament" , "candycane" , "mistletoe" , "xgloves" , "frankypants" , "starkillers" , "wbookhs"
/// send_mail('Plutus', '10 keys', 'nice', true)
game_log("game 1.0")
var itemautotrans=[ "candy1" , "gem0", "candy0", "vbat"]; 
map_key("A", "toggle_run_code");

map_key("Z", "snippet", "parent.stop_runner();");
map_key("X", "snippet", 'load_code("bankautoclean")');
map_key("S", "snippet", 'load_code("banktrans")');
map_key("D", "snippet", 'load_code("seashell-doido")');
map_key("F", "snippet", 'load_code("autobuyponty")');
map_key("G", "snippet", 'load_code("doi and update")');


game_log(" press 'Z' to stop the code.")
game_log(" press 'A' to toggle the code.")
game_log(" press 'X' tu dong nang cap trang suc");
game_log(" press 'S' gom trang suc lai 1 bank.");
game_log(" press 'D' doi hop qua - gem.");
game_log(" press 'F' mua do cua Fonty");
game_log(" press 'G' vua D + A");
var hostname = "haiz"
const TenMinutesInMs11 = 130 * 1000  // thoi gian tim boss
const TenMinutesInMs111 = 5 * 60 * 1000  //thoi gian doi qua

const TenMinutesInMs = 5 * 60 * 1000
const ten3sec = 30 * 1000

let evenNoel = 0 // bat tu dong doi do khi chuyen sang 1
let frankymode = 0
let crabxxmode = 0;
let icemode = 0
let misstoe
let misstoenum = 100  ///cai dat tren 100 la chay doi qua
let misstoemode = 1

let candy
let candynum = 50  ///cai dat tren 50 la chay doi qua
let candymode = 1

let checkloi
let checkloi1 = 0
let starkloi = 0
let started
let timboss
let timboss1 = 0
let delaybank
let numHP = 0
let numMP = 0
let numsuppot = 0
let vanchuyen = 0
let vanchuyenbank = 0
let checktui = 0
let vanchuyenHPMP = 0
let pontytime
let pontylandau = 0

//////////////////
let mode = 0
var item1 
var item2
let yeucaulevelmoi
let fixmoi2

let autoupgrapmoi = 1  // ngưng au tu up moi, 0 = auto up moi item 1
item1 = "coat"
item2 = "coat"
yeucaulevelmoi = 6	
fixmoi2 = 8


let modehight67 = 0  ///1 = dung sro vip up 6-7
let moi = 0
let lvmoi = 0
let esize = character.esize
let esize1 = character.esize
let realup = 0
let timeupdelay

///cac item can op sap xep hang thu 1 va 2
///////////////
 //game_log("move bank !!!!!!" +  get_nearest_npc())
 //game_log("move bank !!!!!!" + distance(character, get_nearest_npc1("Santa")))
	smart_move({ map: "main", x: -200, y: -110 }, () => {
     open_stand();
    });



///////
////ban cac mon do chi dinh bando
setInterval(function() {
	
if(1>0) for(const slot in character.items)
	{
var item = character.items[slot];
      // Kiểm tra level của item, nếu không có level thì mặc định là 0
      const level = item?.level ? item.level : 0;		
if (level >= 1)continue  //nếu level trên 1 thì không bán
		
if(["pstem","skullamulet","phelmet","smush","stinger","hpamulet", "hpbelt", "mushroomstaff","frogt" ,"sword","vitearring","hbow","spores", "rattail", "warmscarf", "xmasshoes", "xmaspants", "ornamentstaff", "throwingstars","rednose","candycanesword","xmassweater","xmashat","vitring","beewings","crabclaw","santasbelt", "iceskates","wbreeches","wgloves",  "wshoes" , "wcap","wbook0", "swifty", "merry", "hotchocolate","eggnog", "snowflakes","quiver", ].includes(character.items?.[slot]?.name)) sell(slot, character.items?.[slot]?.q ? character.items?.[slot]?.q : 1)	
	}

}, 1000);
//////


//send_cm("6gunlaZe","boss7") 

/////////
var bankItems = {
	//ItemID: {bank: banktabID, level: min level, quantity: min quantity}
tigerhelmet: {bank: "items0", level: -1, quantity: 1},
pleather: {bank: "items5", level: -1, quantity: 1},
seashell: {bank: "items5", level: -1, quantity: 1} ,
bfur: {bank: "items5", level: -1, quantity: 1},
poison: {bank: "items5", level: -1, quantity: 1},
cscale: {bank: "items5", level: -1, quantity: 1},
forscroll: {bank: "items5", level: -1, quantity: 1},
lotusf: {bank: "items5", level: -1, quantity: 1} ,
btusk: {bank: "items5", level: -1, quantity: 1},
gem0: {bank: "items5", level: -1, quantity: 1},
weaponbox: {bank: "items5", level: -1, quantity: 1},
armorbox: {bank: "items5", level: -1, quantity: 1},	
offering: {bank: "items5", level: -1, quantity: 1} ,	
ascale: {bank: "items5", level: -1, quantity: 1},
x0: {bank: "items5", level: -1, quantity: 1} ,
x1: {bank: "items5", level: -1, quantity: 1},
x2: {bank: "items5", level: -1, quantity: 1},
x3: {bank: "items5", level: -1, quantity: 1},
x4: {bank: "items5", level: -1, quantity: 1},	
x5: {bank: "items5", level: -1, quantity: 1} ,
x6: {bank: "items5", level: -1, quantity: 1},
x7: {bank: "items5", level: -1, quantity: 1},
x8: {bank: "items5", level: -1, quantity: 1},
cshell: {bank: "items5", level: -1, quantity: 1},	
dstones: {bank: "items5", level: -1, quantity: 1},		
smoke: {bank: "items5", level: -1, quantity: 1},	
funtoken: {bank: "items5", level: -1, quantity: 1},		
essenceoffrost: {bank: "items5", level: -1, quantity: 1},	
snakeoil: {bank: "items5", level: -1, quantity: 1},	
snakefang: {bank: "items5", level: -1, quantity: 1},		
candy1: {bank: "items5", level: -1, quantity: 1},		
candy0: {bank: "items5", level: -1, quantity: 1},		
bwing: {bank: "items5", level: -1, quantity: 1},		
pstem: {bank: "items5", level: -1, quantity: 1},		
cryptkey: {bank: "items5", level: -1, quantity: 1},	
snakeoil: {bank: "items5", level: -1, quantity: 1},	
essenceoffrostl: {bank: "items5", level: -1, quantity: 1},	
eggnog: {bank: "items5", level: -1, quantity: 1},		
feather0: {bank: "items5", level: -1, quantity: 1},
candycane: {bank: "items5", level: -1, quantity: 1},
tombkey: {bank: "items5", level: -1, quantity: 1},
//leather: {bank: "items5", level: -1, quantity: 1},
shadowstone: {bank: "items5", level: -1, quantity: 1},
frozenkey: {bank: "items5", level: -1, quantity: 1},
spiderkey: {bank: "items5", level: -1, quantity: 1},
spidersilk: {bank: "items5", level: -1, quantity: 1},
sstinger: {bank: "items5", level: -1, quantity: 1},
gemfragment: {bank: "items5", level: -1, quantity: 1},
	
	
fieldgen0: {bank: "items1", level: -1, quantity: 1},
frankypants: {bank: "items1", level: -1, quantity: 1},
harbringer: {bank: "items1", level: -1, quantity: 1},
bcape: {bank: "items1", level: -1, quantity: 1},
bowofthedead: {bank: "items1", level: -1, quantity: 1},
	
	stramulet: {bank: "items7", level: -1, quantity: 1} ,
	intamulet: {bank: "items7", level: -1, quantity: 1},
dexamulet: {bank: "items7", level: -1, quantity: 1},
intearring: {bank: "items7", level: -1, quantity: 1},
dexearring: {bank: "items7", level: -1, quantity: 1},
		strearring: {bank: "items6", level: -1, quantity: 1} ,
	intring: {bank: "items6", level: -1, quantity: 1},
dexring: {bank: "items6", level: -1, quantity: 1},
strring: {bank: "items6", level: -1, quantity: 1},

	intbelt: {bank: "items6", level: -1, quantity: 1},
dexbelt: {bank: "items6", level: -1, quantity: 1},
strbelt: {bank: "items7", level: -1, quantity: 1},	
cring: {bank: "items6", level: -1, quantity: 1},
cearring: {bank: "items6", level: -1, quantity: 1},
lostearring: {bank: "items7", level: -1, quantity: 1},
ringsj: {bank: "items4", level: -1, quantity: 1},

	
};



function storeItems()
{
	if(character.map == "bank")
	{
		for(id in character.items)
		{
			var item = character.items[id];
			
			if(item != null)
			{
				var storeDef = bankItems[item.name]

				if(storeDef != null && (storeDef.level == -1 || item.level == storeDef.level))
				{
					/////
					if (is_bank_pack_full_real(storeDef.bank) )
					{
						if (!is_bank_pack_full_real("items0") )
						{
								parent.socket.emit("bank", {
										operation: "swap",
										inv: id,
										str: -1,
										pack: "items0"
									});	
						}
						else if (!is_bank_pack_full_real("items6") )
						{
								parent.socket.emit("bank", {
										operation: "swap",
										inv: id,
										str: -1,
										pack: "items6"
									});	
						}
						else if (!is_bank_pack_full_real("items7") )
						{
								parent.socket.emit("bank", {
										operation: "swap",
										inv: id,
										str: -1,
										pack: "items7"
									});	
						}

							
                                                  else
						{
						}
						
						
					}
					else
					{
								parent.socket.emit("bank", {
										operation: "swap",
										inv: id,
										str: -1,
										pack: storeDef.bank
									});
					}
					
					
					//////
					break;
				}
			}
		}
	}
}

/////////////////////////////////




var close_stand_debug = true;  //auto dong cua hang moi khi di chuyen

function on_draw(){  ///ham mac dinh game chay moi 60 lan 1s
  if(close_stand_debug && character.stand ){

	    if (character.moving || smart.moving)close_stand()

    }
}



/////////////////////////////




// Cấu hình danh sách item cho từng loot mule
const muleItemsMap = {
    "6gunlaZe": ["snowball"],
    "haiz": ["tombkey", "cryptkey"],
};

// Hàm chính: xử lý gửi item cho toàn bộ mule trong cấu hình
function sendAllItemsToMules() {
    for (const [name, itemList] of Object.entries(muleItemsMap)) {
        const lootMule = get_player(name);
        if (!lootMule || distance(character, lootMule) > 250) continue;

        character.items.forEach((item, index) => {
            if (item && itemList.includes(item.name)) {
                send_item(lootMule, index, item.q ?? 1);
            }
        });
    }
}

// Gọi một lần duy nhất cho tất cả
setInterval(sendAllItemsToMules, 5000);







//////////////////

setInterval(function() {

 if (character.rip) { ///////auto hoi sinh
    respawn();
  }

	
	///////////auto move bank sau 1 thoi gian
//	if(!smart.moving && character.esize < 7)
//		{
//           smart_move('bank')
//			game_log("move bank !!!!!!");        
//			
//	}
	/////////////
	

}, 420000);


setInterval(() => {

	///////autobank
	storeItems()
   // game_log("move bank !!!!!!" + is_bank_pack_full("items7")  );
	//////
}, 300);


function is_bank_pack_full(pack) {
	let sl = 0
	
            for (const box in character.bank) {
                //Loops through individual bank-slots
                if(box == pack) {
                for (const slot of character.bank[box]) {
                    if(slot == null) continue;
                    //Your code goes here
					sl+=1
                }
				}
            }
            
	
	game_log("so luong bank! " +sl)
  if (sl < 38)return false;
   return true;
	
	
	
//	game_log("store bank !!!!!! " +pack.length)
//    if (pack.length < 38)return false;
//    return true;
}


function is_bank_pack_full_real(pack) {
	let sl = 0
	
            for (const box in character.bank) {
                //Loops through individual bank-slots
                if(box == pack) {
                for (const slot of character.bank[box]) {
                    if(slot == null) continue;
                    //Your code goes here
					sl+=1
                }
				}
            }
            
	
	game_log("so luong bank! " +sl)
  if (sl < 42)return false;
   return true;
	
	
	
//	game_log("store bank !!!!!! " +pack.length)
//    if (pack.length < 38)return false;
//    return true;
}


setInterval(function() {

	////////// moi paty - de nhan dien leader
//let leader = character.party;
//if (leader===undefined) 
	if (!character.party) {
    send_party_request(hostname);

    }
	

	if(character.stand && character.map == "main" && checktui == 0 ){
       vanchuyen = 0
		vanchuyenHPMP = 0
    }
	
//////////////	
	if ( !is_moving(character) && checkloi1 == 0 && !character.stand )
	{
	checkloi = Date.now()
		checkloi1 = 1
	}
	if ( is_moving(character) && checkloi1 == 1 )checkloi1 = 0
	
if ( !is_moving(character) && checkloi1 == 1 &&  Date.now() > (checkloi + 20000) )
{
checkloi1 = 0
vanchuyen = 0
vanchuyenHPMP = 0
		smart_move({ map: "main", x: -200, y: -110 }, () => {
     open_stand();
    });
	
}
	
	
////// tu dong vo bank khi tui do day
	if(character.stand && character.map == "main" && character.esize < 7 && !smart.moving && checktui == 0 && vanchuyen == 0){
		checktui = 1
		smart_move('bank')
	delaybank = Date.now()
    }
	
	
	if (checktui ==1 ){
		game_log("check bank s7 !!!!!!" + is_bank_pack_full("items7")); 
		game_log("check bank s6 !!!!!!" + is_bank_pack_full("items6")); 
				if(is_bank_pack_full("items7") || is_bank_pack_full("items6"))
	            {
		send_cm(hostname, "bank");
		game_log("bankclean !!!!!!");
	            }
		
	
	
	}
	
	

	if (checktui == 1 && (Date.now() > (delaybank + ten3sec)) )
	{
       checktui = 0;
	smart_move({ map: "main", x: -200, y: -110 }, () => {
     open_stand();
    });
    }
	
/////tu dong don dep bank sau khi lay do tu cac nhan vat khac	
		if(vanchuyenbank > 5)
	{
		send_cm(hostname, "bank");
		game_log("bankclean !!!!!!");
		vanchuyenbank = 0
	}
	
	


}, 5000);





////////////// nhan lenh giui tu cac nhan vat khác 
function on_cm(name, data) {

    if(name == "nhiY")
	{
       if(data == "full") {
		   if (vanchuyen == 0 && checktui == 0 && !is_moving(character) )
		   {
    smart_move(parent.party["nhiY"]); 
			   game_log("go nhii !!!!!!");
             vanchuyen = 1
			   		 vanchuyenbank += 1
		   }
		 }

	}
	
	if(name == "nhiY")
	{
       if(data == "hp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuyhp();
    });		   
			   
    smart_move(parent.party["nhiY"]); 
			   game_log("go nhiY !!!!!!");
             vanchuyen = 1
			  vanchuyenHPMP = 2
		   }
		 }
		
		if(data == "mp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuymp();
    });		   
			   
    smart_move(parent.party["nhiY"]); 
			   game_log("go nhiY !!!!!!");
             vanchuyen = 1
			  vanchuyenHPMP = 2
		   }
		 }
		
		
		
		
		

	}
	
	
/////////////////////		
	    if(name == "haiz")
	{
       if(data == "full") {
		   if (vanchuyen == 0 && checktui == 0 && !is_moving(character) )
		   {
    smart_move(parent.party["haiz"]); 
			   game_log("go haiz !!!!!!");
             vanchuyen = 1
			   		 vanchuyenbank += 1
		   }
		 }

	}
	
	
	
	    if(name == "haiz")
	{
       if(data == "hp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuyhp();
    });		   
			   
    smart_move(parent.party["haiz"]); 
			   game_log("go haiz !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 3
		   }
		 }
		
	       if(data == "mp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuymp();
    });		   
			   
    smart_move(parent.party["haiz"]); 
			   game_log("go haiz !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 3
		   }
		 }	
		
		
		

	}

 if(name == "haiz" && data != "mp" && data != "hp" && data != "full"){
	 send_cm("6gunlaZe",data)
	 	 send_cm("tienV",data)

 }

	
	

///////////////////////////	
		    if(name == "6gunlaZe")
	{
       if(data == "full") {
		   if (vanchuyen == 0 && checktui == 0 && !is_moving(character) )
		   {
    smart_move(parent.party["6gunlaZe"]); 
			   game_log("go 6gunlaZe !!!!!!");
             vanchuyen = 1
			   		 vanchuyenbank += 1
		   }
		 }



        if(data == "phoenix1")send_cm(hostname,"boss5") 
		
	}
	
	if(name == "6gunlaZe")
	{
       if(data == "hp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuyhp();
    });		   
			   
    smart_move(parent.party["6gunlaZe"]); 
			   game_log("go 6gunlaZe !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 1
		   }
		 }

	       if(data == "mp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuymp();
    });		   
			   
    smart_move(parent.party["6gunlaZe"]); 
			   game_log("go 6gunlaZe !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 1
		   }
		 }	
		
		
		
		
	}	
	
///////////////////////////	
    if(name == "Ynhi")
	{
       if(data == "full") {
		   if (vanchuyen == 0 && checktui == 0 && !is_moving(character) )
		   {
    smart_move(parent.party["Ynhi"]); 
			   game_log("go Ynhi !!!!!!");
             vanchuyen = 1
			   		 vanchuyenbank += 1
		   }
		 }

	}
	
	if(name == "Ynhi")
	{
       if(data == "hp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuyhp();
    });		   
			   
    smart_move(parent.party["Ynhi"]); 
			   game_log("go Ynhi !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 4
		   }
		 }
	  if(data == "mp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuymp();
    });		   
			   
    smart_move(parent.party["Ynhi"]); 
			   game_log("go Ynhi !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 4
		   }
		 }	
		
		
		
		

	}
	
	
/////////////////////	
/////////////////////		
	    if(name == "tienV")
	{
       if(data == "full") {
		   if (vanchuyen == 0 && checktui == 0 && !is_moving(character) )
		   {
    smart_move(parent.party["tienV"]); 
			   game_log("go tienV !!!!!!");
             vanchuyen = 1
			   		 vanchuyenbank += 1
		   }
		 }

	}
	
	
	
	    if(name == "tienV")
	{
       if(data == "hp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuyhp();
    });		   
			   
    smart_move(parent.party["tienV"]); 
			   game_log("go tienV !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 5
		   }
		 }
	       if(data == "mp") {
		   if (vanchuyen == 0 && checktui == 0)
		   {
	smart_move({ map: "main", x: -200, y: -110 }, () => {
  checkbuymp();
    });		   
			   
    smart_move(parent.party["tienV"]); 
			   game_log("go tienV !!!!!!");
             vanchuyen = 1
			   vanchuyenHPMP = 5
		   }
		 }	
		
		
		

	}	
	

///////////////////////////		
	
		
}


function mluckallifNOMLuck() {
    let keys = Object.values(parent.entities).filter(e => is_character(e) && is_in_range(e, "mluck"));

    for (let char of keys) {
        // Kiểm tra char có tồn tại và không phải là merchant
        if(char.ctype !== "merchant" && !is_on_cooldown("mluck") && (!char.s ||
            !char.s.mluck ||
            (char.s.mluck.f !== character.name && !char.s.mluck.strong) ||
            (char.s.mluck.f === character.name && char.s.mluck.ms < 2050000 ))
        ) {
            use_skill("mluck", char);
        }
    }
}

// Thiết lập vòng lặp chạy mỗi giây (1000ms)
setInterval(mluckallifNOMLuck, 1000);





///////gap nhau xong la ve thanh lien

setInterval(function() {
    let lootMule11 = get_player("6gunlaZe");
	let lootMule21 = get_player("nhiY");
	let lootMule31 = get_player("haiz");
	let lootMule41 = get_player("Ynhi");
	let lootMule51 = get_player("tienV");

	

	// 
    if (lootMule11 == null && lootMule21 == null && lootMule31 == null && lootMule41 == null && lootMule51 == null) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }
	
if (smart.moving) return	
	
			
if (lootMule11 != null) {
  const dist11 = distance(character, lootMule11);
  if (dist11 < 180)
	{
		  use_skill("mluck", lootMule11);
   use_skill("town")
  //smart_move(find_npc("newupgrade")); 
		smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		
		
  }
}

if (lootMule21 != null) {
  const dist21 = distance(character, lootMule21);
  if (dist21 < 180)
	{
		  use_skill("mluck", lootMule21);
   use_skill("town")
  //smart_move(find_npc("newupgrade")); 
		smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		
  }
}
			
			
if (lootMule31 != null) {
  const dist31 = distance(character, lootMule31);
  if (dist31 < 180)
	{
		  use_skill("mluck", lootMule31);
   use_skill("town")
  //smart_move(find_npc("newupgrade")); 
		smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		
  }
}
	
if (lootMule41 != null) {
  const dist41 = distance(character, lootMule41);
  if (dist41 < 180)
	{
		  use_skill("mluck", lootMule41);
   use_skill("town")
  //smart_move(find_npc("newupgrade")); 
		smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		
  }
}		
	

if (lootMule51 != null) {
  const dist51 = distance(character, lootMule51);
  if (dist51 < 180)
	{
		  use_skill("mluck", lootMule51);
   use_skill("town")
  //smart_move(find_npc("newupgrade")); 
		smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		
  }
}	
	
			
}, 3000);


////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////	xong het nhiem vu thi lam viec khac
	

setInterval(() => {

	
////////////////////////////////////////////
	if(character.map == "main" && character.stand) {
	timbosskill()
	}
///////////////////////////////////////////	
if(character.esize > 10 && character.stand && (vanchuyenbank >= 1 || timboss1 >= 1) && character.map == "main" )
{

	if(character.q.exchange) {
        return;
    }	
		
		
    let first_index = -1;
    for(let i = 0; i < 42; i++) {
      //  if(character.items[i]?.name == "candy1") {
	    if(itemautotrans.indexOf(character.items[i]?.name) != -1) {
            if(character.items[i].q >= 1) {
                exchange(i);
                break;
            } else if(first_index == -1) {
                first_index = i;
            } else {
                swap(first_index, i);
                break;
            }
        }
    }
	
}
/////////////////////////////////////////////////////////////////////////////////	
	if(character.map == "winter_inn")
	{
	if(character.q.exchange) {
        return;
    }	
		
		
    let first_index = -1;
    for(let i = 0; i < 42; i++) {
        if(character.items[i]?.name == "mistletoe") {
            if(character.items[i].q >= 1) {
                exchange(i);
                break;
            } else if(first_index == -1) {
                first_index = i;
            } else {
                swap(first_index, i);
                break;
            }
        }
    }
	}
	//////
    if (character.map == "winter_inn" && Date.now() > (misstoe + TenMinutesInMs111) )smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
	
	if(character.esize > 15 && character.stand && misstoemode == 1 && (vanchuyenbank >= 1 || timboss1 >= 1) && evenNoel ==1 ){
		/////
			 let sloo = 0;
    for(let i = 0; i < 42; i++) {
        if(character.items[i]?.name == "mistletoe") {
            sloo = character.items[i].q
			}
	   }
		/////////
		if (sloo > misstoenum){
			misstoe = Date.now()
			smart_move({ map: "winter_inn", x: 0, y: -110 });
		}
    }
//////////////////////////////////////////////////////////////	
    if ( distance(character, get_nearest_npc1("Santa")) < 400 &&character.map == "winterland" && Date.now() > (candy + TenMinutesInMs111) )smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
	
	if(character.esize > 15 && character.stand && candymode == 1 && (vanchuyenbank >= 1 || timboss1 >= 1) && evenNoel ==1 ){
		/////
			 let sloo1 = 0;
    for(let i = 0; i < 42; i++) {
        if(character.items[i]?.name == "candycane") {
            sloo1 = character.items[i].q
			}
	   }
		/////////
		if (sloo1 > candynum){
			candy = Date.now()
           smart_move('santa')
		}
    }	
////
	if(distance(character, get_nearest_npc1("Santa")) < 400 && character.map == "winterland")
	{
	if(character.q.exchange) {
        return;
    }	
		
		
    let first_index = -1;
    for(let i = 0; i < 42; i++) {
        if(character.items[i]?.name == "candycane") {
            if(character.items[i].q >= 1) {
                exchange(i);
                break;
            } else if(first_index == -1) {
                first_index = i;
            } else {
                swap(first_index, i);
                break;
            }
        }
    }
	}
////////////////////////////////////////////////////////
	
	
///////////////////////////////////////////////////////////////	
	
}, 1000);	



function checkPVPandARENA() {

if (character.map != "arena")return
const friend = ["MuaBan", "haiz" , "haiz1" , "Ynhi", "nhiY", "6gunlaZe", "tienV"];
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
parent.api_call("disconnect_character", {name: "MuaBan"});
stop_character("MuaBan")	
}


	
    // Đây là công việc bạn muốn thực hiện mỗi 1 giây
    console.log("Vòng lặp chạy mỗi giây...");
}

// Thiết lập vòng lặp mỗi 1 giây (1000ms)
setInterval(checkPVPandARENA, 1000); // 1000ms = 1 giây

/////////////////////////////////
let startTime = Date.now();
let lastBossvip3Time = 0;
let lastBossvip12Time = 0;
let bossvip3Count = 0; // ✅ đếm số lần gọi bossvip3

function taskBoss() {
    if (frankymode == 1 || icemode == 1 || crabxxmode == 1) return;

    const now = Date.now();
    const elapsed = (now - startTime) / 60000; // phút đã trôi qua

    // === ⏱ Gọi bossvip3 tại phút 10 sau đăng nhập === ///đã xong nhiệm vụ đang tắt gọi boss3 mecamet khi có even lớn
    const elapsed5 = Math.floor(elapsed / 10);
    if (elapsed5 > lastBossvip3Time && bossvip3Count < 1) {
        if (parent.party_list.includes("haiz")) {
            send_cm(hostname, "bossvip3");
            game_log(`📡 [${bossvip3Count + 1}/1] Gửi bossvip3 sau ${elapsed5 * 10} phút`, "#00FFFF");
            bossvip3Count += 1;
        }
        lastBossvip3Time = elapsed5;
        return;
    }

    // === 🎲 Gọi bossvip1 hoặc bossvip2 mỗi 23 phút ===
    const elapsed25 = Math.floor(elapsed / 23);
    if (elapsed25 > lastBossvip12Time) {
		
       // const randomNum = Math.floor(Math.random() * 2) + 1;  /// random
		const randomNum = 2;  /// mặc định 2, tắt stompy


        const doNext = () => {
            smart_move({ map: "main", x: -200, y: -110 }, open_stand);
        };

        if (randomNum === 1) {
            smart_move({ map: "winterland", x: 434, y: -2557 }, () => {
                const target = get_nearest_monster({ type: "stompy" });
                if (target && parent.party_list.includes("haiz")) {
                    send_cm(hostname, "bossvip1");
                }
                doNext();
            });
        } else {
            smart_move({ map: "arena", x: 666, y: -555 }, () => {
                const target = get_nearest_monster({ type: "skeletor" });
                if (target && parent.party_list.includes("haiz")) {
                    send_cm(hostname, "bossvip2");
                }
                doNext();
            });
        }

        game_log(`🎲 Gọi bossvip${randomNum} sau ${elapsed25 * 23} phút`, "#FFD700");
        lastBossvip12Time = elapsed25;
    }
}

// ✅ Lặp mỗi phút
setInterval(taskBoss, 60 * 1000);



////////////////////////////////////////	
function timbosskill()
{

	return ///tắt chức năng
	if (frankymode == 1 || icemode == 1 || crabxxmode == 1) return
	if (timboss == undefined) timboss = Date.now()
    if (Date.now() < (timboss + TenMinutesInMs11) ) return;
	
	//////////////////
	if (timboss1 == 1){
		smart_move({ map: "spookytown", x: -728, y: -123 }, () => {
 	var targetb= get_nearest_monster({type: "jr"});
	if(targetb && parent.party_list.includes("haiz") )send_cm(hostname,"boss1") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	
	
		if (timboss1 == 4){
		smart_move({ map: "halloween", x: -477, y: -389 }, () => {
 	var targetb= get_nearest_monster({type: "greenjr"});
	if(targetb&& parent.party_list.includes("haiz") )send_cm(hostname,"boss8") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	
	
		if (timboss1 == 7){
		smart_move({ map: "spookytown", x: -728, y: -123 }, () => {
 	var targetb= get_nearest_monster({type: "jr"});
	if(targetb && parent.party_list.includes("haiz") )send_cm(hostname,"boss1") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	///////////////
	//////////////////
	if (timboss1 == 5){
		smart_move({ map: "cave", x: 68, y: -1163 }, () => {
	var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
	if(targetsoloboss.length > 0 && parent.party_list.includes("haiz") )send_cm(hostname,"boss2") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	///////////////	
	
	if (timboss1 == 2){
		smart_move({ map: "cave", x: 982, y: 105 }, () => {
	var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
	if(targetsoloboss.length > 0 && parent.party_list.includes("haiz") )send_cm(hostname,"boss3") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	///////////////		
	if (timboss1 == 3){
		smart_move({ map: "main", x: 1312, y: -200 }, () => {
	var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
	if(targetsoloboss.length > 0 && parent.party_list.includes("haiz") )send_cm(hostname,"boss400") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	///////////////		
	if (timboss1 == 6){
		smart_move({ map: "main", x: 700, y: 1800 }, () => {
	var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
	if(targetsoloboss.length > 0 && parent.party_list.includes("haiz") )send_cm(hostname,"boss500") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	///////////////		
	///////////////		
	if (timboss1 == 8){
		smart_move({ map: "halloween", x: -140, y: 512 }, () => {
	var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
	if(targetsoloboss.length > 0 && parent.party_list.includes("haiz") )send_cm(hostname,"boss600") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 = 0;
    });	
    });
	}
	///////////////		
	if (timboss1 == 0){
		smart_move({ map: "main", x: -1137, y: 455 }, () => {
	var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
	if(targetsoloboss.length > 0 && parent.party_list.includes("haiz") )send_cm(hostname,"boss700") 
			timboss = Date.now()
				smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
					timboss1 += 1;
    });	
    });
	}
	///////////////		
//	
	
	
	
	
}	
////////////////////////////////////////	/



function checkbuyhp()
{	
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
	if ( soluonghp < 7000 )buy("hpot1",9999);

}


function checkbuymp()
{	
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
	if ( soluongmp < 7000 )buy("mpot1",9999);

}



/////////////////// bom mau
setInterval(function() {


if (character.hp/character.max_hp< 0.8 && character.mp > 50) {
   use_skill("use_hp");
	
} 
else if (character.mp/character.max_mp < 0.7) {
	  if(can_use("use_mp"))use_skill("use_mp")
	
}
  else if (character.max_mp>character.mp && can_use("use_mp")) return use_skill("regen_mp");
  else if (character.max_mp>character.mp && can_use("use_mp")) return use_skill("regen_mp");
	
	else ;


}, 200);

///////////






//////////


setInterval(function() {
    if (!smart.moving && character.esize < 1) {
        if(character.map != "main") use_skill("town")
smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
	}
}, 10000); // ve thanh neu full tui do
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// điều kiện up <=
var upgradeWhitelistmoi1 = /// list moi
	{
		//ItemName, Max Level

	};


// điều kiện up : < 
var upgradeWhitelistmoi2 = /// list moi
	{
		//ItemName, Max Level

	};



var upgradeMaxLevel = 8; //Max level it will stop upgrading items at if enabled
var upgradeWhitelist = /// list moi
	{
		//ItemName, Max Level
        //firebow: 8,

	};





var upgradeWhitelistmodebinhthuong = /// list moi
	{
		//ItemName, Max Level
      
		//basher: 6 ,
		
	};





function scanSLitemUP_2_line()
{
	let sl = 0
	//Iterate over every slot in our inventory.
	for(var i = 0; i <= 41; i++)
	{
		var d = character.items[i];
		if (d)
		{
		var level1 = upgradeWhitelistmoi1[d.name];
		var level2 = upgradeWhitelistmoi2[d.name];//tim trong danh sach trung ten thi co duoc level cua item
		if (d.name == item1) continue // bo qua
			if(level1 || level2)sl +=1
	    }

	}
	return sl
}
				
				
				


function scanSLmoi(name)
{
	let sl = 0
	//Iterate over every slot in our inventory.
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		//Does the item name match?
		if(curSlot != null && curSlot.name == name)
		{
			sl += 1
		}
	}
	return sl
}


function scanSLmoiVIP(name)
{
	let sl = 0
	//Iterate over every slot in our inventory.
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		//Does the item name match?
		if(curSlot != null && curSlot.name == name && curSlot.level >=yeucaulevelmoi )
		{
			sl += 1
		}
	}
	return sl
}



function scan_minlevel(name)
{
	// Biến để lưu cấp độ nhỏ nhất và chỉ số kho của món đồ có cấp độ nhỏ nhất
	let minLevel = Infinity; //Khởi tạo minLevel với giá trị vô cùng lớn (Infinity), để khi so sánh, bất kỳ món đồ nào cũng sẽ có cấp độ nhỏ hơn giá trị này.
	let minIndex = -1;

	// Duyệt qua tất cả các ô kho
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		// Kiểm tra xem ô kho có chứa món đồ không và tên món đồ có trùng không
		if(curSlot != null && curSlot.name == name)
		{
			// Kiểm tra xem cấp độ của món đồ có nhỏ hơn minLevel không
			if(curSlot.level < minLevel)
			{
				// Cập nhật minLevel và chỉ số kho
				minLevel = curSlot.level;
				minIndex = i;
			}
		}
	}

	// Trả về chỉ số của ô kho chứa món đồ có cấp độ nhỏ nhất, hoặc -1 nếu không tìm thấy
	return minIndex;
}


function scan_maxlevel(item,lvmax)
{
	// Biến để lưu cấp độ lớn nhất và chỉ số kho của món đồ có cấp độ lớn nhất
	let maxLevel = -Infinity; // Khởi tạo maxLevel với giá trị vô cùng nhỏ (-Infinity), để khi so sánh, bất kỳ món đồ nào cũng sẽ có cấp độ lớn hơn giá trị này.
	let maxIndex = -1;

	// Duyệt qua tất cả các ô kho
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		// Kiểm tra xem ô kho có chứa món đồ không và tên món đồ có trùng không
		if(curSlot != null && curSlot.name == item)
		{
			// Kiểm tra cấp độ món đồ lớn nhất nhưng không vượt quá 7
			if(curSlot.level > maxLevel && curSlot.level <= lvmax)
			{
				// Cập nhật maxLevel và chỉ số kho
				maxLevel = curSlot.level;
				maxIndex = i;
			}
		}
	}

	// Trả về chỉ số của ô kho chứa món đồ có cấp độ lớn nhất (không quá 7), hoặc -1 nếu không tìm thấy
	return maxIndex;
}


function soluongitem(name)
{
	let sl = 0
	//Iterate over every slot in our inventory.
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		//Does the item name match?
		if(curSlot != null && curSlot.name == name)
		{
			sl += curSlot.q
		}
	}
	
	return sl
}


function get_grade(item) {
  return parent.G.items[item.name].grades;
}

// Returns the item slot and the item given the slot to start from and a filter.
function find_item(filter) {
  for (let i = 0; i < character.items.length; i++) {
    let item = character.items[i];

    if (item && filter(item))
      return [i, character.items[i]];
  }

  return [-1, null];
}





setInterval(function() {
	
	if (is_moving(character) || !character.stand ) return
let slupp
slupp = scanSLitemUP_2_line()
//	game_log("so luong up la " + slupp)
	if (slupp == 0)return
	



if (is_moving(character) ) return
var itemSearch1 = character.esize
let a1 = scanSLmoi(item1)
let a3 = scanSLmoiVIP(item1)

	if ( a1 < 4  && a3 <=1 && autoupgrapmoi != 1 )
	{
	if (itemSearch1 > 3 &&  moi == 0)	
	{
		
	 for (let i = 0; i < 3; i++) {
	 
           buy(item1)
        }	
	}
	}

let am1 = soluongitem("mpot1")
if (am1 == 0 && itemSearch1 > 1 &&  moi == 0 )buy("mpot1",300);


	
	if(parent != null && parent.socket != null)
	{
		
		upgrade();
		 
	}	
	

}, 1000);



function upgrade() {
	let a1 = soluongitem("scroll0")
	let a2 = soluongitem("scroll1")
	let a3 = soluongitem("scroll2")
if ( a1 < 3 || a2 < 3 || a3 < 3  ) return  ///check so quan sach
//game_log("so luong scollll la " + a3)
	
	if(character.q.upgrade) return
	if ( Date.now() < ( timeupdelay + 2000 ) && moi >= 2) return
	 game_log("Moi = " +moi)
 game_log("esize tinh toan truoc update = " +esize)
			
			 game_log("character esize = " +character.esize)
             game_log("lv item moi = " +lvmoi)	
	
if (character.esize == esize && moi ==2 && realup == 1 )moi =0;
if (character.esize == esize && moi >=3 && realup == 1 )moi =0;		
	

if (character.esize > esize && lvmoi >= yeucaulevelmoi && realup == 1) {
	moi += 1;
}

	realup =0

if (autoupgrapmoi ==1) moi = 0; //mode up do binh thuong	
	
	for (let i = 0; i < character.items.length; i++) 
	{
		if (realup == 1) return
		
	
			if (moi >= 3)
			{
////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
		let d = character.items[i];
		if (d) {
		////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
			var level2 = upgradeWhitelistmoi2[d.name]; //tim trong danh sach trung ten thi co duoc level cua item
			if(level2 && d.level < level2)
			{
				///
				let i
				let c
	if (d.name == item1 && (moi == 6 || moi >= 8 ) )  ///fix rớt liên tục
				{
				i = scan_maxlevel(item1,9)
					
				}
				else
				{
				i = scan_minlevel(d.name)
                
				}
				
if (d.name == item1 && (moi == 3  || moi == 4 || moi == 5 || moi == 7)   ) continue //bo qua
				
				 c = character.items[i];				
				///

				lvmoi = c.level
				let grades = get_grade(c);
				let scrollname;
				if (c.level < grades[0])
					scrollname = 'scroll1';
				else if (c.level < grades[1])
					scrollname = 'scroll1';
					if ( c.level >= 3 )scrollname = 'scroll2';
				else
					scrollname = 'scroll2';
				

				let [scroll_slot, scroll] = find_item(i => i.name == scrollname);
				if (!scroll) {
					parent.buy(scrollname);
				return;
			  }

				if (c.level > 1)
				{
											/////////// tang toc
            if (can_use("massproductionpp") &&character.s && !character.s.hasOwnProperty("massproductionpp") && character.mp > 250 )
			{
				use_skill("massproductionpp")
			}

					
/////////////////////////////
				}
										 if( c.level <= 1 )
		 {
			 esize = character.esize
			 realup = 1
			 	timeupdelay = Date.now();


			  parent.socket.emit('upgrade', {
				item_num: i,
				scroll_num: scroll_slot,
				offering_num: null,
				clevel: c.level
			  });
		 }
				
				
						 if((character.s.hasOwnProperty("massproduction") || character.s.hasOwnProperty("massproductionpp")) && c.level > 1 )
		 {
			 esize = character.esize
			 realup = 1
			 	timeupdelay = Date.now();


			  parent.socket.emit('upgrade', {
				item_num: i,
				scroll_num: scroll_slot,
				offering_num: null,
				clevel: c.level
			  });
		 }
				
				
			  return;
			}
		}
	/////////////////////////////////////////////////////////////////////////////////////			
	//////////////////////////////////////////////////////////////////////////////////////							
			}
			else if (moi == 2)
			{
		
		let d = character.items[i];
				
		if (d && d.name == item1 && i < 15) continue //bo qua
		
		if (d) {
			
		////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
			var level1 = upgradeWhitelistmoi1[d.name]; //tim trong danh sach trung ten thi co duoc level cua item
			if(level1 && d.level <= level1)
			{
				let i
				let c
				if (d.name == item1)  ///fix neu khong co do moi 2
				{
				i = scan_maxlevel(item1,fixmoi2)
					
				}
				else
				{
				i = scan_minlevel(d.name)
                
				}
				
				 c = character.items[i];
				
				
				lvmoi = c.level
				let grades = get_grade(c);
				let scrollname;
				if (c.level < grades[0])
					scrollname = 'scroll1';
				else if (c.level < grades[1])
					scrollname = 'scroll1';
					if ( c.level >= 6 )scrollname = 'scroll2';

				else
					scrollname = 'scroll2';
				

				let [scroll_slot, scroll] = find_item(i => i.name == scrollname);
				if (!scroll) {
					parent.buy(scrollname);
				return;
			  }

				if (c.level > 1)
				{
											/////////// tang toc
            if (can_use("massproductionpp") &&character.s && !character.s.hasOwnProperty("massproductionpp") && character.mp > 250 )
			{
				use_skill("massproductionpp")
			}

					
/////////////////////////////
				}
										 if( c.level <= 1 )
		 {
			 esize = character.esize
			 realup = 1
			 	timeupdelay = Date.now();


			  parent.socket.emit('upgrade', {
				item_num: i,
				scroll_num: scroll_slot,
				offering_num: null,
				clevel: c.level
			  });
		 }
				
				
						 if((character.s.hasOwnProperty("massproduction") || character.s.hasOwnProperty("massproductionpp")) && c.level > 1 )
		 {
			 esize = character.esize
			 realup = 1
			 	timeupdelay = Date.now();


			  parent.socket.emit('upgrade', {
				item_num: i,
				scroll_num: scroll_slot,
				offering_num: null,
				clevel: c.level
			  });
		 }
				
				
			  return;
			}
			/////////////////////////////////////////////////////////////

		}
	/////////////////////////////////////////////////////////////////////////////////////			
	//////////////////////////////////////////////////////////////////////////////////////			
			}
			else if (moi <= 1)
			{
		let d = character.items[i];
		if (d) {
		////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
			var level 
			if (autoupgrapmoi !=1) level = upgradeWhitelist[d.name];
			if (autoupgrapmoi ==1) level = upgradeWhitelistmodebinhthuong[d.name];

				
			if(level && d.level < level)
			{
				let i = scan_minlevel(d.name)
                let c = character.items[i];
				lvmoi = c.level
				let grades = get_grade(c);
				let scrollname;
				if (c.level < grades[0]){
					scrollname = 'scroll0';
					if ( c.level >= 4 )scrollname = 'scroll1';
				}
				else if (c.level < grades[1])
					scrollname = 'scroll1';
				else
					scrollname = 'scroll2';
				
				if (modehight67==1 && c.level >= 6 )scrollname = 'scroll2';

				let [scroll_slot, scroll] = find_item(i => i.name == scrollname);
				if (!scroll) {
					parent.buy(scrollname);
				return;
			  }

				if (c.level > 1)
				{
											/////////// tang toc
            if (can_use("massproductionpp") &&character.s && !character.s.hasOwnProperty("massproductionpp") && character.mp > 250 )
			{
				use_skill("massproductionpp")
			}

					
/////////////////////////////
				}
										 if( c.level <= 1 )
		 {
			 esize = character.esize
			 realup = 1
			 	timeupdelay = Date.now();


			  parent.socket.emit('upgrade', {
				item_num: i,
				scroll_num: scroll_slot,
				offering_num: null,
				clevel: c.level
			  });
		 }
				
				
						 if((character.s.hasOwnProperty("massproduction") || character.s.hasOwnProperty("massproductionpp")) && c.level > 1 )
		 {
			 esize = character.esize
			 realup = 1
			 	timeupdelay = Date.now();


			  parent.socket.emit('upgrade', {
				item_num: i,
				scroll_num: scroll_slot,
				offering_num: null,
				clevel: c.level
			  });
		 }
				
				
			  return;
			}
		}
	/////////////////////////////////////////////////////////////////////////////////////			
	//////////////////////////////////////////////////////////////////////////////////////			
			}
				
    
  	}
}





///////////////////////////////////////////////////////
var combineWhitelist = 
	{
		//ItemName, Max Level
		lostearring: 2,
		//strearring: 4,
		//intearring: 4,
		dexearring: 4,
		skullamulet: 2,
		//dexring: 4,
		strring: 3,
		dexamulet: 4,
		//intamulet: 4,
		stramulet: 4,
		ctristone:3,
		dexbelt: 3,
		intbelt: 3,
		strbelt: 3,
		orbg: 3,
		wbookhs: 2,
		cring: 3,
		cearring: 3,
		talkingskull: 3,
		t2intamulet: 2,
		t2stramulet: 2,
		t2dexamulet: 2,
		orbofstr: 1,
		orbofdex: 1,
		orbofint: 1,
		orba: 1,
		ringsj: 4,


		
	}





/////////

setInterval(function() {
	if(parent != null && parent.socket != null)
	{
		compound_items();
	}

}, 300);



function compound_items() {
  let to_compound = character.items.reduce((collection, item, index) => {
    if (item && combineWhitelist[item.name] != null && item.level < combineWhitelist[item.name]) {
      let key = item.name + item.level;
      !collection.has(key) ? collection.set(key, [item.level, item_grade(item), index]) : collection.get(key).push(index);
    }
    return collection;
  }, new Map());

  for (var c of to_compound.values()) {
    let scroll_name = "cscroll" + c[1];

    for (let i = 2; i + 2 < c.length; i += 3) {
      let [scroll, _] = find_item(i => i.name == scroll_name);
      if (scroll == -1) {
        parent.buy(scroll_name);
        return;
      }
		
				/////////// tang toc
            if (can_use("massproductionpp") &&character.s && !character.s.hasOwnProperty("massproductionpp") )
			{
				use_skill("massproductionpp")
			}
				else
				{
				       if(can_use("massproduction") &&character.s && !character.s.hasOwnProperty("massproduction") )use_skill("massproduction")
				}
					
/////////////////////////////
		
		
		game_log(scroll_name);
		game_log(c[i]);
		game_log(c[i+1]);
		game_log(c[i+2]);
      parent.socket.emit('compound', {
        items: [c[i], c[i + 1], c[i + 2]],
        scroll_num: scroll,
        offering_num: null,
        clevel: c[0]
      });
	  return;
    }
  }
}






//////////////////////////////////////////////
/////////////////////////////////////////
// autobuyponty

var craftList = [ "lantern","ringsj","ink","smoke","cclaw","pmace","glolipop","dexamulet","stramulet","snowball","bowofthedead","pinkie","intbelt","strring","dexearring","egg0","egg1","egg2","egg3","egg4","egg5","egg6","egg7","egg8","strbelt","intbelt","dexbelt","cryptkey","essenceofgreed","sshield","vdagger","vhammer","scythe","bataxe","rabbitsfoot","bfangamulet","suckerpunch","cdarktristone","powerglove","xarmor","tshirt9","fury","xhelmet","lostearring", "mittens", "ololipop" , "supermittens" , "sweaterhs" , "xhelmet" , "xgloves" , "starkillers" , "wbookhs" , "crossbow" ,  "mcape" , "t2quiver" , "gem0" , "ornament" , "candycane" , "mistletoe" , "seashell"  ];


function secondhands_handler(event) {
    for (const i in event) {
        const item = event[i];
		///////////////
			for(var index in craftList)
	{
		var craftName = craftList[index];
	
        if (item && item.name === craftName && character.esize > 10) {
					game_log( craftName + " da mua !!!!!!");
            parent.socket.emit("sbuy", {"rid": item.rid});
        }
		
		
	}
		////////////////
    }
}



function on_destroy() // called just before the CODE is destroyed
{
	 parent.socket.removeListener("secondhands", secondhands_handler);
	clear_drawings();
	clear_buttons();
}




setInterval(function() {

if (is_moving(character) || !character.stand ) return	
	
parent.socket.off("secondhands", secondhands_handler);
parent.socket.on("secondhands", secondhands_handler);
parent.socket.emit("secondhands");


}, 60000); 


setInterval(function() {
	
if (pontylandau == 1)return
if (is_moving(character) || !character.stand ) return	
pontylandau = 1	
parent.socket.off("secondhands", secondhands_handler);
parent.socket.on("secondhands", secondhands_handler);
parent.socket.emit("secondhands");


}, 10000); 

///////////////////////////////////
///////////////////////////////////





//cung cap mana va mau cho acc fram


setInterval(function() {
    let lootMule = get_player("6gunlaZe");
	let lootMule2 = get_player("nhiY");
	let lootMule3 = get_player("haiz");
	let lootMule4 = get_player("Ynhi");
	let lootMule5 = get_player("tienV");
	
	

	// giui do
    if (lootMule == null && lootMule2 == null && lootMule3 == null && lootMule4 == null) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }
	


    let itemsToExclude = ["hpot0", "hpot1"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties và giui nhung thu trong danh sach
        if (item && itemsToExclude.includes(item.name) && !item.l && !item.s && item.q > 180 ) {
            //send_item(lootMule.id, i, item.q ?? 1);
			if (lootMule != null && vanchuyenHPMP == 1 ) {
				send_item(lootMule.id, i, 1000);
			}
			if (lootMule2 != null && vanchuyenHPMP ==2 ) {
				send_item(lootMule2.id, i, 1000);
			}
			if (lootMule3 != null && vanchuyenHPMP ==3) {
				send_item(lootMule3.id, i, 1000);
			}
			if (lootMule4 != null && vanchuyenHPMP ==4) {
				send_item(lootMule4.id, i, 1000);
			}
			if (lootMule5 != null && vanchuyenHPMP ==5) {
				send_item(lootMule5.id, i, 1000);
			}	
        }
    }
	
	

	
	    let itemsToExclude1 = [ "mpot0", "mpot1"];

    for (let i = 0; i < 42; i++) {
        const item1 = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties và giui nhung thu trong danh sach
        if (item1 && itemsToExclude1.includes(item1.name) && !item1.l && !item1.s) {
            //send_item(lootMule.id, i, item.q ?? 1);
			if (lootMule != null&& vanchuyenHPMP == 1) {
				send_item(lootMule.id, i, 500);
			}
			if (lootMule2 != null&& vanchuyenHPMP == 2) {
				send_item(lootMule2.id, i, 500);
			}
			if (lootMule3 != null&& vanchuyenHPMP == 3) {
				send_item(lootMule3.id, i, 500);
			}
			if (lootMule4 != null && vanchuyenHPMP ==4) {
				send_item(lootMule4.id, i, 500);
			}	
			if (lootMule5 != null && vanchuyenHPMP ==5) {
				send_item(lootMule5.id, i, 500);
			}				
			
        }
    }
	
	
	
	
	
	
	
	
	
}, 300);





////////////////
setInterval(function() {

skill_scare();

	
crabxx()	
 franky()	
icegolem()
}, 400);
////////////////



function skill_scare() {
	
if (is_on_cooldown("scare")) 
{
	changeitem({ slot: "orb", name : "orbg", level : 3 });
}
	
if (character.targets == 0) {
	return;
}

if (character.targets >= 1 && character.hp < 10000 && !is_on_cooldown("scare") ) 
{
	changeitem({ slot: "orb", name : "jacko", level : 1 });
	use_skill("scare");
	game_log("skill scare");

}
}


function changeitem(options = {}) {

	

	if ( !options.slot ||  !options.name ) return 
	
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


function get_nearest_npc1(name)
{
	// Just as an example
	var min_d=999999,target=null;

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(current.type!="npc") continue;
		if(current.name!=name) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) min_d=c_dist,target=current;
	}
	return target;
}



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

//////////////
function icegolem()
{
	
if(parent.S.icegolem)
{
	icemode = 1
}
	else
	{
		icemode = 0
	}

}
/////////////////////

function franky() {
if (!parent.S.franky)frankymode = 0;	

if (frankymode == 1 && parent.party_list.includes("6gunlaZe"))
{
		send_cm("6gunlaZe","franky")
}
	
if(vanchuyen == 0 && checktui == 0 && parent.S.franky && frankymode ==0 &&  !is_moving(character) && !get_nearest_monster({type:'franky'}))
{
smart_move({ map: "level2w", x: -123, y: -65 }, () => {
  //checkbuyhpmp();
    });		   
}
	
if( get_nearest_monster({type:'franky'})  &&  !is_moving(character)  )	
{
	if(get_nearest_playerV() >=2 && parent.party_list.includes("haiz") ){
		send_cm("6gunlaZe","franky")
		send_cm("haiz","franky") 
		frankymode = 1
smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
	}
} 

if(character.map == "level2w" && !parent.S.franky  &&  !is_moving(character)  )				   
		{
			smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		}

if(character.map == "level2w" && character.hp < 2500  &&  !is_moving(character)  )				   
		{
			smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		}	
	
}

/////////////////////////////////////




function crabxx() {
if (!parent.S.crabxx)crabxxmode = 0;	
	
if(vanchuyen == 0 && checktui == 0 && parent.S.crabxx &&  !is_moving(character) && !get_nearest_monster({type:'crabxx'}))
{
smart_move({ map: "main", x: -705, y: 1708 }, () => {
  //checkbuyhpmp();
    });		   
}
var bossc = get_nearest_monster({type:'crabxx'})
if( get_nearest_monster({type:'crabxx'})  &&  !is_moving(character)  )	
{
	if(bossc.target && get_nearest_playerV() >=3 && parent.party_list.includes("haiz") && parent.party_list.includes("6gunlaZe") ){
		send_cm("haiz","crabxx") 
		crabxxmode = 1
smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
	}
	else
	{
smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
	}

	
} 

if( get_nearest_monster({type:'crabx'}) && !get_nearest_monster({type:'crabxx'}) && !parent.S.crabxx &&  !is_moving(character)  )				   
		{
			smart_move({ map: "main", x: -200, y: -110 }, () => {
  open_stand();
    });
		}

		
	
}

/////////////////////////////////////


async function checkServersForMonsters(monsters) {
  // Safety Checks
  if (!Array.isArray(monsters)) return;
  if (monsters.length == 0) return;

  // Query API
  const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");

  const response = await fetch(url);
  if (response.status == 200) {
    const data = await response.json();
    parent.S2 = data;

////////////	  
const firstMainMapObject = data.find(item => !item.hasOwnProperty("hp454"));

if (firstMainMapObject) {
let sR =firstMainMapObject.serverRegion;
let sI =firstMainMapObject.serverIdentifier;
//game_log ("chuyen" + sR + sI )
	
let region = server.region;
	let serverIden = server.id
//game_log ("chuyen1  :" + serverIden)
if (sR != region && sI != serverIden && serverIden != "PVP" )
{
//	change_server(sR, sI)
}
}
	  else
	  {
	  game_log ("khong tim thay doi tuong")
	  }
///////////////////////	  
    return data;
  }
}


// Check now, and every 30s
setInterval(() => {
  checkServersForMonsters(["phoenix"]);
}, 10000);









