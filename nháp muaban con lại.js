
















const WAYPOINTS = [
    { map: "desertland", x: -222,    y: -1898 },
    { map: "desertland", x: 5,    y: -1883 },
    { map: "desertland", x: 218,  y: -1745 },
    { map: "desertland", x: 199,  y: -1125 },
    { map: "desertland", x: 85,   y: -1035 }, //// điểm chốt quái lửa
    { map: "desertland", x: -49, y: -760 },
    { map: "desertland", x: -207, y: -622 },
    { map: "desertland", x: -476, y: -615 },
    { map: "desertland", x: -723, y: -367 },
];

const AIM_POINT = {
    x: -79,
    y: -1007
};

const SCARE_BUFFER = 15;
let danglure = 0;
let lureEntId = null;
let startLure = false;
//====================================================
// Đứng ở mép range hướng về AIM_POINT
//====================================================

async function moveToEdge(ent){

    const dx = AIM_POINT.x - ent.x;
    const dy = AIM_POINT.y - ent.y;

    const len = Math.hypot(dx,dy);
    if(!len) return;

    await move(
        ent.x + dx/len*character.range,
        ent.y + dy/len*character.range
    );
}
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


function getLowestLevelEnt() {

    return Object.values(parent.entities)
        .filter(e =>
            e?.mtype == "ent" &&
            !e.rip &&
            (!e.target || e.target == character.name)
        )
        .sort((a, b) =>
            a.level - b.level ||
            distance(character, a) - distance(character, b)
        )[0];
}

////////////////////////////////////////////
///////////////////////////////////////////
const MAX_LURE_DISTANCE = 200;
const RESUME_DISTANCE = 145;

async function waitIfTooFar() {

    if (!lureEntId) return;

    while (true) {

        const ent = parent.entities[lureEntId];

        if (!ent || ent.rip) {
            lureEntId = null;
            return;
        }

        const d = distance(character, ent);

        if ((d <= RESUME_DISTANCE) || ((d <= MAX_LURE_DISTANCE) && ent.target) )
            return;

        game_log("Đợi Ent tới...");

        await sleep(100);
    }

}

//====================================================
// Lấy aggro ban đầu
//====================================================

async function lureEnt(){

    let ent = getLowestLevelEnt();
	if(!ent){
        game_log("Không tìm thấy Ent");
        return false;
    }

    await moveToEdge(ent);

    while(ent && !ent.rip){

        ent = parent.entities[ent.id];
        if(!ent) return false;

        if(ent.target == character.name){

            lureEntId = ent.id;
            game_log("Đã lấy aggro");
            return true;
        }

        if(can_attack(ent) && character.hp > 15000 && danglure == 0)
		{
            await attack(ent);
			danglure = 1;
		}
        await sleep(250);
    }

    return false;
}

//====================================================
// Loop giữ aggro
//====================================================

const SAFE_MULTIPLIER = 2.3;
const PANIC_BUFFER = 30;

setInterval(() => {

    if (!lureEntId) return;

    const ent = parent.entities[lureEntId];

    if (!ent || ent.rip) {
        lureEntId = null;
        return;
    }

    const d = distance(character, ent);

    const SAFE = ent.range * SAFE_MULTIPLIER;
    const PANIC = ent.range + PANIC_BUFFER;

    //========================
    // PANIC
    //========================
    if (d <= PANIC) {

        if (can_use("scare"))
            use_skill("scare");

        return;
    }

    //========================
    // DANGER
    //========================
    if (d <= SAFE && d > (PANIC + 40) ) {

        // Chỉ giữ aggro khi scare đã sẵn sàng
        if (can_use("scare") && can_attack(ent) && character.hp > 5000)
            attack(ent);

        return;
    }

    //========================
    // SAFE
    //========================

    if (can_attack(ent) && d > SAFE)
        attack(ent);

}, 50);

//====================================================
// Đi waypoint
//====================================================

async function walkRoute(){

    for(let i = 1; i < WAYPOINTS.length; i++){

        const ent = parent.entities[lureEntId];

        if(ent && !ent.rip){

            const d = distance(character, ent);

            if(d > MAX_LURE_DISTANCE)
                await waitIfTooFar();
        }

        const p = WAYPOINTS[i];

        await smart_move({
            map: p.map,
            x: p.x,
            y: p.y
        });

    }

}

///////////////////////////////////////
async function runLure(){

    try{

		
		startLure = true;

	 if (!character.slots.mainhand || character.slots.mainhand.name !== "dartgun"){
        const rod1 = locate_item("dartgun");
        if (rod1 !== -1) {
         equip(rod1);
        }
	 }	
		
        await smart_move(WAYPOINTS[0]);

	
		
        const ok = await lureEnt();

        if(!ok){
            game_log("Không lấy được aggro");
            return;
        }

        await walkRoute();

        game_log("Hoàn thành");

    }finally{

    lureEntId = null;
    danglure = 0;

    smart_move(
        { map: "main", x: -100, y: 40 },
        () => {
            open_stand();
            startLure = false;
            game_log("Lure hoàn thành hoàn toàn");
        }
    );
		
    }

}


///////////////////////////////////////////
//////////////////////////////////////////



let checkcauca = 0;
const startTime1c = Date.now();
const DELAY1c =  3 * 60 * 1000; // 5 phút

async function doFishing() {
    // Chờ 5 phút đầu tiên
    if (Date.now() - startTime1c < DELAY1c ) {
        return;
    }
    // 1. Check cooldown skill fishing
    if (is_on_cooldown("fishing") )
	{
		checkcauca = 0;
		return;
	}
	
	

	


    // 3. Move tới vị trí câu cá nếu chưa đứng đúng
    const target = { map: "main", x: -1366, y: -14 };

    if ( !smart.moving &&
        (character.map !== target.map ||
        distance(character, target) > 10)
    ) {
        await smart_move(target);
    }
	
    if ( 
        (character.map == target.map &&
        distance(character, target) < 10)
    ) {
		
	checkcauca = 1;

    // 2. Kiểm tra vũ khí (rod)
    const rodName = "rod"; //

    if (!character.slots.mainhand || character.slots.mainhand.name !== rodName) {
        const rod = locate_item(rodName);
        if (rod !== -1) {
			unequip("offhand");
            await equip(rod);
        } else {
            game_log("Không có cần câu!");
            return;
        }
    }
	
	    // 4. Dùng skill fishing
    if (!character.c.fishing) use_skill("fishing");
	
	}
	else
	{
			checkcauca = 0;

	}
	


}



setInterval(doFishing, 2000);




/
/* ================= LOOT ================= */




////////////////////////////////////////////////






