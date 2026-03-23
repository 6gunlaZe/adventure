let lastSwapTime = 0;
const swapCooldown = 500;

/*************** CONFIG ***************/
const HOME_SERVER = { region: "EU", id: "I" };
const RUN_SERVER = { region: "ASIA", id: "I" };

const SERVER_RULES = [
    { region: "EU",   id: "I",   weight: 3 },
    { region: "US",   id: "I",   weight: 2 },
    { region: "ASIA", id: "I",   weight: 1 },
    { region: "US",   id: "II",  weight: 2 },
    { region: "US",   id: "III", weight: 2 },
    { region: "EU",   id: "II",  weight: 3 }
];

// SERVER → PARTY MAP
///////////////////////

const SERVER_PARTY_MAP = [
    { region: "EU",   id: "I",   f1: "Ynhi",   f2: "nhiY" },
 //   { region: "US",   id: "I",   f1: "Ynhi",       f2: "nhiY" },
    { region: "ASIA", id: "I",   f1: "Ynhi", f2: "LyThanhThu" },
 //   { region: "US",   id: "II",  f1: "6gunlaZe",   f2: "Ynhi" },
 //   { region: "US",   id: "III", f1: "nhiY",       f2: "LyThanhThu" },
 //   { region: "EU",   id: "II",  f1: "tienV",      f2: "Ynhi" }
];


 if (character.rip) { ///////auto hoi sinh KHI KHỞI ĐỘNG
    respawn();
  }


let lastUpdateTime = performance.now();
setTimeout(startLuckTimer, 1000);
const locations = {
    bat: [{ x: 1200, y: -782 }],
    bigbird: [{ x: 1343, y: 248 }],
    bscorpion: [
  { type: "farm", x: -427, y: -1235, map: "desertland" },
  { type: "safe", x: -635, y: -1312, map: "desertland" }
    ],	
    cgoo: [{ x: -221, y: -274 }],
    crab: [{ x: -11840, y: -37 }],
    ent: [{ x: -420, y: -1960 }],
    fireroamer: [
  { type: "farm", x: 256, y: -888, map: "desertland" },
  { type: "safe", x: -30, y: -800, map: "desertland" }
    ],	
    fireroamer111111: [
  { type: "farm", x: 256, y: -945, map: "desertland" },
  { type: "safe", x: 470, y: -960, map: "desertland" }
    ],	
    ghost: [
  { type: "farm", x: -400, y: -1650 , map: "halloween" },
  { type: "safe", x: -284, y: -1528 , map: "halloween" }
    ],
    boar: [
  { type: "farm", x: -17, y: -1108, map: "winterland" },
  { type: "safe", x: 6, y: -855, map: "winterland" }
    ],
    gscorpion: [{ x: 390, y: -1422 }],
    iceroamer: [{ x: 823, y: -45 }],
    mechagnome: [
  { type: "farm", x: 0, y: 0 },
  { type: "safe", x: -152, y: 2 }
    ],
    mole: [{ x: 4, y: -282 }],  //-282
    booboo: [
  { type: "farm", x: 350, y: -675 },
  { type: "safe", x: 158, y: -660 }
    ],
    oneeye: [{ x: -270, y: 160 }],
    pinkgoblin: [{ x: 366, y: 377 }],
    poisio: [{ x: -121, y: 1360 }],
    pppompom: [{ x: 292, y: -189 }],
    plantoid: [
  { type: "farm", x: -800, y: -366, map: "desertland" },
  { type: "safe", x: -600, y: -180, map: "desertland" }
    ],	
    rat: [{ x: 6, y: 430 }],
    scorpion: [{ x: -495, y: 685 }],
    stoneworm: [{ x: 830, y: 7 }],
    spider: [
  { type: "farm", x: 1290, y: -80, map: "main" },
  { type: "safe", x: 1290, y: -90, map: "main" }
    ],
    squig: [{ x: -1175, y: 422 }],
    wolf: [
  { type: "farm", x: 400, y: -2730, map: "winterland" },
  { type: "safe", x: 400, y: -2450, map: "winterland" }
    ],
    wolfie: [
  { type: "farm", x: 62, y: -1974, map: "winterland" },
  { type: "safe", x: -2, y: -1799, map: "winterland" }
    ],
    xscorpion: [{ x: -495, y: 685 }],
    odino: [
  { type: "farm", x: -20, y: 675, map: "mforest" },
  { type: "safe", x: -240, y: 700, map: "mforest" }
    ],
    dryad: [
  { type: "farm", x: 406, y: -351, map: "mforest" },
  { type: "safe", x: 252, y: -220, map: "mforest" }
    ],
    pppompom: [
  { type: "farm", x: 200, y: -166, map: "level2n" },
  { type: "safe", x: 46, y: -127, map: "level2n" }
    ],
    ent: [
  { type: "farm", x: -39, y: -1953, map: "desertland" },
  { type: "safe", x: -66, y: -1862, map: "desertland" }
    ],	
    bbpompom: [
  { type: "farm", x: -80, y: -954, map: "winter_cave" },
  { type: "safe", x: 60, y: -843, map: "winter_cave" }
    ],
    prat: [
  { type: "farm", x: 0, y: 105, map: "level1" },
  { type: "safe", x: 164, y: 96, map: "level1" }
    ],
	
	
};

const home = 'prat';
const farmLocation = locations[home].find(p => p.type === "farm");
const mobMap = farmLocation?.map || "main"; // fallback nếu không có

const destination = {
    map: mobMap,
    x: locations[home][0].x,
    y: locations[home][0].y
};

const safeSpot = locations[home].find(p => p.type === "safe");
const safeDestination = {
    map: mobMap,
    x: safeSpot?.x ?? 0,
    y: safeSpot?.y ?? 0
};

let angle = 0;
const speed = 3; // normal 2 or .65
let events = false;

const f1111 = 'Ynhi';  ///tank fram haiz check f1 có mới ra chỗ fram tienV
const f2222 = '6gunlaZe';   // LyThanhThu  6gunlaZe



const harpyRespawnTime = 410000; //400 seconds
let harpyActive = false;
const skeletorRespawnTime = 1151954; // Example time, adjust as needed
let skeletorActive = false;
const stompyRespawnTime = 400000; //400 seconds
let stompyActive = false;
const mvampireRespawnTime = 1151954; // Example time, adjust as needed
let mvampireActive = false;
const fvampireRespawnTime = 1151954; // Example time, adjust as needed
let fvampireActive = false;

const boundaryOur = Object.values(G.maps[mobMap].monsters).find(e => e.type === home).boundary;
const [topLeftX, topLeftY, bottomRightX, bottomRightY] = boundaryOur;
const centerX = (topLeftX + bottomRightX) / 2;
const centerY = (topLeftY + bottomRightY) / 2;

let bossvip = 0
let bosscantank = 0
let prolive = 0
let framhaiz = 0
let gobaltaget = null;
let Now_is_gobalevenrun = false

///check 1 lần đầu tiên khi mở - sợ bị dissconnet khi đang đánh boss
	 var kiltargetfk= get_nearest_monster({type: "franky"});
if(kiltargetfk && get_nearest_playerV_noMyparty(kiltargetfk) > 2 && character.hp > 10000){
	bosscantank = 1
        events = true
}

let framtay = 0
async function eventer() {
    const delay = 350;
    let tank = get_player("Ynhi");

    try {
    if (events) {
            handleEvents();
		framtay = 0
	} else if (framtay > 0) {

		
const curMap = character.map;
const hasFieldGen = locate_item("fieldgen0") !== -1;

const keyData = [
    { name: "tomb", count: count_item("tombkey"), action: framTOMBgame, map: "tomb" },
    { name: "spider", count: count_item("spiderkey"), action: spidergame, map: "spider_instance" },
    { 
        name: "frozen", 
        count: hasFieldGen ? count_item("frozenkey") : 0,  // tạm ngưng xmagex
        action: framXmage, 
        map: "winter_instance" 
    }
];

// 1. Tìm xem map hiện tại có nằm trong danh sách farm không
const currentJob = keyData.find(k => k.map === curMap);

if (currentJob) {
    // ƯU TIÊN HÀNG ĐẦU: Nếu đang ở map đó, cứ thực hiện action của map đó
    // (Bất kể count > 0 hay count == 0 theo yêu cầu của bạn)
    currentJob.action();
} else {
    // 2. Nếu map hiện tại không trùng key nào, tìm key có số lượng nhiều nhất
    const topKey = [...keyData].sort((a, b) => b.count - a.count)[0];

    if (topKey && topKey.count > 0) {
        topKey.action();
    } else {
        // 3. Nếu không còn key nào cả
        framtay = 0;
    }
}

		

	} else if (bossvip > 0) {
            VIPBosses();
	} else if (framboss > 0) {

    } else {

          const h = new Date().getHours();
        if (
            (
              (h >= 6 && h < 11) || (h >= 13 && h < 23)
            ) && character.esize > 3 &&
            (
                 count_item("tombkey") > 0 || count_item("spiderkey") > 0 || (count_item("frozenkey") > 0 &&  locate_item("fieldgen0") !== -1 )
            )
        ) {
             framtay = 1;
        }
		else
		{
		handleHome();
			callnguoi = 0;
		}
    }
	    
	    
    } catch (e) {
        console.error(e);
    }

    setTimeout(eventer, delay);
}

setTimeout(() => {
    eventer();
}, 10000); // 10000ms = chạy sau 10 giây khởi động


setInterval(() => {
    parent.socket.emit("send_updates", {});
    game_log("🔁 Force refresh", "#AAAAFF");
}, 60000); // mỗi 60 giây




async function checkGameEvents() {
    let checkeven = 0;
    let pro = 0;
    const events1 = [
       // { eventType: 'snowman', type: 'withJoin' },
	//    { eventType: 'wabbit', type: 'withJoin' },
        { eventType: 'dragold', type: 'withJoin' },
		
        { eventType: 'goobrawl', type: 'specific' },
        { eventType: 'crabxx', type: 'pro' },
        { eventType: 'franky', type: 'pro' },
        { eventType: 'icegolem', type: 'pro' },
    ];

    for (let event of events1) {
        let isEventValid = false;
        let procheck = false;
        if (event.type === 'specific') {
		if (server.region == HOME_SERVER.region && server.id == HOME_SERVER.id )isEventValid = !!parent?.S?.[event.eventType];
        } else if (event.type === 'withJoin') {
		isEventValid = !!parent?.S?.[event.eventType]?.live;  
        } else if (event.type === 'pro') {
            procheck = !!parent?.S?.[event.eventType];
        }
        if (procheck) pro += 1;
        if (isEventValid) {
            console.log(`Event ${event.eventType} đã có event.`);
            checkeven += 1;
        } else {
            console.log(`Event ${event.eventType} không có event.`);
        }
    }

   if (check_ice == 1)bosscantank = 1;
	
    if (checkeven > 0) {
        events = true;
    } else {
		if (bosscantank == 0)events = false;
    }

    if (pro > 0) {
        prolive = 1;
	ICEcheckHPMYSv(["icegolem"] , 15000000)  // ĐỂ MÁU LÀ 15M TRÁNH TỰ ĐÁNH 1 MÌNH

    } else {
        prolive = 0; // khi boss đã chết
        if (pro == 0 && checkeven == 0) {
            if (events) {
                 await use_skill('town');// Chờ skill town thực hiện xong
                send_cm("nhiY", "back");

                if (character.map == "winterland" && distance(character, { x: 800, y: 400 }) < 250) {
                } else {
                    events = false;
                    stop_character("Ynhi");
                    stop_character("nhiY");
                bosscantank = 0;
                check_ice = 0;
                framboss = 0
			
                }
            }
        }
    }

    if (pro > 0 && bosscantank == 1) events = true;
	
if (events)
{
	game_log("Đang có even")
}
else
{
		game_log("Không có even")
}
	//  game_log("Chỉ số framboss = "+framboss)
	//   game_log("Chỉ số bosscantank = "+bosscantank)
	game_log("Chỉ số checkeven = "+checkeven)
	//   game_log("Chỉ số pro = "+pro)

	
}

// 5s
setTimeout(() => {
    checkGameEvents();
}, 5000);

// 7s
setTimeout(() => {
    checkGameEvents();
}, 7000);

// 9s
setTimeout(() => {
    checkGameEvents();
}, 9000);

// Sau đó 10s/lần như cũ
setTimeout(() => {
    setInterval(checkGameEvents, 10000);
}, 9000);






function handleEvents() {
    if (parent?.S?.holidayseason && !character?.s?.holidayspirit) {
        if (!smart.moving) {
            smart_move({ to: "town" }, () => {
                parent.socket.emit("interaction", { type: "newyear_tree" });
            });
        }
    } else {
	    Now_is_gobalevenrun = false ///check xem đang có even nào thì thực thi 1 even thôi
        // Handle standard events
        handleSpecificEvent('dragold', 'cave', 1190, -810, 130000, 900);
        //handleSpecificEvent('snowman', 'winterland', 1190, -900, 50);
	    if(Now_is_gobalevenrun)return
		
        handleSpecificEventWithJoin('goobrawl', 'goobrawl', 0, 0, 15000);
	    if(Now_is_gobalevenrun)return
	   handlebossPro('crabxx', 'main', -976, 1785, 10000, "Ynhi","6gunlaZe")
	     if(Now_is_gobalevenrun)return
	   handlebossPro('franky', 'level2w', 14, 30, 100000, "Ynhi","LyThanhThu")
	    if(Now_is_gobalevenrun)return
	    handlebossPro('icegolem', 'winterland', 820, 420, 70000, "nhiY","Ynhi")


		
    }
}


	/*
    if(  parent?.S?.wabbit.live && !character?.s?.easterluck  ) {
        let wabbit = parent.S.wabbit;
        if(wabbit && wabbit.live && !smart.moving && !get_nearest_monster({ type: "wabbit" }) ) {
            smart_move({ x: wabbit.x, y: wabbit.y, map: wabbit.map }).then(() => {
                let target_monster = get_nearest_monster({ type : "wabbit" });
                if (target_monster) {
                    change_target(target_monster);
                }
            });
        }
	    return
    }
*/


let startPartyCheckAt = Date.now() + 100000; // mốc 100s sau khi chạy

async function handleHome() {


    if (parent?.S?.holidayseason && !character?.s?.holidayspirit) {
        if (!smart.moving) {
            smart_move({ to: "town" }, () => {
                parent.socket.emit("interaction", { type: "newyear_tree" });
            });
        }
	}

    if (Date.now() >= startPartyCheckAt) { //để đảm bảo các logic check quái khác lúc đầu hoạt động bình thường
    autoPartyCheck(f1111, f2222, 50000);
    }
	
    if (smart.moving) return;
    const tank = get_player(f1111);

    // 🩸 Nếu máu thấp thì disconnect
    if (character.hp < 4000 && !character.rip) {
        parent.api_call("disconnect_character", { name: "haiz" });
        return;
    }

    // 🛡 Nếu không có tank, tank chết, hoặc tank quá xa → về điểm an toàn
    if (!tank || tank.rip || distance(character, tank) > 300) {
        try {
            await smart_move(safeDestination);
        } catch (error) {
            console.log("Không thể đi tới safeDestination, dùng town.");
            await use_skill("town");
        }
        return;
    }

    // 🧭 Nếu chưa đến đúng điểm farm → di chuyển tới
    if (
        character.map !== mobMap ||
        distance(character, { x: locations[home][0].x, y: locations[home][0].y }) > 50
    ) {
        try {
            await smart_move(destination);
        } catch (error) {
            console.log("Không thể đi tới destination, dùng town.");
            await use_skill("town");
        }
        return;
    }

    // 🔄 Khi đã ở đúng vị trí → quay vòng quanh trung tâm
        let center = locations[home][0];
	const radius = 8;  //40

        const currentTime = performance.now();
        const deltaTime = currentTime - lastUpdateTime;
        lastUpdateTime = currentTime;

        const deltaAngle = speed * (deltaTime / 1000); // Convert milliseconds to seconds
        angle = (angle + deltaAngle) % (2 * Math.PI);

        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const targetX = center.x + offsetX;
        const targetY = center.y + offsetY;

        if (!character.moving && lastUpdateTime > 100) {
            await xmove(targetX, targetY);
        }
    
}




async function safeawwait() {
		    let tank = get_player("Ynhi");
//if(  parent?.S?.wabbit.live && !character?.s?.easterluck  )return
if (character.hp < 4000 && !character.rip) parent.api_call("disconnect_character", {name: "haiz"});
	
if (!tank || tank.rip || (tank && !tank.rip && distance(character, tank) > 70) ){
    if (!smart.moving) {
smart_move(safeDestination);
    }
}
else
{
if( character.map != mobMap  || (  character.map == mobMap && !smart.moving  && distance(character, {x: locations[home][0].x, y: locations[home][0].y}) > 70  ))smart_move(destination)	



    if (!smart.moving) {
        let center = locations[home][0];
        const radius = 24;

        // Calculate time elapsed since the last update
        const currentTime = performance.now();
        const deltaTime = currentTime - lastUpdateTime;
        lastUpdateTime = currentTime;

        // Calculate the new angle based on elapsed time and speed
        const deltaAngle = speed * (deltaTime / 1000); // Convert milliseconds to seconds
        angle = (angle + deltaAngle) % (2 * Math.PI);

        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const targetX = center.x + offsetX;
        const targetY = center.y + offsetY;

        if (!character.moving && lastUpdateTime > 100) {
            await xmove(targetX, targetY);
        }
    }



	
}
	
}



