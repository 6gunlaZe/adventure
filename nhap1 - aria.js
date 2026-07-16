










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
        startLure = false;
		danglure = 0;
	smart_move({ map: "main", x: -200, y: -110 }, () => {
     open_stand();
    });
		
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




//////////////// đánh quái yếu + hỗ trợ quái mạnh bằng snowball
//////////////// SNOWBALL FARM – FINAL CLEAN VERSION ////////////////

setInterval(() => {
    lootNearby();
	
    if (checkcauca == 1) return;
	
    weakMonsterSkill({
        monsterTypes: [
          "frog","jr","greenjr","grinch",
        ],
        strongMonsterTypes: ["fireroamer111"],
        minSnowballForStrong: 70
    });
}, 180);


/* ================= GLOBAL STATE ================= */

let snowballQueue = [];
let lastSnowballTargetTime = 0;
let equipLockUntil = 0;

const NO_TARGET_TIMEOUT = 800;   // ms
const EQUIP_LOCK_TIME   = 400;   // ms
const NEARBY_RANGE      = 600;


/* ================= HELPERS ================= */

function isValidMonster(e) {
    return e && e.type === "monster" && !e.dead && e.hp > 0;
}

function safeEquip(itemName) {
    const now = Date.now();
    if (now < equipLockUntil) return false;
    if (character.slots.mainhand?.name === itemName) return false;

    const slot = character.items.findIndex(i => i && i.name === itemName);
    if (slot === -1) return false;

    equip(slot);
    equipLockUntil = now + EQUIP_LOCK_TIME;
    return true;
}

function hasNearbyRelevantMonster(monsterTypes, strongMonsterTypes) {
    for (let e of Object.values(parent.entities)) {
        if (!isValidMonster(e)) continue;

        if (
            monsterTypes.includes(e.mtype) ||
            strongMonsterTypes.includes(e.mtype)
        ) {
            if (distance(character, e) <= NEARBY_RANGE) {
                return true;
            }
        }
    }
    return false;
}


/* ================= CORE LOGIC ================= */

function weakMonsterSkill({
    monsterTypes,
    strongMonsterTypes = [],
    minSnowballForStrong = 50,
    skill = "snowball",
    fortName = "froststaff",
    bowName = "broom",
    requiredItem = "snowball"
} = {}) {

    /* ===== COUNT SNOWBALL ===== */
let snowballCount = 0;
for (let i of character.items) {
    if (i && i.name === requiredItem) {
        snowballCount += i.q || 1;
    }
}

if (startLure)return false;	
	
	 if (!character.slots.offhand || character.slots.offhand.name !== "wbookhs"){
        const rod1 = locate_item("wbookhs");
        if (rod1 !== -1) {
         equip(rod1);
        }
	 }
	
/* ===== HẾT SNOWBALL → ĐỔI BROOM NGAY ===== */
if (snowballCount === 0) {
    safeEquip(bowName);
    return false;
}


    /* ===== SELECT TARGET ===== */
    const target = selectSnowballTarget(
        monsterTypes,
        strongMonsterTypes,
        snowballCount,
        minSnowballForStrong
    );

    const now = Date.now();

    /* ===== CÓ TARGET ===== */
    if (target) {
        lastSnowballTargetTime = now;

        safeEquip(fortName);

        if (
            character.slots.mainhand?.name === fortName &&
            !is_on_cooldown(skill) && character.mp > 100 &&
            can_use(skill, target)
        ) {
            use_skill(skill, target);
        }
        return true;
    }

    /* ===== KHÔNG TARGET NHƯNG CÒN QUÁI GẦN ===== */
    if (hasNearbyRelevantMonster(monsterTypes, strongMonsterTypes)) {
        return false;
    }

/* ===== HẾT QUÁI HOẶC HẾT SNOWBALL → ĐỔI BROOM NGAY ===== */
if (!target || snowballCount === 0) {
    safeEquip(bowName);
    return false;
}


	
	
}


/* ================= TARGET SELECTION ================= */

function selectSnowballTarget(
    monsterTypes,
    strongMonsterTypes,
    snowballCount,
    minSnowballForStrong
) {
    /* ===== FIREROAMER: SPAM ===== */
	const ATTACK_RANGE = 300;

    for (let e of Object.values(parent.entities)) {
        if (
            isValidMonster(e) &&
            strongMonsterTypes.includes(e.mtype) &&
            e.target &&
            parent.party_list?.includes(e.target) &&
            snowballCount >= minSnowballForStrong
			&&  distance(character, e) <= ATTACK_RANGE   

        ) {
            return e;
        }
    }

    /* ===== CLEAN QUEUE ===== */
    snowballQueue = snowballQueue.filter(isValidMonster);

    /* ===== QUÁI YẾU ===== */
    for (let e of Object.values(parent.entities)) {
        if (!isValidMonster(e)) continue;
        if (!monsterTypes.includes(e.mtype)) continue;
        if (distance(character, e) > ATTACK_RANGE) continue; 

        if (e.hp >= 2000) {
            return e; // focus
        }

        if (!snowballQueue.some(q => q.id === e.id)) {
            snowballQueue.push(e); // rải
        }
    }

/* ===== RẢI SNOWBALL CHỈ KHI CÒN SNOWBALL ===== */
if (snowballQueue.length > 0 && snowballCount > 0) {
    return snowballQueue.shift();
}


    return null;
}


/* ================= LOOT ================= */

function lootNearby() {
    if (character.rip) return false;

    if (parent.party_list?.length) {
        for (let name of parent.party_list) {
            if (name !== character.name && get_player(name)) {
                return false;
            }
        }
    }

    const chests = get_chests();
    for (let id in chests) loot(id);
    return true;
}


////////////////////////////////////////////////






//////////////////////vòng lặp xả banh


setInterval(() => {
    // ===== COUNT SNOWBALL =====
    let snowballCount = 0;
    for (let i of character.items) {
        if (i && i.name === "snowball") {
            snowballCount += i.q || 1;
        }
    }

    // ===== CONDITION MOVE =====
    if (snowballCount > 0 && character.mp > 1000 && !parent?.S?.grinch?.live ) {
        if (!smart.moving && character.map != "bank" ) {
			
					smart_move("jr", () => {
  smart_move("main");
    });
        }
    }
}, 450000);














