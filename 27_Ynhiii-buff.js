let started
let started1
let move1 = 0
let framboss = 0
let framboss1 = 0
let delayboss
let timemax = 7 * 60 * 1000
var idmap 
let rateheal
let delayitem
let stopgiudo = 0  // 1 = stop
var crepp = "plantoid"
let receivedData
let delayaoe  = Date.now()
let framfocus = 1  //tập trung quanh 1 nhân vật khi fram
var nhanvatfram = "haiz"
var nhanvatphu = '6gunlaZe';   // LyThanhThu  6gunlaZe

let kitefram

if (delayboss == undefined) delayboss = Date.now()


setInterval(() => {
    parent.socket.emit("send_updates", {});
    game_log("🔁 Force refresh", "#AAAAFF");
}, 90000); // mỗi 90 giây


	
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




// ================== CẤU HÌNH & BIẾN KHỞI TẠO ==================
let isRunning = false;
let isMoving = false;
let moveStart = Date.now();
const MOVE_MAX = 15000; // 15 giây reset nếu kẹt
let townUsed = false;

// Giả sử các biến này bạn đã định nghĩa ở đâu đó, nếu chưa hãy uncomment:
// var nhanvatfram = "LeaderName"; 
// var crepp = "bee"; 
// var framfocus = 0;
// var receivedData = null; 

// ================== MAIN LOOP ==================
setInterval(() => {
    if (!isRunning) {
        isRunning = true;
        mainLogic().finally(() => isRunning = false);
    }
}, 1000); // Chạy mỗi 0.5s để phản xạ nhanh hơn

// ================== MAIN LOGIC ==================
async function mainLogic() {
    let leader = get_player("haiz");
    let tranferr = get_player("nhiY");

    // 1. CẬP NHẬT TRẠNG THÁI DI CHUYỂN
    // Nếu smart.moving của game dừng, ta cũng reset biến isMoving
    if (!smart.moving) {
        isMoving = false;
    }

    // 2. ƯU TIÊN TUYỆT ĐỐI: HOLIDAY EVENT
    if (parent?.S?.holidayseason && !character?.s?.holidayspirit) {
        if (!isMoving && !smart.moving) {
            isMoving = true;
            moveStart = Date.now();
            try {
                console.log("Đang đi lấy Buff Holiday...");
                await smart_move({ to: "town" });
                parent.socket.emit("interaction", { type: "newyear_tree" });
            } catch (e) {
                console.log("Holiday move failed");
            } finally {
                isMoving = false;
            }
        }
        return; 
    }

    // 3. KIỂM TRA STUCK (CHỐNG KẸT)
    if (isMoving || smart.moving) {
        if (Date.now() - moveStart > MOVE_MAX) {
            console.log("PHÁT HIỆN KẸT → RESET DI CHUYỂN");
            stop(); // Dừng mọi hành động di chuyển hiện tại
            isMoving = false;
        } else {
            return; // Đang di chuyển bình thường, thoát để không đè lệnh xmove
        }
    }

    // 4. WINTERLAND SAFETY
    if (character.map === "winterland" && distance(character, { x: 800, y: 400 }) < 250) {
        if (!leader && !townUsed) {
            townUsed = true;
            await use_skill("town");
            return;
        }
    }
    if (character.map === "main" || character.map === "bank") {
        townUsed = false;
    }

    // 5. PARTY CONTROL
    if (!character.party) {
        send_party_request("haiz");
    } else if (character.party !== "haiz") {
        leave_party();
    }
    if (!character.party) return;

    // 6. LOGIC CHIẾN ĐẤU / FARM FOCUS (GIỮ NGUYÊN)
    let leaderfram = (typeof nhanvatfram !== 'undefined') ? get_player(nhanvatfram) : null;
    if (typeof framfocus !== 'undefined' && framfocus === 1 && leaderfram && 
        distance(character, leaderfram) < 230 && distance(character, leader) < 230) {
        // Có thể thêm logic tấn công ở đây
        kitefram = 1;
        return; 
    } else {
        kitefram = 0;
    }

    // 7. DI CHUYỂN THEO DỮ LIỆU NHẬN ĐƯỢC (receivedData)
    if (receivedData && typeof receivedData === "object" && receivedData.message === "location") {
        const { map: targetMap, x: targetX, y: targetY } = receivedData;
        const dist = distance(character, { x: targetX, y: targetY });

        // Nếu cùng Map và đã ở gần (trong tầm 50px) -> Dừng di chuyển
        if (character.map === targetMap && dist < 50) {
            return;
        }

        // TRƯỜNG HỢP 1: KHÁC MAP HOẶC QUÁ XA (> 500px) -> DÙNG SMART MOVE
        if (character.map !== targetMap || dist > 500) {
            if (character.map === "crypt") return; // An toàn cho map crypt

            if (targetMap === "goobrawl") {
                parent.socket.emit("join", { name: "goobrawl" });
            }

            isMoving = true;
            moveStart = Date.now();
            try {
                await smart_move({ map: targetMap, x: targetX, y: targetY });
            } catch (err) {
                console.log("Smart move lỗi, dùng Town");
                await use_skill("town");
            } finally {
                isMoving = false;
            }
        } 
        // TRƯỜNG HỢP 2: CÙNG MAP & KHOẢNG CÁCH VỪA PHẢI -> DÙNG XMOVE
        else {
            // Không set isMoving = true ở đây để vòng lặp sau không bị 'return' ở bước 3
            if (!smart.moving) {
                xmove(targetX, targetY);
            }
        }
    }
}






function on_magiport(name){
    if(name == "nhiY"){
        accept_magiport(name);
	    stop() 
    }
}




function on_cm(name, data) {
    // 1. Phản hồi kỹ thuật (Heal) cho nhóm
    if (["haiz", "6gunlaZe", "tienV", "LyThanhThu", nhanvatphu].includes(name)) {
        if (data === "bosshelp") {
            if (!is_on_cooldown("partyheal") && character.mp > 550) use_skill("partyheal");
        }
    }

    // 2. Chỉ nhận lệnh từ Leader "haiz"
    if (name === "haiz") {
        // Lệnh vào cổng (Instance)
        if (data === "goo" && character.map !== "crypt") enter("crypt", idmap);
        if (data === "goo1" && character.map !== "tomb") enter("tomb", idmap);
        if (data === "goo2" && character.map !== "winter_instance") enter("winter_instance", idmap);
        if (data === "goo3" && character.map !== "spider_instance") enter("spider_instance", idmap);

        // Lệnh cập nhật ID Map (nếu data là chuỗi đơn thuần)
        if (typeof data === 'string' && !["goo", "goo1", "goo2", "goo3"].includes(data)) {
            idmap = data;
        }

        // CẬP NHẬT TỌA ĐỘ: Chỉ nhận khi đúng là message: "location"
        if (typeof data === 'object' && data.message === "location") {
            receivedData = data; 
        }
    }
}



////////////////////////////////
/// check boss khi fram
setInterval(function() {

	
	
		if(character.esize < 7 || !character.s.mluck || character.s.mluck.f !== "MuaBan")
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
						//game_log("so luong  la "+soluongmp);

            }
            if (item.name == "hpot1" ) {
                // This is an item we want to use!
                    soluonghp += item.q//tim ra vi tri mon do
						//game_log("so luong  la "+soluonghp);

            }				
			}
	/////////		
	
	if( (soluonghp < 4000 ) )
	{
		send_cm("MuaBan", "hp");
		game_log("re filll !!!!!!");
	}
		if( ( soluongmp < 9999) )
	{
		send_cm("MuaBan", "mp");
		game_log("re filll !!!!!!");
	}


}, 40000);




/////////////////////////////////

setInterval(() => {
	
	if (character.ping > 600 )
{
	delayThreshold = character.ping / 2
}
	else
{
	delayThreshold = 220
}
	

}, 200);


function partyheal_logic() {
    if (!can_use("partyheal")) return;
    if ((character.max_mp - character.mp) < 300)use_skill("partyheal");
	
}

setInterval(partyheal_logic, 600);


/*
let last_cast_time = null;

function resource_logic() {

    let skill = null;

    if (character.hp < 2100 && character.mp > 100 && can_use("use_hp")) {
        skill = "use_hp";
    }
    else if (character.mp / character.max_mp < 0.9 && can_use("use_mp")) {
        skill = "use_mp";
    }


    if (!skill) return;

    // CAST
    use_skill(skill);

    const now = Date.now();
    const delta = last_cast_time ? now - last_cast_time : 0;

    game_log(
        `[CAST] ${skill} | Δ=${delta}ms (cd≈2000ms)`,
        delta < 1800 ? "red" : "green"
    );

    last_cast_time = now;
}

setInterval(resource_logic, 100);

*/




function use_hp_or_mp1()
{
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	

    if (character.hp < 2100 && character.mp > 100)use_skill("use_hp");
    else if (character.mp / character.max_mp < 0.9)use_skill("use_mp");
	else used=false;
	
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}