/// bộ đếm số 
let count = 0;
setInterval(() => {
    count++;
    game_log(" [" + count + "]");
}, 10000);






function checkPVPandARENA() {

if (character.map != "arena")return
const friend = ["MuaBan", "haiz" , "haiz1" , "Ynhi", "nhiY", "6gunlaZe","tienV","LyThanhThu"];
const PVPInRange = Object.values(parent.entities)    //trả về các đối tượng kẻ thù
    .filter(entity => 
	 entity.player  &&   
        !friend.includes(entity.name) &&       //không phải bạn bè thì chọn đối tượng đó
        entity.visible &&                      // Kiểm tra nếu thực thể đang hiển thị
        distance(character, entity) <= 500     // Nếu không phải vbat, kiểm tra khoảng cách <= 400
 
    );

	
if(PVPInRange.length >= 1)
{

let region = server.region;
let serverIden = server.id
if ( region == HOME_SERVER.region && serverIden == HOME_SERVER.id ) 
{
change_server(RUN_SERVER.region, RUN_SERVER.id);	
}
	else
	{
         change_server(HOME_SERVER.region, HOME_SERVER.id);
	}	
}


	
    // Đây là công việc bạn muốn thực hiện mỗi 1 giây
    console.log("Vòng lặp chạy mỗi giây...");
}

// Thiết lập vòng lặp mỗi 1 giây (1000ms)
setInterval(checkPVPandARENA, 1000); // 1000ms = 1 giây


let unluckTimer = null;

function startLuckTimer() {
    if (unluckTimer) return;   // đã chạy rồi thì thôi

    equipSet('luck');
    unluckTimer = setTimeout(waitAndUnluck, 5000);
}

function waitAndUnluck() {
    if (character.cc < 100) {
        equipSet('UNluck');
        unluckTimer = null;    // kết thúc vòng
    } else {
        unluckTimer = setTimeout(waitAndUnluck, 5000);
    }
}





// 🔧 Hàm đổi độ sang radian
function degToRad(deg) {
    return deg * Math.PI / 180;
}

// 🔁 Biến hướng quay quanh (1 = thuận, -1 = ngược kim đồng hồ)
let checkwwall = 1;

// ⚙️ Các góc thử thêm nếu hướng chính bị chặn
const extraAngles = [20, 35, 70].map(degToRad);

// 🚀 Số lần thử bán kính khác nhau nếu bị kẹt
const maxAttempts = 5;

/**
 * 🎯 Di chuyển vòng quanh một vị trí theo vòng tròn — dùng để thả diều quanh fieldgen0
 * @param {Object} fieldgen_pos - Tọa độ của fieldgen0, ví dụ: { x: 400, y: 200 }
 * @param {number} radius - Bán kính vòng tròn, mặc định là 60
 */
function kite_around_fieldgen(fieldgen_pos, radius = 60) {
    if (!fieldgen_pos || smart.moving) return;

    const angleToCharacter = Math.atan2(character.y - fieldgen_pos.y, character.x - fieldgen_pos.x);

    // Tính góc mới để quay quanh theo hướng đang đi
    const offsetAngle = degToRad(45) * checkwwall;
    const targetAngle = angleToCharacter + offsetAngle;

    // Thử các vị trí quanh vòng tròn bán kính tăng dần
    for (let i = 0; i < maxAttempts; i++) {
        const tryRadius = radius + i * 5;
        const goal = {
            x: fieldgen_pos.x + tryRadius * Math.cos(targetAngle),
            y: fieldgen_pos.y + tryRadius * Math.sin(targetAngle)
        };

        if (can_move_to(goal.x, goal.y)) {
            move(goal.x, goal.y);
            return;
        }

        // Nếu bị chặn, thử các góc lệch ±20°, ±35°, ±70°
        for (let angleOffset of extraAngles) {
            for (let dir of [1, -1]) {
                const tryAngle = targetAngle + angleOffset * dir;
                const altGoal = {
                    x: fieldgen_pos.x + tryRadius * Math.cos(tryAngle),
                    y: fieldgen_pos.y + tryRadius * Math.sin(tryAngle)
                };

                if (can_move_to(altGoal.x, altGoal.y)) {
                    checkwwall *= -1; // Đổi chiều quay nếu cần
                    move(altGoal.x, altGoal.y);
                    return;
                }
            }
        }
    }
}



function count_item(itemName) {
    let count = 0;
    for (let i = 0; i < character.items.length; i++) {
        let item = character.items[i];
        if (item && item.name === itemName) {
            count += (item.q || 1); // item.q là số lượng (quantity) nếu item có cộng dồn
        }
    }
    return count;
}





const XmagelayerFire = 'nhiY';
const Xmagelayer = '6gunlaZe';
let startTimeX = null;
let boss_wait_start = null; // Biến lưu thời gian bắt đầu chờ boss// chống mấy dấu khi boss bay


function framXmage() {

    // Check các loại Boss hiện diện
    let boss_fz = get_nearest_monster({ type: "xmagefz" }); // Stage 1
    let boss_fi = get_nearest_monster({ type: "xmagefi" }); // Stage 2
    let boss_fn = get_nearest_monster({ type: "xmagen" }); // Stage 3
    let boss_x = get_nearest_monster({ type: "xmagex" });   // Stage 4

let member1_name = boss_fi ? XmagelayerFire : Xmagelayer;
let member1 = get_player(member1_name);
    let member2 = get_player("Ynhi");

// Nếu nhân vật phụ có trong party mà không thấy trên màn hình, hoặc nó đang ở nhà (map main)
if(parent.party_list.includes(Xmagelayer) && (!member1  || character.map != "winter_instance" || get_nearest_monster({ type: home }) ) ){
	send_cm(Xmagelayer,"mage")	
}
	
	

    
    let current_boss = boss_fz || boss_fi || boss_fn || boss_x;
   // Chế độ cho thêm pháp sư  
    if (boss_fi)autoPartyCheck("Ynhi", XmagelayerFire, 50000);
    else autoPartyCheck("Ynhi", Xmagelayer, 50000);
    //autoPartyCheck("Ynhi", Xmagelayer, 60000);

    // --- LOGIC TIMEOUT 10 PHÚT (Bỏ qua nếu là Stage 2) ---
    if ((!member1 || !member2) && !boss_fi && startTimeX === null) {
        startTimeX = Date.now();
    }
    if ((member1 && member2) || boss_fi) {
        startTimeX = null; 
    }
    if (startTimeX !== null && Date.now() - startTimeX >= 10 * 60 * 1000) {
        stop_character("Ynhi"); stop_character(Xmagelayer);
        startTimeX = null;
        smart_move({ map: "winterland", x: 1049, y: -2002 });
        return;
    }

    // --- CHIẾN THUẬT GỬI LỆNH vòng 1---
    if (boss_fz && Date.now() - last_sent_cm > 14000 && !get_player("MuaBan") ) {
       send_cm("MuaBan", {
            command: "assist_xmage",
            instance_key: character.in  // Gửi cái mã nhiều ký tự này đi
        });
        last_sent_cm = Date.now();
    }

    // --- CHIẾN THUẬT GỬI LỆNH vòng 2--- //tạm ngưng do ynhi chưa đủ đồ, cần thêm orb, và thuốc lửa
    if (boss_fi && Date.now() - last_sent_cm > 14000 && !get_player("nhiY") ) {
       send_cm("nhiY1111", {
            command: "assist_xmage1",
            instance_key: character.in  // Gửi cái mã nhiều ký tự này đi
        });
        last_sent_cm = Date.now();
    }

	
	
    // cho dừng luôn
    if ( ((boss_fz && boss_fz.hp < 5000) || boss_fi) && member1 && member1.name == Xmagelayer && character.map === "winter_instance")
	{
		stop_character(Xmagelayer);
		stop_character("MuaBan");
	}
    if (boss_fn && member1 && member1.name == XmagelayerFire && character.map === "winter_instance")stop_character(XmagelayerFire);

	
    // --- RECHECK khi đã ở trong, thì gọi vào (Chỉ gọi khi không phải Stage 2) ---vì nhiY đã có logic vào tương tự MuaBan
    if (character.map == "winter_instance" && !boss_fi && (!member1 || !member2)) {
        if (Date.now() - last_sent_cm > 400) {
            last_sent_cm = Date.now();
            setTimeout(() => { send_cm("Ynhi", character.in); send_cm(member1_name, character.in); }, 400);  // dùng member1_name thay member1.name vì khi vào hầm ngục trước sẽ không còn member1 vì nó không có thấy.
            setTimeout(() => { send_cm("Ynhi", "goo2"); send_cm(member1_name, "goo2"); }, 800);
        }
    }

    if (smart.moving) return;

    // --- TRANG BỊ THEO QUÁI ---
    let target = get_targeted_monster();
    if (target && character.cc < 100) {

            if (character.s.burned || (target.mtype === "xmagefi" && target.target == character.name )) equipSet("def_fire");
            else if (target.damage_type === "magical" && target.attack > 3500 && target.target == character.name ) equipSet("single_Magic");
            else if (target.damage_type === "magical" && character.hp < 10000 ) equipSet("single_Magic");
            else if (target.damage_type === "magical" && boss_fn && target.target == character.name ) equipSet("single_Magic");
			else if (target.damage_type === "physical" && target.attack > 3500 && target.target == character.name)	equipSet("single_physical");
            else equipSet("single");
        
    }





	

// --- LOGIC DI CHUYỂN NGOÀI MAP ---> tới vị trí hầm ngục
    if (character.map != "winter_instance") {
        if (character.map != "winterland") {
            smart_move({ map: "winterland", x: 1049, y: -2002 });
        } else {
            let dist_to_gate = distance(character, { x: 1049, y: -2002 });
            
            if (dist_to_gate < 50) {
                // LOG KIỂM TRA ĐIỀU KIỆN VÀO CỔNG
                if (!member1 || !member2) {
                    console.log(`%c [WAIT] Thiếu người: ${member1_name}: ${member1 ? "OK" : "VẮNG"} | Ynhi: ${member2 ? "OK" : "VẮNG"}`, "color: orange");
                } else {
                    let d1 = distance(character, member1);
                    let d2 = distance(character, member2);
                    let hp2 = member2.hp;

                    console.log(`%c [CHECK] Khoảng cách: ${member1_name}: ${d1.toFixed(0)}px | Ynhi: ${d2.toFixed(0)}px | HP Ynhi: ${hp2}`, "color: cyan");

                    if (hp2 > 15000 && d1 < 40 && d2 < 40) {
                        console.log("%c [ACTION] ĐỦ ĐIỀU KIỆN - ĐANG VÀO!", "color: green; font-weight: bold");
                        enter("winter_instance");
                    } else {
                        if (hp2 <= 15000) console.log("%c -> Thất bại: Ynhi thiếu máu (>15k mới vào)", "color: red");
                        if (d1 >= 40 || d2 >= 40) console.log("%c -> Thất bại: Khoảng cách quá xa (<40px mới vào)", "color: red");
                    }
                }
            } else {
                xmove(1049, -2002);
            }
        }
        return;
    }

    // --- LOGIC CHIẾN ĐẤU TRONG INSTANCE ---
    if (character.map === "winter_instance") {
        
        // Ưu tiên Stage 4: Dùng Fieldgen0 ngay lập tức
        if (boss_x) {
            let gen = get_nearest_monster({ type: "fieldgen0" });
            if (!gen) {
                let fg_item = locate_item("fieldgen0");
                if (fg_item !== -1) use(fg_item);
            }
            if (gen && distance(character, boss_x) < character.range) {
                kite_around_fieldgen(gen, 3);
            }
        }

// Nếu không thấy boss nào (current_boss là null)
        if (!current_boss) {
            // 1/ Di chuyển tới điểm tập trung nếu đang ở xa
            if (distance(character, { x: -8, y: 68 }) > 20) {
                xmove(-8, 68);
                boss_wait_start = null; // Reset thời gian chờ khi đang di chuyển
            } 
            else {
                // Đã đứng tại điểm tập trung, bắt đầu đếm giờ nếu chưa đếm
                if (boss_wait_start === null) {
                    boss_wait_start = Date.now();
                }

                // Tính thời gian đã trôi qua
                let seconds_passed = (Date.now() - boss_wait_start) / 1000;

                // 2/ Nếu sau 5 giây mà vẫn không có boss -> Xong instance
                if (seconds_passed >= 5) {
                    smart_move({ map: "winterland", x: 1049, y: -2002 });
                   	stop_character("Ynhi")	
	                stop_character(Xmagelayer)	
	                framtay = 0
                    boss_wait_start = null; // Reset biến chờ
                }
            }
        } else {
            // Nếu Boss xuất hiện, reset lại biến chờ để dùng cho lần sau (stage tiếp theo)
            boss_wait_start = null;
            
            // Tấn công Boss như cũ
            if (distance(character, current_boss) > character.range) {
                xmove(current_boss.real_x, current_boss.real_y);
            }
        }
		

        if (character.hp < 2000) parent.api_call("disconnect_character", { name: character.name });
    }
}

/*
function framXmage() {

 let member1 = get_player(Xmagelayer);
 let member2 = get_player("Ynhi");
	autoPartyCheck("Ynhi", Xmagelayer, 60000);


// 1. Nếu thiếu 1 trong 2 người, bắt đầu đếm giờ (nếu chưa đếm)
 if ((!member1 || !member2) && startTimeX === null) {
    startTimeX = Date.now(); 
 }

 // 2. Nếu đã đủ cả 2 người, reset đồng hồ về null
 if (member1 && member2) {
    startTimeX = null; 
 }

 // 3. Kiểm tra nếu đồng hồ đã chạy quá 10 phút (10 * 60 * 1000 miligiây)
 if (startTimeX !== null && Date.now() - startTimeX >= 10 * 60 * 1000) {
    
    // Hành động khi quá thời gian:
    stop_character("Ynhi");
    stop_character(Xmagelayer);
    buoc = 0; // Reset bước đi về 0
    startTimeX = null; // Reset đồng hồ sau khi đã xử lý xong
    
    // Lệnh di chuyển về vị trí an toàn
    smart_move({ map: "winterland", x: 1049, y: -2002 });
    
    return; // Dừng hàm tại đây, không chạy các lệnh đánh quái bên dưới nữa
 }



	
	
if(parent.party_list.includes(Xmagelayer) && (!member1 || get_nearest_monster({ type: home }) ) ){
	send_cm(Xmagelayer,"mage")	
}


if (character.map == "winter_instance" && (!member1 || !member2) ) {
    // Tăng lên 5 giây để chắc chắn các setTimeout trước đó đã chạy xong
    if (Date.now() - last_sent_cm > 5000) {
        
        last_sent_cm = Date.now(); // Cập nhật ngay để chặn các lần gọi trùng lặp trong 5s tới

        // Bước 1: Gửi ID map sau 1 giây
        setTimeout(function() {
            send_cm("Ynhi", character.in);
            send_cm(Xmagelayer, character.in);
            // console.log("Sent ID: " + character.in);
        }, 1000);
        
        // Bước 2: Gửi lệnh vào map sau 2.5 giây
        setTimeout(function() {
            send_cm("Ynhi", "goo2");
            send_cm(Xmagelayer, "goo2");
            // console.log("Sent Command: goo1");
        }, 2500);
    }
}
	

if(smart.moving)return	
var monster

        monster = get_targeted_monster() 



if (monster && character.cc < 100) {
    // Ưu tiên trang bị luck nếu máu quái thấp
    if (monster.hp < 15000) {
        equipSet("luck");
        setTimeout(waitAndUnluck, 5000);
    } else {
        // Phân loại theo damage_type của quái
        if (monster.damage_type === "magical" && monster.attack > 3500) {
            equipSet("single_Magic");
        } else if (monster.damage_type === "physical" && monster.attack > 3500) {
            equipSet("single_physical");
        } else if (character.s.burned) {
            equipSet("def_fire");
	} else {
            // Mặc định nếu không rõ loại (hoặc khác magic/physical)
            equipSet("single");
        }
    }
}

	

/////////


if ( character.map != "winter_instance")
{
	if ( character.map != "winterland")smart_move({ map: "winterland", x: 1049, y: -2002 })
	if ( character.map == "winterland" && distance(character, {x: 1049, y: -2002}) >= 50 )smart_move({ map: "winterland", x: 1049, y: -2002 })

}
if ( character.map == "winterland" && distance(character, {x: 1049, y: -2002}) < 50 && member1 && member2 && distance(character,member1) < 50 && distance(character,member2) < 50 ){
enter("winter_instance");
	buoc = 1;
}

// Danh sách bước đi kèm loại quái cần kiểm tra
const steps = [
    { x: -8, y: 68, monster: "xmagefz" },
    { x: -8, y: 68, monster: "xmagefi" },
    { x: -8, y: 68, monster: "xmagen" },
    { x: -8, y: 68, monster: "xmagex" },
    { x: -8, y: 68, monster: "xmagex" },
    { x: -8, y: 68, monster: "xmagex" },
    { x: -8, y: 68, monster: "xmagex" },
    { x: -8, y: 68, monster: "xmagex" },
    { x: -8, y: 68, monster: "xmagex" },
    { x: -8, y: 68, monster: "xmagex" },

	
];


if (character.map === "winter_instance" && buoc >= 1 && buoc <= steps.length) {
    const step = steps[buoc - 1]; // Vì mảng bắt đầu từ 0
    // Kiểm tra khoảng cách và sự tồn tại của quái vật tương ứng
    const monster = get_nearest_monster({ type: step.monster });
	
    if (distance(character, {x: step.x, y: step.y}) > 30 && ( !monster || (monster && distance(character,monster) > 200  ))) xmove(step.x, step.y);
    else if (fieldgen0_position && monster && distance(character,monster) < character.range && monster.target && monster.target == character.name )kite_around_fieldgen(fieldgen0_position, 20);
    else if ( monster && distance(character,monster) > 10 && character.hp > 7000 )xmove(monster.real_x, monster.real_y);




	
   // if (buoc > 8 && monster) buoc = 8; //fix bug quái vật nhảy, dịch chuyển nó không nhận dạng được
	
    if (step.monster == "xmagex" && distance(character,monster) < 50 && !get_nearest_monster({ type: "fieldgen0" }) && distance(character, {x: step.x, y: step.y}) < 250 )
	  {
		 let item = locate_item("fieldgen0");
                 if (item)use(item);
		fieldgen0_position = { x: character.real_x, y: character.real_y };

	  }
	
    if (distance(character, step) < 30 && !monster && member2 && distance(character,member2) < 55 ) {
        buoc++;
    }

	if (character.hp < 2000)parent.api_call("disconnect_character", {name: "haiz"});

}

if (buoc == 8)
{
	stop_character("Ynhi")	
	stop_character(Xmagelayer)	
	buoc = 0
	framtay = 0
	smart_move({ map: "winterland", x: 1049, y: -2002 })
}
	
}


*/


