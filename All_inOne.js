let lastSwapTime = 0;
const swapCooldown = 500;
let lastUpdateTime = performance.now();
setTimeout(waitAndUnluck, 1000);
const locations = {
    bat: [{ x: 1200, y: -782 }],
    bigbird: [{ x: 1343, y: 248 }],
    bscorpion: [{ x: -408, y: -1241 }],
    boar: [{ x: 19, y: -1109 }],
    cgoo: [{ x: -221, y: -274 }],
    crab: [{ x: -11840, y: -37 }],
    ent: [{ x: -420, y: -1960 }],
    fireroamer: [{ x: 80, y: -830 }],
    ghost: [{ x: -405, y: -1642 }],
    gscorpion: [{ x: 390, y: -1422 }],
    iceroamer: [{ x: 823, y: -45 }],
    mechagnome: [{ x: 0, y: 0 }],
    mole: [{ x: 4, y: -282 }],  //-282
    mummy: [{ x: 256, y: -1417 }],
    oneeye: [{ x: -270, y: 160 }],
    pinkgoblin: [{ x: 366, y: 377 }],
    poisio: [{ x: -121, y: 1360 }],
    prat: [{ x: -280, y: 552 }], //[{ x: 6, y: 430 }]
    pppompom: [{ x: 292, y: -189 }],
    plantoid: [{ x: -780, y: -387 }], // [{ x: -840, y: -340 }]
    rat: [{ x: 6, y: 430 }],
    scorpion: [{ x: -495, y: 685 }],
    stoneworm: [{ x: 830, y: 7 }],
    spider: [{ x: 1290, y: -80 }],  // [{ x: 1180, y: -71 }], //vip3
    squig: [{ x: -1175, y: 422 }],
    wolf: [{ x: 433, y: -2745 }],
    wolfie: [{ x: 113, y: -2014 }],
    xscorpion: [{ x: -495, y: 685 }],
    odino: [{ x: -20, y: 675 }],
};

const home = 'odino';
const mobMap = 'mforest';
const destination = {
    map: mobMap,
    x: locations[home][0].x,
    y: locations[home][0].y
};
let angle = 0;
const speed = 3; // normal 2 or .65
let events = false;

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

let framtaywwait = 0;
let framtay = 0
async function eventer() {
    const delay = 500;
    let tank = get_player("Ynhi");

    try {
        if (events) {
            handleEvents();
		framtay = 0
	} else if (framtay > 0) {
            if (framtaywwait === 0) {
               framtaygame(); ///tạm ngưng hầm ngục tomb đã hoạt động tốt
		  //  framXmage()
              //  framtaywwait = 2; // chờ 2 vòng = ~1s
            }
	} else if (bossvip > 0) {
            VIPBosses();
	} else if (framboss > 0) {

        } else if ( tank && !tank.rip && (!get_nearest_monster({ type: home }) || ( character.map == mobMap && distance(character, {x: locations[home][0].x, y: locations[home][0].y}) > 50 ) )) {
           handleHome();
        } else {
           safeawwait()
        }
	    
	    if (framtaywwait > 0) framtaywwait--;
	    
    } catch (e) {
        console.error(e);
    }

    setTimeout(eventer, delay);
}
eventer();




async function checkGameEvents() {
    let checkeven = 0;
    let pro = 0;
    const events1 = [
       // { eventType: 'snowman', type: 'withJoin' },
	//    { eventType: 'wabbit', type: 'withJoin' },
        { eventType: 'goobrawl', type: 'specific' },
        { eventType: 'crabxx', type: 'pro' },
        { eventType: 'franky', type: 'pro' },
        { eventType: 'icegolem', type: 'pro' },
    ];

    for (let event of events1) {
        let isEventValid = false;
        let procheck = false;
        if (event.type === 'specific') {
		if (server.region == "EU" && server.id == "II" )isEventValid = !!parent?.S?.[event.eventType];
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
	ICEcheckHPMYSv(["icegolem"] , 15000000)

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
	game_log("Chỉ số framboss = "+framboss)
	game_log("Chỉ số bosscantank = "+bosscantank)
	game_log("Chỉ số checkeven = "+checkeven)
	game_log("Chỉ số pro = "+pro)

	
}

// Tạo vòng lặp 10s để gọi checkGameEvents()
const intervalId1 = setInterval(() => {
    checkGameEvents();
}, 10000); // 1000 ms = 1 giây





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
        //handleSpecificEvent('dragold', 'cave', 1190, -810, 500000, 900);
        //handleSpecificEvent('snowman', 'winterland', 1190, -900, 50);
	 //   if(Now_is_gobalevenrun)return
        handleSpecificEventWithJoin('goobrawl', 'goobrawl', 0, 0, 15000);
	    if(Now_is_gobalevenrun)return
	   handlebossPro('crabxx', 'main', -976, 1785, 10000, "Ynhi","6gunlaZe")
	     if(Now_is_gobalevenrun)return
	    handlebossPro('franky', 'level2w', 14, 30, 10000, "Ynhi","6gunlaZe")
	    if(Now_is_gobalevenrun)return
	    handlebossPro('icegolem', 'winterland', 820, 420, 50000, "nhiY","Ynhi")

    }
}