setInterval(function() {
use_hp_or_mp1()
}, 200);




setTimeout(() => {
         if (character.rip) { ///////auto hoi sinh 10s khi khởi động
    respawn();
  }
}, 10000);




setInterval(function() {

 if (character.rip) { ///////auto hoi sinh
    respawn();
  }


}, 50000);





function degToRad(deg) {
    return deg * Math.PI / 180;
}

let checkwwall = 1;
const maxAttempts = 5;

// Góc phụ để thử nếu hướng chính bị chặn (theo độ lệch nhỏ hơn)
const extraAngles = [20, 35, 70].map(degToRad); // + (rồi đảo thành - sau)

let lastKiteTime = 0;
const KITE_INTERVAL = 400; // ms


function kite(taget, kite_range = 20, quai = null) {
    if (smart.moving || !taget) return;

    const now = performance.now();
    if (now - lastKiteTime < KITE_INTERVAL) return;
    lastKiteTime = now;

	if (quai && distance(character, quai) < 250) //dùng khi kite bscorpion
	{
     if ( !quai.dead && distance(character, quai) > 110 ) return 
	}

	
    // LẤY TÊN QUÁI GẦN NHẤT
    // ------------------------------------
    let nearMob = get_nearest_monster();

    // Cấu hình khoảng cách riêng (chỉ áp dụng nếu có mob phù hợp) gscorpion
    const kiteConfig = {
        "fireroamer": 50,
        "booboo": 50,
        "mummy": 50,
        "plantoid": 40,
        "gscorpion": 50,
        "spider": 10,
        "spiderr": 10,
        "spiderbl": 10,
        "spiderbr": 10,


        // không có default → để giữ nguyên giá trị truyền vào
    };

    if (nearMob && kiteConfig[nearMob.mtype] !== undefined) {
        // chỉ ghi đè khi có cấu hình
        kite_range = kiteConfig[nearMob.mtype];
    }
    // → nếu không tìm thấy quái hoặc không nằm trong config → giữ nguyên giá trị truyền từ ngoài vào
    // ------------------------------------

	

    const originalPosition = {
        x: taget.real_x,
        y: taget.real_y
    };

    for (let i = 0; i < maxAttempts; i++) {
        const radius = kite_range + i * 5;
        const angleFromTarget = Math.atan2(character.y - taget.real_y, character.x - taget.real_x);

        // 1️⃣ Ưu tiên hướng chính (theo checkwwall)
        const mainOffset = degToRad(51.4) * checkwwall;
        const mainAngle = angleFromTarget + mainOffset;

        const mainGoal = {
            x: taget.real_x + radius * Math.cos(mainAngle),
            y: taget.real_y + radius * Math.sin(mainAngle)
        };

        if (can_move_to(mainGoal.x, mainGoal.y)) {
            move(mainGoal.x, mainGoal.y);
            return;
        }

        // 2️⃣ Nếu không đi được, thử các góc phụ (±20°, ±35°, ±70°)
        for (let angle of extraAngles) {
            for (let dir of [1, -1]) {
                const offset = angle * dir;
                const tryAngle = angleFromTarget + offset;
                const tryGoal = {
                    x: taget.real_x + radius * Math.cos(tryAngle),
                    y: taget.real_y + radius * Math.sin(tryAngle)
                };

                if (can_move_to(tryGoal.x, tryGoal.y)) {
                    // ✅ Nếu hướng phụ thành công → đảo hướng chính cho lần sau
                    checkwwall *= -1;
                    move(tryGoal.x, tryGoal.y);
                    return;
                }
            }
        }
    }

    // ❗Fallback: nếu tất cả đều thất bại → dùng vị trí trong receivedData
    if (receivedData && typeof receivedData === 'object' && receivedData.message === "location") {
        const targetMap = receivedData.map;
        const targetX = receivedData.x;
        const targetY = receivedData.y;

        if (character.map !== targetMap && character.map !== "crypt") {
            smart_move({ map: targetMap, x: targetX, y: targetY });
        } else {
            xmove(targetX, targetY);
        }
    }
}




function buff_khi_ranh() {
	let party = [];

	// Lấy các thành viên trong party nếu có
	if (parent.party_list.length > 0) {
		for (let id in parent.party_list) {
			let member = parent.party_list[id];
			let entity = parent.entities[member];

			if (member == character.name) entity = character;

			if (entity && distance(character, entity) < character.range) {
				party.push({ name: entity.id, entity });
			}
		}
	} else {
		// Không có party, thêm chính mình
		party.push({ name: character.name, entity: character });
	}

	// Nếu có quái fieldgen0 bị thương nặng thì đưa vào danh sách
	let fieldgen0 = get_nearest_monster({ type: "fieldgen0" });
	if (fieldgen0 && fieldgen0.hp / fieldgen0.max_hp <= 0.6) {
		party.push({ name: "fieldgen0", entity: fieldgen0 });
	}

// Tính health_ratio + ưu tiên
party = party
	.filter(m => m.entity && m.entity.hp < m.entity.max_hp)
	.map(m => {
		let ratio = m.entity.hp / m.entity.max_hp;

		// không ưu tiên 6gunlaZe khi còn trên ~70% máu
		if (m.name === "6gunlaZe" && get_nearest_monster({ type: crepp }) ) {
			ratio += 0.3;
		}
		if (m.name === "haiz" && character.map != "winter_instance" && !get_nearest_monster({ type: "pppompom" }) ) {
			ratio += 0.22;
		}
		if (m.name === "LyThanhThu"  && get_nearest_monster({ type: crepp }) ) {
			ratio += 0.2;
		}
		if (m.name === "MuaBan") {
			ratio += 0.4;
		}

		m.entity.health_ratio = ratio;
		return m;
	});

if (party.length === 0) return;

// Sort theo health_ratio
party.sort((a, b) => a.entity.health_ratio - b.entity.health_ratio);

// Heal mục tiêu ưu tiên nhất
heal(party[0].entity);

}





	let delayitem2 = Date.now()
	let delayitem1 = Date.now()


function lowest_health_partymember() {
	if (Date.now() < 300 + delayitem2) return;
	delayitem2 = Date.now();

	let party = [];

	// Lấy các thành viên trong party nếu có
	if (parent.party_list.length > 0) {
		for (let id in parent.party_list) {
			let member = parent.party_list[id];
			let entity = parent.entities[member];

			if (member == character.name) entity = character;

			if (entity && distance(character, { x: entity.real_x, y: entity.real_y }) < character.range) {
				party.push({ name: entity.id, entity: entity });
			}
		}
	} else {
		// Không có party, thêm chính mình
		party.push({ name: character.name, entity: character });
	}

	// THÊM: nếu có quái "fieldgen0" bị thương nặng thì đưa vào danh sách
	let fieldgen0 = get_nearest_monster({ type: "fieldgen0" });
	if (fieldgen0 && (fieldgen0.hp / fieldgen0.max_hp) <= 0.6) {
		party.push({ name: "fieldgen0", entity: fieldgen0 });
	}

	// Tính tỉ lệ máu
	for (let id in party) {
		let member = party[id];
   if (member.entity) {
			member.entity.health_ratio = member.entity.hp / member.entity.max_hp;
			
        // không ưu tiên cho 6gunlaZe còn trên 70% máu sẽ không buff
        if (member.name === "6gunlaZe" && get_nearest_monster({ type: crepp }) ) {
               member.entity.health_ratio += 0.3;
        }
		if (member.name === "haiz" && character.map != "winter_instance" && !get_nearest_monster({ type: "pppompom" })  ) {
			 member.entity.health_ratio += 0.22;
		}
        if (member.name === "LyThanhThu" && get_nearest_monster({ type: crepp }) ) {
               member.entity.health_ratio += 0.2;
        }
        if (member.name === "MuaBan") {
               member.entity.health_ratio += 0.4;
        }
			
	} else {
			member.entity = { health_ratio: 1 }; // giả lập
		}
	}

	// Sắp xếp theo tỉ lệ máu tăng dần
	party.sort(function (a, b) {
		return a.entity.health_ratio - b.entity.health_ratio;
	});

	// Trả về entity có máu thấp nhất
	return party[0].entity;
}



function lowest_health_partymember1() {
	if (Date.now() < 300 + delayitem1) return 
	delayitem1 = Date.now()
    var party = [];
    if (parent.party_list.length > 0) {
		for(id in parent.party_list)
		{
			var member = parent.party_list[id];
			var entity = parent.entities[member];
			
			if(member == character.name)
			{
				entity = character;
			}
			
			if(entity != null && ( distance(character,{x: entity.real_x, y: entity.real_y}) < 300))
			{
					//	game_log(entity.name + "1");
				party.push({name: member, entity: entity});
			}
		}
    }
	else
	{
		//Add Self to Party Array
		party.push(
		{
			name: character.name,
			entity: character
		});
	}

    //Populate health percentages
    for (id in party) {
        var member = party[id];
        if (member.entity != null) {
            member.entity.health_ratio = member.entity.hp / member.entity.max_hp;
        }
        else {
            member.health_ratio = 1;
        }
    }
	
    //Order our party array by health percentage
    party.sort(function (current, next) {
        return current.entity.health_ratio - next.entity.health_ratio;
    });
	

    //Return the lowest health
    return party[0].entity;
}