let startTime = null; // Thời gian bắt đầu đếm giờ
let waitStartTime = null; // Biến thêm mới để tính 3 phút chờ
let fieldgen0_position = null;
let buoc = 0
const tomplayer = '6gunlaZe';
let last_sent_cm = 0; // Lưu thời gian gửi tin nhắn cuối cùng

function framTOMBgame() {

 let member1 = get_player(tomplayer);
 let member2 = get_player("Ynhi");
	
autoPartyCheck("Ynhi", tomplayer, 50000);

 // Nếu thiếu thành viên và chưa bắt đầu đếm giờ
 if ((!member1 || !member2) && startTime === null) {
    startTime = Date.now(); // Lưu lại thời gian bắt đầu
 }

 // Nếu cả 2 thành viên đã có mặt, reset lại startTime
 if (member1 && member2) {
    startTime = null; // Reset nếu có đủ 2 thành viên
 }

 // Kiểm tra nếu đã trôi qua 10 phút (600 giây)
 if (startTime !== null && Date.now() - startTime >= 10 * 60 * 1000) {
    // Nếu quá 20 phút và vẫn thiếu thành viên, thực hiện hành động
	stop_character("Ynhi")	
	stop_character(tomplayer)	
	buoc = 0
	framtay = 0
	startTime  = null
    waitStartTime = null // Reset thời gian chờ
 }


	
if(parent.party_list.includes(tomplayer) && (!member1 || character.map != "tomb"  || get_nearest_monster({ type: "home" }) ) ){
	send_cm(tomplayer,"tomb")	
}

if (character.map == "tomb" && (!member1 || !member2)) {
    // Tăng lên 5 giây để chắc chắn các setTimeout trước đó đã chạy xong
    if (Date.now() - last_sent_cm > 5000) {
        
        last_sent_cm = Date.now(); // Cập nhật ngay để chặn các lần gọi trùng lặp trong 5s tới

        // Bước 1: Gửi ID map sau 1 giây
        setTimeout(function() {
            send_cm("Ynhi", character.in);
            send_cm(tomplayer, character.in);
            // console.log("Sent ID: " + character.in);
        }, 1000);
        
        // Bước 2: Gửi lệnh vào map sau 2.5 giây
        setTimeout(function() {
            send_cm("Ynhi", "goo1");
            send_cm(tomplayer, "goo1");
            // console.log("Sent Command: goo1");
        }, 2500);
    }
}

if(smart.moving)return	
var monster

        monster = get_targeted_monster() 
	
// Đếm số lượng quái vật trong tầm đánh
let nearby_monsters_count = 0;
for (let id in parent.entities) {
    let entity = parent.entities[id];
    if (entity.type === "monster" && distance(character, entity) < character.range && entity.visible) {
        nearby_monsters_count++;
    }
}


if (monster && character.cc < 100) {
	
    // Ưu tiên trang bị luck nếu máu quái thấp
    if (monster.hp < 15000 && monster.target == character.name) {
        equipSet("luck");
        setTimeout(startLuckTimer, 5000);
    } else {
        // Phân loại theo damage_type của quái
        if (monster.damage_type === "magical" && monster.attack > 3500 && monster.target == character.name) {
            equipSet("single_Magic");
        } else if (monster.damage_type === "physical" && monster.attack > 3500 && monster.target == character.name) {
            equipSet("single_physical");
        } else {
            if (nearby_monsters_count >= 3) {
                        equipSet('aoe'); 
            }
            else 
			{
				equipSet("single");
			}
        }
    }
}

	

/////////


if ( character.map != "tomb")
{
	if ( character.map != "mansion")smart_move({ map: "mansion", x: 0, y: -470 })
	if ( character.map == "mansion" && distance(character, {x: 0, y: -470}) >= 50 )smart_move({ map: "mansion", x: 0, y: -470 })

}
if ( character.map == "mansion" && distance(character, {x: 0, y: -470}) < 50 && member1 && member2 && distance(character,member1) < 50 && distance(character,member2) < 50 ){
    enter("tomb");
	buoc = 1;
    waitStartTime = null; // Reset khi vào map mới
}

// Danh sách bước đi kèm loại quái cần kiểm tra
const steps = [
    { x: 5, y: -32, monster: "waiting_area" }, // Bước 1 mới thêm
    { x: 312, y: -187, monster: "gbluepro" },
    { x: -231, y: 154, monster: "ggreenpro" },
    { x: -292, y: -312, monster: "gredpro" },
{ x: -200, y: -400, monster: "wait" },
{ x: -38, y: -505, monster: "wait" },
	{ x: 45, y: -771, monster: "gpurplepro" },
	
	{ x: 45, y: -771, monster: "gpurplepro" },
	{ x: 133, y: -733, monster: "gpurplepro" },
	{ x: 46, y: -771, monster: "gpurplepro" },
	{ x: -45, y: -771, monster: "gpurplepro" },
	
	
];


if (character.map === "tomb" && buoc >= 1 && buoc <= steps.length) {
    const step = steps[buoc - 1]; // Vì mảng bắt đầu từ 0
    
    // Xử lý riêng cho bước chờ 3 phút
    if (step.monster === "waiting_area") {
        if (distance(character, {x: step.x, y: step.y}) > 15) {
            xmove(step.x, step.y);
        } else {
            if (waitStartTime === null) waitStartTime = Date.now();
            if (Date.now() - waitStartTime >= 3 * 60 * 1000) {
                buoc++;
                waitStartTime = null;
            }
        }
        return; // Dừng tại đây khi đang chờ
    }

    // Kiểm tra khoảng cách và sự tồn tại của quái vật tương ứng
    const monster = get_nearest_monster({ type: step.monster });
	
    if (distance(character, {x: step.x, y: step.y}) > 30 && ( !monster || (monster && distance(character,monster) > 200  ))) xmove(step.x, step.y);
    else if (fieldgen0_position && monster && distance(character,monster) < character.range && monster.target && monster.target == character.name )kite_around_fieldgen(fieldgen0_position, 20);
    else if ( monster && distance(character,monster) > 10 && character.hp > 4000 )xmove(monster.real_x, monster.real_y);

	
    if (buoc > 8 && monster) buoc = 8; //fix bug quái vật nhảy, dịch chuyển nó không nhận dạng được
	
    if (step.monster == "gpurplepro" && distance(character,monster) < 50 && !get_nearest_monster({ type: "fieldgen0" }) && distance(character, {x: step.x, y: step.y}) < 130 && 1 > 2) // tạm thời tắt không cần nữa
	  {
		 let item = locate_item("fieldgen0");
                 if (item)use(item);
		fieldgen0_position = { x: character.real_x, y: character.real_y };

	  }
	
    if (distance(character, step) < 30 && !monster && member2 && distance(character,member2) < 55 ) {
        buoc++;
    }
	
	if (character.hp < 2000)parent.api_call("disconnect_character", {name: "haiz"});

	
}

if (buoc == 12) // Tăng lên 12 vì đã thêm 1 bước vào mảng
{
	stop_character("Ynhi")	
	stop_character(tomplayer)	
	buoc = 0
	framtay = 0
    waitStartTime = null
	smart_move({ map: "mansion", x: 0, y: -470 })
}


///////////	
	
}









let startTime1 = null; // Thời gian bắt đầu đếm giờ
let buoc1 = 0
const spiderlayer = '6gunlaZe';


function spidergame() {  /// đã check fix lỗi treo mạnh hơn tomb và Xgame

 let member1 = get_player(spiderlayer);
 let member2 = get_player("Ynhi");
	
autoPartyCheck("Ynhi", spiderlayer, 50000);

  // Nếu thiếu thành viên và chưa bắt đầu đếm giờ
  if ((!member1 || !member2) && startTime1 === null) {
    startTime1 = Date.now(); // Lưu lại thời gian bắt đầu
  }

  // Nếu cả 2 thành viên đã có mặt, reset lại startTime
  if (member1 && member2 && distance(character, member1) < 150  && distance(character, member2) < 150 ) {
    startTime1 = null; // Reset nếu có đủ 2 thành viên
  }

  // Kiểm tra nếu đã trôi qua 10 phút (600 giây)
  if (startTime1 !== null && Date.now() - startTime1 >= 10 * 60 * 1000) {
    // Nếu quá 20 phút và vẫn thiếu thành viên, thực hiện hành động
	stop_character("Ynhi")	
	stop_character(spiderlayer)	
	buoc1 = 0
	framtay = 0
	startTime1  = null
	smart_move({ map: "gateway", x: -321, y: -194 })
  }


	
if(parent.party_list.includes(spiderlayer) && (!member1 || character.map != "spider_instance"  || get_nearest_monster({ type: home }) ) ){
	send_cm(spiderlayer,"spidergame")	
}


if (character.map == "spider_instance" && (!member1 || !member2) ) {
    // Tăng lên 5 giây để chắc chắn các setTimeout trước đó đã chạy xong
    if (Date.now() - last_sent_cm > 5000) {
        
        last_sent_cm = Date.now(); // Cập nhật ngay để chặn các lần gọi trùng lặp trong 5s tới

        // Bước 1: Gửi ID map sau 1 giây
        setTimeout(function() {
            send_cm("Ynhi", character.in);
            send_cm(spiderlayer, character.in);
            // console.log("Sent ID: " + character.in);
        }, 1000);
        
        // Bước 2: Gửi lệnh vào map sau 2.5 giây
        setTimeout(function() {
            send_cm("Ynhi", "goo3");
            send_cm(spiderlayer, "goo3");
            // console.log("Sent Command: goo1");
        }, 2500);
    }
}

	

if(smart.moving)return	
var monster

        monster = get_targeted_monster() 
	
// Đếm số lượng quái vật trong tầm đánh
let nearby_monsters_count = 0;
for (let id in parent.entities) {
    let entity = parent.entities[id];
    if (entity.type === "monster" && distance(character, entity) < character.range && entity.visible && entity.hb > 4000 ) {
        nearby_monsters_count++;
    }
}


if (monster && character.cc < 100) {
    // Ưu tiên trang bị luck nếu máu quái thấp
    if (monster.hp < 15000 && monster.target == character.name) {
        equipSet("luck");
        setTimeout(startLuckTimer, 5000);
    } else {
        // Phân loại theo damage_type của quái
        if (monster.damage_type === "magical" && monster.attack > 3500 && monster.target == character.name) {
            equipSet("single_Magic");
        } else if (monster.damage_type === "physical" && monster.attack > 3500 && monster.target == character.name) {
            equipSet("single_physical");
        } else {
            if (nearby_monsters_count >= 3) {
                equipSet('aoe'); 
            }
            else 
			{
				equipSet("single");
			}
        }
    }
}

	

/////////


if ( character.map != "spider_instance")
{
	if ( character.map != "gateway")smart_move({ map: "gateway", x: -321, y: -194 })
	if ( character.map == "gateway" && distance(character, {x: -321, y: -194}) >= 50 )smart_move({ map: "gateway", x: -321, y: -194 })

}
if ( character.map == "gateway" && distance(character, {x: -321, y: -194}) < 50 && member1 && member2 && distance(character,member1) < 50 && distance(character,member2) < 50 ){
    enter("spider_instance");
	buoc1 = 1;
}

// Danh sách bước đi kèm loại quái cần kiểm tra
const steps = [
    { x: 0, y: -245, monster: "wait" },
    { x: 0, y: -470, monster: "wait" },
    { x: 0, y: -750, monster: "wait" },
{ x: 0, y: -1191, monster: "wait" },
	
{ x: 220, y: -1495, monster: "spiderbr" }, 
{ x: 24, y: -1495, monster: "spiderr" },
{ x: -175, y: -1495, monster: "spiderbl" },
{ x: -192, y: -1516, monster: "spiderbl" },
	
{ x: -192, y: -1516, monster: "spiderbl" },
{ x: -192, y: -1516, monster: "spiderbl" },
{ x: -192, y: -1516, monster: "spiderbl" },

	
];


if (character.map === "spider_instance" && buoc1 >= 0 && buoc1 <= steps.length) {

const index = Math.max(0, buoc1 - 1);
const step = steps[index];

    const monster = get_nearest_monster({ type: step.monster });
	
    if (distance(character, {x: step.x, y: step.y}) > 30 && ( !monster || (monster && distance(character,monster) > 200  ))) xmove(step.x, step.y);
    else if ( monster && distance(character,monster) > 10 && character.hp > 4000 )xmove(monster.real_x, monster.real_y);


	
    if (distance(character, step) < 30 && !monster && member2 && distance(character,member2) < 55 ) {
        buoc1++;
    }
	
	if (character.hp < 2000)parent.api_call("disconnect_character", {name: "haiz"});

}

	

if (buoc1 == 8)
{
	stop_character("Ynhi")	
	stop_character(spiderlayer)	
	buoc1 = 0
	framtay = 0
	smart_move({ map: "gateway", x: -321, y: -194 })
}


///////////	
	
}



























const bossData = {
    1: {
        name: "stompy",
        map: "winterland",
        x: 404,
        y: -2423
    },
    2: {
        name: "skeletor",
        map: "arena",
        x: 666,
        y: -555
    },
    3: {
        name: "mechagnome",
        map: "cyberland",
        x: 0,
        y: 0
    },
    4: {
        name: "mrpumpkin",
        map: "halloween",
        x: -257,
        y: 730,
		equip: "aoe",
    },
    5: {
        name: "mrgreen",
        map: "spookytown",
        x: 271,
        y: 1023
    },	
	
    // Bạn có thể thêm boss khác vào đây dễ dàng
};



function getBossInfo(bossvip) {
    return bossData[bossvip] ?? null;
}


let bossvipWaitStart = 0; // Biến toàn cục, reset sau 2 phút nếu không thấy boss
let dathayboss = 0 // biến xác nhận đánh boss

async function VIPBosses() {
	
	autoPartyCheck(f1111, f2222, 50000);
	
    if (smart.moving || !bossvip) return;

    const info = getBossInfo(bossvip); // Lấy thông tin boss từ ID
    if (!info) return;

    send_cm(f2222, `bossvip${bossvip}`);
	    send_cm("tienV", `bossvip${bossvip}`);


    // Tìm quái chưa có target
    const targetless = Object.values(parent.entities).find(mob =>
        mob?.mtype === info.name &&
        !mob.dead &&
        !mob.target &&
        distance(character, mob) <= 200
    );

    if (targetless && targetless.attack < 200) {
        if (is_in_range(targetless, "taunt") && !is_on_cooldown("taunt")) {
            await use_skill("taunt", targetless.id);
            game_log("Taunting " + targetless.name, "#FFA600");
        }
    }

    const monster = get_nearest_monster({ type: info.name });

    if (monster) {
        // Có boss → reset thời gian chờ
        bossvipWaitStart = 0;

		//xác nhận thấy boss sắp chết
		if (monster.hp < 50000)dathayboss = 1;

        if (monster.hp > 15000 && character.cc < 100) {
            const equipType = info.equip || "single";
            equipSet(equipType);
        } else if (character.cc < 100 && monster.target === character.name) {
            equipSet("luck");
            setTimeout(startLuckTimer, 5000);
        }
    } else if (
        character.map === info.map &&
        distance(character, { x: info.x, y: info.y }) <= 100 
    ) {

	    
const teammate = get_player(f2222);
const teammateNearby = teammate && distance(character, teammate) <= 80;

if (teammateNearby) {
    game_log("❌ Không thấy boss nhưng f2222 đang ở gần → reset bossvip ngay.");
    bossvip = 0;
    bossvipWaitStart = 0;
	dathayboss = 0
    return;
}


        // Không đủ người gần → chờ 2 phút
        if (!bossvipWaitStart) bossvipWaitStart = Date.now();

        if (Date.now() - bossvipWaitStart > 120000) {
            game_log("❌ Boss không xuất hiện sau 2 phút, reset bossvip.");
            bossvip = 0;
            bossvipWaitStart = 0;
			dathayboss = 0
        }
    } else {
        // Không ở đúng vị trí → di chuyển tới boss
        bossvipWaitStart = 0;

		if (dathayboss == 1)
		{
			dathayboss = 0
			bossvip = 0;
		}

		
        if (!smart.moving && dathayboss == 0) {
            await smart_move({ map: info.map, x: info.x, y: info.y });
        }
    }
}





