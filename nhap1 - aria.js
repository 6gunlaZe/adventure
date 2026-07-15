const WAYPOINTS = [
    { map: "desertland", x: -222,    y: -1898 },
    { map: "desertland", x: 5,    y: -1883 },
    { map: "desertland", x: 218,  y: -1745 },
    { map: "desertland", x: 199,  y: -1125 },
    { map: "desertland", x: 85,   y: -1035 },
  //  { map: "desertland", x: -187, y: -620 },
  //  { map: "desertland", x: -496, y: -620 },
  //  { map: "desertland", x: -757, y: -302 }
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
const PANIC_BUFFER = 20;

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
    if (d <= SAFE && d > (PANIC + 20) ) {

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
        startLure = false;
		danglure = 0;
	smart_move({ map: "main", x: -200, y: -110 }, () => {
     open_stand();
    });
		
    }

}













runLure()