setInterval(function() {
    let lootMule = get_player("MuaBan");

		 //giui vang when in range
    var merch = get_player("MuaBan"); // replace this with your merchants name
    if (merch && distance(character, merch) <= 400) {
        send_gold(merch,character.gold)
    }
	//
	
    if (lootMule == null || stopgiudo == 1) {
        //game_log("Nobody to transfer to");
        loot_transfer = false;
        return;
    }

    let itemsToExclude = ["fieldgen0","frozenkey","spiderkey","elixirfires","hotchocolate","elixirluck","snowball","supermittens","handofmidas","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirint2","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome", "tracker","slimestaff","tigerstone","froststaff","wbook1"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);











setTimeout(function() {
    changeitem({ slot: "orb", name : "tigerstone", level : 3 });
}, 3000);  //chạy 1 lần sau 3s



changeitem({ slot: "gloves", name : "supermittens", level : 8 });


async function lootLoop() {
    await lootAllChests();
    setTimeout(lootLoop, 1000);
}

lootLoop();


function shifting() {
    shift(0, 'xpbooster');
equipSet('nogold');
	goldcheck = 0
}

let goldcheck = 0


// reset goldcheck mỗi 5 phút
setInterval(() => {
    goldcheck = 0;
}, 200000);

async function lootAllChests() {
    let chests = get_chests();
    let chestIds = Object.keys(chests);
    let scorpionNearby = get_nearest_monster({ type: "bscorpion" });

    if (
        (chestIds.length > 10 || character.map == "tomb" || character.map == "winter_instance" || character.map == "spider_instance" ||
        (crepp === "bscorpion" && chestIds.length > 0 && !scorpionNearby)) &&  
		chestIds.length > 0  &&
        character.cc < 200 &&
        isEquipping === false && character.slots.gloves?.name === "supermittens"
    ) {
        try {
            equipSet("gold");
            goldcheck = 1;
            shift(0, "goldbooster");
			
            await waitForMidas(); // 🔑 điểm mấu chốt

            

            for (let id of chestIds) {
                loot(id);
            }

            game_log("HAND OF MIDAS ACTIVE");

            setTimeout(shifting, 370);

        } catch (e) {
            game_log("Equip midas FAILED");
        }
    }
}



function waitForMidas(timeout = 800) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const check = setInterval(() => {
            if (character.slots.gloves?.name === "handofmidas") {
                clearInterval(check);
                resolve(true);
            }
            if (Date.now() - start > timeout) {
                clearInterval(check);
                reject("Equip timeout");
            }
        }, 40);
    });
}




let delayBug = Date.now();
let attack_mode = true;

let gcdFastTimer = null;


setInterval(() => {
    if (!attack_mode) return;
    if (Date.now() < delayBug + 1000) return;
	

    const leader = get_player("haiz");


	 if (smart.moving || !leader)
	 {
	 tryPartyHeal();
     if (emergencyHealParty()) return;
	 }
	
    if (!leader) return;

	
    if (character.rip || smart.moving) return;

	
	const ms = ms_to_next_skill("attack");

	
    let currentTarget = get_targeted_monster();
    const leaderTarget = get_target_of(leader);

    if (!currentTarget || currentTarget !== leaderTarget) {
        change_target(leaderTarget);
        currentTarget = get_targeted_monster();
    }

    // ===== C. MOVE & LOGIC (luôn chạy) =====
    kiteLogic(currentTarget);
    // smartTargetLogic(currentTarget);

    // ===== B. SKILL SUPPORT (không block) =====
    tryAbsorb();
    tryDarkBlessing(currentTarget);
    curseLogic(currentTarget);

    // 🚀 GCD sắp mở → canh nhanh
    if (ms > 0 && ms < 160 && !gcdFastTimer) {
        gcdFastTimer = setTimeout(() => {
            gcdFastTimer = null;

            const t = get_targeted_monster();
            if (!t) return;
			
             tryPartyHeal();
			
            //Heal đơn party trước
            if (trySingleHeal()) return;

            //Nếu chưa dùng heal cooldown thì mới heal người ngoài
            if (tryNearbyHeal()) return;
			
            if (hutquaibangtay()) return;
            if (tryAttack(t)) return;

			

        }, ms);
        return;
    }

    // GCD chưa mở → thôi
    if (ms > 0) return;

    // ===== GCD ACTION (fallback) =====
	
    tryPartyHeal();
			
            //Heal đơn party trước
    if (trySingleHeal()) return;

            //Nếu chưa dùng heal cooldown thì mới heal người ngoài
    if (tryNearbyHeal()) return;
	
    if (hutquaibangtay()) return;
    if (tryAttack(currentTarget)) return;

    buff_khi_ranh();

}, 200);



// ❌ Quái không bao giờ được absorb vào target của nó
const NO_ABSORB_MOBS = [
    "pppompom","oneeye","xmagen1111","nerfedmummy","nerfedbat",
];

let lastAbsorbTime = 0;
const ABSORB_DELAY = 700; // ms
const ABSORB_DELAY_BOSS = 1200; // ms

function tryAbsorb() {
    if (!character.party || smart.moving ) return;
    if (is_on_cooldown("absorb")) return;
    if (character.hp < 8500) return;

    const now = Date.now();
    if (now - lastAbsorbTime < ABSORB_DELAY) return;

    const party = get_party();
    let bestTarget = null;
    let highestScore = 0;



// --- LOGIC MẶC ĐỊNH HÚT BOSS NGUY HIỂM ---
const priority_mobs = ["xmagefz", "xmagefi", "xmagex","xmagen"];

// Tìm bất kỳ con Boss nào trong danh sách đang tồn tại
const boss_entity = Object.values(parent.entities).find(e => 
    priority_mobs.includes(e.mtype) && !e.dead
);

if (boss_entity && boss_entity.target && boss_entity.target !== character.name && character.hp > 8500 && character.mp > 500 && (now - lastAbsorbTime) > ABSORB_DELAY_BOSS ) {
    const teammate = get_player(boss_entity.target);
    
    // Nếu đồng đội đang bị Boss đánh và ở trong tầm hỗ trợ (240px)
    if (teammate && !teammate.rip && distance(character, teammate) <= 240 && teammate.hp / teammate.max_hp < 0.85 ) {
        
        // Mục tiêu lúc này là ĐỒNG ĐỘI để thực hiện Buff/Hỗ trợ
        bestTarget = boss_entity.target; 
        highestScore = 9999; // điểm số ưu tiên

    }
}


// --- LOGIC KIỂM TRA FRANKY ---

if ( character.map == "level2w") {	
const franky_entity = Object.values(parent.entities).find(e =>
    e.mtype === "franky" && !e.dead
);

if (franky_entity && franky_entity.target && franky_entity.target !== "haiz" && franky_entity.target !== character.name) {

    const teammateFranky = get_player(franky_entity.target);

    const frankyInSafeZone = distance(franky_entity, { x: 14, y: 30 }) < 70;

    // nếu franky đang ở ngoài safe
    if (teammateFranky && !character.rip && !frankyInSafeZone && character.hp > 12000 ) {
        bestTarget = franky_entity.target;
        highestScore = 9998;

    }
}
}



	
    // Nếu không tìm thấy BOSS cần can thiệp, chạy logic party bình thường
    if (!bestTarget) {
        for (let name in party) {
            if (name === character.name) continue;

            const player = get_player(name);
            if (!player || player.rip) continue;
            if (distance(character, player) > 240) continue;

            const threats = Object.values(parent.entities).filter(e =>
                e.type === "monster" &&  
                e.target === name &&
                !e.dead &&
                distance(player, e) < 250 && !NO_ABSORB_MOBS.includes(e.mtype)
            );

            if (threats.length === 0) continue;

            let score = threats.length * 2;
            let shouldAbsorb = false;

            // === Player yếu / quan trọng ===
            if (player.hp < 7000 || name === "6gunlaZe" || name === "tienV" || name === "LyThanhThu") {
                score += 50;
                shouldAbsorb = true;
            }


            // === Farm mob ưu tiên ===
            if (typeof crepp !== "undefined") {
                const extraMob = "sparkbot"; // mob thêm thủ công

                const farmCount = threats.filter(m =>
                    m.mtype === crepp ||
                    m.mtype === extraMob
                ).length;

                if (farmCount >= 2 && character.hp > 10000) {
                    score += 20;
                    shouldAbsorb = true;
                }
            }


            // === Quái sắp chết (cướp kill) ===
            const dyingMobs = threats.filter(e => {
                const hpThreshold =
                    e.max_hp >= 800000 ? 38000 :
                    e.max_hp >= 200000 ? 25000 : 9000;
                return e.hp < hpThreshold && e.max_hp > 9000;
            }).length;

            if (dyingMobs > 0) {
                score += 40;
                shouldAbsorb = true;
            }

            if (!shouldAbsorb) continue;

            if (score > highestScore) {
                highestScore = score;
                bestTarget = name;
            }
        }
    }

    // Thực hiện Absorb
    if (bestTarget && character.hp >= 8500) {
        use_skill("absorb", bestTarget);
        lastAbsorbTime = now;
        game_log(`🛡 Absorb ${bestTarget} (score: ${highestScore})`);
    }
}