let callnguoi = 0
//hpThreshold = ngưỡng sắp chết đổi item luck
function handleSpecificEvent(eventType, mapName, x, y, hpThreshold, skillMs = 0) {
    if (parent?.S?.[eventType]?.live) {

		          if (eventType == "dragold") autoPartyCheckByCurrentServer(); // tối ưu hóa drop theo home sever
		          else autoPartyCheck(f1111, f2222, 50000);

callnguoi++;

if (callnguoi < 2000) {

    // 30s đầu ~ 100 vòng
    if (callnguoi <= 80) {

        // mỗi 2 vòng ~ 0.6s
        if (callnguoi % 2 === 0) {
            send_cm("MuaBan", eventType);
        }

    } else {

        // sau đó mỗi 20 vòng ~ 6s
        if (callnguoi % 20 === 0) {
            send_cm("MuaBan", eventType);
        }

    }

}


	    Now_is_gobalevenrun = true
	    
        const monster = get_nearest_monster({ type: eventType }); 
        if (monster && distance(character, monster) <= 180 ) {
            if (monster.hp > hpThreshold ) {
                if (character.cc < 100) {
                    equipSet('single');
                }
            } else if (character.cc < 100 && monster.target != "haiz" && eventType == "dragold" ) {  // tăng luck khi là quái trong chế độ hợp tác
                equipSet('luck');
		        setTimeout(startLuckTimer, 50000);
            }
        }
	    else
	{
	 if (!smart.moving) smart_move({ x, y, map: mapName });
	}
    }
}

function handleSpecificEventWithJoin(eventType, mapName, x, y, hpThreshold) {


    if (parent?.S?.[eventType]) {
		
		    autoPartyCheck(f1111, f2222, 50000);

callnguoi++;

if (callnguoi < 2000 && callnguoi % 20 === 0) {
    send_cm("MuaBan", eventType);
}


		
	    Now_is_gobalevenrun = true
	    
        if (character.map !== mapName && !smart.moving ) {  ////!smart.moving một số lý do chưa kịp tới vị trí mặc định đã tạo 1 lệnh mới nên lỗi
            parent.socket.emit('join', { name: eventType });
        } else if (!smart.moving) {
           // smart_move({ x, y, map: mapName });
        }
	    
  if (eventType == "goobrawl" )eventType="bgoo"

        const monster = get_nearest_monster({ type: eventType });
        if (monster) {
            if (monster.hp > hpThreshold) {
                if (character.cc < 100) {
                    equipSet('single');
                }
            } else if (character.cc < 100 && monster.target == "haiz") {
                equipSet('luck');
		    setTimeout(startLuckTimer, 5000);
            }
        }
	 else
	{
	 if (!smart.moving) smart_move({ x, y, map: mapName });
	}   
    }
}
















const targetNames = ["6gunlaZe", "Ynhi","haiz", "nhiY","tienV","LyThanhThu"];


function attackLoop() {
    let delay = 20;

    try {
        // === TARGET STALE CHECK ===
        if (
            combatState.target &&
            Date.now() - combatState.lastUpdate > 5000
        ) {
            combatState.target = null;
        }

        const t = combatState.target;

        if (!t || smart.moving || is_disabled(character)) {
            return setTimeout(attackLoop, 40);
        }

        const ms = ms_to_next_skill("attack");

        if (ms < Math.max(10, character.ping / 10) && is_in_range(t)) {
            autoSwapCandy();
            attack(t);
        }

delay = 5;
if (ms > 25)  delay = 10;
if (ms > 50)  delay = 30;
if (ms > 100) delay = 60;
if (ms > 200) delay = 140;
if (ms > 300) delay = 200;


    } catch (e) {}

    setTimeout(attackLoop, delay);
}


function findByNames(opts) {
    for (const name of targetNames) {
        const t = get_nearest_monster_v2({
            target: name,
            ...opts
        });
        if (t) return t;   // ✅ dừng sớm
    }
    return null;
}



// ================= GLOBAL STATE =================
let combatState = {
    target: null,
    targetType: null, // "normal" | "boss" | "danger"
    lastUpdate: 0
};


function targetLoop() {
    try {
        let nearest = null;

        // 1️⃣ Ưu tiên targetNames gần nhà
        if (
            character.map === mobMap &&
            distance(character, locations[home][0]) < 250
        ) {
    nearest = findByNames({
        max_distance: character.range,
        check_low_hp: true
    });
        }

        // 2️⃣ Ưu tiên cursed
        if (!nearest) {
    nearest = findByNames({
        statusEffects: ["cursed"],
        max_distance: 50,
        check_max_hp: true
    });
        }

        // 3️⃣ Boss mạnh – cần buff
        const buff = get_player("Ynhi");
        const bossDanger = ["dragold","stompy","skeletor","xmagefz","xmagefi","xmagen","xmagex","mrgreen","mrpumpkin","icegolem","franky","crabxx"];

        if (!nearest && buff && distance(character, buff) < 170) {
            for (const m of bossDanger) {
                const t = get_nearest_monster({ type: m });
                if (t) {
                    nearest = t;
                    combatState.targetType = "danger";
                    break;
                }
            }
        }

        // 3.5 Ưu tiên quái ở gần
        if (!nearest) {
    nearest = findByNames({
        max_distance: character.range,
        check_max_hp: true
    });
        }


        // 4️⃣ Event boss
        if (!nearest && events) {
            for (const m of ["icegolem", "franky", "crabxx"]) {
                const t = get_nearest_monster1({ type: m });
                if (t) {
                    nearest = t;
                    combatState.targetType = "boss";
                    break;
                }
            }
        }

        // 5️⃣ Mob thường
        if (!nearest) {
            for (const m of ["phoenix111","jr","greenjr","mvampire","snowman","bgoo","rgoo","wabbit"]) {
                const t = get_nearest_monster({ type: m });
                if (t) {
                    nearest = t;
                    combatState.targetType = "normal";
                    break;
                }
            }
        }

        // 6️⃣ Fallback: target hiện tại
        if (!nearest) {
            const e = get_entity(character.target);
            if (e && !["dragold","stompy","skeletor","xmagefz","xmagefi","xmagen","xmagex","mrgreen","mrpumpkin","icegolem","franky"].includes(e.mtype)) {
                nearest = e;
            }
        }

        combatState.target = nearest;
        combatState.lastUpdate = Date.now();

		if (character.map == "winter_instance" )
		{
        let xmagefzboss = get_nearest_monster({ type: "xmagefz" });
        let Ynhiboss = get_player("Ynhi");
			if (Ynhiboss && is_disabled(Ynhiboss) && xmagefzboss && xmagefzboss.hp < 15000)combatState.target = null;

		}
		

        if (nearest && !is_in_range(nearest)) {
            gobaltaget = nearest;
        }

    } catch (e) {}

    setTimeout(targetLoop, 250);
}



targetLoop();
attackLoop();




////////////////////////////////////////////////////////////////
let scythe = 0;
let eTime = 0;
let basher = 0;
async function skillLoop() {
    let delay = 30;
    try {

        // ===== SKIP nếu không nên dùng skill =====
        if (smart.moving || is_disabled(character)) {
            return setTimeout(skillLoop, 50);
        }
		
        let zap = false;
        const dead = character.rip;
        const Mainhand = character.slots?.mainhand?.name;
        const offhand = character.slots?.offhand?.name;
        const aoe = character.mp >= character.mp_cost * 2 + G.skills.cleave.mp + 30;
        const cc = character.cc < 235;
        const zapperMobs = ["plantoid"];
        const stMaps = ["", "winter_cove", "arena", "",];
        const aoeMaps = ["desertland", "goobrawl", "main", "level2w", "cave", "halloween", "spookytown", "tunnel", "winterland", "level2n","mforest","tomb","crypt","cyberland","spider_instance","winter_instance"];
        let tank = get_entity(f1111);
	     let f1 = get_entity(f2222); ///CUNG THỦ - MÁU GIẤY

        if (character.ctype === "warrior" && !dead) {
            try {
				

if (
    character.mp >= 170 &&
    character.map !== "winter_instance" &&
    (
        (f1 && f1.hp < f1.max_hp * 0.6) ||
        (tank && tank.hp < tank.max_hp * 0.6) ||
        (tank && tank.ctype === "priest" && tank.mp < 4000) ||
        (tank && tank.ctype === "priest" && tank.mp < 5500 && character.mp > character.max_mp * 0.8) ||
        character.hp < 12000
    )
) {
    handleStomp(Mainhand, stMaps, aoeMaps, tank);
}

				

                if (character.ctype === "warrior") {
                    //console.log("Calling handleCleave");
                    handleCleave(Mainhand, aoe, cc, stMaps, aoeMaps, tank);
                   
                    handleWarriorSkills(tank,f1);
                }
            } catch (e) {
                //console.error("Error in warrior section:", e);
            }
        }


    } catch (e) {
        //console.error("Error in skillLoop:", e);
    }
    setTimeout(skillLoop, delay);
}
skillLoop()

async function handleStomp(Mainhand, stMaps, aoeMaps, tank) {
    if (!is_on_cooldown("stomp") ) {
        if (Mainhand !== "basher" && performance.now() - basher > 5000) {
            basher = performance.now();
            basherSet();
        }
        use_skill("stomp");
        game_log("Using STOMP", "#B900FF");
    } else {
        handleWeaponSwap(stMaps, aoeMaps);
    }
}


setTimeout(function () {
  equipSet('nodeff');  // lần đầu đăng nhập trở về mặc định
}, 10000); // 10000ms = 10 giây

let checkdef = 0; // 0 = bình thường, 1 = deff, 2 = def mạnh
let defSafeSince = null;


function handleWeaponSwap(stMaps, aoeMaps, Mainhand, offhand) {
    const currentTime = performance.now();
    if (currentTime - eTime < 50) return;

// Mob xung quanh (bao gòm cả quái cooperative/hợptác dù không target mình)
const mobsInRange = Object.values(parent.entities).filter(entity =>
    entity.visible &&
    !entity.dead &&
    distance(character, entity) <= 100 &&
    (
        entity.target === character.name ||
        entity.cooperative === true
    )
);

    const FireMobs = mobsInRange.filter(mob =>
        mob.mtype == "xmagefi"
    );
	
const hasLowHP_CoopMob = mobsInRange.some(mob =>
    mob.cooperative === true &&
    mob.hp != null &&
    mob.hp < 180000
);


const physicalMobs = mobsInRange.filter(mob => {
    if (mob.mtype === "crabxx") return false;
    if (mob.damage_type !== "physical") return false;
    if (character.hp < 8000) return mob.attack > 1000;
    if (character.hp < 15000) return mob.attack > 2000;
    return mob.attack > 3500;
});


const specialORB = ["xmagex", "xmagen", "xmagefi", "xmagefz"];

const MobMagicNeedORB = mobsInRange.filter(m =>
    specialORB.includes(m.mtype)
);

	
const magicalMobs = mobsInRange.filter(mob => {
   // if (mob.mtype === "xmagex") return true;
    if (mob.damage_type !== "magical") return false;
    if (character.hp < 12000) return mob.attack > 1000;
    if (character.hp < 15000) return mob.attack > 2000;
    return mob.attack > 3500;
});



	
    const lowHpMobs = mobsInRange.filter(mob =>
        mob.hp < 6000 &&
        mob.attack > 500 &&
        mob.target === character.name &&
        mob.mtype !== "nerfedmummy" &&
        mob.mtype !== "nerfedbat"
    );

    // 👉 ƯU TIÊN: Mob mạnh (reset thời gian an toàn)
    if (physicalMobs.length >= 1) {
        defSafeSince = null;
        eTime = currentTime;
        equipSet('def_physical');
        checkdef = 2;
        return;
    }



	if (MobMagicNeedORB.length >= 1) {  
        defSafeSince = null;
        eTime = currentTime;
        equipSet('def_magic_ORB');
        checkdef = 2;
        return;
    }
	else if (magicalMobs.length >= 1) {  
        defSafeSince = null;
        eTime = currentTime;
        equipSet('def_magical');
        checkdef = 2;
        return;
    }
    else if (FireMobs.length >= 1)
	{
        eTime = currentTime;
        equipSet('def_fire');
        return;
	}


	
    // 👉 ƯU TIÊN: Clear mob máu thấp  //chưa sử dụng bây giờ
    if (lowHpMobs.length >= 2 && 1 == 2) {
        eTime = currentTime;
        equipSet('lowhp_clear');
        return;
    }

    // 👉 GỠ TRANG BỊ PHÒNG THỦ NẾU AN TOÀN LIÊN TỤC > 3 GIÂY và không có quái co-op sắp chết
    if (character.hp > 15000 && !hasLowHP_CoopMob &&
        physicalMobs.length === 0 &&
        magicalMobs.length === 0) {
        
        // Ghi thời điểm bắt đầu an toàn
        if (!defSafeSince) defSafeSince = currentTime;

        // Đủ thời gian an toàn → gỡ phòng thủ
        if (currentTime - defSafeSince >= 3000 && character.slots.helmet?.name === "xhelmet") {
            checkdef = 0;
            defSafeSince = null;
            eTime = currentTime;
            equipSet('nodeff');
            return;
        }

    } else {
        // Nếu có mob mạnh lại → reset đồng hồ an toàn
        defSafeSince = null;
    }

    // 👉 Chuyển sang deff nếu máu thấp mà chưa bị mob mạnh
    if (checkdef === 0 && character.hp < 11000) {
        eTime = currentTime;
        checkdef = 1;
        equipSet('deff');
        return;
    }

    // 👉 Trạng thái đặc biệt → bỏ qua
    if (events && !get_nearest_monster({ type: home })) return;
    if (bossvip > 0 || framtay > 0) return;

    if (framboss > 0) {
        eTime = currentTime;
        equipSet('single');
    } else {
        eTime = currentTime;
		
		if ( home == 'bscorpion' )
		{
		equipSet('single');
		}
		else
		{
		equipSet('aoe');
		}
        
    }

	
}



function autoSwapCandy() {

/// tạm ngưng do không hiệu quả 
	return
    // Điều kiện NGĂN swap
    if (
        character.rip ||
        isEquipping ||
        smart.moving ||
        character.ping > 900 ||
        character.s.sugarrush ||
        character.cc > 100 ||
        character.mp > 780 ||
        !get_nearest_monster({ type: "bscorpion" }) 
    ) return;
	
   const ms = ms_to_next_skill("attack");

	
    if ( character.slots.mainhand?.name === "fireblade" && character.slots.offhand?.name === "fireblade" )
	{
	
    // Swap sau 60–120ms sau đòn đánh (vị trí gọi đảm bảo đã attack xong)
    setTimeout(() => {
        if (
            character.slots.mainhand?.name !== "candycanesword" ||
            character.slots.offhand?.name !== "candycanesword"
        ) {
            equipSet("candycanesword");
        }
    }, 30);
	}
}


let lastCleaveTime = 0;
const CLEAVE_THRESHOLD = 500; // Time in milliseconds between cleave uses