async function handleHome() {
    if (!smart.moving && character.cc < 100) {
         equipSet('home');
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

	
    if (!smart.moving) {
                    try {
                // Sử dụng smart_move để di chuyển đến vị trí, nếu không thành công thì bắt lỗi
                await smart_move(destination);
            } catch (error) {
                // Nếu không thể di chuyển (ví dụ: không có đường đi), thì dùng 'use_town'
                console.log("Không thể di chuyển đến đích, sử dụng 'use_town'");
                await use_skill("town");  // Quay lại thành phố
            }
        game_log(`Moving to ${home}`);
    }
}


async function safeawwait() {
		    let tank = get_player("Ynhi");
//if(  parent?.S?.wabbit.live && !character?.s?.easterluck  )return
if (character.hp < 4000 && !character.rip) parent.api_call("disconnect_character", {name: "haiz"});
	
if (!tank || tank.rip ){
    if (!smart.moving) {
smart_move({ map: "mforest", x: -240, y: 700 })
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





function checkPVPandARENA() {

if (character.map != "arena")return
const friend = ["MuaBan", "haiz" , "haiz1" , "Ynhi", "nhiY", "6gunlaZe"];
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
if ( region == "EU" && serverIden == "II" ) 
{
change_server("ASIA", "I");	
}
	else
	{
         change_server("EU", "II");
	}	
}


	
    // Đây là công việc bạn muốn thực hiện mỗi 1 giây
    console.log("Vòng lặp chạy mỗi giây...");
}

// Thiết lập vòng lặp mỗi 1 giây (1000ms)
setInterval(checkPVPandARENA, 1000); // 1000ms = 1 giây


function waitAndUnluck() {
    if (character.cc < 100) {
        equipSet('UNluck');
    } else {
        setTimeout(waitAndUnluck, 5000);
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











function framXmage() {

 let member1 = get_player("6gunlaZe");
 let member2 = get_player("Ynhi");
	
if(parent.party_list.includes("6gunlaZe") && (!member1 || get_nearest_monster({ type: home }) ) ){
	send_cm("6gunlaZe","mage")	
}

if (character.map == "winter_instance" && (!member1 || !member2) )	
{
//send_cm("haiz1","goo2")
send_cm("Ynhi","goo2")
send_cm("6gunlaZe","goo2")


//send_cm("haiz1",character.in)
send_cm("Ynhi",character.in)
send_cm("6gunlaZe",character.in)

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
    { x: -8, y: 68, monster: "xmagefn" },
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
}

if (buoc == 8 || character.rip)
{
	stop_character("Ynhi")	
	stop_character("6gunlaZe")	
	buoc = 0
	framtay = 0
}
	
}






let fieldgen0_position = null;
let buoc = 0
function framtaygame() {

 let member1 = get_player("6gunlaZe");
 let member2 = get_player("Ynhi");
	
if(parent.party_list.includes("6gunlaZe") && (!member1 || get_nearest_monster({ type: home }) ) ){
	send_cm("6gunlaZe","tomb")	
}

if (character.map == "tomb" && (!member1 || !member2) )	
{
//send_cm("haiz1","goo1")
send_cm("Ynhi","goo1")
send_cm("6gunlaZe","goo1")


//send_cm("haiz1",character.in)
send_cm("Ynhi",character.in)
send_cm("6gunlaZe",character.in)

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
        } else {
            // Mặc định nếu không rõ loại (hoặc khác magic/physical)
            equipSet("single");
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
}

// Danh sách bước đi kèm loại quái cần kiểm tra
const steps = [
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
    // Kiểm tra khoảng cách và sự tồn tại của quái vật tương ứng
    const monster = get_nearest_monster({ type: step.monster });
	
    if (distance(character, {x: step.x, y: step.y}) > 30 && ( !monster || (monster && distance(character,monster) > 200  ))) xmove(step.x, step.y);
    else if (fieldgen0_position && monster && distance(character,monster) < character.range && monster.target && monster.target == character.name )kite_around_fieldgen(fieldgen0_position, 20);
    else if ( monster && distance(character,monster) > 10 && character.hp > 4000 )xmove(monster.real_x, monster.real_y);




	
    if (buoc > 8 && monster) buoc = 8; //fix bug quái vật nhảy, dịch chuyển nó không nhận dạng được
	
    if (step.monster == "gpurplepro" && distance(character,monster) < 50 && !get_nearest_monster({ type: "fieldgen0" }) && distance(character, {x: step.x, y: step.y}) < 130 )
	  {
		 let item = locate_item("fieldgen0");
                 if (item)use(item);
		fieldgen0_position = { x: character.real_x, y: character.real_y };

	  }
	
    if (distance(character, step) < 30 && !monster && member2 && distance(character,member2) < 55 ) {
        buoc++;
    }
}

if (buoc == 11 || character.rip)
{
	stop_character("Ynhi")	
	stop_character("6gunlaZe")	
	buoc = 0
	framtay = 0
}


///////////	
	
}





	
function VIPBosses() {
if(smart.moving)return	
var monster
if (bossvip == 1)
{
	 send_cm("6gunlaZe", "bossvip1");
        monster = get_nearest_monster({ type: "stompy" }); 
        if (monster) {
            if (monster.hp > 15000 ) {
                if (character.cc < 100) {
                    equipSet('single');
                }
            } else if (character.cc < 100) {
                equipSet('luck');
		    setTimeout(waitAndUnluck, 5000);
            }
        }
        else if ( !monster && distance(character, { x: 404, y: -2423 }) <= 80 && character.map === 'winterland')
        {
	bossvip = 0
        }			
	    else
	{
	 if (!smart.moving) smart_move({ map: "winterland", x: 404, y: -2423 });
	}


	
}
else if (bossvip == 2)
{
		 send_cm("6gunlaZe", "bossvip2");
        monster = get_nearest_monster({ type: "skeletor" }); 
        if (monster) {
            if (monster.hp > 15000 ) {
                if (character.cc < 100) {
                    equipSet('single');
                }
            } else if (character.cc < 100) {
                equipSet('luck');
		    setTimeout(waitAndUnluck, 5000);
            }
        }
        else if ( !monster && distance(character, { x: 666, y: -555 }) <= 80 && character.map === 'arena')
        {
	bossvip = 0
        }	
	    else
	{
	 if (!smart.moving) smart_move({ map: "arena", x: 666, y: -555 });
	}
	
}

}





let callnguoi = 0
//hpThreshold = ngưỡng sắp chết đổi item luck
function handleSpecificEvent(eventType, mapName, x, y, hpThreshold, skillMs = 0) {
    if (parent?.S?.[eventType]?.live) {
	    if (callnguoi < 200)
	    {
		    send_cm("MuaBan",eventType)
		   callnguoi += 1 
	    }
	    Now_is_gobalevenrun = true
	    
        const monster = get_nearest_monster({ type: eventType }); 
        if (monster) {
            if (monster.hp > hpThreshold ) {
                if (character.cc < 100) {
                    equipSet('single');
                }
            } else if (character.cc < 100) {
                equipSet('luck');
		    setTimeout(waitAndUnluck, 5000);
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
	    if (callnguoi < 200)
	    {
		    send_cm("MuaBan",eventType)
		   callnguoi += 1 
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
            } else if (character.cc < 100) {
                equipSet('luck');
		    setTimeout(waitAndUnluck, 5000);
            }
        }
	 else
	{
	 if (!smart.moving) smart_move({ x, y, map: mapName });
	}   
    }
}
















const targetNames = ["6gunlaZe", "Ynhi","haiz", "nhiY"];


async function attackLoop() {
	//if (character.moving)return
    let delay = null; // Default delay
    const X = locations[home][0].x; // X coordinate of home location
    const Y = locations[home][0].y; // Y coordinate of home location
    const now = performance.now();
	var buff = get_player("Ynhi"); 
    try {
        let nearest = null;

        // Find the nearest monster based on the targetNames
        for (let i = 0; i < targetNames.length; i++) {
            nearest = get_nearest_monster_v2({
                target: targetNames[i],
                check_max_hp: true,  // Checking for monster with max HP
                max_distance: 50,  // Consider monsters within 50 units
                statusEffects: ["cursed"], // Check for these debuffs
            });
            if (nearest) break;
        }

	    
        if (!nearest) {
            for (let i = 0; i < targetNames.length; i++) {
                nearest = get_nearest_monster_v2({
                    target: targetNames[i],
                    max_distance: character.range,
                    check_max_hp: true,  // Checking for monster with max HP
                });
                if (nearest) break;
            }
        }

	            let target = null;
	    let target1 = null;
	     let target2 = null;
	    var bossarmy=["icegolem", "franky" , "crabxx" ]; 
	    	    var mob=["phoenix", "jr","greenjr", "mvampire","snowman","bgoo","rgoo","wabbit"];
                    var mob2=["stompy", "skeletor","gbluepro","gredpro","ggreenpro", "xmagefz","xmagefi","xmagefn","xmagex", ]; //boss mạnh cần có healter
    
// Kiểm tra xem target có thuộc trong bossarmy không
if (!nearest && events){	  

for (var i = 0; i < bossarmy.length; i++) {
     target= get_nearest_monster1({type: bossarmy[i]});
		  if(target) change_target(target);
	if ( target && !is_in_range(target))
	{
          gobaltaget = target;
	}
        // If a monster is found and is in range, execute the attack
        if (target && is_in_range(target)) {
            await attack(target); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack      
			break;  // Nếu tìm thấy thì thoát vòng lặp

        }

}
}

if (!target && !nearest){	    
for (var i = 0; i < mob.length; i++) {
     target1= get_nearest_monster({type: mob[i]});
		  if(target1)change_target(target1);
	if ( target1 && !is_in_range(target1))
	{
          gobaltaget = target1;
	}
	
        if (target1 && is_in_range(target1, "taunt") && !is_on_cooldown("taunt") && target1.target != character.name ) {
            await use_skill("taunt", target1); // Sử dụng kỹ năng "taunt" để gây sự chú ý của quái vật vào nhân vật
		 break;
        }
        // If a monster is found and is in range, execute the attack
        if (target1 && is_in_range(target1)) {
            await attack(target1); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack
			        break;  // Nếu tìm thấy thì thoát vòng lặp

        }

}
}

if (!target1 && !target && !nearest && buff && distance(character, buff) < 170){	    
for (var i = 0; i < mob2.length; i++) {
     target2= get_nearest_monster({type: mob2[i]});
		  if(target2)change_target(target2);
	if ( target2 && !is_in_range(target2) && mob2[i] != "skeletor" && mob2[i] != "stompy" )
	{
         gobaltaget = target2;
	}
        // If a monster is found and is in range, execute the attack
        if (target2 && is_in_range(target2) && character.hp > 7000) {
            await attack(target2); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack
			        break;  // Nếu tìm thấy thì thoát vòng lặp

        }

}
}


	    


if (!nearest){
	const entity1 = get_entity(character.target) //target mặc định hiện có, bỏ qua các boss
	if (entity1 && !["franky", "icegolem", "crabxx","stompy", "skeletor"].includes(entity.mtype)) {
		nearest = entity1
	}
}
	    
	if ( nearest && !is_in_range(nearest))
	{
          gobaltaget = nearest;
	}
	    
        // If a monster is found and is in range, execute the attack
        if (nearest && is_in_range(nearest) && !smart.moving) {
            await attack(nearest); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack
        }

	    
    } catch (e) {
        //console.error(e);
    }
	 setTimeout(attackLoop, delay/2 || 250); // Default delay if undefined
}

attackLoop();



////////////////////////////////////////////////////////////////
let scythe = 0;
let eTime = 0;
let basher = 0;
async function skillLoop() {
    let delay = 10;
    try {
        let zap = false;
        const dead = character.rip;
        const Mainhand = character.slots?.mainhand?.name;
        const offhand = character.slots?.offhand?.name;
        const aoe = character.mp >= character.mp_cost * 2 + G.skills.cleave.mp + 30;
        const cc = character.cc < 235;
        const zapperMobs = ["plantoid"];
        const stMaps = ["", "winter_cove", "arena", "",];
        const aoeMaps = ["halloween", "goobrawl", "spookytown", "tunnel", "main", "winterland", "cave", "level2n", "level2w", "desertland","tomb"];
        let tank = get_entity("Ynhi");
	     let f1 = get_entity("6gunlaZe");

        if (character.ctype === "warrior") {
            try {
				

                if ( character.mp >= 170 && ( (f1 && f1.hp < f1.max_hp * 0.6 )  || (tank && tank.hp < tank.max_hp * 0.6 ) || character.hp < 12000 ) && character.map != "winter_instance"  ){
                    //console.log("Calling handleStomp");
					//game_log("1")

                    handleStomp(Mainhand, stMaps, aoeMaps, tank);
                }
                if (character.ctype === "warrior") {
                    //console.log("Calling handleCleave");
                    handleCleave(Mainhand, aoe, cc, stMaps, aoeMaps, tank);
                    //console.log("Calling handleWarriorSkills");
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



let checkdef = 0; // 0 = bình thường, 1 = deff, 2 = def mạnh
let defSafeSince = null;

function handleWeaponSwap(stMaps, aoeMaps, Mainhand, offhand) {
    const currentTime = performance.now();
    if (currentTime - eTime < 50) return;

    // Mob xung quanh
    const mobsInRange = Object.values(parent.entities).filter(entity =>
        entity.visible &&
        entity.target === character.name &&
        !entity.dead &&
        distance(character, entity) <= 100
    );

    const FireMobs = mobsInRange.filter(mob =>
        mob.mtype == "xmagefi"
    );
	
    const physicalMobs = mobsInRange.filter(mob =>
        mob.damage_type === "physical" && mob.attack > 3500
    );

    const magicalMobs = mobsInRange.filter(mob =>
        mob.damage_type === "magical" && mob.attack > 3500
    );

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

	
    if (magicalMobs.length >= 1) {  
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

    // 👉 GỠ TRANG BỊ PHÒNG THỦ NẾU AN TOÀN LIÊN TỤC > 3 GIÂY
    if ((checkdef === 1 || checkdef === 2) &&
        character.hp > 14000 &&
        physicalMobs.length === 0 &&
        magicalMobs.length === 0) {
        
        // Ghi thời điểm bắt đầu an toàn
        if (!defSafeSince) defSafeSince = currentTime;

        // Đủ thời gian an toàn → gỡ phòng thủ
        if (currentTime - defSafeSince >= 3000) {
            checkdef = 0;
            defSafeSince = null;
            eTime = currentTime;
            equipSet('nodeff');
            return;
        }

        // Chưa đủ 3 giây → chờ tiếp
        return;
    } else {
        // Nếu có mob mạnh lại → reset đồng hồ an toàn
        defSafeSince = null;
    }

    // 👉 Chuyển sang deff nhẹ nếu máu thấp mà chưa bị mob mạnh
    if (checkdef === 0 && character.hp < 10000) {
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
        equipSet('aoe');
    }
}






let lastCleaveTime = 0;
const CLEAVE_THRESHOLD = 500; // Time in milliseconds between cleave uses

function handleCleave(Mainhand, aoe, cc, stMaps, aoeMaps, tank) {
    const currentTime = performance.now();
    const timeSinceLastCleave = currentTime - lastCleaveTime;
    const mapsToInclude = ["desertland", "goobrawl", "main", "level2w", "cave", "halloween", "spookytown", "tunnel", "winterland", "level2n","mforest","tomb"];
    const monstersInRange = Object.values(parent.entities).filter(({ type, visible, dead, x, y }) =>
        type === "monster" &&
        visible &&
        !dead &&
        distance(character, { x, y }) <= (G.skills.cleave.range + 4)
    );
	
const untargetedMonsters = monstersInRange.filter(({ target, hp }) => !target && hp >= 4000);


    if (canCleave(aoe, cc, mapsToInclude, monstersInRange, tank, timeSinceLastCleave, untargetedMonsters)) {
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

function canCleave(aoe, cc, mapsToInclude, monstersInRange, tank, timeSinceLastCleave, untargetedMonsters) {
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
        && ms_to_next_skill("attack") > 75 // Ensure attack isn't about to be ready
    );
}

async function handleWarriorSkills(tank,f1) {

	
    if (!is_on_cooldown("warcry") && !character.s.warcry && character.s.darkblessing) {
        await use_skill("warcry");
    }

	///bat thì không cần f1
const mobTypes = ["bat", "mole","bigbird","spider","scorpion"];
const mobsInRange = Object.values(parent.entities)
    .filter(entity => 
        mobTypes.includes(entity.mtype) &&  // Kiểm tra nếu loại mob là "bat" hoặc "bigbird"
        entity.visible &&                    // Kiểm tra nếu thực thể đang hiển thị
        !entity.dead &&                      // Kiểm tra nếu thực thể chưa chết
        distance(character, entity) <= G.skills.agitate.range  // Kiểm tra nếu khoảng cách từ nhân vật đến mob nhỏ hơn phạm vi của kỹ năng "agitate"
    );
const untargetedMobs = mobsInRange.filter(monster => !monster.target);  // Kiểm tra nếu mob chưa có mục tiêu
if (!is_on_cooldown("agitate") && 
    mobsInRange.length >= 3 &&           // Kiểm tra nếu có ít nhất 3 quái vật trong phạm vi
    untargetedMobs.length >= 3 &&        // Kiểm tra nếu có ít nhất 3 quái vật chưa bị nhắm mục tiêu
    !smart.moving &&                     // Kiểm tra nếu nhân vật không đang di chuyển
    tank && f1 && character.hp >14000 && character.mp > 800 && !tank.rip && !f1.rip) {                              // Kiểm tra nếu có tank và f1 xung quanh
    let porc = get_nearest_monster({ type: "porcupine" }); // Lấy quái vật "porcupine" gần nhất
    if (!is_in_range(porc, "agitate")) {  // Kiểm tra nếu "porcupine" không nằm trong phạm vi kỹ năng "agitate"
        await use_skill("agitate");        // Sử dụng kỹ năng "agitate"
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


let monstersAgo = ["stompy", "skeletor","gpurplepro","gredpro", "xmagefz","xmagefi","xmagefn","xmagex",];  // Mảng chứa các tên quái vật cần kiểm tra
for (let id in parent.entities) {
    let current = parent.entities[id];  // Lấy thực thể hiện tại trong vòng lặp

    // Kiểm tra nếu thực thể là quái vật trong mảng và nó chưa nhắm vào nhân vật
    if (monstersAgo.includes(current.mtype) && current.target && current.target != character.name && f1 && character.hp >7000 && distance(character, f1) < 150 )  {
        
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
        game_log("equipBatch is already running. Skipping.");
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

    dps: [
        //{ itemName: "dexearring", slot: "earring2", level: 5, l: "l" },
        { itemName: "orbofstr", slot: "orb", level: 5, l: "l" },
        { itemName: "suckerpunch", slot: "ring1", level: 2, l: "l" },
        { itemName: "suckerpunch", slot: "ring2", level: 2, l: "u" },
    ],
    luck: [
        { itemName: "mshield", slot: "offhand", level: 7, l: "l" },
        { itemName: "rabbitsfoot", slot: "orb", level: 1, } 
    ],
    UNluck: [
        { itemName: "orbofstr", slot: "orb", level: 4, l: "l" },
        //{ itemName: "tshirt88", slot: "chest", level: 0, l: "l" } 
    ],
    single: [
        { itemName: "fireblade", slot: "mainhand", level: 9, l: "s" },
        { itemName: "fireblade", slot: "offhand", level: 9, l: "l" },
    ],
    aoe: [
        { itemName: "vhammer", slot: "mainhand", level: 7, l: "l" },
        { itemName: "vhammer", slot: "offhand", level: 7, l: "s" },
    ],
    home: [
        { itemName: "mittens", slot: "gloves", level: 9, },
        { itemName: "fury", slot: "helmet", level: 4, },
    ],
    def_magical: [
        { itemName: "fireblade", slot: "mainhand", level: 9, l: "s" },
        { itemName: "vgloves", slot: "gloves", level: 7, l: "l" },
        { itemName: "hhelmet", slot: "helmet", level: 7, },
        { itemName: "sweaterhs", slot: "chest", level: 8, l: "l" },
        { itemName: "lantern", slot: "offhand", level: 2, l: "l" },
    ],
    def_physical: [
        { itemName: "fireblade", slot: "mainhand", level: 9, l: "s" },
        { itemName: "vgloves", slot: "gloves", level: 7, l: "l" },
        { itemName: "hhelmet", slot: "helmet", level: 7, },
        { itemName: "sweaterhs", slot: "chest", level: 8, l: "l" },
        { itemName: "sshield", slot: "offhand", level: 8, l: "l" },
    ],
    deff: [
        { itemName: "vgloves", slot: "gloves", level: 7, l: "l" },
        { itemName: "hhelmet", slot: "helmet", level: 7, },
    ],
    nodeff: [
        { itemName: "mittens", slot: "gloves", level: 9, },
        { itemName: "fury", slot: "helmet", level: 4, },
        { itemName: "mcape", slot: "chest", level: 8, l: "l" },

	    
    ],

    single_Magic: [
        { itemName: "fireblade", slot: "mainhand", level: 9, l: "s" },
        { itemName: "lantern", slot: "offhand", level: 2, l: "l" },
    ],

    single_physical: [
        { itemName: "fireblade", slot: "mainhand", level: 9, l: "s" },
        { itemName: "sshield", slot: "offhand", level: 8, l: "l" },
    ],
    def_bang: [
	    
    ],
    def_fire: [
        { itemName: "fireblade", slot: "mainhand", level: 9, l: "s" },
        { itemName: "lantern", slot: "offhand", level: 2, l: "l" },
        { itemName: "vgloves", slot: "gloves", level: 7, l: "l" },
        { itemName: "test_orb", slot: "orb", level: 0, l: "l" },
        { itemName: "hhelmet", slot: "helmet", level: 7, },
        { itemName: "sweaterhs", slot: "chest", level: 8, l: "l" },
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
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) - character.ping;
    return ms < 0 ? 0 : ms;
}



function get_nearest_monster_v2(args = {}) {
    let min_d = 999999, target = null;
    let optimal_hp = args.check_max_hp ? 0 : 999999999; // Set initial optimal HP based on whether we're checking for max or min HP

    for (let id in parent.entities) {
        let current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;
        if (args.type && current.mtype != args.type) continue;
        if (args.min_level !== undefined && current.level < args.min_level) continue;
        if (args.max_level !== undefined && current.level > args.max_level) continue;
        if (args.target && !args.target.includes(current.target)) continue;
        if (args.no_target && current.target && current.target != character.name) continue;

        // Status effects (debuffs/buffs) check
        if (args.statusEffects && !args.statusEffects.every(effect => current.s[effect])) continue;

        // Min/max XP check
        if (args.min_xp !== undefined && current.xp < args.min_xp) continue;
        if (args.max_xp !== undefined && current.xp > args.max_xp) continue;

        // Attack power limit
        if (args.max_att !== undefined && current.attack > args.max_att) continue;

        // Path check
        if (args.path_check && !can_move_to(current)) continue;

        // Distance calculation
        let c_dist = args.point_for_distance_check
            ? Math.hypot(args.point_for_distance_check[0] - current.x, args.point_for_distance_check[1] - current.y)
            : parent.distance(character, current);

        if (args.max_distance !== undefined && c_dist > args.max_distance) continue;

        // Generalized HP check (min or max)
        if (args.check_min_hp || args.check_max_hp) {
            let c_hp = current.hp;
            if ((args.check_min_hp && c_hp < optimal_hp) || (args.check_max_hp && c_hp > optimal_hp)) {
                optimal_hp = c_hp;
                target = current;
            }
            continue;
        }

        // If no specific HP check, choose the closest monster
        if (c_dist < min_d) {
            min_d = c_dist;
            target = current;
        }
    }
    return target;
}




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
if (name == "MuaBan" || name == "haiz1" || name == "nhiY" || name == "Ynhi" || name == "6gunlaZe"  || name == "angioseal") {
            accept_party_request(name);
        }
        if ((name == "haiz" || name == "angioseal") && bosstime == 0 ) {
            accept_party_request(name);
        }	
	
	
    }






let modeYnhi = 1 ///1 = Ynhi //2 = haiz1 // 0 == nhiY
let banktime 
let bosstime = 0 
let timekillboss
const TenMinutesInMs = 10 * 60 * 1000
const Ten7MinutesInMs = 7 * 60 * 1000
let bankk = 0
let trieuhoi = 0



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
//if(!parent.party_list.includes("6gunlaZe")) start_character("6gunlaZe", 33);
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



setTimeout(function() {
	if (parent.S.icegolem)return
stop_character("6gunlaZe")
start_character("nhiY", 12);	
}, 10000); // 10000 milliseconds = 10 giây


let intervalId = setInterval(function() {
	if (parent.S.icegolem)return
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

if (!parent.S.franky && !parent.S.icegolem) //khong co su kien thi moi chuyen sv trở về nhà
{
if ( region == "EU" && serverIden == "II" ) 
{
	game_log ("  SV  >>>>" + region + serverIden )
}
	else
	{
         if(character.hp > 8000)change_server("EU", "II");
	//change_server("ASIA", "I");	
	}
}	

if(bosstime == 0 && parent.party_list.includes("nhiY")  && !smart.moving )stop_character("nhiY")
	
if(!parent.party_list.includes("6gunlaZe") ) start_character("6gunlaZe", 33);
if(!parent.party_list.includes("MuaBan")) start_character("MuaBan", 6);
	
/////////////////	
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


}, 100000); //40s trieu hoi 1 lan neu ko thay trong party, phai cho delay login



let autobuyPonty = 1; // bật auto
let readyToSwitch = false;

// Bước 1: đếm 2000s (33 phút)
setTimeout(() => {
    game_log("Đã đủ 2000s. Đang chờ máu hồi để chuyển server...");
    readyToSwitch = true;
    waitForHPAndSwitch();
}, 2000000); // 2000 * 1000 ms

// Bước 2: kiểm tra máu liên tục khi đã sẵn sàng
function waitForHPAndSwitch() {
    if (!readyToSwitch || autobuyPonty != 1) return;

    if (character.hp > 10000) {
        // Không có sự kiện thì mới chuyển
        if (prolive == 1 || events || framboss > 0 || bossvip > 0 || framtay > 0) return;
        if (parent.S.franky || parent.S.icegolem) return;
	    
    let chests = get_chests();
    let chestIds = Object.keys(chests);
        for (let id of chestIds) {
            loot(id);
        }  

	    
        let randomNumber = getRandom(1, 100);
        game_log("Đủ điều kiện. Chuyển server với số ngẫu nhiên: " + randomNumber);

        if (randomNumber < 20) {
            change_server("US", "I");
        } else if (randomNumber > 80) {
            change_server("EU", "I");
        } else if (randomNumber > 20 && randomNumber < 30) {
            change_server("ASIA", "I");
        } else if (randomNumber > 30 && randomNumber < 60) {
            change_server("US", "III");
        } else if (randomNumber > 60 && randomNumber < 80) {
            change_server("US", "II");
        } else {
            change_server("EU", "II");
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
}, 420000);

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


////////////////////
 if(name == "nhiY" && data == "boss1"){
		  bosstime = 1
	    timekillboss = Date.now()
	  framboss = 1
 }
 if(name == "nhiY" && data == "stop"){
stop_character("nhiY") 
start_character("6gunlaZe", 33);
 }	
/////////////////
    if(name == "MuaBan"){

	   if(data == "framtay")framtay = 1;
	   if(data == "bank") {
        start_character("MuaBan", 10);	
		 banktime = Date.now()  
		   bankk = 1
	   }	

if(framboss>0)return
	    
  if(data == "boss1" || data == "boss2"  || data == "boss3" || data == "boss4" || data == "boss5"  || data == "boss6" || data == "boss7" || data == "boss8") {
	  if (events || prolive == 1 || bossvip > 0 || framtay > 0)return
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

		parent.api_call("disconnect_character", {name: "6gunlaZe"});
		stop_character("6gunlaZe");    	  
	  }
		  bosstime = 1
	    timekillboss = Date.now()
	  start_character("nhiY", 12);
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
	if(data == "boss8") {
	  framboss = 8
	}
	if(data == "bossvip1" && !events && framtay == 0) {
	  bossvip = 1
	}
	if(data == "bossvip2" && !events && framtay == 0) {
	  bossvip = 2
	}
	    

       if(data == "franky" || data == "crabxx" )
	   {
		    bosscantank = 1	
	stop_character("angioseal")	
	stop_character("nhiY")	
	stop_character("haiz1")	

       if(!parent.party_list.includes("6gunlaZe"))start_character("6gunlaZe", 33);
	    if(!parent.party_list.includes("Ynhi"))start_character("Ynhi", 27);
		   //cũ 31
	   }		
			
}
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

    let itemsToExclude = ["elixirfires","frozenkey","hotchocolate","fieldgen0","tombkey","elixirluck","candypop","hboots","cryptkey","hpot0", "mpot0","hpot1", "mpot1", "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1", "luckbooster", "goldbooster", "xpbooster", "pumpkinspice", "xptome","cscroll0", "cscroll1", "scroll0", "scroll1", "jacko","tracker","mittens","xgloves","exoarm","hhelmet","fury","wbasher", "basher","bataxe","sweaterhs","tigerstone","rabbitsfoot"];

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


//////////////


let checktimeparty = 0
let partychecktime
function handlebossPro(eventType, mapName, x, y, hpThreshold,f1name,f2name) {
    if (parent?.S?.[eventType]) {
              Now_is_gobalevenrun = true
	    
	    if(eventType == "crabxx")send_cm("6gunlaZe", "crabxx");   
	    
        const monster = get_nearest_monster({ type: eventType });
        if (monster) {
            if (monster.hp > hpThreshold ) {
                if (character.cc < 100) {
			if(eventType == "franky" && monster.target == "haiz")
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
		    setTimeout(waitAndUnluck, 5000);
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
if ( region == "EU" && serverIden == "II" ) 
{
change_server("ASIA", "I");	
}
	else
	{
         change_server("EU", "II");
	}
}
}
//////////////////////////
if(targetfk  && character.hp < 4500)
{
parent.api_call("disconnect_character", {name: "haiz"});
}
	    
////////////////////////////////
if ( checktimeparty == 0)
{
partychecktime = Date.now()
checktimeparty = 1	
}

if (Date.now() > partychecktime + 60000){
partychecktime = Date.now()
const playerNames = ['haiz1', 'nhiY', 'Ynhi', '6gunlaZe'];
// Duyệt mảng và kiểm tra tên
playerNames.forEach(name => {
    if (name !== f1name && name !== f2name) {
        stop_character(name);
    }
	});

// checktimeparty = 0

const characterData = [
    ["6gunlaZe", 33],
    ["Ynhi", 27],
    ["nhiY", 12],
];

// Duyệt qua mảng characterData và kiểm tra nếu tên không có trong party_list
characterData.forEach(([name, level]) => {
	 if (name == f1name || name == f2name){
    if (!parent.party_list.includes(name)) {
        start_character(name, level);
    }
	 }
});
	
}
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




function get_nearest_monster1(args) ///săn boss franky, ice
{
 let checkkill = 0
	var heal = get_player("Ynhi"); 
	var min_d=character.range + 225,target=null;
  if(!heal) return target;
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

	    checkkill = get_nearest_playerV_noMyparty(current)
	    if (checkkill < 2)continue


		
		if(args.path_check && !can_move_to(current)) continue;
		var c_dist=parent.distance(character,current);
		if(c_dist<min_d) min_d=c_dist,target=current; //lua chon quai vat gan nhat
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
    if(current.id == "haiz1" || current.id == "Ynhi" || current.id == "6gunlaZe" || current.id == "haiz" || current.id == "nhiY"   ) continue;
		if(current.target == currentTarget.id) target +=1;
	}
	game_log("so luong nguoi choi kill boss la: " + target)
	return target;
}




async function moveLoop() {
    let delay = 1000;
    try {

if(gobaltaget && !is_in_range(gobaltaget) && distance(character, gobaltaget)  < 300 && !smart.moving && gobaltaget.visible && !gobaltaget.dead)
{
	if (movesuper == 1)return	
		xmove(
			character.x+(gobaltaget.x-character.x)/2,
			character.y+(gobaltaget.y-character.y)/2
			);
		// Walk half the distance
}
else
{
	gobaltaget = null;
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
		if(!parent.party_list.includes("6gunlaZe")) start_character("6gunlaZe", 33);
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
		
		parent.api_call("disconnect_character", {name: "6gunlaZe"});
		stop_character("6gunlaZe");    
  
	  }
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




// Check now, and every 10p
setInterval(() => {
	checkServersForMonsters(["franky"] ,["icegolem"] );

}, 80000); // 60s check 1lan



async function checkServersForMonsters(monsters,monsters1) {
  // Safety Checks
  if (!Array.isArray(monsters)) return;
  if (monsters.length == 0) return;
  if (!Array.isArray(monsters1)) return;
  if (monsters1.length == 0) return;
   if (events || framtay == 1) return	

	
	
let validObjects0
let validObjects
let validObjects1
	 let hpcheck =120000000
	 let hpcheck1 =15000000

  // Query API
  const url = "https://aldata.earthiverse.ca/monsters/" + monsters.join(",");

  const response = await fetch(url);
  if (response.status == 200) {
    const data = await response.json();
  //  parent.S2 = data;
validObjects0 = data.filter(obj => obj.hp !== undefined  && obj.serverIdentifier != "PVP" );	
validObjects = data.filter(obj => obj.hp !== undefined && obj.hp < (hpcheck-18000000 )    && obj.serverIdentifier != "PVP" );	  	  
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
	
else if (validObjects0.length > 0)	///cho doi nguoi qua kill frannky // qua trước kể cả khi frany full máu
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
const avoidTypes = ["crabxx","a1","a4","a6","a8","a9","a10"];

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