function hutquaibangtay() {
    const leader = get_player("haiz");
    const checker = get_player(nhanvatphu);
    const target = get_nearest_monster1({
        type: crepp,
        subtype: "bigbird",
        NO_target: 1
    });

    if (!target) return false;

    if (
        checker && leader &&
        character.targets <= 9 &&
        character.mp > 5000 &&
        character.hp / character.max_hp > 0.95 &&
        leader.hp > 12700 &&
        leader.mp > 200 &&
        target.level < 4
    ) {
        change_target(target);
        if (can_attack(target)) attack(target);
        return true;
    }

    if (
        !checker && leader &&
        character.targets <= 3 &&
        character.mp > 5000 &&
        character.hp / character.max_hp > 0.95 &&
        leader.hp > 12700 &&
        leader.mp > 200 &&
        target.level < 4    
	) 
	{
        change_target(target);
        if (can_attack(target)) attack(target);
        return true;
    }

    if (
        checker && leader &&
        character.targets <= 0 &&
        character.mp / character.max_mp > 0.999 &&
        character.hp / character.max_hp > 0.999 &&
        leader.hp > 12700 &&
        leader.mp > 200 
    ) {
        change_target(target);
        if (can_attack(target)) attack(target);
        return true;
    }

	

    return false;
}



function kiteLogic(currentTarget) {
    const leader = get_player("haiz");
    if (!leader) return;

    const distToLeader = distance(character, leader);
    const scorpion = get_nearest_monster({ type: "bscorpion" });

    // ===== CASE 1: Có target và đứng gần leader =====
    if (currentTarget && distToLeader < character.range && kitefram === 0) {

        if (!can_attack(currentTarget)) {
            if (
                currentTarget.mtype === "franky" ||
                currentTarget.mtype === "nerfedmummy"
            ) {
                kite(leader, 30);
            } else {
                kite(leader, 50);
            }
        } else {
            kite(leader, 40);
        }
        return;
    }

    // ===== CASE 2: Đang theo leader bình thường =====
    if (distToLeader < 300) {
        if (scorpion && crepp === "bscorpion") {
            kite(leader, 120, scorpion);
        } else {
            kite(leader, 35);
        }
        return;
    }

    // ===== CASE 3: Kite riêng theo cung (kitefram) =====
    if (currentTarget && kitefram === 1) {
        const cung = get_player(nhanvatfram);
        if (!cung) return;

        if (!can_attack(currentTarget)) {
            if (scorpion && crepp === "bscorpion") {
                kite(cung, 120, scorpion);
            } else {
                kite(cung, 35);
            }
        }
        return;
    }

    // ===== DEFAULT =====
    kite(leader, 35);
}


function tryAttack(target) {
    if (
        target &&
        can_attack(target) 
       // && (target.attack < 800 || character.mp / character.max_mp > 0.75)
    ) {
        attack(target);
        return true;
    }
    return false;
}



function tryCurse(target, mpReq = 4500) {
    if (
        target &&
        character.mp > mpReq &&
        !is_on_cooldown("curse") &&
        !target.s?.cursed &&
        character.map !== "winter_instance"
    ) {
        use_skill("curse", target);
        return true;
    }
    return false;
}

function curseLogic(currentTarget) {
  const leader = get_player("haiz");
    // === 1. Boss / quái nặng cố định ===
    const priorityTypes = ["franky", "icegolem", "crabxx", "bscorpion","mrgreen","mrpumpkin","dragold","stompy", "skeletor",];
    for (let type of priorityTypes) {
        const t = get_nearest_monster({ type });
        if (tryCurse(t)) return true;
    }

// === 2. Quái quanh leader có HP lớn nhất (>40k) ===
if (leader) {
    let maxHpTarget = null;
    let maxHp = 0;

    for (let id in parent.entities) {
        const m = parent.entities[id];
        if (!m || m.type !== "monster" || m.dead) continue;

        if (!m.target) continue; // chưa có target ai hết, bở qua

        // quái gần leader
        if (distance(m, leader) > 15) continue;

        if (m.hp > maxHp) {
            maxHp = m.hp;
            maxHpTarget = m;
        }
    }

    if (
        maxHpTarget &&
        maxHpTarget.hp > 40000 &&
        distance(character, maxHpTarget) < 20
    ) {
        if (tryCurse(maxHpTarget)) return true;
    }
}


    // === 3. Quái leader đang tank (ưu tiên cao) ===
    if (
        currentTarget &&
        currentTarget.target === "haiz" &&
        currentTarget.hp > 30000
    ) {
        // gần thì curse luôn
        if (distance(character, currentTarget) < 15) {
            if (tryCurse(currentTarget)) return true;
        }

        // xa nhưng không phải quái farm
        if (currentTarget.mtype !== crepp) {
            if (tryCurse(currentTarget)) return true;
        }
    }

    return false;
}

function tryDarkBlessing(target) {
    if (
        target &&
        character.mp > 1200 &&
        !is_on_cooldown("darkblessing") &&
        !character.s.darkblessing
    ) {
        if (
            target.mtype !== "bscorpion" ||
            target.hp > 200000
        ) {
            use_skill("darkblessing");
            return true;
        }
    }
    return false;
}















let delayNearbyHeal = 0;

function tryNearbyHeal() {

    if (is_on_cooldown("heal")) return false;

    const nearby = Object.values(parent.entities)
        .filter(e =>
            e.player &&
            e.visible &&
            !e.dead &&
            e.hp < e.max_hp * 0.4 &&
            distance(character, e) <= character.range
        )
        .sort((a, b) => a.hp - b.hp)[0];

    if (
        nearby &&
        Date.now() > delayNearbyHeal
    ) {
        heal(nearby);
        delayNearbyHeal = Date.now() + 50; // chống spam
        return true;
    }

    return false;
}

let delayHeal = 0;
function trySingleHeal() {

    if (is_on_cooldown("heal")) return false;

    let rateheal;

    if (character.map === "winter_instance") {
        rateheal = 0.9;
    } else {
        rateheal = 1 - (character.heal / character.max_hp);
        if (rateheal < 0.9) rateheal = 0.9;
        if (character.targets > 5) rateheal = 0.95;
    }

    const target = lowest_health_partymember();

    if (
        target &&
        target.health_ratio < rateheal &&
        distance(character, target) <= character.range &&
        Date.now() > delayHeal
    ) {
        heal(target);
        delayHeal = Date.now() + 50; // chống spam vòng lặp
        return true;
    }

    return false;
}



let delayParty = 0;

function tryPartyHeal() {

    if (is_on_cooldown("partyheal")) return false;

    const target = lowest_health_partymember();
    if (!target) return false;

    if (character.mp <= 750) return false;

    // MODE 0: cứu nguy spike damage (double heal)
    if (target.health_ratio < 0.25) {
        use_skill("partyheal");
        delayParty = Date.now();
        return true;
    }

    // MODE 2: heal phụ khi mana dư
    if (character.mp > 6000 && target.health_ratio < 0.50) {
        if (Date.now() > delayParty + 1000) {
            use_skill("partyheal");
            delayParty = Date.now();
            return true;
        }
    }

    // MODE 2.5: heal phụ khi mana dư mức cao
    if (   (character.max_mp - character.mp) < 1500  && target.health_ratio < 0.75) {
        if (Date.now() > delayParty + 1000) {
            use_skill("partyheal");
            delayParty = Date.now();
            return true;
        }
    }
	

    // MODE 1: heal thông minh
    if (target.health_ratio >= 0.55) return false;

    const maxRatio = 0.65;
    const minRatio = 0.30;

    const maxDelay = 460;
    const minDelay = 120;

    const r = Math.max(minRatio, Math.min(maxRatio, target.health_ratio));

    const dynamicDelay =
        minDelay +
        (maxDelay - minDelay) *
        ((r - minRatio) / (maxRatio - minRatio));

    if (Date.now() > delayParty + dynamicDelay) {
        use_skill("partyheal");
        delayParty = Date.now();
        return true;
    }

    return false;
}