function handleCleave(Mainhand, aoe, cc, stMaps, aoeMaps, tank) {
    const currentTime = performance.now();
    const timeSinceLastCleave = currentTime - lastCleaveTime;
    const mapsToInclude = ["desertland", "goobrawl", "main", "level2w", "cave", "halloween", "spookytown", "tunnel", "winterland", "level2n","mforest","tomb","crypt","cyberland","spider_instance","winter_instance","winter_cave","level1"];
	
// Map cần tăng range check để an toàn
const extraRangeMaps = ["level2w"]; //có thể thêm nhiều map

// Range cleave theo map
const cleaveRange = G.skills.cleave.range + 
    (extraRangeMaps.includes(character.map) ? 40 : 10);

const monstersInRange = Object.values(parent.entities).filter(({ type, visible, dead, x, y }) =>
    type === "monster" &&
    visible &&
    !dead &&
    distance(character, { x, y }) <= cleaveRange
);

// Biến riêng: true nếu có ít nhất 1 quái trong tầm đánh thường
const hasNearbyMonster = monstersInRange.some(m => distance(character, m) <= character.range);
	

// Quái trong range nhưng chưa có target + HP ≥ 10000
let list = monstersInRange.filter(m => !m.target && m.hp >= 10000);

// Lấy MP của Ynhi (đồng đội / nhân vật phụ)
let ynhi = get_player("Ynhi");
	
// Lấy MP của Ynhi, nhưng chỉ khi HP > 12000, còn lại cho = 0
let mpp = (ynhi && ynhi.hp > 12000) ? ynhi.mp : 0;
	
// Số lượng creep được phép bỏ qua tùy theo MP của Ynhi
let ignore = mpp > 4500 ? 5 :
             mpp > 3500 ? 3 :
             mpp > 2500 ? 1 : 0;

if ( !get_nearest_monster({ type: home }) )	ignore = 0 /// chỉ có thể bỏ qua nếu đang đứng trong bãi fram thôi, tránh khi đánh boss v..v.v


// Lọc creep và sắp xếp theo khoảng cách (gần nhất đứng đầu)
let creeps = list.filter(m => m.mtype.includes(home))
                 .sort((a,b)=> distance(character, a) - distance(character, b));


const hasStrongCreep = creeps.some(c => c.attack > 800);
// Quái cần quan tâm thật sự:
//   - Giữ toàn bộ quái không phải creep
//   - Chỉ giữ creep sau khi đã bỏ qua X con gần nhất
const untargetedMonsters = list
  .filter(m => !m.mtype.includes(home))
  .concat(
    hasStrongCreep
      ? creeps                // có creep mạnh → lấy hết
      : creeps.slice(ignore)  // không có → bỏ qua X con
  );



//const untargetedMonsters = monstersInRange.filter(({ target, hp }) => !target && hp >= 4000);  // phiên bản cũ


    if (canCleave(aoe, cc, mapsToInclude, monstersInRange, tank, timeSinceLastCleave, untargetedMonsters, hasNearbyMonster) ) {
        if (Mainhand !== "bataxe") {
            scytheSet(); // Equip the bataxe
        }
        use_skill("cleave"); // Use the cleave skill
        reduce_cooldown("cleave", character.ping * 0.95);
        lastCleaveTime = currentTime; // Update the last cleave time
    }

    // Handle weapon swapping outside of cleave logic to keep it separate
    handleWeaponSwap(stMaps, aoeMaps);
}

function canCleave(aoe, cc, mapsToInclude, monstersInRange, tank, timeSinceLastCleave, untargetedMonsters, hasNearbyMonster) {
    return (
        !smart.moving // Don't cleave if moving smartly
        && cc // CC check: Ensure you have CC up
        && aoe // Mana check: Ensure AOE is available
        && timeSinceLastCleave >= CLEAVE_THRESHOLD // Prevent cleave spamming
        && monstersInRange.length > 0 // Ensure there are monsters in range
        && untargetedMonsters.length === 0 // Only cleave if no untargeted monsters (no aggro)
        && mapsToInclude.includes(character.map) // Map check (optional, clarify if needed)
        && tank // Ensure tank (priest) is around
        && !is_on_cooldown("cleave") // Ensure cleave is not on cooldown
        && (ms_to_next_skill("attack") > 75  || !hasNearbyMonster )// Ensure attack isn't about to be ready
    );
}

async function handleWarriorSkills(tank,f1) {

	
    if (!is_on_cooldown("warcry") && !character.s.warcry && character.s.darkblessing) {
        await use_skill("warcry");
    }



const mobTypes = ["bat11",]; //list auto hút quái xung quanh của war ==> Tạm ngưng
const mobsInRange = Object.values(parent.entities).filter(e =>
    mobTypes.includes(e.mtype) && e.level < 3 && // canh chỉnh level tùy theo quái mạnh yếu
    e.visible && !e.dead &&
    distance(character, e) <= G.skills.agitate.range
);

const untargetedMobs = mobsInRange.filter(e => !e.target);

const ignoreMobs = ["xmagex", "xmagen", "xmagefi", "xmagefz"];
	
const mobsTargetingTank = Object.values(parent.entities).filter(e =>
    e.type === "monster" &&  !ignoreMobs.includes(e.mtype) &&
    !e.dead &&
    e.target === tank?.name && e.hp > 15000 &&
    distance(character, e) <= 250
);

if (
    !smart.moving &&
    !is_on_cooldown("agitate") &&
    mobsInRange.length >= 3 &&
    untargetedMobs.length >= 3 &&
    (   ( tank && tank.name == "Ynhi" && !tank.rip && tank.hp > 12000 && tank.mp > 4000  && distance(character, tank) < 180 )  ||  (tank && f1 && tank.name != "Ynhi")     ) && 
    character.hp > 14000 && character.mp > 800
) {
    const porc = get_nearest_monster({ type: "porcupine" });
    if (!is_in_range(porc, "agitate")) {
        await use_skill("agitate");
        game_log("🌪️ Agitated!", "#00FFFF");
    }
}

// 🛡 Ưu tiên taunt quái đang đánh tank yếu, áp dụng khi fram, loại trừ đi boss siêu mạnh
if (
    mobsTargetingTank.length > 0 &&
    !is_on_cooldown("taunt") &&
    tank && !tank.rip &&
    tank.hp < 8000 &&
    character.hp > 11000
) {
	
    const mob = mobsTargetingTank.reduce((best, e) => {
    if (!best) return e;
    return (e.attack || 0) > (best.attack || 0) ? e : best;
}, null);  //chọn ra quái attack cao nhất


    if (is_in_range(mob, "taunt")) {
        await use_skill("taunt", mob.id);
        game_log(`🛡 Taunted quái đánh ${tank.name}: ${mob.mtype}`, "#AA00FF");
    }
} 
// 🧲 Nếu không thì taunt mob chưa có target (hút về để tiết kiệm mana) điều kiện thêm MP ynhi thấp hay nhân vật khác
else if (
    untargetedMobs.length > 0 &&
    !is_on_cooldown("taunt") &&
    tank && !tank.rip && tank.hp > 9500 &&
	(  (tank.name == "Ynhi" &&  tank.mp < 3000 ) || tank.name != "Ynhi"    ) &&
    character.hp > 14000
) {
    const mob = untargetedMobs[0];
    if (is_in_range(mob, "taunt")) {
        await use_skill("taunt", mob.id);
        game_log(`🧲 Taunted ${mob.mtype}`, "#AA00FF");
    }
}
// 🐷 ent chưa có target → chủ động đánh skill
else if (
    !is_on_cooldown("taunt") && tank && !tank.rip && tank.hp > 14500 && tank.mp > 2500 &&
    character.hp > 17000 && character.mp > 1000 && !character.target && get_nearest_monster({ type: "ent" })
) {
    const ent = get_nearest_monster1({
        type: "ent",
        NO_target: true,      // ❗ chưa có target
    });

    if (ent && is_in_range(ent, "taunt")) {
        await use_skill("taunt", ent.id);
        game_log(`🐷 Taunt ent (free pull)`, "#FF8800");
    }
}	
// 🐷 Pppompom chưa có target → chủ động đánh skill
else if (
    !is_on_cooldown("taunt") && tank && !tank.rip && tank.hp > 14500 && tank.mp > 2500 &&
    character.hp > 17000 && character.mp > 1000 && get_nearest_monster({ type: "pppompom" })
) {
    const pppompom = get_nearest_monster1({
        type: "pppompom",
        NO_target: true,      // ❗ chưa có target
    });

    if (pppompom && is_in_range(pppompom, "taunt")) {
        await use_skill("taunt", pppompom.id);
        game_log(`🐷 Taunt pppompom (free pull)`, "#FF8800");
    }
}



	
	
	
if (!is_on_cooldown("charge") && is_moving(character) ) {
    await use_skill("charge"); // Sử dụng kỹ năng "charge"
}


const mobstype = Object.values(parent.entities)
    .filter(entity => 
        entity.visible && entity.target && entity.target == character.name &&  
        !entity.dead && entity.damage_type == "physical" &&  
        distance(character, entity) <= 100  // Kiểm tra nếu khoảng cách 
    );	
if (!is_on_cooldown("hardshell") && character.hp < 12000 &&  mobstype.length >= 1) {
    await use_skill("hardshell"); // Sử dụng kỹ năng "hardshell" để bảo vệ nhân vật
}


let monstersAgo = ["gpurplepro","gredpro", "xmagefz","xmagefi","xmagex",];  // Mảng chứa các tên quái vật mạnh cần kiểm tra để share dame với tank piest
for (let id in parent.entities) {
    let current = parent.entities[id];  // Lấy thực thể hiện tại trong vòng lặp

    // Kiểm tra nếu thực thể là quái vật trong mảng và nó chưa nhắm vào nhân vật
    if (monstersAgo.includes(current.mtype) && current.hp > 32000 && current.target && current.target != character.name && f1 && character.hp >12000 && distance(character, f1) < 150 && tank && !tank.rip && tank.hp < 6000 && distance(character, tank) < 150 )  {
        
        // Kiểm tra nếu quái vật ở trong phạm vi kỹ năng "taunt" và kỹ năng này không đang trong thời gian hồi chiêu
        if (is_in_range(current, "taunt") && !is_on_cooldown("taunt")) {
            await use_skill("taunt", current.id); // Sử dụng kỹ năng "taunt" để gây sự chú ý của quái vật vào nhân vật
            game_log("Taunting " + current.name, "#FFA600"); // Ghi log thông báo đã taunt quái vật
        }
    }
	

}




}



function scytheSet() {
    unequip("offhand");
    equipBatch([
        { itemName: "bataxe", slot: "mainhand", level: 9, l: "l" },
    ]);
}

function basherSet() {
    unequip("offhand");
    equipBatch([
        { itemName: "basher", slot: "mainhand", level: 7 }
    ]);
}

//l: "l"  == L lock
let isEquipping = false; // Flag kiểm soát trạng thái

async function equipBatch(data) {
    if (isEquipping) {
       // game_log("equipBatch is already running. Skipping.");
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
            if (slotItem && slotItem.name === itemName && slotItem.level === level && (l === undefined || slotItem.l === l) ) {
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
























game.on('death', function (data) {
    if (parent.entities[data.id]) { // Check if the entity exists
        const mob = parent.entities[data.id];
        const mobName = mob.mtype; // Get the mob type
        const mobTarget = mob.target; // Get the mob's target (likely the killer)

        // Get your party members
        const party = get_party();
        const partyMembers = party ? Object.keys(party) : [];

        // Check if the mob's target was the player or someone in the party
        if (mobTarget === character.name || partyMembers.includes(mobTarget)) {
            game_log(`${mobName} died with ${data.luckm} luck by ${mobTarget}`, "#96a4ff");
        }
    }
});













const equipmentSets = {

    dps: [
        //{ itemName: "dexearring", slot: "earring2", level: 5, l: "l" },
        { itemName: "orbofstr", slot: "orb", level: 5, l: "l" },
        { itemName: "suckerpunch", slot: "ring1", level: 2, l: "l" },
        { itemName: "suckerpunch", slot: "ring2", level: 2, l: "u" },
    ],
    luck: [
        { itemName: "mshield", slot: "offhand", level: 7, l: "l" },
        { itemName: "rabbitsfoot", slot: "orb", level: 2, l: "l" } 
    ],
    UNluck: [
        { itemName: "orbofstr", slot: "orb", level: 5, l: "l" },
        //{ itemName: "tshirt88", slot: "chest", level: 0, l: "l" } 
    ],
    single: [
        { itemName: "fireblade", slot: "mainhand", level: 10, l: "s" },
        { itemName: "fireblade", slot: "offhand", level: 10, l: "l" },
    ],
    aoe: [
        { itemName: "vhammer", slot: "mainhand", level: 8, l: "l" },
        { itemName: "vhammer", slot: "offhand", level: 8, l: "s" },
    ],
    candycanesword: [
        { itemName: "candycanesword", slot: "mainhand", level: 1, l: "l" },
        { itemName: "candycanesword", slot: "offhand", level: 1, l: "s" },
    ],
    home: [
        { itemName: "supermittens", slot: "gloves", level: 9, l: "l" },
        { itemName: "fury", slot: "helmet", level: 8, l: "l" },
        { itemName: "coat", slot: "chest", level: 10, l: "l" },
        { itemName: "pants", slot: "pants", level: 10, l: "l" },

        { itemName: "strring", slot: "ring1", level: 5, l: "l" },
        { itemName: "strring", slot: "ring2", level: 4, l: "l" },
		
    ],
    def_magical: [
        { itemName: "fireblade", slot: "mainhand", level: 10, l: "s" },
        { itemName: "vgloves", slot: "gloves", level: 8, l: "l" },
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "xarmor", slot: "chest", level: 8, l: "l" },
        { itemName: "lantern", slot: "offhand", level: 4, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 1, l: "l" },
        { itemName: "t2stramulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "xpants", slot: "pants", level: 8, l: "l" },

        { itemName: "strring", slot: "ring1", level: 5, l: "l" },
        { itemName: "ringsj", slot: "ring2", level: 5, l: "l" },
		
    ],
    def_physical: [
        { itemName: "fireblade", slot: "mainhand", level: 10, l: "s" },
        { itemName: "vgloves", slot: "gloves", level: 8, l: "l" },
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "xarmor", slot: "chest", level: 8, l: "l" },
        { itemName: "sshield", slot: "offhand", level: 8, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 1, l: "l" },
        { itemName: "xpants", slot: "pants", level: 8, l: "l" },


    ],
    deff: [
        { itemName: "vgloves", slot: "gloves", level: 8, l: "l" },
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "xarmor", slot: "chest", level: 8, l: "l" },
        { itemName: "xpants", slot: "pants", level: 8, l: "l" },
		
		
    ],
    nodeff: [
        { itemName: "supermittens", slot: "gloves", level: 9, l: "l" },
        { itemName: "fury", slot: "helmet", level: 8, l: "l" },
        { itemName: "coat", slot: "chest", level: 10, l: "l" },
        { itemName: "pants", slot: "pants", level: 10, l: "l" },
        { itemName: "strbelt", slot: "belt", level: 5, l: "l" },
        { itemName: "snring", slot: "amulet", level: 2, l: "l"},
        { itemName: "orbofstr", slot: "orb", level: 5, l: "l" },
        { itemName: "strring", slot: "ring1", level: 5, l: "l" },
        { itemName: "strring", slot: "ring2", level: 4, l: "l" },
	    
    ],

    single_Magic: [
        { itemName: "fireblade", slot: "mainhand", level: 10, l: "s" },
        { itemName: "lantern", slot: "offhand", level: 4, l: "l" },
    ],

    single_physical: [
        { itemName: "fireblade", slot: "mainhand", level: 10, l: "s" },
        { itemName: "sshield", slot: "offhand", level: 8, l: "l" },
    ],
    def_bang: [
	    
    ],
    def_fire: [
        { itemName: "fireblade", slot: "mainhand", level: 10, l: "s" },
        { itemName: "lantern", slot: "offhand", level: 4, l: "l" },
        { itemName: "vgloves", slot: "gloves", level: 7, l: "l" },
        { itemName: "orba", slot: "orb", level: 3, l: "l" },
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "xarmor", slot: "chest", level: 8, l: "l" },
        { itemName: "xpants", slot: "pants", level: 8, l: "l" },

		
    ],
	
    def_magic_ORB: [
        { itemName: "fireblade", slot: "mainhand", level: 10, l: "s" },
        { itemName: "vgloves", slot: "gloves", level: 8, l: "l" },
        { itemName: "xhelmet", slot: "helmet", level: 8, l: "l" },
        { itemName: "xarmor", slot: "chest", level: 8, l: "l" },
        { itemName: "lantern", slot: "offhand", level: 4, l: "l" },
        { itemName: "sbelt", slot: "belt", level: 1, l: "l" },
        { itemName: "t2stramulet", slot: "amulet", level: 3, l: "l"},
        { itemName: "xpants", slot: "pants", level: 8, l: "l" },
        { itemName: "orba", slot: "orb", level: 3, l: "l" },

        { itemName: "strring", slot: "ring1", level: 5, l: "l" },
        { itemName: "ringsj", slot: "ring2", level: 5, l: "l" },
		
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


function get_nearest_monster_v2(args = {}) {
    let min_d = 999999, target = null;
    let optimal_hp = args.check_max_hp ? 0 : 999999999;

let lowHpValue = 0;
let lowHpTarget = null;
// --- LOGIC ƯU TIÊN ĐẶC BIỆT CHO MOB2 ---
    const mob2 = ["mrgreen", "mrpumpkin"]; // cẩn thận chỗ này, khi chưa xét điều kiện có Ynhi ở gần vi

    for (let id in parent.entities) {
        let current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;

// Nếu là Boss trong mob2 + bị Cursed + đang có Target -> TRẢ VỀ NGAY LẬP TỨC
        if (mob2.includes(current.mtype) && current.s && current.s.cursed && current.target) {
            return current; 
        }
		
        if (args.type && current.mtype != args.type) continue;
        if (args.min_level !== undefined && current.level < args.min_level) continue;
        if (args.max_level !== undefined && current.level > args.max_level) continue;
        if (args.target && current.target !== args.target) continue;
        if (args.no_target && current.target && current.target != character.name) continue;

        if (args.statusEffects && !args.statusEffects.every(effect => current.s[effect])) continue;

        if (args.min_xp !== undefined && current.xp < args.min_xp) continue;
        if (args.max_xp !== undefined && current.xp > args.max_xp) continue;

        if (args.max_att !== undefined && current.attack > args.max_att) continue;

        if (args.path_check && !can_move_to(current)) continue;

        let c_dist = args.point_for_distance_check
            ? Math.hypot(args.point_for_distance_check[0] - current.x, args.point_for_distance_check[1] - current.y)
            : parent.distance(character, current);

        if (args.max_distance !== undefined && c_dist > args.max_distance) continue;

// ------------ NEW FEATURE: CHECK LOW HP (ANTI OVERKILL) chỉ dùng cho quái home fram----------------
if (args.check_low_hp && current.mtype == home ) {

    // 1. Xác định ngưỡng "sắp chết" theo max_hp của quái
    const hpThreshold =
        current.max_hp >= 800000 ? 45000 :
        current.max_hp >= 200000 ? 20000 :
                                   7000;

    // 2. Chỉ xét quái:
    //    - Đã vào vùng sắp chết (<= threshold)
    //    - Nhưng chưa quá thấp máu (>= 1500) để tránh overkill
    if (current.hp <= hpThreshold && current.hp >= 2800) {

        // 3. Trong vùng này, chọn con có HP LỚN NHẤT
        if (current.hp > lowHpValue) {
            lowHpValue = current.hp;
            lowHpTarget = current;
        }
    }

    // 4. Vẫn tiếp tục loop để quét hết toàn bộ mob
    continue;
}
/////////////////////////

        // Nếu đang check max HP
        if (args.check_max_hp) {
            let c_hp = current.hp;
            if (c_hp > optimal_hp) {
                optimal_hp = c_hp;
                target = current;
            }
            continue;
        }

        // Mặc định: chọn quái gần nhất
        if (c_dist < min_d) {
            min_d = c_dist;
            target = current;
        }
    }

// Nếu bật check_low_hp → chỉ lấy quái HP thấp, không fallback HP cao
if (args.check_low_hp) {
    if (lowHpTarget) return lowHpTarget;
    return null;  // không có quái HP thấp thì trả null
}


    return target;
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
    if (character.mp < 2000) return;
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

    if ( is_on_cooldown("scare") ) return;
	
    const slot = character.items.findIndex(i => i && i.name === "jacko");
    const orb = character.items.findIndex(i => !i);

    // Các mtype đặc biệt với ngưỡng HP riêng
    const specialHPThresholds = {
        franky: 6000,
        xmagex: 7000
    };

    let mobnum = 0;
    let targetedForMoreThanOneSecond = false;

    for (let id in parent.entities) {
        const current = parent.entities[id];
        if (!current.target || current.target !== character.name) continue;

        let threshold = 3000; // mặc định

        // Ưu tiên nếu là mtype đặc biệt
        if (specialHPThresholds.hasOwnProperty(current.mtype)) {
            threshold = specialHPThresholds[current.mtype];
        } else {
            // Dựa trên chỉ số attack
            const atk = current.attack || 0;
            if (atk >= 5200) threshold = 6000;
            else if (atk >= 2200) threshold = 5500;
            else if (atk >= 1500) threshold = 5000;
            else if (atk >= 1000) threshold = 4500;
            else if (atk >= 700) threshold = 4000;
            else if (atk >= 500) threshold = 3500;
        }

        if (character.hp < threshold || smart.moving) {
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
            }, 400);
        }
    }
}