//hàm tạm ngưng
function tryHeal() {
    let rateheal;

    if (character.map === "winter_instance") {
        rateheal = 0.9;
    } else {
        rateheal = 1 - (character.heal / character.max_hp);
        if (rateheal < 0.9) rateheal = 0.9;
        if (character.targets > 5) rateheal = 0.95;
    }

    // Heal đơn mục tiêu trong party
    const t1 = lowest_health_partymember();
    if (
        t1 &&
        t1.health_ratio < rateheal &&
        distance(character, t1) < character.range
    ) {
        heal(t1);
        return true;
    }

    // Party heal
    const t2 = lowest_health_partymember1();
    if (
        t2 &&
        t2.health_ratio < 0.65 &&
        character.mp > 650
    ) {

    const maxRatio = 0.65;
    const minRatio = 0.30;

    const maxDelay = 460;
    const minDelay = 120;

    // Clamp ratio để tránh vượt biên
    const r = Math.max(minRatio, Math.min(maxRatio, t2.health_ratio));

    // Nội suy tuyến tính
    const dynamicDelay =
        minDelay +
        (maxDelay - minDelay) * ((r - minRatio) / (maxRatio - minRatio));

    if (Date.now() > delayaoe + dynamicDelay) {
        use_skill("partyheal");
        delayaoe = Date.now();
    }
		
    }

    // Heal người chơi xung quanh
    const nearby = Object.values(parent.entities)
        .filter(e =>
            e.player &&
            e.visible &&
            !e.dead &&
            e.hp < e.max_hp * 0.4 &&
            distance(character, e) <= 50
        )
        .sort((a, b) => a.hp - b.hp)[0];

    if (nearby) {
        heal(nearby);
        return true;
    }

    return false;
}



function emergencyHealParty() {
    if (is_on_cooldown("heal")) return false;

    let target = null;
    let lowestRatio = 1;

    // 1️⃣ Luôn xét bản thân trước
    const selfRatio = character.hp / character.max_hp;
    if (selfRatio < 0.6) {
        target = character;
        lowestRatio = selfRatio;
    }

    // 2️⃣ Xét party qua parent.party_list
    if (parent.party_list && parent.party_list.length > 0) {

        for (let i in parent.party_list) {

            const memberName = parent.party_list[i];

            let entity = parent.entities[memberName];

            if (memberName === character.name)
                entity = character;

            if (!entity || entity.dead) continue;

            if (distance(character, entity) > character.range) continue;

            const ratio = entity.hp / entity.max_hp;

            // Emergency threshold thấp hơn self để giữ ưu tiên bản thân
            if (ratio < 0.5 && ratio < lowestRatio) {
                lowestRatio = ratio;
                target = entity;
            }
        }
    }

    if (target) {
        heal(target);
        return true;
    }

    return false;
}




function getOtherPartyMember() {
    if (!parent.party_list || parent.party_list.length === 0) return null;

    for (let i = 0; i < parent.party_list.length; i++) {
        const member = parent.party_list[i];

        if (member === "haiz") continue;
        if (member === "muaban") continue;
        if (member === character.name) continue;

        const entity = parent.entities[member];
        if (!entity) continue;

        return entity;
    }
    return null;
}


async function handleZap() {
	const zapperMobs = [crepp, "rgoo", "bgoo", "wolfie", "jr", "goldenbat","stompy","hen","rooster","cutebee"]
  .filter(m => m !== "targetron");
    const quaiyeu = ["rooster","cutebee","bigbird", "spider", "scorpion","bscorpion","gscorpion","crabx","mummy","booboo"];  // không quan tâm tới levl
	const soluongTOIDA = 14; // thường quái mạnh để 8 thôi
    const delay = 200;
    let zap = true;
    const dead = character.rip;
	var haiz = get_player("haiz"); 
	var gun = getOtherPartyMember();


    try {
        if (!dead && zap && !smart.moving && character.map != "spider_instance" ) {
            // Scan all mobs that are in the zapperMobs list
            const entities = Object.values(parent.entities).filter(entity =>
                entity && entity.type === "monster" && !entity.target && !NO_ABSORB_MOBS.includes(entity.mtype) &&
				( (entity.level < 4 && zapperMobs.includes(entity.mtype) )  ||  quaiyeu.includes(entity.mtype)  ) &&
                is_in_range(entity, "zapperzap") &&
                entity.visible && !entity.dead
            );

            // Step 2: Use zapper skill if conditions are met
		if (character.targets <= soluongTOIDA && character.hp/character.max_hp > 0.75 && haiz && haiz.hp > 12700 && haiz.mp > 200 && distance(character, haiz) < 120 && gun )
		{
            if (entities.length > 0 && !is_on_cooldown("zapperzap") && character.mp > G?.skills?.zapperzap?.mp + 4250 && (character.slots.ring1?.name == "zapper" || character.slots.ring2?.name == "zapper" )  ) {
                for (const entity of entities) {
                    if (!is_on_cooldown("zapperzap")) {
                        await use_skill("zapperzap", entity);  // Zap the entity
                        //console.log(`Zapped ${entity.mtype}`);
                    }
                }
            }
            else if (
    entities.length === 0 &&
    !is_on_cooldown("zapperzap") && character.hp/character.max_hp > 0.99 && character.targets == 0 &&
    character.mp > G?.skills?.zapperzap?.mp + 4250 &&
    (character.slots.ring1?.name == "zapper" || character.slots.ring2?.name == "zapper")
) {
    // Lọc ra các quái hợp lệ
    const entities1 = Object.values(parent.entities).filter(entity =>
        entity && entity.mtype === crepp &&
        entity.type === "monster" &&
        !entity.dead &&
        entity.visible &&
        is_in_range(entity, "zapperzap")
    );

    if (entities1.length > 0) {
        // Tìm quái gần nhất
        const target = entities1.sort((a, b) => distance(character, a) - distance(character, b))[0];

        if (target && !is_on_cooldown("zapperzap")) {
            await use_skill("zapperzap", target);   // Zap đúng 1 lần
        }
    }
        }

			
		}
			
        }
    } catch (e) {
        console.error(e);
    }
    setTimeout(handleZap, delay);
}
handleZap();



// Biến toàn cục để theo dõi trạng thái của haiz
let haizLastPos = { x: 0, y: 0, time: Date.now() };

async function handleBossZap() {
    // Thứ tự trong mảng này chính là thứ tự ưu tiên (Stompy cao nhất)
    const bossList = ["stompy", "skeletor", "gbluepro", "ggreenpro", "gredpro", "gpurplepro", "xmagefz", "xmagefi", "xmagefn", "xmagex", "mrgreen", "mrpumpkin"];
    const delay = 1000;
    const haiz = get_player("haiz");
    const gun = getOtherPartyMember();

    try {
        if (!character.rip && !smart.moving && haiz && gun) {
            
            let now = Date.now();
            let moveDist = distance(haiz, haizLastPos);
            
            // 1. CẬP NHẬT TRẠNG THÁI HAIZ
            const monstersAroundHaiz = Object.values(parent.entities).filter(e => 
                e && e.type === "monster" && !e.dead && e.visible &&
                distance(haiz, e) <= (haiz.range || 100)
            ).length;

            const isHaizLonely = monstersAroundHaiz === 0;

            if (moveDist > 10 || !isHaizLonely) {
                haizLastPos = { x: haiz.x, y: haiz.y, time: now };
            }

            let isHaizStandingStill = (now - haizLastPos.time) >= 30000;
            let hardreset = (now - haizLastPos.time) >= 90000;

            // 2. TÌM BOSS THEO THỨ TỰ ƯU TIÊN
            let targetBoss = null;
            for (let bossType of bossList) {
                // Tìm con Boss cụ thể theo loại (mtype) đang ở gần
                const found = Object.values(parent.entities).find(entity => 
                    entity && entity.mtype === bossType && 
                    entity.type === "monster" && 
                    !entity.dead && entity.visible &&
                    is_in_range(entity, "zapperzap")
                );
                
                if (found) {
                    targetBoss = found;
                    break; // Tìm thấy con ưu tiên cao nhất rồi thì dừng vòng lặp
                }
            }

            // 3. THỰC HIỆN ZAP
            if (targetBoss && isHaizStandingStill && isHaizLonely) {
                const hasZapperEquipped = character.slots.ring1?.name == "zapper" || character.slots.ring2?.name == "zapper";
                const canZap = !is_on_cooldown("zapperzap") && character.mp > 6000 && hasZapperEquipped;
                 if (!hasZapperEquipped)equipSet('fram');
                if (canZap) {
                    console.log(`%c[PRIORITY-ZAP] Đang zap ưu tiên: ${targetBoss.mtype}`, "color: #00ff00; font-weight: bold;");
                    await use_skill("zapperzap", targetBoss);
                    haizLastPos.time = Date.now(); 
                }
            }
			else if (!targetBoss && isHaizStandingStill && isHaizLonely && hardreset)send_cm("haiz", "hardreset");


			
        }
    } catch (e) {
        console.error("Lỗi trong handleBossZap:", e);
    }

    setTimeout(handleBossZap, delay);
}