setInterval(scare, 1000);






function use_hp_or_mp1()
{
	if(safeties && mssince(last_potion)<min(200,character.ping*3)) return resolving_promise({reason:"safeties",success:false,used:false});
	var used=true;
	if(is_on_cooldown("use_hp")) return resolving_promise({success:false,reason:"cooldown"});
	
	
if (character.mp < 600 && character.hp > 5500 ) use_skill("use_mp");
  else if (character.hp/character.max_hp< 0.8 && character.mp > 100 ) use_skill("use_hp");
  else if (character.mp/character.max_mp < 0.95) use_skill("use_mp");

	
	else used=false;
	if(used)
		last_potion=new Date();
	else
		return resolving_promise({reason:"full",success:false,used:false});
}

setInterval(function() {
use_hp_or_mp1()
}, 200);






//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function on_party_request(name) {
if (name == "MuaBan" || name == "haiz1" || name == "nhiY" || name == "Ynhi" || name == "6gunlaZe"  || name == "angioseal" || name == "tienV" || name == "LyThanhThu" ) {
            accept_party_request(name);
        }
        if ((name == "haiz" || name == "angioseal") && bosstime == 0 ) {
            accept_party_request(name);
        }	
	
	
    }






let modeYnhi = 1 ///1 = Ynhi //2 = tienV // 0 == nhiY
let banktime 
let bosstime = 0 
let timekillboss
const TenMinutesInMs = 10 * 60 * 1000
const Ten7MinutesInMs = 7 * 60 * 1000
let bankk = 0
let trieuhoi = 0

let framjR = 0;

setInterval(function() {
	
	
if (bankk == 1 && Date.now() > banktime + Ten7MinutesInMs)
{
	bankk = 0
    start_character("MuaBan", 6);	
}	
//////////////////////////	Cho 10p danh boss
if (bosstime == 1 && Date.now() > (timekillboss + TenMinutesInMs) )
{	
	bosstime = 0
	if(parent.party_list.includes("nhiY"))stop_character("nhiY")
}	
//////////////////////	
	
	
  if (trieuhoi == 0)
  {
	  trieuhoi = 1
if(!parent.party_list.includes("6gunlaZe") && framjR == 0 && f2222 == "6gunlaZe" ) start_character("6gunlaZe", 33);
if(!parent.party_list.includes("MuaBan")) start_character("MuaBan", 6);
	  
const characterData = [
    ["Ynhi", 27],
    ["tienV", 45],
    ["nhiY", 12],
    ["LyThanhThu", 47],
];

const targets = [f1111, f2222];

targets.forEach(name => {
    if (!parent.party_list.includes(name)) {
        const found = characterData.find(c => c[0] === name);
        if (found) {
            start_character(found[0], found[1]);
        }
    }
});	  

	  
  }

}, 1000); //trieu hoi 1 lan dau lần đầu
///////////////////////////




setTimeout(function() {
	if (parent.S.icegolem || framjR == 0 )return
stop_character("6gunlaZe")
start_character("nhiY", 12);	
}, 10000); // 10000 milliseconds = 10 giây


let intervalId = setInterval(function() {
	if (parent.S.icegolem || framjR == 0 )return
    if (parent.party_list.includes("nhiY")) {
        send_cm("nhiY", "jr");
        clearInterval(intervalId);  // Dừng lại khi điều kiện đúng
    }
}, 5000); // Chạy mỗi 5 giây











 ///////////////////////// 
setInterval(function() {	
if ( events || bossvip > 0 ) return	
		
let region = server.region;
let serverIden = server.id

if (!parent.S.franky && !parent.S.icegolem && !parent.S.crabxx) //khong co su kien thi moi chuyen sv trở về nhà
{
if ( region == HOME_SERVER.region && serverIden == HOME_SERVER.id ) 
{
	game_log ("  SV  >>>>" + region + serverIden )
}
	else
	{
         if(character.hp > 8000)change_server(HOME_SERVER.region, HOME_SERVER.id);
	//change_server("ASIA", "I");	
	}
}	

// if(bosstime == 0 && parent.party_list.includes("nhiY")  && !smart.moving )stop_character("nhiY")
	
if(!parent.party_list.includes("MuaBan")) start_character("MuaBan", 6);
	
/////////////////	 ///tạm ngưng check cái này vì đã gọi check mỗi sự kiện khác nhau
/*	
if(!parent.party_list.includes("6gunlaZe") ) start_character("6gunlaZe", 33);

	
if (modeYnhi == 0 && prolive == 0)	 
{
if(!parent.party_list.includes("nhiY")) start_character("nhiY", 14);
}
else if  (modeYnhi == 1)
{
if(!parent.party_list.includes("Ynhi")) start_character("Ynhi", 27);	
}
else if  (modeYnhi == 2 && prolive == 0)
{
if(!parent.party_list.includes("haiz1")) start_character("haiz1", 29);	
}
*/	
///////////////

}, 100000); //40s trieu hoi 1 lan neu ko thay trong party, phai cho delay login 



//let autobuyPonty = 1; // bật auto chuyển sever
let autobuyPonty = 0; // tắt auto chuyển sever

let readyToSwitch = false;
let autorelog = 0







// Bước 1: đếm 2000s (33 phút) reset sever
setInterval(() => {
    game_log("Đã đủ 2000s. Đang chờ máu hồi để chuyển server...");
    readyToSwitch = true;
    autorelog += 1;
    waitForHPAndSwitch();
}, 3300000); // //55p



// Bước 2: kiểm tra máu liên tục khi đã sẵn sàng
function waitForHPAndSwitch() {

    let chests = get_chests();
    let chestIds = Object.keys(chests);
	

// ----------------------------
// Trường hợp autobuyPonty = 0 → Chế độ reset server / thời gian reset 2h = autorelog > 1 và nếu muốn tăng thì  + 1 mỗi tăng 1 giời reset sever ví dụ > 2 thì reset sau 3g
// ----------------------------
if (autobuyPonty === 0 && character.hp > 10000 && autorelog > 1) {

    // Không có chest → reset server
    if (chestIds.length === 0) {
		
        // Không có sự kiện thì mới chuyển
        if (prolive == 1 || events || framboss > 0 || bossvip > 0 || framtay > 0) return;
        if (parent.S.franky || parent.S.icegolem) return;
		
        parent.api_call("disconnect_character", { name: "haiz" });
        return;
    }

    // Có chest → loot rồi đợi 5s check lại
    for (let id of chestIds) {
        loot(id);
    }

    setTimeout(waitForHPAndSwitch, 5000);
    return;
}




	
    if (!readyToSwitch || autobuyPonty != 1) return;



        for (let id of chestIds) {
            loot(id);
        }

	
    if (character.hp > 10000 && chestIds.length == 0) {
        // Không có sự kiện thì mới chuyển
        if (prolive == 1 || events || framboss > 0 || bossvip > 0 || framtay > 0) return;
        if (parent.S.franky || parent.S.icegolem) return;
	    
 
// BỎ HOME SERVER
const targets = SERVER_RULES.filter(
    s => !(s.region === HOME_SERVER.region && s.id === HOME_SERVER.id)
);

if (targets.length === 0) return;

// TÍNH TỔNG WEIGHT
let total = 0;
for (const s of targets) total += s.weight;

// RANDOM
let roll = getRandom(1, total);

// CHỌN SERVER
let acc = 0;
for (const s of targets) {
    acc += s.weight;
    if (roll <= acc) {
        change_server(s.region, s.id);
        break;
    }
}




		


		
    } else {
        game_log("Máu chưa đủ (" + character.hp + "). Đang chờ...");
        setTimeout(waitForHPAndSwitch, 5000); // Kiểm tra lại sau 5s
    }
}



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


setInterval(function() {
    if (character.esize < 17) {
	const MuaBan = (parent.party_list ?? []).some(c => c === 'MuaBan');	
    if (!MuaBan) {
      start_character("MuaBan", 6);
		game_log("trieu hoi MuaBan!!");
	}
	}
}, 160000); //

setInterval(function() {	
    if (character.esize > 25) {
       	const MuaBan = (parent.party_list ?? []).some(c => c === 'MuaBan');	
    if (MuaBan) {
	start_character("MuaBan", 6);	
		game_log(" MuaBan da xong nhiem vu!!");
	}
	}
}, 9900000); // auto re connet mua ban moi 3h


setInterval(function() {
 if (character.rip) { ///////auto hoi sinh
	 framtay = 0
    respawn();
  }
}, 220000);

function on_magiport(name){
    if(name == "nhiY"){
        accept_magiport(name);
	    stop()
    }
}



let frankymode = 0
let framboss = 0
let framboss1 = 0

function on_cm(name, data) {

 if(name == "Ynhi" && data == "hardreset")parent.api_call("disconnect_character", {name: "haiz"});


////////////////////
 if(name == "nhiY" && data == "boss1"){
		  bosstime = 1
	    timekillboss = Date.now()
	  framboss = 1
 }
 if(name == "nhiY" && data == "stop"){
stop_character("nhiY") 
// start_character("6gunlaZe", 33);
 }	
/////////////////
if (name == "MuaBan") {
    if (data === "framtay") framtay = 1;

    if (data === "bank") {
        start_character("MuaBan", 10);
        banktime = Date.now();
        bankk = 1;
    }

    if (framboss > 0) return;

    // Xử lý boss thường: boss1 → boss99 BOSS PHƯỢNG HOÀNG LỬA
    const bossMatch = data.match(/^boss(\d+)$/);
    if (bossMatch && !events && prolive !== 1 && bossvip === 0 && framtay === 0) {
        const bossNum = parseInt(bossMatch[1]);
        framboss = bossNum;


            parent.api_call("disconnect_character", { name: f2222 });
            stop_character(f2222);
        

        bosstime = 1;
        timekillboss = Date.now();
        start_character("nhiY", 12);
        return;
    }

    // Xử lý boss VIP: bossvip1 → bossvip99
    const vipMatch = data.match(/^bossvip(\d+)$/);
    if (vipMatch && !events && framtay === 0) {
        bossvip = parseInt(vipMatch[1]);
        return;
    }

    // Boss không tank được, bật nhóm đánh riêng
    if (data === "franky" || data === "crabxx") {
        bosscantank = 1;
   //     stop_character("angioseal");
   //     stop_character("nhiY");
   //     stop_character("haiz1");

   //     if (!parent.party_list.includes("6gunlaZe")) start_character("6gunlaZe", 33);
   //     if (!parent.party_list.includes("Ynhi")) start_character("Ynhi", 27);
    }
}
///////////////
	
}






setInterval(function() {
////////////giửi vị trí mỗi 2s
let checkdichuyen = smart;  // checkdichuyen sẽ là smart, đối tượng dữ liệu 
	const foxmode11 = (parent.party_list ?? []).some(c => c === 'nhiY');
let SM = 0;
if (checkdichuyen.plot && checkdichuyen.plot.some(p => p.x !== undefined && p.y !== undefined)) {
  SM = 1;  // Nếu có ít nhất một điểm có vị trí x, y hợp lệ
}

if (SM === 1) {
  let x = checkdichuyen.x;
  let y = checkdichuyen.y;
  let map = checkdichuyen.map;
//if (foxmode11)send_cm("nhiY",checkdichuyen)  // đặc cach cho nhiY
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

	if(character.esize < 6 || !character.s.mluck || character.s.mluck.f !== "MuaBan")
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
						// game_log("so luong  la "+soluongmp);

            }
            if (item.name == "hpot1" ) {
                // This is an item we want to use!
                    soluonghp += item.q//tim ra vi tri mon do
						// game_log("so luong  la "+soluonghp);

            }				
			}
	/////////		
	
	if( (soluonghp < 4000 ) )
	{
		send_cm("MuaBan", "hp");
		game_log("re filll !!!!!!");
	}
		if( ( soluongmp < 4000) )
	{
		send_cm("MuaBan", "mp");
		game_log("re filll !!!!!!");
	}
	
}, 20000);

///////////



////////////////////////////////chuyen do tu dong cho nhan vat muaban ///chuyendo/// giuido

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

    let itemsToExclude = ["fieldgen0","frozenkey","spiderkey","candycanesword","elixirfires","hotchocolate","tombkey","elixirluck","hboots","cryptkey","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome", "jacko","tracker","supermittens","mittens","xgloves","exoarm","hhelmet","fury","wbasher", "basher","bataxe","tigerstone","rabbitsfoot"];

    for (let i = 0; i < 42; i++) {
        const item = character.items[i];

        // Check if the item is not in the exclusion list, and doesn't have locked or sealed properties
        if (item && !itemsToExclude.includes(item.name) && !item.l && !item.s) {
            send_item(lootMule.id, i, item.q ?? 1);
        }
    }
}, 1000);




////////////////////////////////////////////////////////
setInterval(function() {
lootAllChests()
}, 2000);

shifting()

function shifting() {
    shift(0, 'xpbooster');
}

function shifting1() {
shift(0, 'luckbooster')
}


function lootAllChests() {
    let chests = get_chests();
    let chestIds = Object.keys(chests);

    if (chestIds.length > 20 || smart.moving || character.map == "mansion" ) {
	  shift(0, 'goldbooster');   
        for (let id of chestIds) {
            loot(id);
        }    
	 setTimeout(shifting, 550);  
    }
    else if (get_nearest_monster({ type: home }) )
   {    
	 setTimeout(shifting, 550);  
    }
	else
    {
	    shift(0, 'luckbooster')
    }

}



///////////////////////////////

let currentServerParty = null;
// CẬP NHẬT PARTY THEO SERVER ĐANG ĐỨNG
///////////////////////

function updateServerParty() {
    currentServerParty = SERVER_PARTY_MAP.find(s =>
        s.region === server.region &&
        s.id === server.id
    ) || null;
}

// Đổi nhân vật THEO HOME SERVER MAP đã khai báo lúc đầu
///////////////////////