handleBossZap();



// ===== Thêm đầu file =====
const danhSachQuaiC = ["sparkbot", "targetron"]; // chỉnh lại theo nhu cầu
let lastZapC = 0;


// ===== ZapCase đã chỉnh =====
async function ZapCase() {
    const quaiyeu = ["crabxx","snowman","wabbit"];
    const danhSachQuaiA = ["gbluepro", "ggreenpro", "gredpro"];

    const delay = 350;
    var haiz = get_player("haiz");
    var gun = getOtherPartyMember();

    try {
        if (!character.rip) {
            
            const isFullTeam = (haiz && gun && distance(character, haiz) < 150 && distance(character, gun) < 250);

            const entities = Object.values(parent.entities).filter(entity => {
                if (!entity || entity.type !== "monster" || entity.dead || !entity.visible || !is_in_range(entity, "zapperzap")) return false;

                // 1. Quái yếu đang cắn
                if (quaiyeu.includes(entity.mtype) && entity.target) return true;

                // 2. Hút quái A khi đủ team
                if (isFullTeam && danhSachQuaiA.includes(entity.mtype) && !entity.target) return true;

                // 3. Quái C: MP > 80% + delay 5s
                if (
                    danhSachQuaiC.includes(entity.mtype) &&
                    !entity.target &&
                    character.mp / character.max_mp > 0.8 &&
                    Date.now() - lastZapC >= 5000
                ) return true;

                return false;
            });

            // ưu tiên quái chưa target
            entities.sort((a, b) => (a.target ? 1 : -1));

            if (character.hp/character.max_hp > 0.75 && haiz && haiz.hp > 12700 ) {
                if (
                    entities.length > 0 &&
                    !is_on_cooldown("zapperzap") &&
                    character.mp > 6300 &&
                    (character.slots.ring1?.name == "zapper" || character.slots.ring2?.name == "zapper")
                ) {
                    for (const entity of entities) {
                        if (!is_on_cooldown("zapperzap")) {
                            await use_skill("zapperzap", entity);

                            // nếu là quái C → set delay 5s
                            if (danhSachQuaiC.includes(entity.mtype)) {
                                lastZapC = Date.now();
                            }

                            break;
                        }
                    }
                }
            }
        }
    } catch (e) { console.error(e); }

    setTimeout(ZapCase, delay);
}

ZapCase();






function checkPVPandARENA() {

if (character.map != "arena")return
const friend = ["MuaBan", "haiz" , "haiz1" , "Ynhi", "nhiY", "6gunlaZe", "tienV", "LyThanhThu" , nhanvatphu];
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
parent.api_call("disconnect_character", {name: "Ynhi"});
stop_character("Ynhi")	
}


	
    // Đây là công việc bạn muốn thực hiện mỗi 1 giây
    console.log("Vòng lặp chạy mỗi giây...");
}

// Thiết lập vòng lặp mỗi 1 giây (1000ms)
setInterval(checkPVPandARENA, 1000); // 1000ms = 1 giây







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
	

}







// ===== CONFIG =====
const ITEM_WHITELIST = [
    "cryptkey",
    "tombkey",
    "frozenkey",
    "fieldgen0",


];

// ===== SEND FUNCTION =====
function sendItems(name) {
    let lootMule = get_player(name);
    if (!lootMule || distance(character, lootMule) > 250) return;

    character.items.forEach((item, index) => {
        if (!item) return;

        if (
            ITEM_WHITELIST.includes(item.name) &&
            !item.l &&                // không locked
            !item.s                   // không sealed
        ) {
            send_item(lootMule, index, item.q ?? 1);
        }
    });
}

setInterval(() => sendItems("haiz"), 30000);








function chuyendoithongminh(taget)
{

	

//////////////////////////////
}