function autoPartyCheckByCurrentServer(interval = 50000) {

    updateServerParty();

    if (!currentServerParty) return; // server không cấu hình

    autoPartyCheck(
        currentServerParty.f1,
        currentServerParty.f2,
        interval
    );
}




//////////////////////////////
let checktimeparty = 0
let partychecktime

function autoPartyCheck(f1name, f2name, interval = 60000) {
    // Lần chạy đầu tiên: set mốc thời gian
    if (checktimeparty === 0) {
        partychecktime = Date.now() - interval; // lần đầu tiên gọi hàm là chạy luôn -> nhanh chóng tới vị trí fram even
        checktimeparty = 1;
    }

    // Mỗi interval ms mới chạy
    if (Date.now() > partychecktime + interval) {
        partychecktime = Date.now();

        const playerNames = ['haiz1', 'nhiY', 'Ynhi', '6gunlaZe', 'tienV' , 'LyThanhThu' ];
        const characterData = [
            ["6gunlaZe", 33],
            ["Ynhi", 27],
            ["tienV", 45],
            ["nhiY", 12],
            ["LyThanhThu", 47],

        ];

        // Stop các char không phải f1/f2
        playerNames.forEach(name => {
            if (name !== f1name && name !== f2name) {
                stop_character(name);
            }
        });

        // Start lại char nếu là f1/f2 mà chưa có trong party_list
        characterData.forEach(([name, level]) => {
            if (name === f1name || name === f2name) {
                if (!parent.party_list.includes(name)) {
                    start_character(name, level);
                }
            }
        });
    }
}



//////////////

function handlebossPro(eventType, mapName, x, y, hpThreshold,f1name,f2name) {
    if (parent?.S?.[eventType]) {
              Now_is_gobalevenrun = true
	    
	    if(eventType == "crabxx")send_cm(f2name, "crabxx");   
	    
        const monster = get_nearest_monster({ type: eventType });
        if (monster) {
            if (monster.hp > hpThreshold ) {
                if (character.cc < 100) {
			if ( (eventType == "franky" && monster.target == "haiz") ||  eventType == "crabxx"  )
			{
			equipSet('aoe');	
			}
			else
			{
			equipSet('single');	
			}
                   
                }
            } else if (character.cc < 100) {
                equipSet('luck');
		    setTimeout(startLuckTimer, 30000);
            }
        }
	    else
	{
	 if (!smart.moving) smart_move({ x, y, map: mapName });
	}


var BOSS = eventType

	var targetfk
	targetfk= get_nearest_monster({type: BOSS});

	///gioi han vong tron fight + check member
		var f1 = get_player(f1name); 
		var f2 = get_player(f2name); 

	    
//////////////bo chay khi moi nguoi chay het
if(targetfk && get_nearest_playerV_noMyparty(targetfk) <=1 && character.hp < 6000 && !smart.moving)
{
events = false;
bosscantank = 0;
stop_character(f2name)  	
stop_character(f1name)  
stop_character("MuaBan")
if(eventType == "franky")
{
	smart_move({ map: "level2", x: -277, y: -67 })	
}
	else
{
	smart_move(destination)
}
if (eventType == "icegolem") {
let region = server.region;
let serverIden = server.id
if ( region == HOME_SERVER.region && serverIden == HOME_SERVER.id ) 
{
change_server(RUN_SERVER.region, RUN_SERVER.id);	
}
	else
	{
         change_server(HOME_SERVER.region, HOME_SERVER.id);
	}
}
}
//////////////////////////
if(targetfk  && character.hp < 4500)
{
if (eventType == "icegolem") {
let region11 = server.region;
let serverIden11 = server.id
if ( region11 == HOME_SERVER.region && serverIden11 == HOME_SERVER.id ) 
{
change_server(RUN_SERVER.region, RUN_SERVER.id);	
}
	else
	{
         change_server(HOME_SERVER.region, HOME_SERVER.id);
	}
}
	else
{
parent.api_call("disconnect_character", {name: "haiz"});
}
}	    
////////////////////////////////
autoPartyCheck(f1name, f2name, 60000);
//////////hút quái nếu đồng minh bị dí

var targetf1	
var targetf2 

if (f1 && character.hp > 9000)
{
targetf1 = getBestTargets({ max_range: 180 , target: f1name , number : 1 }) 
if(targetf1 && (f1.hp/f1.max_hp) < 0.55 && character.mp > 100 && !is_on_cooldown("taunt") )use_skill("taunt", targetf1);
}        
		
if (f2 && character.hp > 5500)
{
targetf2 = getBestTargets({ max_range: 180 , target: f2name , number : 1 }) 
if(targetf2 && (f2.hp/f2.max_hp) < 0.65 && character.mp > 100 && !is_on_cooldown("taunt") )use_skill("taunt", targetf2);
	
} 
	    
//nếu mọi người bỏ chạy nhưng mình vẫn còn gánh được
var f33
if (f2 && f1 && character.hp > 11500 && targetfk)
{
if( (targetfk.hp/ targetfk.max_hp) < 0.85  && !targetfk.target && character.mp > 100 && !is_on_cooldown("taunt") )use_skill("taunt", targetfk);	
if(targetfk.target && targetfk.target != character.name )f33 = get_player(targetfk.target);	
if(f33 && f33.level && f33.level < 84  && character.mp > 100 && !is_on_cooldown("taunt") )use_skill("taunt", targetfk);		
}	    
//////////
    }
}








function NOTsoloboss(options = {}) {
    const entities = []
     let number = 0
     let checkkill = 0
	var bossarmy=["icegolem", "franky" , "crabxx", "oneeye" ]; 
	
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

	    checkkill = get_nearest_playerV_noMyparty(entity)
	    if (checkkill < 0)continue
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




let priorityTargets = ["6gunlaZe"];
let bossarmycheckkill=["icegolem", "franky" , "crabxx" ]; 

function get_nearest_monster1(args)
{
	let checkkill = 0;
	var heal = get_player("Ynhi"); 
	var heal1 = get_player(f2222); 

	if (!heal && character.hp < 13000) return null;
	if (!heal && !heal1) return null;	

	if(!args) args={};
	if(args && args.target && args.target.name) args.target=args.target.name;

	let min_d = character.range + 225;
	let target = null;

	// ==============================
	// 🔥 PASS 1: Ưu tiên quái đang target người chỉ định
	// ==============================
	for(id in parent.entities)
	{
		let current = parent.entities[id];
		if(current.type!="monster" || !current.visible || current.dead) continue;

		if(!priorityTargets.includes(current.target)) continue;

		if (bossarmycheckkill.includes(current.mtype)) {
			checkkill = get_nearest_playerV_noMyparty(current);
			if (checkkill < 2) continue;
		}

		let c_dist = parent.distance(character, current);
		if(c_dist < min_d) {
			min_d = c_dist;
			target = current;
		}
	}

	// Nếu đã tìm được → trả luôn
	if(target) return target;

	// ==============================
	// PASS 2: Logic cũ (gần nhất)
	// ==============================
	min_d = character.range + 225;
	target = null;

	for(id in parent.entities)
	{
		let current = parent.entities[id];
		if(current.type!="monster" || !current.visible || current.dead) continue;
		if(args.type && current.mtype!=args.type) continue;
		if(args.min_xp && current.xp<args.min_xp) continue;
		if(args.max_att && current.attack>args.max_att) continue;
		if(args.target && current.target!=args.target) continue;
		if(args.no_target && current.target && current.target!=character.name) continue;
		if(args.NO_target && current.target) continue;

		if (bossarmycheckkill.includes(current.mtype)) {
			checkkill = get_nearest_playerV_noMyparty(current);
			if (checkkill < 2) continue;
		}

		if(args.path_check && !can_move_to(current)) continue;

		let c_dist = parent.distance(character,current);
		if(c_dist < min_d) {
			min_d = c_dist;
			target = current;
		}
	}
	return target;
}
















function get_nearest_playerV_noMyparty(currentTarget)
{
	// Just as an example
	var min_d=2000,target=0;

	for(id in parent.entities)
	{
		var current=parent.entities[id];
		if(!current.player) continue;
    if(current.id == "haiz1" || current.id == "Ynhi" || current.id == "6gunlaZe" || current.id == "haiz" || current.id == "nhiY" || current.id == "tienV" || current.id == "LyThanhThu"  ) continue;
		if(current.target == currentTarget.id) target +=1;
	}
	//game_log("so luong nguoi choi kill boss la: " + target)
	return target;
}




async function moveLoop() {
    let delay = 1000;
    try {

        // ===== SKIP nếu không di chuyển đc =====
        if (smart.moving || is_disabled(character)) {
            return setTimeout(moveLoop, 150);
        }
		

if(gobaltaget && !is_in_range(gobaltaget) && distance(character, gobaltaget)  < 500 && !smart.moving && gobaltaget.visible && !gobaltaget.dead)
{
	if (movesuper == 1)return	
		xmove(
			gobaltaget.x,
			gobaltaget.y
			);
}
else
{
	gobaltaget = null;
}

// điều hướng khi đang ở franky
const franky = get_nearest_monster({ type: "franky" });

if (franky && franky.target === character.name && distance(character, { x: 14, y: 30 } ) > 30 ) {
    xmove(14, 30);
}
else if (franky && franky.target === "Ynhi" && distance(franky, { x: 14, y: 30 } ) > 70  ){
if ( distance(character, { x: 14, y: 30 } ) > 30 ) xmove(14, 30);
use_skill("taunt", franky.id);	
}
		

	    
if (!events || prolive == 0){

	// const foxmode11 = (parent.party_list ?? []).some(c => c === 'nhiY');
	const foxmode11 = true
	const nearB = get_player("nhiY");

if (framboss > 0  && foxmode11 )send_cm("nhiY", "foxmode");
	
	
if (framboss == 1 && !smart.moving && foxmode11  && framboss1  <2   ){
	smart_move({ map: "spookytown", x: -728, y: -123 }, () => {
framboss1 += 1
    });
}
if (framboss == 2 && !smart.moving && foxmode11  && framboss1  <2 ){
	smart_move({ map: "cave", x: 68, y: -1163 }, () => {
framboss1 += 1
    });
}	
if (framboss == 3 && !smart.moving&& foxmode11  && framboss1  <2 ){
	smart_move({ map: "cave",  x: 982, y: 105 }, () => {
framboss1 += 1
    });
}		
if (framboss == 4 && !smart.moving && foxmode11  && framboss1 <2  ){
	smart_move({ map: "main", x: 1312, y: -200 }, () => {
framboss1 += 1
    });
}	
if (framboss == 5 && !smart.moving && foxmode11  &&framboss1 <2  ){
	smart_move({ map: "main", x: 700, y: 1800 }, () => {
framboss1 += 1
    });
}	
if (framboss == 6 && !smart.moving && foxmode11  && framboss1 <2  ){
	smart_move({ map: "halloween", x: -140, y: 512 }, () => {
framboss1 += 1
    });
}	
if (framboss == 7 && !smart.moving && foxmode11  && framboss1 <2  ){
	smart_move({ map: "main", x: -1137, y: 455 }, () => {
framboss1 += 1
    });
}
if (framboss == 8 && !smart.moving && foxmode11  && framboss1 <2  ){
	smart_move({ map: "halloween", x: -550, y: -450 }, () => {
framboss1 += 1
    });
}

	
	
	
if (framboss == 10 && !smart.moving && foxmode11  && framboss1 <2  ){
	//send_cm("angioseal", "boss7");

	if (currentBossLocation) {
	smart_move({ map: currentBossLocation.map, x: currentBossLocation.x, y: currentBossLocation.y }, () => {
framboss1 += 1
    });
}	
}

if ( framboss1 > 0 && !smart.moving ){	
//if ( nearB  && framboss1 > 0 && !smart.moving ){	
var  targetsoloboss = soloboss({ max_range: 400, number : 1 }) 
if (targetsoloboss.length == 0) //danh xong
	{
		framboss1 = 0
		framboss = 0
		bosstime = 0
		loot();
		loot();
		smart_move(destination, () => {
		framboss = 0
		 stop_character("nhiY")
		// if(!parent.party_list.includes("6gunlaZe")) start_character("6gunlaZe", 33);
                 bosstime = 0

    });	

	}
		
}

	    
}
    } catch (e) {
        console.error(e);
    }
    setTimeout(moveLoop, delay);
}

moveLoop();

//["phoenix", "jr","greenjr", "mvampire"];
const monstersfarm = ["jr11111111","greenjr1111111", "mvampire111111"]; // Danh sách các boss ID
let currentBossLocation = null;


// Đặt vòng lặp mỗi 10 giây
setInterval(() => {
moveToBossIfFound(monstersfarm, 100000000);  // Hàm sẽ tìm boss có HP thấp nhất và di chuyển đến vị trí của boss đó
}, 20000);  // 20 giây





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






async function moveToBossIfFound(monsters, HP) {

if (prolive == 1 || events || bossvip > 0 || framtay > 0) return	
	
  const bossLocation = await BosscheckHPMYSv11(monsters, HP);

  // Nếu tìm thấy boss có HP thấp nhất, di chuyển đến vị trí của boss
  if (bossLocation && framboss == 0) {
    framboss = 10;

		parent.api_call("disconnect_character", {name: f2222});
		stop_character(f2222);

	    bosstime = 1
	    timekillboss = Date.now()
	  start_character("nhiY", 12);
    currentBossLocation = bossLocation
   // smart_move({ map: bossLocation.map, x: bossLocation.x, y: bossLocation.y });
  } else {
    game_log("Không tìm thấy boss để di chuyển đến.");
  }
}




// Biến lưu trữ các ID boss đã xuất tọa độ
const seenBossIds = new Set();

async function BosscheckHPMYSv11(monsters, HP) {
  // Safety Checks
  if (!Array.isArray(monsters) || monsters.length === 0) {
    game_log("Không có quái vật nào trong danh sách");
    return;
  }

  // Lấy thông tin region và serverIden
  const region = server.region;
  const serverIden = server.id;

  // URL API để lấy thông tin quái vật
  const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");

  try {
    // Gửi request đến API
    const response = await fetch(url);

    // Kiểm tra nếu response trả về mã trạng thái 200
    if (response.status === 200) {
      const data = await response.json();

      // Lọc các đối tượng hợp lệ có HP thấp hơn và thuộc server của bạn, đồng thời target không phải là "haiz", "ynhi", "nhiY"
      const validObjects = data.filter(obj => 
        obj.hp !== undefined && 
        obj.hp < HP && 
        obj.serverRegion === region && 
        obj.serverIdentifier === serverIden &&
	obj.target == undefined  //chỉ đánh những quái chưa có ai đánh
        //obj.target !== "haiz" && obj.target !== "Ynhi" && obj.target !== "nhiY"
      );

      // Nếu tìm thấy các đối tượng hợp lệ
      if (validObjects.length > 0) {
        game_log(`Tìm thấy ${validObjects.length} boss phù hợp!`);

        // Kiểm tra từng boss
        for (const boss of validObjects) {
          // Kiểm tra xem boss này đã xuất tọa độ chưa
          if (!seenBossIds.has(boss.id)) {
            // Đánh dấu boss đã xuất tọa độ
            seenBossIds.add(boss.id);

            // Trả về tọa độ của boss đầu tiên chưa xuất tọa độ
            game_log(`Boss ${boss.id} có tọa độ: (${boss.x}, ${boss.y}), Map: ${boss.map}`);

            return { x: boss.x, y: boss.y, map: boss.map }; // Trả về tọa độ của boss
          }
        }

        // Nếu không tìm thấy boss nào chưa xuất tọa độ
        game_log("Tất cả các boss đã xuất tọa độ hoặc không hợp lệ.");
        return null;
      } else {
        game_log("Không tìm thấy boss nào có HP thấp hơn yêu cầu trong server của bạn");
        return null; // Nếu không tìm thấy boss nào
      }
    } else {
      game_log(`Lỗi khi lấy dữ liệu từ API: ${response.status}`);
      return null; // Nếu có lỗi khi gọi API
    }
  } catch (error) {
    // Xử lý lỗi nếu fetch không thành công
    game_log(`Lỗi kết nối: ${error}`);
    return null; // Nếu có lỗi kết nối
  }
}




async function checkCrabxx() {

   if (events || framtay == 1) return	

	
	const monsters = ["crabxx"];
	const hpThreshold = 900000;

	const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");
	const response = await fetch(url);
	if (response.status !== 200) return;

	const data = await response.json();
	const validObjects = data.filter(obj =>
		obj.hp !== undefined &&
		obj.hp < hpThreshold &&
		obj.serverIdentifier != "PVP"
	);

	if (validObjects.length > 0) {
		let minHpObject = validObjects.reduce((min, obj) => obj.hp < min.hp ? obj : min);
		let sR = minHpObject.serverRegion;
		let sI = minHpObject.serverIdentifier;

		game_log("chuyen crabxx SV >>>> " + sR + sI);

		let region = server.region;
		let serverIden = server.id;

		if (sI != "PVP" && !(sR == region && sI == serverIden)) {
			change_server(sR, sI);
		}
	}
}





setInterval(() => {
	checkCrabxx();  
}, 90000); // kiểm tra mỗi 30 giây




setTimeout(() => {
    // chạy lần đầu sau 3s
    checkServersForMonsters(["franky"], ["icegolem"], ["dragold"]);

    // sau đó chạy mỗi 20s
    setInterval(() => {
        checkServersForMonsters(["franky"], ["icegolem"], ["dragold"]);
    }, 20000);

}, 3000);



// Chạy lần đầu sau 7 giây
setTimeout(() => {
//  checkServersForPumpkinGreen();  //tạm ngưng

  // Sau đó chạy định kỳ mỗi 90 giây
  setInterval(() => {
 //   checkServersForPumpkinGreen();
  }, 90000);

}, 7000); // 7 giây


// setInterval(() => watchBosses(["mrpumpkin", "mrgreen"]), 16000); //check boss gần ra thì không cho đi

//////////////////////////////////////////////////
async function checkServersForMonsters(monsters, monsters1, monsters2) {
  // 1. Kiểm tra nhanh điều kiện cơ bản
if (events || framtay == 1) return;

  const BOSS_CONFIG = [
    { name: "franky", list: monsters, hpMax: 120000000, hpDelta: 4000000, setCantank: true, priority: 3 },
    { name: "icegolem", list: monsters1, hpMax: 14000000, hpDelta: 0, setCantank: false, priority: 2 },
    { name: "dragold", list: monsters2, hpMax: 25700000, hpDelta: 0, setCantank: false, priority: 1 }
  ];

  // Gom tên quái để gọi 1 lần
  const allNames = [...new Set([...monsters, ...monsters1, ...monsters2])];
  if (allNames.length === 0) return;

  try {
    const res = await fetch("https://aldata.earthiverse.ca/monsters/" + allNames.join(","));
    if (res.status !== 200) return;
    const allData = await res.json();

    // Sắp xếp ưu tiên (Priority 1 chạy trước)
    const sortedConfigs = BOSS_CONFIG.sort((a, b) => a.priority - b.priority);

    for (const boss of sortedConfigs) {
      // LỌC THÔNG MINH:
      // - Phải có thuộc tính 'hp' (nghĩa là nó đang sống)
      // - Phải đúng loại type trong list của boss đó
      // - Không tính server PVP
      // - Máu phải thấp hơn mức quy định (hpMax - hpDelta)
      const liveBosses = allData.filter(obj => 
        obj.hp !== undefined && 
        boss.list.includes(obj.type) &&
        obj.serverIdentifier !== "PVP" &&
        obj.hp < (boss.hpMax - boss.hpDelta)
      );

      if (liveBosses.length === 0) continue;

      // Chọn con ít máu nhất trong đám đang sống
      const target = liveBosses.reduce((min, obj) => (obj.hp < min.hp ? obj : min));

      const sR = target.serverRegion;
      const sI = target.serverIdentifier;

      game_log(`Target: ${boss.name} | HP: ${target.hp} | SV: ${sR} ${sI}`);

      // Thực hiện chuyển server hoặc set biến
      if (!(sR === server.region && sI === server.id)) {
        change_server(sR, sI);
      } else if (boss.setCantank) {
        bosscantank = 1;
      }

      return; // Tìm thấy boss ưu tiên cao nhất rồi thì nghỉ, không check boss thấp hơn
    }

    game_log("Khong tim thay doi tuong nao hop le.");
  } catch (e) {
    game_log("Lỗi hệ thống check boss: " + e.message);
  }
}



/////////////////////////////////////////////////////


var bossIncoming = 0; // 0 = không có boss sắp spawn, 1 = có

function watchBosses(bossNames) {
  let found = false; // tạm để đánh dấu nếu có boss sắp spawn
	

// Chỉ chạy nếu đang ở HOME
if (server.region === HOME_SERVER.region && server.id === HOME_SERVER.id) {
    // Thực hiện check boss, để bossIncoming bình thường


for (let name of bossNames) {
  const data = parent?.S?.[name];  // optional chaining
  if (!data) continue;

  if (data?.live) {
    game_log(`💥 ${name} đang sống!`);
    found = true;
  } else if (data?.spawn) {
    const spawnTime = new Date(data.spawn).getTime();
    const diff = spawnTime - Date.now();
    const mins = diff / 60000;

    if (diff > 0) {
      game_log(`⏰ ${name} spawn sau ${mins.toFixed(1)} phút`);
      if (mins <= 15) found = true;
    } else {
      game_log(`✅ ${name} có thể đã spawn hoặc sắp xuất hiện!`);
      found = true;
    }
  }
}



  // cập nhật biến toàn cục
  bossIncoming = found ? 1 : 0;

	
} else {
    // Nếu không phải HOME, reset bossIncoming
    bossIncoming = 0;
    return;
}






	
	

}







/////////////////////////////////////////////////


async function checkServersForPumpkinGreen() {

 if (events || framtay == 1 || bossIncoming == 1 || bossvip > 0 ) return	
	
  // Cấu hình ngưỡng HP riêng cho từng boss
  const bossSettings = {
    mrpumpkin: 35800000,   // ngưỡng HP tùy chỉnh
    mrgreen: 35800000
  };

  // Danh sách boss cần kiểm tra
  const bosses = Object.keys(bossSettings);

  // Lưu danh sách server có boss phù hợp
  let foundTargets = [];

  // Kiểm tra từng boss
  for (let boss of bosses) {
    try {
      const url = `https://aldata.earthiverse.ca/monsters/${boss}`;
      const response = await fetch(url);
      if (response.status !== 200) continue;

      const data = await response.json();
      const filtered = data.filter(obj =>
        obj.hp !== undefined &&
        obj.hp < bossSettings[boss] &&           // HP thấp hơn ngưỡng
		obj.hp > 15000000 &&                     //ít nhất phải lớn hơn 10tr máu mới đáng nhảy qua  
        obj.serverIdentifier !== "PVP"           // loại bỏ server PVP
      );

      if (filtered.length > 0) {
        // chọn boss máu thấp nhất
        const minHpObj = filtered.reduce((min, obj) => obj.hp < min.hp ? obj : min);
        foundTargets.push({
          name: boss,
          hp: minHpObj.hp,
          region: minHpObj.serverRegion,
          server: minHpObj.serverIdentifier
        });
      }
    } catch (e) {
      game_log(`❌ Lỗi khi fetch dữ liệu boss ${boss}: ${e}`);
    }
  }

  // Không tìm thấy boss phù hợp
  if (foundTargets.length === 0) {
    game_log("🌀 Không có boss phù hợp để chuyển.");
    return;
  }

  // Ưu tiên theo vị trí hiện tại: nếu gần xscorpion thì chọn mrpumpkin trước
  let nearScorpion = false;
  const scorpion = get_nearest_monster({ type: "xscorpion" });
  if (scorpion && distance(character, scorpion) < 400) {
    nearScorpion = true;
  }


 let targetBoss;
	
// 1. Ưu tiên boss đang ở server home 
const homeServer = foundTargets.find(t => t.region === HOME_SERVER.region && t.server === HOME_SERVER.id);

if (homeServer) {
  targetBoss = homeServer;
} else if (nearScorpion) {
  // 2. Nếu gần Scorpion, ưu tiên MrPumpkin
  targetBoss =
    foundTargets.find(t => t.name === "mrpumpkin") ||
    foundTargets[0];
} else {
  // 3. Nếu không gần Scorpion, chọn boss HP thấp nhất
  targetBoss = foundTargets.reduce((min, t) => t.hp < min.hp ? t : min);
}


  // Nếu server khác server hiện tại thì chuyển
  const currentRegion = server.region;
  const currentId = server.id;

  if (targetBoss.server !== "PVP" &&
      !(targetBoss.region === currentRegion && targetBoss.server === currentId)) {
    game_log(`🚀 Chuyển sang server ${targetBoss.region}${targetBoss.server} để săn ${targetBoss.name}`);
    change_server(targetBoss.region, targetBoss.server);
  } else {
    game_log(`✅ Đã ở đúng server có ${targetBoss.name}`);

    // --- Thêm bossvip ở đây --- để bắt đầu di chuyển
    if (targetBoss.name === "mrpumpkin") bossvip = 4;
    else if (targetBoss.name === "mrgreen") bossvip = 5;
	  
  }
}




///////////////////////////////////////////////////////

let check_ice = 0
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













let movesuper = 0
////////////////////////////////////////////////////////////////////////////////
// Extra range to add to a monster's attack range to give more wiggle room
const rangeBuffer = 8;

// How far away we want to consider monsters
const calcRadius = 300;

// Types of monsters we want to avoid
const avoidTypes = ["a1","a4","a6","a8","a9","a10"];

const avoidPlayers = false; // Set to false to not avoid players at all
const playerBuffer = 0; // Additional range around players
const avoidPlayersWhitelist = []; // Players to avoid differently
const avoidPlayersWhitelistRange = 30; // Set to null to not avoid whitelisted players
const playerRangeOverride = 3; // Overrides how far to avoid, set to null to use player range
const playerAvoidIgnoreClasses = ["merchant"]; // Classes we don't want to avoid

// Tracking when we send movements to avoid flooding the socket
let lastMove;

// Whether we want to draw the various calculations visually
const drawDebug = false;


function avoidance() {
	if (smart.moving)return
    if (drawDebug) {
        clear_drawings();
    }

    // Try to avoid monsters
    const avoiding = avoidMobs();

    if (avoiding) {
movesuper = 1
    }
	else 
    {
movesuper = 0   
    }

}
setInterval(avoidance, 100);

function avoidMobs() {
    let maxWeight = -Infinity;
    let maxWeightAngle = 0;

    const monstersInRadius = getMonstersInRadius();
    const avoidRanges = getAnglesToAvoid(monstersInRadius);
    const inAttackRange = isInAttackRange(monstersInRadius);

    // If we are in attack range or need to avoid monsters, find the safest direction to move
    if (inAttackRange || (!can_move_to(character.real_x, character.real_y))) {
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 60) {
            let weight = 0;

            const position = pointOnAngle(character, angle, 75);

            if (can_move_to(position.x, position.y)) {
                let rangeWeight = 0;
                let inRange = false;

                for (const id in monstersInRadius) {
                    const entity = monstersInRadius[id];
                    const monsterRange = getRange(entity);
                    const distToMonster = distanceToPoint(position.x, position.y, entity.real_x, entity.real_y);
                    const charDistToMonster = distanceToPoint(character.real_x, character.real_y, entity.real_x, entity.real_y);

                    if (charDistToMonster < monsterRange) {
                        inRange = true;
                        if (distToMonster > charDistToMonster) {
                            rangeWeight += distToMonster - charDistToMonster;
                        }
                    }
                }

                if (inRange) {
                    weight = rangeWeight;
                }

                const intersectsRadius = angleIntersectsMonsters(avoidRanges, angle);
                if (!can_move_to(character.real_x, character.real_y)) {
                    weight -= distanceToPoint(position.x, position.y, character.real_x, character.real_y) / 10;
                }

                if (!intersectsRadius) {
                    if (weight > maxWeight) {
                        maxWeight = weight;
                        maxWeightAngle = angle;
                    }
                }
            }
        }

        const movePoint = pointOnAngle(character, maxWeightAngle, 20);
        if (!lastMove || new Date() - lastMove > 100) {
            lastMove = new Date();
            move(movePoint.x, movePoint.y);
        }

        if (drawDebug) {
            draw_line(character.real_x, character.real_y, movePoint.x, movePoint.y, 2, 0xF20D0D);
        }

        return true;
    }

    return false;
}