/////
function get_nearest_monster1(args)
{
    if (!args) args = {};
    if (args && args.target && args.target.name) args.target = args.target.name;
    if (args && args.type == "monster") game_log("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
    if (args && args.mtype) game_log("get_nearest_monster: you used 'mtype', you should use 'type'");

    var army = [args.subtype, args.type, "scorpion"];
    var min_d = character.range, target = null;

    // HP mặc định cho lọc
    let hpp = args.nhonhat ? 1000000000 : 0; // Nếu nhonhat thì bắt đầu từ lớn, nếu lonnhat thì từ nhỏ

    for (let id in parent.entities)
    {
        let current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;

        // Kiểm tra mtype
        if (args.subtype && args.type && army.indexOf(current.mtype) === -1) continue;
        if (!args.subtype && args.type && current.mtype !== args.type) continue;

        if (args.min_xp && current.xp < args.min_xp) continue;
        if (args.max_att && current.attack > args.max_att) continue;
        if (args.target && current.target !== args.target) continue;
        if (args.no_target && current.target && current.target !== character.name) continue;
        if (args.NO_target && current.target) continue;
        if (args.comuctieu && !current.target) continue;
        if (args.path_check && !can_move_to(current)) continue;
        if (args.cus && !current.s["cursed"]) continue;

        let c_dist = parent.distance(character, current);

        // Tìm quái HP nhỏ nhất nhưng lớn hơn giá trị đã đặt cho nhỏ nhất
        if (args.nhonhat && current.hp < hpp && current.hp > args.nhonhat ) {
            hpp = current.hp;
            target = current;
            continue;
        }

        // Tìm quái HP lớn nhất
        if (args.lonnhat && current.hp > hpp) {
            hpp = current.hp;
            target = current;
            continue;
        }

        // Nếu không lọc theo HP, chọn con gần nhất
        if (!args.nhonhat && !args.lonnhat && c_dist < min_d) {
            min_d = c_dist;
            target = current;
        }
    }

    return target;
}



/////////////////////////////////////////////////
/////////////////////////////////////////////////


//l: "l"  == L lock
let isEquipping = false; // Flag kiểm soát trạng thái

async function equipBatch(data) {
    if (isEquipping) {
     //  game_log("equipBatch is already running. Skipping.");
        return;
    }
    isEquipping = true; // Đánh dấu đang chạy

    if (!Array.isArray(data)) {
        game_log("Can't equipBatch non-array");
        isEquipping = false;
        return handleEquipBatchError("Invalid input: not an array");
    }
    if (data.length > 15) {
        game_log("Can't equipBatch more than 15 items");
        isEquipping = false;
        return handleEquipBatchError("Too many items");
    }

    let validItems = [];

    for (let i = 0; i < data.length; i++) {
        let itemName = data[i].itemName;
        let slot = data[i].slot;
        let level = data[i].level;
        let l = data[i].l;

        if (!itemName) {
            game_log("Item name not provided. Skipping.");
            continue;
        }

        let found = false;
        if (parent.character.slots[slot]) {
            let slotItem = parent.character.items[parent.character.slots[slot]];
            if (slotItem && slotItem.name === itemName && slotItem.level === level && slotItem.l === l) {
                found = true;
            }
        }

        if (found) {
            game_log(`Item ${itemName} is already equipped in ${slot} slot. Skipping.`);
            continue;
        }

        for (let j = 0; j < parent.character.items.length; j++) {
            const item = parent.character.items[j];
            if (item && item.name === itemName && item.level === level && item.l === l) {
                validItems.push({ num: j, slot: slot });
                break;
            }
        }
    }

    if (validItems.length === 0) {
        isEquipping = false;
        return; // Không có vật phẩm hợp lệ
    }

    try {
        parent.socket.emit("equip_batch", validItems);
        await parent.push_deferred("equip_batch");
    } catch (error) {
        console.error("Error in equipBatch:", error);
        handleEquipBatchError("Failed to equip items");
    }

    isEquipping = false; // Reset flag khi hoàn tất
}





const equipmentSets = {

    deff: [
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "tigerstone", slot: "orb", level: 3},	
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
     //   { itemName: "supermittens", slot: "gloves", level: 8 },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },

		

    ],
	
    deffbrun: [
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "orba", slot: "orb", level: 3, l: "l"},	    
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
		
    ],

    nodeffbrun: [
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },		
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },	    
		        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },

		
    ],
	
    nodeff: [
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },	    
      //  { itemName: "helmet1", slot: "helmet", level: 9, l: "l" },
		        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
      //  { itemName: "intbelt", slot: "belt", level: 4, l: "l" },
		        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },

        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },

    ],
    gold: [
        { itemName: "handofmidas", slot: "gloves", level: 8 },  
        { itemName: "horsecapeg", slot: "cape", level: 9, l: "l" },  

		
    ],
    luck: [ //quái đang mạnh quá sức nên giảm luck
	    { itemName: "mshield", slot: "offhand", level: 8, l: "l" },
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
        { itemName: "rabbitsfoot", slot: "orb", level: 3, l: "l" },
        { itemName: "ringofluck", slot: "ring1", level: 0, l: "l"  },
        { itemName: "mearring", slot: "earring2", level: 0, l: "l"  },
        { itemName: "mearring", slot: "earring1", level: 0, l: "s"  },

		
    ],

    luckfull: [ 
	    { itemName: "mshield", slot: "offhand", level: 8, l: "l" },
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
        { itemName: "rabbitsfoot", slot: "orb", level: 3, l: "l" },
        { itemName: "ringofluck", slot: "ring1", level: 0, l: "l"  },
        { itemName: "mearring", slot: "earring2", level: 0, l: "l"  },
        { itemName: "mearring", slot: "earring1", level: 0, l: "s"  },
		
	   // { itemName: "lmace", slot: "mainhand", level: 9, l: "l" },
        { itemName: "spookyamulet", slot: "amulet", level: 2, l: "l"},
        { itemName: "intbelt", slot: "belt", level: 1, l: "l" },
        { itemName: "mittens", slot: "gloves", level: 5, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 5, l: "l"  },
       // { itemName: "oxhelmet", slot: "helmet", l: "l" },


		
    ],
	
    healmax: [
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
        { itemName: "exoarm", slot: "offhand", level: 2, l: "l" },
       // { itemName: "intbelt", slot: "belt", level: 4, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },

     //   { itemName: "supermittens", slot: "gloves", level: 8 },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },
		
    ],
    fram: [
		{ itemName: "lmace", slot: "mainhand", level: 9, l: "l" },
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
      //  { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
        { itemName: "exoarm", slot: "offhand", level: 2, l: "l" },
		
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },

        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "tigerstone", slot: "orb", level: 3},	
		
        { itemName: "supermittens", slot: "gloves", level: 8 },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },

        { itemName: "cring", slot: "ring1", level: 4, l: "l"  },
        { itemName: "zapper", slot: "ring2", level: 0, l: "l"  },
		
    ],

    framVIP: [
		{ itemName: "lmace", slot: "mainhand", level: 9, l: "l" },
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
      // { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
      //  { itemName: "exoarm", slot: "offhand", level: 2, l: "l" },
       { itemName: "shield", slot: "offhand", level: 8, l: "l" },

        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },

        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "tigerstone", slot: "orb", level: 3},	
		
        { itemName: "supermittens", slot: "gloves", level: 8 },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },

        { itemName: "ringsj", slot: "ring1", level: 6, l: "l"  },
        { itemName: "zapper", slot: "ring2", level: 0, l: "l"  },
		
    ],

	
    bossburn: [
        //{ itemName: "helmet1", slot: "helmet", level: 9, l: "l" },
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },

        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "orba", slot: "orb", level: 3, l: "l"},	    
        { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
    ],

    bossDOC: [
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "tigerstone", slot: "orb", level: 3},	    
        { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
		
        { itemName: "ringsj", slot: "ring1", level: 6, l: "l"  },
        { itemName: "ringsj", slot: "ring2", level: 6, l: "s"  },

		
    ],

    bossBANG: [
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "orba", slot: "orb", level: 3, l: "l"},	    
        { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
		
        { itemName: "ringsj", slot: "ring1", level: 6, l: "l"  },
        { itemName: "ringsj", slot: "ring2", level: 6, l: "s"  },

		
    ],
	
	
    creepburn: [
        //{ itemName: "helmet1", slot: "helmet", level: 9, l: "l" },
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },

        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
	    //{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "orba", slot: "orb", level: 3, l: "l"},	    
        { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
		
        { itemName: "supermittens", slot: "gloves", level: 8 },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },
        { itemName: "cring", slot: "ring1", level: 4, l: "l"  },
        { itemName: "zapper", slot: "ring2", level: 0, l: "l"  },

		
    ],
    vatly: [
        { itemName: "exoarm", slot: "offhand", level: 2, l: "l" },
    ],
    phep: [
        { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
    ],
    orb: [
        { itemName: "orbofdex", slot: "orb", level: 5, l: "l" },
        //{ itemName: "tshirt9", slot: "chest", level: 7, l: "l" },
    ],
    nogold: [
        { itemName: "supermittens", slot: "gloves", level: 8 }, 
        { itemName: "gcape", slot: "cape", level: 8, l: "l" },  

    ],
    Unluck: [
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },

        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
	//{ itemName: "harbringer", slot: "mainhand", level: 9, l: "l" },
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
        { itemName: "tigerstone", slot: "orb", level: 3},	    
        { itemName: "exoarm", slot: "offhand", level: 2, l: "l" },
    //    { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
    //   { itemName: "shield", slot: "offhand", level: 8, l: "l" },

      //  { itemName: "intbelt", slot: "belt", level: 4, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
        { itemName: "supermittens", slot: "gloves", level: 8 },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },
		
        { itemName: "cring", slot: "ring1", level: 4, l: "l"  },
        { itemName: "zapper", slot: "ring2", level: 0, l: "l"  },
		
    ],

    UnluckVIP: [
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },

        { itemName: "t2intamulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "vattire", slot: "chest", level: 7, l: "l" },
        { itemName: "tigerstone", slot: "orb", level: 3},	    
    //    { itemName: "exoarm", slot: "offhand", level: 2, l: "l" },
     //   { itemName: "wbookhs", slot: "offhand", level: 3, l: "l" },
       { itemName: "shield", slot: "offhand", level: 8, l: "l" },

      //  { itemName: "intbelt", slot: "belt", level: 4, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 2, l: "l" },
        { itemName: "supermittens", slot: "gloves", level: 8 },
        { itemName: "cearring", slot: "earring2", level: 4, l: "s"  },
        { itemName: "cearring", slot: "earring1", level: 4, l: "l"  },
        { itemName: "wingedboots", slot: "shoes", level: 9, l: "l"  },
		
        { itemName: "ringsj", slot: "ring1", level: 6, l: "l"  },
        { itemName: "zapper", slot: "ring2", level: 0, l: "l"  },
		
    ],

	
};







function equipSet(setName) {
    const set = equipmentSets[setName];
    if (set) {
        equipBatch(set);
    } else {
        console.error(`Set "${setName}" not found.`);
    }
}



//////////////////////////////////////////////////////////////////
let lastSwitchTime = 0; // Timestamp of the last switch
const switchCooldown = 750; // Cooldown period in milliseconds (0.75 seconds)

// Function to check if the cooldown period has passed
function CD() {
    return performance.now() - lastSwitchTime > switchCooldown;
}

// Utility function to handle cooldown check and equipment switch
const weaponSet = (set) => {
    if (CD()) {
        equipSet(set);
        lastSwitchTime = performance.now();
    }
};




// Helper function to handle errors
function handleEquipBatchError(message) {
    game_log(message);
    // You may decide to implement a delay or other error handling mechanism here
    return Promise.reject({ reason: "invalid", message });
}



function ms_to_next_skill(skill) {
    const next_skill = parent.next_skill[skill]
    if (next_skill == undefined) return 0
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) + 15;
    return ms < 0 ? 0 : ms;
}



function ms_penalty_cd() {
    const ms = character?.s?.penalty_cd?.ms ?? 0;
    return ms < 0 ? 0 : ms;
}



// =========================
// CONFIG
// =========================
const TEMPORAL_RADIUS = 320;   // bán kính tính quái quanh người
const TEMPORAL_GAP = 5;        // hụt bao nhiêu quái thì dùng skill
const TEMPORAL_DELAY = 900;    // delay trước khi cast

// =========================
// STATE
// =========================
let temporalMaxMonsters = 0;
let lastMap = character.map;

// =========================
// HELPER: đếm quái quanh người
// =========================
function countNearbyMonsters(radius) {
    let count = 0;
    for (let id in parent.entities) {
        const e = parent.entities[id];
        if (
            e.type === "monster" &&
            distance(character, e) <= radius
        ) {
            count++;
        }
    }
    return count;
}

// =========================
// MAIN: temporalsurge logic
// =========================
function temporalSurgeLogic() {
    // cooldown / safety
    if (character.mp < 6000) return;
    if (is_on_cooldown("temporalsurge")) return;
    if (smart.moving) return;

    // reset khi đổi map
    if (character.map !== lastMap) {
        temporalMaxMonsters = 0;
        lastMap = character.map;
        return;
    }

    const currentCount = countNearbyMonsters(TEMPORAL_RADIUS);

    // cập nhật max
    if (currentCount > temporalMaxMonsters) {
        temporalMaxMonsters = currentCount;
        return; // vừa cập nhật max thì chưa cần dùng skill
    }

    // điều kiện dùng skill
    if (currentCount < temporalMaxMonsters - TEMPORAL_GAP && character.mp > 1300) {
        const orbSlot = character.items.findIndex(i => i && i.name === "orboftemporal");
        if (orbSlot === -1) return;

        setTimeout(() => {
            if (is_on_cooldown("temporalsurge")) return;

            equip(orbSlot);
            use_skill("temporalsurge");
            equip(orbSlot);
        }, TEMPORAL_DELAY);
    }
}