function getRange(entity) {
    if (entity.type !== "character") {
        return (parent.G.monsters[entity.mtype]?.range || 100) + rangeBuffer;
    } else {
        if (avoidPlayersWhitelist.includes(entity.id) && avoidPlayersWhitelistRange != null) {
            return avoidPlayersWhitelistRange;
        } else if (playerRangeOverride != null) {
            return playerRangeOverride + playerBuffer;
        } else {
            return (entity.range || 100) + playerBuffer;
        }
    }
}

function isInAttackRange(monstersInRadius) {
    return monstersInRadius.some(monster => {
        const monsterRange = getRange(monster);
        const charDistToMonster = distanceToPoint(character.real_x, character.real_y, monster.real_x, monster.real_y);
        return charDistToMonster < monsterRange;
    });
}

function angleIntersectsMonsters(avoidRanges, angle) {
    return avoidRanges.some(range => isBetween(range[1], range[0], angle));
}

function getAnglesToAvoid(monstersInRadius) {
    const avoidRanges = [];
    for (const id in monstersInRadius) {
        const monster = monstersInRadius[id];
        const monsterRange = getRange(monster);
        const tangents = findTangents({ x: character.real_x, y: character.real_y }, { x: monster.real_x, y: monster.real_y, radius: monsterRange });

        if (!isNaN(tangents[0].x)) {
            const angle1 = angleToPoint(character, tangents[0].x, tangents[0].y);
            const angle2 = angleToPoint(character, tangents[1].x, tangents[1].y);
            avoidRanges.push(angle1 < angle2 ? [angle1, angle2] : [angle2, angle1]);

            if (drawDebug) {
                draw_line(character.real_x, character.real_y, tangents[0].x, tangents[0].y, 1, 0x17F20D);
                draw_line(character.real_x, character.real_y, tangents[1].x, tangents[1].y, 1, 0x17F20D);
            }
        }

        if (drawDebug) {
            draw_circle(monster.real_x, monster.real_y, monsterRange, 1, 0x17F20D);
        }
    }
    return avoidRanges;
}

function getMonstersInRadius() {
    return Object.values(parent.entities).filter(entity => {
        const distanceToEntity = distanceToPoint(entity.real_x, entity.real_y, character.real_x, character.real_y);
        const range = getRange(entity);
        return (entity.type === "monster" && avoidTypes.includes(entity.mtype) && distanceToEntity < calcRadius) ||
            (avoidPlayers && entity.type === "character" && !entity.npc && !playerAvoidIgnoreClasses.includes(entity.ctype) &&
                (!avoidPlayersWhitelist.includes(entity.id) || avoidPlayersWhitelistRange != null) &&
                (distanceToEntity < calcRadius || distanceToEntity < range));
    });
}

function normalizeAngle(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function isBetween(angle1, angle2, target) {
    if (angle1 <= angle2) {
        return angle2 - angle1 <= Math.PI ? angle1 <= target && target <= angle2 : angle2 <= target || target <= angle1;
    } else {
        return angle1 - angle2 <= Math.PI ? angle2 <= target && target <= angle1 : angle1 <= target || target <= angle2;
    }
}

function findTangents(point, circle) {
    const dx = circle.x - point.x;
    const dy = circle.y - point.y;
    const dd = Math.sqrt(dx * dx + dy * dy);
    const a = Math.asin(circle.radius / dd);
    const b = Math.atan2(dy, dx);

    const ta = { x: circle.x + circle.radius * Math.sin(b - a), y: circle.y - circle.radius * Math.cos(b - a) };
    const tb = { x: circle.x - circle.radius * Math.sin(b + a), y: circle.y + circle.radius * Math.cos(b + a) };

    return [ta, tb];
}

function offsetToPoint(x, y) {
    const angle = angleToPoint(x, y) + Math.PI / 2;
    return angle - characterAngle();
}

function pointOnAngle(entity, angle, distance) {
    return { x: entity.real_x + distance * Math.cos(angle), y: entity.real_y + distance * Math.sin(angle) };
}

function entityAngle(entity) {
    return (entity.angle * Math.PI) / 180;
}

function angleToPoint(entity, x, y) {
    const deltaX = entity.real_x - x;
    const deltaY = entity.real_y - y;
    return Math.atan2(deltaY, deltaX) + Math.PI;
}

function characterAngle() {
    return (character.angle * Math.PI) / 180;
}

function distanceToPoint(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}




//////////////////////////////////

// ===== CONFIG =====
const KEEP_AMOUNT = 2; // Số lượng món đồ muốn giữ lại trong túi
const MULE_NAME = "MuaBan";

const ITEM_WHITELIST = [
    "fieldgen0",
];

// ===== SEND FUNCTION =====
function sendItems(name) {
    let lootMule = get_player(name);
    if (!lootMule || distance(character, lootMule) > 250) return;

    // Duyệt qua từng loại item trong danh sách trắng
    ITEM_WHITELIST.forEach(itemName => {
        // Lấy tất cả các ô đồ có chứa item này và không bị khóa/seal
        let itemsOfThisType = character.items
            .map((item, index) => ({...item, index}))
            .filter(item => item && item.name === itemName && !item.l && !item.s);

        // Tính tổng số lượng hiện có
        let totalCount = itemsOfThisType.reduce((sum, item) => sum + (item.q ?? 1), 0);

        // Nếu tổng số lượng lớn hơn mức cần giữ lại
        if (totalCount > KEEP_AMOUNT) {
            let amountToSend = totalCount - KEEP_AMOUNT;
            console.log(`Đang gửi ${amountToSend} ${itemName} cho ${name} (Giữ lại ${KEEP_AMOUNT})`);

            // Bắt đầu gửi từ các ô đồ
            for (let item of itemsOfThisType) {
                if (amountToSend <= 0) break;

                let qInSlot = item.q ?? 1;
                let sendQty = Math.min(qInSlot, amountToSend);

                send_item(lootMule, item.index, sendQty);
                amountToSend -= sendQty;
            }
        }
    });
}

setInterval(() => sendItems(MULE_NAME), 10000);