// =========================
// LOOP
// =========================
setInterval(temporalSurgeLogic, 1200);






function scare() {
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);
    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;

    for (id in parent.entities) {
        var current = parent.entities[id];
        if ((character.hp < 4700 || (smart.moving && character.map != "crypt") ) && current.target == character.name) {
            mobnum++;
            targetedForMoreThanOneSecond = true;
        }
    }

    if (mobnum > 0 && targetedForMoreThanOneSecond) {
        if (!is_on_cooldown("scare")) {
            setTimeout(() => {
                if (!is_on_cooldown("scare")) {
                    equip(slot);
                    use("scare");
                    equip(slot);
                }
            }, 200); // 1000 milliseconds = 1 second
        }
    }
}
setInterval(scare, 1000);  // Gọi lại scare() sau mỗi 1.5 giây




let eTime = 0;
let checkdef = 0;
let checkheall = 0;
let checkluckk = 0;
const blacklistluck = ["nerfedmummy", "nerfedbat",]; // mảng cần loại

function ChuyendoiITEM() {

    const leader = get_player("haiz");
    const damer = getOtherPartyMember();
    const currentTime = performance.now();
    const penalty = ms_penalty_cd();

    if (currentTime - eTime < 120) return;

    const RANGE = 200;
    const RANGE_SQ = RANGE * RANGE;

    const cx = character.x;
    const cy = character.y;

    let MageX = false;
    let hasLowHp = false;
    let hasPhysical = false;
    let hasMagical = false;

    // 👉 cache type
    let nearTypes = new Set();
	

    for (const id in parent.entities) {
        const e = parent.entities[id];
        if (!e.visible || e.dead || e.type !== "monster" || blacklistluck.includes(e.mtype) ) continue;

        const dx = cx - e.x;
        const dy = cy - e.y;
        if (dx*dx + dy*dy > RANGE_SQ) continue;

        nearTypes.add(e.mtype); // 👉 lưu type

        const isTargetingMe = (e.target === character.name);
        const isCoop = e.cooperative;

        if (!isTargetingMe && !isCoop) continue;

        if (isTargetingMe) {
            if (e.damage_type === "physical") hasPhysical = true;
            if (e.damage_type === "magical")  hasMagical = true;
            if (e.mtype === "xmagex") MageX = true;
        }

        if (!hasLowHp) {
            if (isCoop) {
                if (e.hp < 150000) hasLowHp = true;
            } else if (isTargetingMe) {
                let threshold = 9000;
                if (e.max_hp >= 800000) threshold = 38000;
                else if (e.max_hp >= 200000) threshold = 25000;
				if (character.map == "uhills") threshold = 9300; // dùng riêng cho quái tagetron
				if (character.map == "winter_instance") threshold = 15000; // dùng riêng cho quái xmagex

                if (e.hp < threshold) hasLowHp = true;
            }
        }

        if (hasLowHp && hasPhysical && hasMagical) break;
    }

    // 👉 helper check nhanh
    const has = (type) => nearTypes.has(type);

    // ================= LOGIC =================

    if (smart.moving && !has("bscorpion")) {
        eTime = currentTime;
        equipSet('nogold');
        return;
    }

    if (has("xmagefi") && !hasLowHp) {
        eTime = currentTime;
        equipSet('bossburn');
        return;
    }

    if (has("xmagefz") && !hasLowHp) {
        eTime = currentTime;
        equipSet('bossBANG');
        return;
    }
	
    if ((has("xmagen") || has("xmagex")) && !hasLowHp) {
        eTime = currentTime;
        equipSet('bossDOC');
        return;
    }

    if (has("fireroamer") && !hasLowHp && goldcheck == 0) {
        eTime = currentTime;
        equipSet('creepburn');
        return;
    }

    if (has(crepp) && !hasLowHp && goldcheck == 0 && character.hp/character.max_hp > 0.97) {
        eTime = currentTime;
		   	if (character.map == "uhills") equipSet('framVIP'); 
            else equipSet('fram'); 
        return;
    }

    // ===== phần dưới giữ nguyên logic =====

    if ((character.max_hp < 10000 && character.hp/character.max_hp < 0.9 && !hasLowHp) || 
        (character.max_hp < 10000 && character.hp/character.max_hp < 0.75)) {
        eTime = currentTime;
        equipSet('fram');
        return;
    }

    if (checkdef == 0 && character.hp/character.max_hp < 0.55) {
        checkdef = 1;
        eTime = currentTime;

        if (has("fireroamer") && crepp == "fireroamer") {
            equipSet('deffbrun');
        } else {
            equipSet('deff');
        }
        return;
    }

    if (checkdef == 1 && character.hp/character.max_hp > 0.78) {
        eTime = currentTime;

        if (has("fireroamer") && crepp == "fireroamer") {
            equipSet('nodeffbrun');
        } else {
            equipSet('nodeff');
        }

        checkdef = 0;
        return;
    }

    if (checkheall == 0 && character.hp/character.max_hp > 0.65 && 1 > 2 &&
        ((leader && leader.hp < 10000) || (damer && damer.hp/damer.max_hp < 0.4))) {
    // tạm ngưng logic này
        checkheall = 1;
        eTime = currentTime;
        equipSet('healmax');
        return;
    }

    if (checkheall == 1 && ((leader && leader.hp > 14000) && (damer && damer.hp/damer.max_hp > 0.7))) {
        eTime = currentTime;
        equipSet('fram');
        checkheall = 0;
        return;
    }

    if (!hasLowHp && checkluckk > 0 && goldcheck == 0) {
        eTime = currentTime;
		   	if (character.map == "uhills") equipSet('UnluckVIP'); 
            else equipSet('Unluck'); 
		
        checkluckk -= 1;
        return;
    }

    if (hasLowHp && (character.map != "winter_instance" || MageX) &&
        character.hp/character.max_hp > 0.45 && checkdef == 0 &&
        character.mp > 1500 && character.slots.orb?.name != "rabbitsfoot") {

        eTime = currentTime;

        let slot = locate_item("luckbooster");
        if (slot == -1) shift(0, 'luckbooster');

        if (character.hp/character.max_hp < 0.52 || penalty > 1000 || character.mp < 2500) {
            equipSet('luck');
        } else {
            equipSet('luckfull');
        }

        checkluckk = 3;
        return;
    }

    if (checkluckk <= 0 && checkheall == 0 && checkdef == 0 && character.map != "uhills" ) {
        eTime = currentTime;

		if (hasMagical || character.map == "winter_instance" ) {
            equipSet('phep');
        } else if (hasPhysical && character.hp/character.max_hp < 0.68) {
            equipSet('vatly');
        }
    }
}

setInterval(ChuyendoiITEM, 100);



let lastElixirSwap = 0;
const ELIXIR_SWAP_DELAY = 30000; // 30 giây

function elixirUsage() {
    try {
        const now = Date.now();
        const currentElixir = character.slots.elixir?.name;

        const hasXmagefi = get_nearest_monster({ type: "xmagefi" });
        const hasXmagen = get_nearest_monster({ type: "xmagen" });
        const hasFireroamer = get_nearest_monster({ type: "fireroamer" });

        let targetElixir = null;

        // =============================
        // ƯU TIÊN THEO THỨ TỰ
        // =============================

        // 1️⃣ xmagefi → elixirfires
        if (hasXmagefi) {
            targetElixir = "elixirfires";
        }

        // 2️⃣ xmagen + HP < 8000 → elixirpnres
        else if (hasXmagen && character.hp < 8000) {
            targetElixir = "elixirpnres";
        }

        // 3️⃣ winter_instance → hotchocolate
        else if (character.map === "winter_instance" || character.map == "uhills" ) {
            targetElixir = "hotchocolate";
        }

        // 4️⃣ HP thấp + fireroamer → elixirfires
        else if (character.hp < 8000 && hasFireroamer) {
            targetElixir = "elixirfires";
        }

        // 5️⃣ Default → chỉ dùng luck nếu KHÔNG phải elixirfires
        else if (currentElixir !== "elixirfires") {
            targetElixir = "elixirluck";
        }

        // =============================
        // ĐỔI ELIXIR (có cooldown)
        // =============================

        if (
            targetElixir &&
            currentElixir !== targetElixir &&
            now - lastElixirSwap >= ELIXIR_SWAP_DELAY
        ) {
            const itemSlot = locate_item(targetElixir);
            if (itemSlot != null) {
                use(itemSlot);
                lastElixirSwap = now;
            }
        }

    } catch (e) {
        console.error("Error in elixirUsage:", e);
    }
}

setInterval(elixirUsage, 2000);









// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
