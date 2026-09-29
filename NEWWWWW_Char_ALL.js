// ============================================================
// CONFIG & STATE 
// ============================================================
const LEADER = "haiz";
const PARTY = ["haiz", "6gunlaZe", "nhiY", "Ynhi","LyThanhThu","kxsights","MuaBan"];
const MERCHANT = "MuaBan";
const EXCLUDE = new Set([
    "elixirfires","hotchocolate","elixirluck","hboots","cryptkey","hpot0","mpot0","hpot1","mpot1","luckbooster","goldbooster","xpbooster","pumpkinspice","confetti",
    "elixirint0","elixirstr0","elixirdex0","elixirint1","elixirstr1","elixirdex1","elixirint2","elixirstr2","elixirdex2",
    "fieldgen0","frozenkey","spiderkey","poison","pants","coat","mittens","supermittens","snowball","xptome","cscroll0","cscroll1","scroll0","scroll1","tracker","crossbow","jacko","pouchbow","orbg"
]);
const TARGET_MONSTERS = ["osnake","snake","crab","rgoo","bgoo","poisio","stoneworm","bat","greenjr","jr","tortoise","sparkbot","targetron","goldenbot"];

const FARM_LOCATIONS = {
    osnake: { x: -555, y: -333, map: "halloween" },
    bat: { x: -194, y: -461, map: "cave" },
    targetron: { x: -512, y: -239, map: "uhills" },

};

const CHAR_CONFIG = {
    "Ynhi":     { monster: "targetron", slot: 1, solo: false, circle: true, radius: 40 },  // Đi vòng tròn, bán kính 100
    "6gunlaZe": { monster: "targetron", slot: 1, solo: false, circle: true, radius: 80 },        // Tắt đi vòng nên không cần điền radius
    "MuaBan":   { monster: "crab", slot: 2,}   
};

const FARM_MONSTER = CHAR_CONFIG[character.name]?.monster || "bat"; // => Phần còn lại là của LEADER haiz 
const IS_SOLO = CHAR_CONFIG[character.name]?.solo ?? false; // Lấy trạng thái solo của acc hiện tại

const FARM_MAP = FARM_LOCATIONS[FARM_MONSTER] || FARM_MONSTER;

const MODE = { FARM: "farm", OTHER: "other" };
let mode = MODE.FARM;

const MAX_SCAN_DISTANCE = 300;
const MERCHANT_DISTANCE = 400;

let monsters = [];
let partyEntities = [];
let merchant = null;
let currentTarget = null;
let SAFE = false; // Biến trạng thái kiểm tra có Priest ở gần không
let hasLowHpAggroMonster = false; // Biến cờ kiểm tra quái aggro dưới 20k HP sắp chết
// ============================================================
// SCAN ALL
// ============================================================
function scanAll() {
    monsters = [];
    partyEntities = [];
    merchant = null;
    SAFE = false; // Reset lại mỗi lần quét
    hasLowHpAggroMonster = false; // Reset cờ trước mỗi lượt scan
    
    // Nếu cấu hình là Solo HOẶC bản thân là Priest còn sống -> Mặc định SAFE
    if (IS_SOLO || (character.ctype === "priest" && !character.dead)) {
        SAFE = true;
    }

    for (const id in parent.entities) {
        const entity = parent.entities[id];
        if (!entity) continue;

        const dist = distance(character, entity);

        // MONSTER
        if (entity.type === "monster" && !entity.dead && dist <= MAX_SCAN_DISTANCE && TARGET_MONSTERS.includes(entity.mtype)) {
            monsters.push({ entity: entity, distance: dist });
            
        if (character.ctype == "priest" && entity.target === character.name && entity.hp < 30000) {
            hasLowHpAggroMonster = true;
        }
            
            continue;
        }

        // CHARACTER / PARTY
        if (entity.type === "character" && PARTY.includes(entity.name)) {
            if (dist <= MAX_SCAN_DISTANCE) {
                partyEntities.push({ entity: entity, distance: dist, rspeed: entity.s?.rspeed });
            }
            if (entity.name === MERCHANT && dist <= MERCHANT_DISTANCE) {
                merchant = entity;
            }

            // Kiểm tra có Priest (hồi máu) trong party ở gần <= 200 và còn sống không
            if (entity.ctype === "priest" && !entity.dead && dist <= 200) {
                SAFE = true;
            }
        }
    }

    monsters.sort((a, b) => a.distance - b.distance); // Sắp xếp quái gần lên trước

    if (PARTY.includes(character.name)) {
        partyEntities.push({ entity: character, distance: 0, rspeed: character.s?.rspeed });
    }
    if (character.name === MERCHANT) merchant = character;
}

// ============================================================
// SELECT TARGET
// ============================================================
function selectTarget() {
    const validMonsters = monsters
        .map(m => m.entity)
        .filter(entity => TARGET_MONSTERS.includes(entity.mtype) && in_attack_range(entity));

    if (validMonsters.length === 0) return null;

    // Áp dụng hàm sort chung và lấy con đầu tiên
    return sortMonstersByPriority(validMonsters)[0];
}

// Hàm sắp xếp quái theo đúng tiêu chí ưu tiên của bạn
function sortMonstersByPriority(monsterList) {
    const leaderEntity = partyEntities.find(p => p.entity.name === LEADER)?.entity;

    return [...monsterList].sort((a, b) => {
        // 1. Quái nằm trong bán kính 50px quanh Leader
        if (leaderEntity) {
            const aNearLeader = distance(a, leaderEntity) <= 50;
            const bNearLeader = distance(b, leaderEntity) <= 50;
            if (aNearLeader !== bNearLeader) return aNearLeader ? -1 : 1;
        }

        // 2. Quái có debuff (weakened / curse)
        const aWeakened = !!(a.s?.marked || a.s?.cursed );
        const bWeakened = !!(b.s?.marked || b.s?.cursed );
        if (aWeakened !== bWeakened) return aWeakened ? -1 : 1;

        // 3. Quái đang đánh Party
        const aAttackingParty = PARTY.includes(a.target);
        const bAttackingParty = PARTY.includes(b.target);
        if (aAttackingParty !== bAttackingParty) return aAttackingParty ? -1 : 1;

        // 4. Máu lớn nhất (HP cao hơn xếp trước)
        if (a.hp !== b.hp) return b.hp - a.hp;

        // 5. Gần bản thân hơn
        return distance(character, a) - distance(character, b);
    });
}



function ms_to_next_skill(skill) {
    const next_skill = parent.next_skill[skill]
    if (next_skill == undefined) return 0
    const ms = parent.next_skill[skill].getTime() - Date.now() - Math.min(...parent.pings) + 15;
    return ms < 0 ? 0 : ms;
}


// ============================================================
// RSPEED PARTY
// ============================================================
function useRspeed() {
    if (is_on_cooldown("rspeed") || character.mp <= 500) return;

    for (const member of partyEntities) {
        if (!member.rspeed || member.rspeed.ms < 300000) {
            use_skill("rspeed", member.entity);
            return;
        }
    }
}


const QUICK_DAGGERS = ["daggerofthedead", "vdagger"];
const QUICK_FISTS = ["cclaw", "pclaw"];

function useQuickAttack() {
    // 1. Kiểm tra target hợp lệ và trong tầm đánh
    if (!currentTarget || !parent.entities[currentTarget.id] || !is_in_range(currentTarget) || ms_to_next_skill("attack") < 300 ) return;

    // 2. Xác định kỹ năng theo vũ khí đang cầm ở tay chính (mainhand)
    const mhName = character.slots.mainhand?.name;
    let quickSkill = null;

    if (QUICK_DAGGERS.includes(mhName)) quickSkill = "quickstab";
    else if (QUICK_FISTS.includes(mhName)) quickSkill = "quickpunch";

    // 3. Thi triển kỹ năng nếu đủ MP và không bị hồi chiêu (cooldown)
    if (quickSkill && !is_on_cooldown(quickSkill) && character.mp > 600) {
        use_skill(quickSkill, currentTarget);
    }
}





let attackBusy = false;
const REVERSE_3SHOT_MONSTERS = ["crab"];

async function use_multi_shot() {
    if (attackBusy || (character.hp / character.max_hp) < 0.5) return false;
    if (monsters.some(m => m.entity.target === character.name && m.entity.level > 1)){
        useAttack();
        return false;
    }
    // KIỂM TRA COOLDOWN (BÙ PING) TRƯỚC KHI TÌM QUÁI -> Cực kỳ tiết kiệm CPU
    const pingComp = Math.max(10, character.ping / 10);
    const can3Shot = ms_to_next_skill("3shot") <= pingComp;
    const can5Shot = ms_to_next_skill("5shot") <= pingComp;
    
    // Nếu cả 2 chiêu đều đang cooldown -> Nghỉ luôn, khỏi tính toán
    if (!can3Shot && !can5Shot) return false;

    attackBusy = true;

    try {
        // 1. Kiểm tra an toàn: Máu mình >= 70% hoặc Ynhi gần đó >= 50%
        const Ynhi = partyEntities.find(p => p.entity.name === "Ynhi" && !p.entity.dead)?.entity;
        const allowUntargeted = (character.hp / character.max_hp) >= 0.7 && 
                                (!Ynhi || (Ynhi.hp / Ynhi.max_hp) >= 0.5);

        // 2. Lọc & Sắp xếp danh sách quái
        let valid = monsters
            .map(m => m.entity)
            .filter(e => e.level <= 1 && is_in_range(e, "3shot") && (allowUntargeted || !!e.target));

        valid = (character.ctype === "ranger" && REVERSE_3SHOT_MONSTERS.includes(FARM_MONSTER))
            ? valid.reverse()
            : sortMonstersByPriority(valid);

        // 3. Chọn mục tiêu & Thi triển skill
        const targets = valid.slice(0, 5);
        if (targets.length < 2) {
        useAttack();
            return false;
        }
        // Ưu tiên 5shot nếu đủ mục tiêu và chiêu đã sẵn sàng
        let skill = "3shot";
        if (targets.length >= 4 && can5Shot) {
            skill = "5shot";
        } else if (!can3Shot) {
            return false; // Chỉ có 2-3 mục tiêu và 3shot lại đang hồi chiêu
        }

        if (character.mp < G.skills[skill].mp + 300) //chỉ đủ mana để đánh thường
        {
            useAttack();
            return false;
        }
        // TUNG CHIÊU VÀ ÉP XUNG COOLDOWN NGAY LẬP TỨC
        await use_skill(skill, targets);
        reduce_cooldown(skill, character.ping * 0.95);
        
        return true;

    } catch (e) {
        return false;
    } finally {
        attackBusy = false;
    }
}



async function use_fan_of_knives() {
    // 1. Kiểm tra tài nguyên và trạng thái sớm
    if (attackBusy || character.hp / character.max_hp < 0.3 )return false;
    if (character.mp < G.skills["fanofknives"].mp + 330) {
        useAttack();
        return false;
    }
    
    // 2. KIỂM TRA COOLDOWN & BÙ PING (Cực kỳ tiết kiệm CPU)
    // Vì skill này chung mâm với đánh thường, ta check thời gian chờ của "attack" 
    const pingComp = Math.max(10, character.ping / 10);
    if (ms_to_next_skill("attack") > pingComp) {
        return false; 
    }

    // 3. Kiểm tra an toàn (Quái cấp cao cắn)
    if (monsters.some(m => m.entity.target === character.name && m.entity.level > 1)) {
        useAttack();
        return false;
    }

    attackBusy = true;
    try {
        // 4. Lọc quái hợp lệ
        const validMonsters = monsters
            .map(m => m.entity)
            .filter(e => e.level <= 1 && is_in_range(e, "fanofknives"));

        // TỐI ƯU CPU: Nếu không đủ 3 con thì nghỉ luôn, KHÔNG cần chạy hàm Sort nặng nề
        if (validMonsters.length < 3){
        useAttack();
            return false;
        }
        // 5. Sắp xếp theo thứ tự ưu tiên (Leader 50px -> Debuff -> Aggro Party -> Max HP)
        const sortedMonsters = sortMonstersByPriority(validMonsters);

        // Lấy 5 quái tốt nhất
        const targets = sortedMonsters.slice(0, 5);

        // 6. Tung chiêu và Ép xung Cooldown
        await use_skill("fanofknives", targets);
        
        // Bù Ping ngay lập tức cho thanh Cooldown đánh thường
        reduce_cooldown("attack", character.ping * 0.95);
        
        return true;

    } catch (e) {
        return false;
    } finally {
        attackBusy = false;
    }
}


const ENERGIZE_RESERVE = 300; // mp giữ lại
const ENERGIZE_BUFFER = 200; //ngưỡng chống đầy

function energizeParty() {
    if (is_on_cooldown("energize")) return;

    // Dùng Math.max(1, ...) để luôn có ít nhất 1 MP cho đồng đội (lấy từ 500 MP dự phòng)
    const mageCanGive = Math.max(1, character.mp - ENERGIZE_RESERVE);

    let fallbackTarget = null;

    for (const name of PARTY) {
        const entry = partyEntities.find(p => p.entity.name === name);
        if (!entry) continue;

        const target = entry.entity;
        if (target.rip || !is_in_range(target, "energize")) continue;

        if (!fallbackTarget) fallbackTarget = target;

        const need = target.max_mp - ENERGIZE_BUFFER - target.mp;
        if (need <= 0) continue;

        use_skill("energize", target.name, Math.min(need, mageCanGive));
        return;
    }

    // Nếu không ai thực sự thiếu MP, bơm 1 MP cho đồng đội hợp lệ đầu tiên
    if (fallbackTarget) {
        use_skill("energize", fallbackTarget.name, 1);
    }
}


function trySingleHeal() {
    // 1. Kiểm tra Cooldown & Bù Ping sớm nhất có thể để tiết kiệm CPU
    const pingComp = Math.max(10, character.ping / 10);
    if (ms_to_next_skill("heal") > pingComp) return false;

    // 2. Tính tỉ lệ hồi máu động (rateheal)
    let rateheal = 0.9;
    if (character.map !== "winter_instance") {
        const dynamicRate = 1 - (character.heal / character.max_hp);
        rateheal = Math.max(0.9, dynamicRate);
        if (character.targets > 5) rateheal = 0.95;
    }

    // 3. Tìm thành viên party cần heal có % HP thấp nhất trong tầm đánh
    let lowestMember = null;
    let lowestHpPercent = rateheal; // Chỉ xét những ai máu dưới mức rateheal

    for (const p of partyEntities) {
        const member = p.entity;
        if (!member || member.dead) continue;
        
        // Kiểm tra tầm đánh (range)
        if (distance(character, member) > character.range) continue;

        const hpPercent = member.hp / member.max_hp;
        if (hpPercent < lowestHpPercent) {
            lowestHpPercent = hpPercent;
            lowestMember = member;
        }
    }

    // Nếu không có ai cần heal thì dừng lại
    if (!lowestMember) return false;

    // 4. Thực hiện Heal và Ép xung Cooldown ngay lập tức
    heal(lowestMember).then(function() {
        reduce_cooldown("heal", character.ping * 0.95);
    }).catch(function(e) {
        // Bắt lỗi im lặng nếu mục tiêu biến mất hoặc chết giữa chừng
    });

    return true; // Báo hiệu đã thực thi heal thành công
}

let delayParty = 0;

function tryPartyHeal() {
    // 1. Check MP và cooldown skill
    if (character.mp <= 750 || is_on_cooldown("partyheal")) return false;

    // 2. Tìm % HP thấp nhất trong Party
    let lowestHpRatio = 1.0;
    let hasAliveMember = false;

    for (const p of partyEntities) {
        const member = p.entity;
        if (!member || member.dead) continue;
        hasAliveMember = true;
        
        const ratio = member.hp / member.max_hp;
        if (ratio < lowestHpRatio) lowestHpRatio = ratio;
    }

    if (!hasAliveMember) return false;

    // 3. MODE 0: Cứu nguy khẩn cấp cực độ (< 36% HP) -> Bơm ngay lập tức
    if (lowestHpRatio < 0.36) {
        use_skill("partyheal");
        delayParty = Date.now();
        return true;
    }

    // 4. Nhường nhịp cho attack nếu đang an toàn
    if (ms_to_next_skill("attack") < 200) return false;

    // 5. TÍNH TOÁN ĐIỀU KIỆN CẦN BƠM MÁU
    const missingMp = character.max_mp - character.mp;
    let requiredDelay = Infinity;

    if (character.mp > 6000 && lowestHpRatio < 0.67 && lowestHpRatio > 0.5) requiredDelay = 400;
    else if (missingMp < 1500 && lowestHpRatio < 0.83) requiredDelay = 300;
    else if (missingMp < 600) requiredDelay = 200;
    else if (lowestHpRatio < 0.65) {
        const clamped = Math.max(0.33, Math.min(0.66, lowestHpRatio));
        requiredDelay = 50 + (360 - 50) * ((clamped - 0.33) / (0.66 - 0.33));
    }

    // Nếu KHÔNG thỏa mãn bất kỳ điều kiện bơm máu nào -> requiredDelay vẫn là Infinity -> Bỏ qua
    if (requiredDelay === Infinity) return false;

    // 🎯 SỬA CHỖ NÀY: Nếu có điều kiện bơm máu VÀ có quái < 20k HP aggro -> ÉP DELAY VỀ 50
    if (hasLowHpAggroMonster) {
        requiredDelay = 50;
    }

    // 6. Thực thi bơm máu
    const now = Date.now();
    if (now > delayParty + requiredDelay) {
        use_skill("partyheal");
        delayParty = now;
        return true;
    }

    return false;
}


const EXTRA_CURSE_TARGETS = new Set(["franky", "icegolem", "crabxx", "bscorpion", "mrgreen", "mrpumpkin", "dragold"]);

function tryCurse() {
    // 1. Kiểm tra Priest, Cooldown & MP tối thiểu
    if (character.ctype !== "priest" || is_on_cooldown("curse") || character.mp < 2200) return false;

    //Nhường nhịp cho attack
    if (ms_to_next_skill("attack") < 200) return false;
    
    const curseRange = G.skills.curse.range || 200;

    // Lấy entity của LEADER trực tiếp từ mảng partyEntities đã có sẵn
    const leaderObj = partyEntities.find(p => p.entity.name === LEADER);
    const leaderEntity = leaderObj ? leaderObj.entity : null;

    let bestTarget = null;
    let maxHp = -1;
    let maxPriority = -1;

    // 2. Duyệt trực tiếp mảng monsters từ scanAll()
    for (const m of monsters) {
        const mob = m.entity;

        // Bỏ qua nếu vượt tầm Curse hoặc quái đã bị dính Cursed
        if (m.distance > curseRange || mob.s?.cursed) continue;

        const isExtraTarget = EXTRA_CURSE_TARGETS.has(mob.mtype);
        // Kiểm tra xem quái có đang target bất kỳ ai trong partyEntities không
        const isAttackingParty = partyEntities.some(p => p.entity.name === mob.target);

        let priority = 0;

        // --- KIỂM TRA ĐIỀU KIỆN ---
        if (isExtraTarget && character.mp >= 2200) {
            // Quái danh sách chọn thêm: MP >= 2200, Bỏ qua khoảng cách Leader
            priority = 2;
        } else if (isAttackingParty && character.mp >= 4200) {
            // Quái thường đang đánh Party: MP >= 4200
            const distToLeader = leaderEntity ? distance(leaderEntity, mob) : Infinity;

            if (distToLeader <= 50) {
                priority = 2; // Sát Leader (<= 50px)
            } else {
                priority = 1; // Đánh Party ở xa Leader (> 50px)
            }
        }

        if (priority === 0) continue;

        // --- LỰA CHỌN: UU TIÊN TẦNG CAO HƠN -> MÁU NHIỀU NHẤT ---
        if (priority > maxPriority || (priority === maxPriority && mob.hp > maxHp)) {
            maxPriority = priority;
            maxHp = mob.hp;
            bestTarget = mob;
        }
    }

    // 3. Thi triển Curse
    if (bestTarget) {
        use_skill("curse", bestTarget);
        return true;
    }

    return false;
}



const NO_ABSORB = new Set(["pppompom", "oneeye", "nerfedmummy", "nerfedbat"]);
const PRIORITY_BOSSES = new Set(["xmagefz", "xmagefi", "xmagex", "xmagen", "franky"]);
const VIP_PLAYERS = new Set(["6gunlaZe", "nhiY", "LyThanhThu", "MuaBan","tienV"]);

let lastAbsorbTime = 0;

function tryAbsorb() {
    if (!character.party || smart.moving || character.hp < 3500 || character.mp < 800 || is_on_cooldown("absorb")) return;
    if (Date.now() - lastAbsorbTime < 250) return;

    let bestTarget = null;
    let maxDanger = 0;

    // 1. Quét Boss nguy hiểm trước (Ưu tiên tuyệt đối)
    const boss = Object.values(parent.entities).find(e => 
        e && !e.dead && PRIORITY_BOSSES.has(e.mtype) && e.target && e.target !== character.name
    );

    if (boss) {
        const victim = get_player(boss.target);
        if (victim && !victim.rip && distance(character, victim) <= 240) {
            use_skill("absorb", boss.target);
            lastAbsorbTime = Date.now();
            return;
        }
    }

    // 2. Tự động tính điểm nguy hiểm cho từng đồng đội trong Party
    for (const p of partyEntities) {
        const mate = p.entity;
        if (!mate || mate.dead || mate.name === character.name) continue;

        // Lọc tất cả quái đang đánh đồng đội này
        const attackers = monsters.filter(m => 
            m.entity.target === mate.name && !NO_ABSORB.has(m.entity.mtype)
        );

        if (!attackers.length) continue;

        // Đếm riêng số lượng quái đánh phép (damage_type === "magical")
        const magicCount = attackers.filter(m => m.entity.damage_type === "magical").length;

        // Kiểm tra quái sắp chết dựa theo max_hp của từng con
        const hasDyingMonster = attackers.some(m => {
            const e = m.entity;
            const hpThreshold = e.max_hp >= 800000 ? 65000 : (e.max_hp >= 200000 ? 29000 : 15000);
            return e.hp < hpThreshold;
        });
        
        // TÍNH ĐIỂM NGUY HIỂM:
        let dangerScore = attackers.length * 10;
        if (hasDyingMonster) dangerScore += 500;
        
        const hpRatio = mate.hp / mate.max_hp;
        if (VIP_PLAYERS.has(mate.name)) dangerScore += 70;
        if (hpRatio < 0.7) dangerScore += 70;
        if (hpRatio < 0.4) dangerScore += 100;
        if (attackers.length >= 4) dangerScore += 20;
        if (magicCount >= 3) dangerScore += 100;

        if (dangerScore > maxDanger) {
            maxDanger = dangerScore;
            bestTarget = mate.name;
        }
    }

    // 3. Thi triển Absorb (Chỉ hút khi mức độ nguy hiểm đạt từ 100 điểm trở lên)
    if (bestTarget && maxDanger >= 100) {
        use_skill("absorb", bestTarget);
        lastAbsorbTime = Date.now();
        game_log(`🛡 Absorb ${bestTarget} (Danger: ${maxDanger})`);
    }
}


function tryDarkBlessing() {
    // 1. BẮT BỘC phải đang có target đánh thì mới xét tiếp (Tránh lãng phí MP khi đi ngang qua quái)
    if (!currentTarget) return false;

    // 2. Kiểm tra Priest, MP, Cooldown & Status buff
    if (
        character.ctype !== "priest" ||
        character.mp <= 5200 ||
        is_on_cooldown("darkblessing") ||
        character.s?.darkblessing
    ) return false;

    // 3. Nếu target là bscorpion thì chỉ dùng khi nó > 200k HP
    if (currentTarget.mtype === "bscorpion" && currentTarget.hp <= 200000) return false;

    // 4. Đếm số quái trong bán kính 250px (dùng m.distance từ scanAll)
    const nearbyMobsCount = monsters.filter(m => m.distance <= 250).length;

    // 5. Gom từ 3 quái trở lên -> Bật Aura
    if (nearbyMobsCount > 2) {
        use_skill("darkblessing");
        return true;
    }

    return false;
}




async function trySuperShot() {
    let targeted = get_targeted_monster();
    if (targeted) currentTarget = targeted;

    if (!currentTarget || smart.moving || attackBusy) return false;
    if (is_on_cooldown("supershot") || character.mp < 800) return false;

    // Kiểm tra Healer (Priest) còn sống ở gần (trong tầm 300px)
    const hasHealer = partyEntities.some(p => 
        p.entity.ctype === "priest" && !p.entity.dead && p.distance <= 300
    );

    if (!hasHealer) return false;
    
        try {
            await use_skill("supershot", currentTarget);
            return true;
        } catch (e) {
            return false;
        }
    return false;
}


function useAttack() {


    // CHỐT CHẶN COOLDOWN: Nếu chưa tới lượt đánh thì thoát luôn, không spam
    const pingComp = Math.max(10, character.ping / 10);
    if (ms_to_next_skill("attack") > pingComp) return;
    
    let targeted = get_targeted_monster();
    
    // CƠ CHẾ AN TOÀN: Xóa mục tiêu hiện tại nếu nó đã chết hoặc không còn tồn tại
    if (currentTarget && (currentTarget.dead || !parent.entities[currentTarget.id])) {
        currentTarget = null;
    }

    if (targeted) currentTarget = targeted;
    
    if (!currentTarget || smart.moving) return;

    // DI CHUYỂN TỚI TARGET HOẶC TẤN CÔNG
    if (FARM_MONSTER != "crab" && !is_in_range(currentTarget)) {
        // Tránh tình trạng spam lệnh move liên tục gây khựng nhân vật
        if (!character.moving) {
            move(
                character.x + (currentTarget.x - character.x) / 2,
                character.y + (currentTarget.y - character.y) / 2
            );
        }
        return;
    }
    
    // BÙ PING CHO ĐÁNH THƯỜNG
    
    if (
        currentTarget &&
        !smart.moving &&
        currentTarget.type === "monster" &&
        TARGET_MONSTERS.includes(currentTarget.mtype) &&
        is_in_range(currentTarget) &&
        ms_to_next_skill("attack") <= pingComp // Thay can_attack bằng điều kiện bù ping
    ) {
        // TẤN CÔNG VÀ ÉP XUNG COOLDOWN
        attack(currentTarget)
            .then(function() {
                reduce_cooldown("attack", character.ping * 0.95);
            })
            .catch(function(e) {
                // Lỗi mục tiêu chết nhanh hơn đạn bay, bắt lỗi im lặng
            });
    }
}




// ============================================================
// SCAN LOOP & COMBAT LOOP
// ============================================================
function autoLootAndBooster() {
    const chests = Object.keys(parent.chests || {});

    // 1. Quá nhiều rương -> Gold & Loot rồi thoát luôn
    if (chests.length >= 20 || smart.moving) {
        shift(0, 'goldbooster');
        return chests.forEach(loot);
    }

    // 2. Check quái & Đổi Booster bằng Ternary Operator (1 dòng)
    monsters.some(m => m.entity.mtype === FARM_MONSTER)
        ? setTimeout(() => shift(0, 'xpbooster'), 550)
        : shift(0, 'luckbooster');
}

setInterval(autoLootAndBooster, 1000);

setInterval(function() {
    scanAll();
    currentTarget = selectTarget();
    use_hp_or_mp1();
    tryTemporalSurge();
}, 100);



// ============================================================
// FARM MOVEMENT LOOP moveloop
// ============================================================


let checkcrabxx = 0;
let noTargetTimer = null;
let farmingMoving = false;

// --- BIẾN CHO VIỆC ĐI VÒNG TRÒN ---
let farmAngle = 0;
const ANGLE_STEP = Math.PI / 4; 
// ----------------------------------

setInterval(function() {

    if (typeof isLuringKane !== "undefined" && isLuringKane) return;
    
    // EVENT HANDLING
    if (parent?.S?.goobrawl && checkcrabxx === 1) {
        if (character.map !== "goobrawl" && !smart.moving) parent.socket.emit("join", { name: "goobrawl" });
        if (character.map === "goobrawl") stop("smart");
        return;
    }

    if (parent?.S?.crabxx && checkcrabxx === 1) {
        const crabxx = get_nearest_monster({ type: "crabxx" });
        if (!crabxx && !smart.moving) parent.socket.emit("join", { name: "crabxx" });
        if (crabxx && distance(character, crabxx) <= 200) stop("smart");
        return;
    }

    // FARM CHECK & DELAY SMART MOVE
    if (smart.moving || mode !== MODE.FARM || farmingMoving) return;

    // --- ĐỌC CONFIG CỦA NHÂN VẬT ---
    const myConfig = CHAR_CONFIG[character.name] || {};
    const isCircleEnabled = myConfig.circle === true;
    const myRadius = myConfig.radius || 30; // Nếu không cài radius trong config, mặc định là 30

    // --- LOGIC ĐI VÒNG TRÒN ---
    if (isCircleEnabled && character.map === FARM_MAP.map && distance(character, FARM_MAP) < 300) {
        farmAngle += ANGLE_STEP; 
        if (farmAngle >= Math.PI * 2) farmAngle = 0; 

        // Sử dụng myRadius thay vì FARM_RADIUS cố định
        let nextX = FARM_MAP.x + myRadius * Math.cos(farmAngle);
        let nextY = FARM_MAP.y + myRadius * Math.sin(farmAngle);

        if (can_move_to(nextX, nextY)) {
            move(nextX, nextY); 
        }
    }
    // --------------------------

    if (currentTarget) {
        noTargetTimer = null;
        return; 
    }

    if (!noTargetTimer) noTargetTimer = Date.now();
    if (Date.now() - noTargetTimer < 5000) return;

    farmingMoving = true;
    smart_move(FARM_MAP)
        .finally(() => { 
            farmingMoving = false; 
            noTargetTimer = null; 
        });
}, 1000);



// START FARM INITIAL
smart_move(FARM_MAP)
    .then(function() { farmingMoving = false; })
    .catch(function() { farmingMoving = false; });




let lastConfetti = 0;
let lastKanePos = null;
let stuckCheckTime = 0;
let isLuringKane = false; 

// Cờ đánh dấu nếu Kane đã đổi map/mất tích
let kaneNotFoundOrGobi = false; 

const FARM_SPOT = { x: -1173, y: -58, map: "main" }; 
const KANE_ORIGIN = { x: -1011, y: 1681, map: "main", width: 20, height: 20 };

setInterval(() => {

    if (FARM_MONSTER != "crab" && character.name != "LyThanhThu" ) return
    
    // 0. Nếu đã xác định Kane mất tích/đổi map -> Bỏ qua toàn bộ logic dụ Kane
    if (kaneNotFoundOrGobi) {
        isLuringKane = false;
        return;
    }

    const kane = Object.values(parent.entities).find(e =>
        e.type === "npc" && e.npc === "citizen0" && e.name === "Kane"
    );


// 1. Kane đã về tới Bãi Farm VÀ sát nhân vật -> Xong nhiệm vụ
if (kane && distance(kane, FARM_SPOT) <= 90 && distance(kane, character) <= 100) {
    isLuringKane = false;
    return;
}

// 1.5. MẸO ĐƯỜNG CỤT: Kane đã đi lố lên phía TRÊN bãi farm (vùng 10h - 2h) -> Bỏ qua, không kéo nữa!
if (kane && isKanePastFarmInDeadEnd(kane, FARM_SPOT)) {
    // Có thể cho dừng dụ để quay lại farm bình thường
    isLuringKane = false; 
    return;
}
    

    // 2. Xử lý khi KHÔNG thấy Kane trong màn hình:
    if (!kane) {
        const distToOrigin = distance(character, KANE_ORIGIN);

        // Nếu đã chạy đến sát tọa độ gốc (<= 50px) mà vẫn KHÔNG thấy Kane -> Kane đã đi map khác
        if (distToOrigin <= 50) {
            kaneNotFoundOrGobi = true; // Bỏ check Kane vĩnh viễn (cho đến khi reload script)
            isLuringKane = false;
            return;
        }

        // Nếu chưa tới tọa độ gốc -> Tiếp tục di chuyển lại KANE_ORIGIN để tìm
        isLuringKane = true;
        if (!character.moving && !smart.moving) {
            xmove(KANE_ORIGIN.x, KANE_ORIGIN.y);
        }
        return;
    }

    // 3. Nếu ĐÃ THẤY Kane -> Tiến hành dụ Kane từng bước
    isLuringKane = true;
    const distToKane = distance(character, kane);

    // Chạy lại gần Kane nếu ở quá xa
    if (distToKane > 250) {
        if (!character.moving && !smart.moving) {
            const angle = Math.atan2(kane.y - character.y, kane.x - character.x);
            const targetX = kane.x - Math.cos(angle) * 180;
            const targetY = kane.y - Math.sin(angle) * 180;
            
            xmove(targetX, targetY);
        }
        return;
    }

    // Kiểm tra chống kẹt Kane
    if (Date.now() - stuckCheckTime > 2000) {
        if (lastKanePos && distance(kane, lastKanePos) < 5) {
            const angle = Math.atan2(kane.y - character.y, kane.x - character.x);
            move(character.x + Math.cos(angle) * 30, character.y + Math.sin(angle) * 30);
        }
        lastKanePos = { x: kane.x, y: kane.y, map: kane.map, width: kane.width, height: kane.height };
        stuckCheckTime = Date.now();
    }

    // Kiểm tra Cooldown & ném Confetti
    if (Date.now() - lastConfetti < 5000) return;

    const slot = locate_item("confetti");
    if (slot === -1) return;

    throw_item(slot, character.x, character.y);
    lastConfetti = Date.now();

    // Lùi 1 bước về Bãi Farm
    const angleToFarm = Math.atan2(FARM_SPOT.y - character.y, FARM_SPOT.x - character.x);
    const nextX = character.x + Math.cos(angleToFarm) * 120;
    const nextY = character.y + Math.sin(angleToFarm) * 120;

    xmove(nextX, nextY);

}, 800);


// Hàm kiểm tra Kane đã vượt quá Bãi Farm và lọt vào góc cụt phía trên (10h -> 2h) chưa
function isKanePastFarmInDeadEnd(kane, farmSpot) {
    const dx = kane.x - farmSpot.x;
    const dy = kane.y - farmSpot.y;
    
    // Tính góc giữa Kane và FARM_SPOT (kết quả từ -180 đến 180 độ)
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Nằm trong khoảng 9h (-180°) đến 2h (-30°) phía TRÊN bãi farm
    return angleDeg >= -180 && angleDeg <= -30;
}

// ============================================================
// MERCHANT REQUEST COOLDOWN & REQUEST POTIONS
// ============================================================
const lastSent = { hp: 0, mp: 0, full: 0 };
const COOLDOWN_MS = 60000;

setInterval(() => {
    if (character.rip) return;

    const { esize, map, x, y, items, s } = character;
    const now = Date.now();
    let hp = 0, mp = 0;

    const sendRequest = (command) => {
        if (now - lastSent[command] < COOLDOWN_MS) return;

        send_cm(MERCHANT, { command: command, name: character.name, map: map, x: x, y: y });
        lastSent[command] = now;
        console.log(`[Client] Requested '${command}' from ${MERCHANT}`);
    };

    if (esize < 6 || s?.mluck?.f !== MERCHANT) sendRequest("full");

    for (const item of items) {
        if (!item) continue;
        if (item.name === "hpot1") hp += item.q ?? 1;
        else if (item.name === "mpot1") mp += item.q ?? 1;
    }

    if (hp < 3000) sendRequest("hp");
    if (mp < 6000) sendRequest("mp");
}, 10000);

// ============================================================
// TRANSFER GOLD + ITEMS TO MERCHANT
// ============================================================
setInterval(() => {
    const m = merchant;
    if (!m) {
        loot_transfer = false;
        return;
    }

    if (distance(character, m) <= MERCHANT_DISTANCE) {
        if (character.gold) send_gold(m, character.gold);

        for (let i = 0; i < 42; i++) {
            const item = character.items[i];
            if (item && !EXCLUDE.has(item.name) && !item.l && !item.s) {
                send_item(m.id, i, item.q ?? 1);
            }
        }
    }
}, 2000);

// ============================================================
// PARTY & START CHARACTERS
// ============================================================
function startChars() {
    // Chỉ Leader mới thực hiện
    if (character.name !== LEADER) return;

    // Duyệt qua từng nhân vật trong cấu hình để kiểm tra và khởi chạy
    for (const [charName, config] of Object.entries(CHAR_CONFIG)) {
        if (!parent.party_list.includes(charName)) {
            start_character(charName, config.slot);
        }
    }
}

// Chạy ngay lần đầu
startChars();

// Sau đó kiểm tra lại mỗi 60 giây
setInterval(startChars, 60000);


function on_party_request(n) {
    if (character.name === LEADER && PARTY.includes(n) && n !== LEADER) {
        accept_party_request(n);
    }
}

setInterval(function() {
    if (character.name === LEADER) return;

    if (!character.party) {
        send_party_request(LEADER);
    } else if (character.party !== LEADER) {
        leave_party();
    }
}, 2000);

// AUTO RESPAWN
setInterval(() => character.rip && respawn(), 50000);

// ============================================================
// HP / MP POTION & SKILL LOOP
// ============================================================
function use_hp_or_mp1() {
    if (safeties && mssince(last_potion) < min(200, character.ping * 3)) {
        return resolving_promise({ reason: "safeties", success: false, used: false });
    }

    if (is_on_cooldown("use_hp")) {
        return resolving_promise({ success: false, reason: "cooldown" });
    }

    let skill = null;
    if (character.hp / character.max_hp < 0.3 && character.mp > 130 ) skill = "use_hp";
    else if (character.mp / character.max_mp < 0.5) skill = "use_mp";
    else if (character.hp / character.max_hp < 0.9) skill = "use_hp";
    else if (character.mp / character.max_mp < 0.9) skill = "use_mp";

    if (!skill) {
        return resolving_promise({ reason: "full", success: false, used: false });
    }

    last_potion = new Date();
    return use_skill(skill);
}



async function skillLoop() {
    let delay = 40; // Độ trễ chuẩn để quét liên tục mà không lag game

    try {
        // Chỉ chạy logic nếu nhân vật không bị khống chế/chết
        if (!is_disabled(character)) {
            
            switch (character.ctype) {
                case "rogue":
                    useRspeed(); 
                    
                    if (!SAFE) break; // Chưa an toàn -> Bỏ qua combo

                    if (await use_fan_of_knives()) {
                        return setTimeout(skillLoop, 10); 
                    }
                    break;

                case "ranger":
                    if (!SAFE) break; // Chưa an toàn -> Bỏ qua combo
                    trySuperShot(); 
                    
                    // Multi-shot (3shot/5shot) chung CD với Attack.
                    if (await use_multi_shot()) {
                        return setTimeout(skillLoop, 10);
                    }
                    break;

                case "mage":
                    energizeParty();
                    break;
                    
                case "priest":
                    tryPartyHeal();
                    tryCurse();
                    tryAbsorb();
                    tryDarkBlessing();
                    
                    // Tương tự, nếu Priest vừa buff máu mục tiêu đơn (chung CD đánh thường)
                    if (trySingleHeal()) {
                        return setTimeout(skillLoop, 10);
                    }
                    break;
                    
                case "warrior":
                    // Bạn có thể thêm Cleave, Taunt, Charge vào đây sau
                    break;
                    
            }

        }
    } catch (e) {
        console.error("Lỗi trong skillLoop:", e);
    }

    // Đệ quy dự phòng để duy trì vòng lặp (cho các trường hợp không đánh, chỉ chạy hoặc chờ CD)
    setTimeout(skillLoop, delay);
}

// Gọi hàm lần đầu tiên để kích hoạt vòng lặp
skillLoop();



setInterval(() => {
    game_log(`CHECK Ping: ${character.ping}`);
}, 5000);


const ELIXIR_BY_MONSTER = {
    crab: "elixirluck",
};

function elixirUsage() {
    try {
        const targetElixir = ELIXIR_BY_MONSTER[FARM_MONSTER] || "pumpkinspice";
        const currentElixir = character.slots.elixir?.name;

        if (currentElixir !== targetElixir) {
            const itemSlot = locate_item(targetElixir);

            if (itemSlot != null) {
                use(itemSlot);
            }
        }
    } catch (e) {
        console.error("Error in elixirUsage:", e);
    }
}


setInterval(elixirUsage, 20000);

setInterval(() => {
 if (character.name !== LEADER) return;
    
 parent.socket.emit("send_updates", {});
}, 100000); 


function scare() {
    if (character.hp < 4500 && !is_on_cooldown("scare")) {
        const slot = character.items.findIndex(i => i?.name === "jacko");
        if (slot < 0) return;

        equip(slot);
        use("scare");
        equip(slot);
    }
}

setInterval(scare, 400);



// =========================
// CONFIG & STATE: Temporal Surge
// =========================
const TEMPORAL_CONFIG = {
    radius: 270,    // Bán kính quét quái
    gap: 5,         // Hụt bao nhiêu con thì kích hoạt
    delay: 200,     // Delay trước khi cast
    cooldown: 10000 // Tối thiểu 10s giữa 2 lần
};

let temporalState = {
    maxMonsters: 0,
    lastMap: character.map,
    lastTime: 0
};

// =========================
// LOGIC
// =========================
function tryTemporalSurge() {
    if (character.mp < 2000 || is_on_cooldown("temporalsurge") || smart.moving) return;

    // Reset khi đổi map
    if (character.map !== temporalState.lastMap) {
        temporalState.maxMonsters = 0;
        temporalState.lastMap = character.map;
        return;
    }

    // Tận dụng luôn mảng monsters đã có sẵn từ scanAll() để đếm, cực kỳ nhẹ
    const currentCount = monsters.filter(m => m.distance <= TEMPORAL_CONFIG.radius).length;

    // Cập nhật mốc quái đông nhất
    if (currentCount > temporalState.maxMonsters) {
        temporalState.maxMonsters = currentCount;
        return;
    }

    const gap = FARM_MONSTER === "bscorpion" ? 0 : TEMPORAL_CONFIG.gap;
    const delay = FARM_MONSTER === "bscorpion" ? 0 : TEMPORAL_CONFIG.delay;

    // Điều kiện xả skill khi số lượng quái sụt giảm mạnh
    if (
        currentCount < temporalState.maxMonsters - gap &&
        character.mp >= 1300 &&
        Date.now() - temporalState.lastTime >= TEMPORAL_CONFIG.cooldown
    ) {
        const orbSlot = character.items.findIndex(i => i && i.name === "orboftemporal");
        if (orbSlot === -1) return;

        temporalState.lastTime = Date.now();
        
        // Gửi tín hiệu thông báo cho tất cả đồng đội trong Party
        if (character.party) {
            for (const name in parent.party) {
                if (name !== character.name) {
                    send_cm(name, "TemporalTime");
                }
            }
        }
        
        setTimeout(() => {
            if (is_on_cooldown("temporalsurge")) return;

            equip(orbSlot);
            use_skill("temporalsurge");
            game_log("🔁 temporalsurge", "#AAAAFF");
        }, delay);
    }
}




// ============================================================
// TELEGRAM BOT ALIVE
// ============================================================

const TELEGRAM_TOKEN = "7823637456:AAHGyKokFrUdLM-kaBhP6M_wg90fKOWwqY4";
const TELEGRAM_CHAT_ID = "6708647498";

let lastTelegramAlive = 0;
const TELEGRAM_ALIVE_INTERVAL = 30 * 60 * 1000; // 30 phút

async function telegramSend(message) {
    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                })
            }
        );

        const data = await response.json();

        if (!data.ok) {
            console.log("[Telegram] Error:", data.description);
        }
    } catch (e) {
        console.log("[Telegram] Error:", e);
    }
}

function telegramAlive() {
    const now = Date.now();

    if (now - lastTelegramAlive < TELEGRAM_ALIVE_INTERVAL) return;

    lastTelegramAlive = now;

telegramSend(
    `🟢 ${character.name} đang hoạt động\n` +
    `Ping: ${character.ping}\n` +
    `HP: ${Math.round(character.hp / character.max_hp * 100)}%\n` +
    (character.esize === 0
        ? `LỖI GAME - TÚI FULL`
        : `Túi trống: ${character.esize} slot`)
);
}

setInterval(() => {
    if (character.name !== LEADER) return;
    telegramAlive();
}, 300000);


function on_cm(name, data) {
    // Trường hợp data là chuỗi đơn giản
    if (typeof data === "string" && data === "TemporalTime") {
        temporalState.lastTime = Date.now();
        game_log(`📩 Đồng bộ Temporal từ ${name}`);
    }
    
    // Trường hợp data là object (nếu sau này bạn mở rộng gửi thêm thông tin)
    if (typeof data === "object" && data?.message === "TemporalTime") {
        temporalState.lastTime = Date.now();
    }
}




// =============================================================================
// 1. CẤU HÌNH BỘ TRANG BỊ THEO TÊN NHÂN VẬT (character.name)
// =============================================================================
const EQUIPMENT_SETS = {
    // ---- Cấu hình đồ cho Ranger
    "6gunlaZe": {
        dame: [
            { itemName: "orbofdex", slot: "orb", level: 4, l: "l" },
            { itemName: "t2quiver", slot: "offhand", level: 8, l: "l" },
            { itemName: "wingedboots", slot: "shoes", level: 9, l: "l" },
            { itemName: "fury", slot: "helmet", level: 8, l: "l" },
            { itemName: "supermittens", slot: "gloves", level: 9, l: "l" },
            { itemName: "coat", slot: "chest", level: 10, l: "l" },
            { itemName: "pants", slot: "pants", level: 11, l: "l" }
        ],
        mana: [
            { itemName: "orbofdex", slot: "orb", level: 4, l: "l" },
            { itemName: "alloyquiver", slot: "offhand", level: 9, l: "l" },
            { itemName: "wingedboots", slot: "shoes", level: 9, l: "l" },
            { itemName: "fury", slot: "helmet", level: 8, l: "l" },
            { itemName: "supermittens", slot: "gloves", level: 9, l: "l" },
            { itemName: "tshirt9", slot: "chest", level: 8, l: "l" },
            { itemName: "pants", slot: "pants", level: 11, l: "l" }
        ],
        luck: [
            { itemName: "wshoes", slot: "shoes", level: 8, l: "l" },
            { itemName: "wcap", slot: "helmet", level: 9, l: "l" },
            { itemName: "wgloves", slot: "gloves", level: 8, l: "l" },
            { itemName: "wattire", slot: "chest", level: 8, l: "l" },
            { itemName: "wbreeches", slot: "pants", level: 8, l: "l" },
            { itemName: "rabbitsfoot", slot: "orb", level: 2, l: "l" }
        ],
        def: [],
        def_fire: []
    },

    // ---- Cấu hình đồ cho Priest (Ví dụ: Ynhi) ----
    Ynhi: {
        dame: [
            { itemName: "orbofint", slot: "orb", level: 4, l: "l" },
            { itemName: "lmace", slot: "mainhand", level: 8, l: "l" }
        ],
        heal: [
            { itemName: "cupid", slot: "mainhand", level: 9, l: "l" } // Ví dụ đổi vũ khí bơm máu
        ],
        luck: [
            { itemName: "rabbitsfoot", slot: "orb", level: 2, l: "l" }
        ],
        def: [],
        def_fire: []
    }
};

// =============================================================================
// 2. LOGIC ĐIỀU KIỆN CHUYỂN SET CHO TỪNG NHÂN VẬT
// =============================================================================
const GEAR_LOGIC = {
    // ---- Logic của Ranger (6gunlaZe) ----
    "6gunlaZe": function() {
        let needNormalDef = false;
        let needLuck = false;
        let monsterDensity = 0;

        for (const m of monsters) {
            const e = m.entity;
            if (m.distance > 300) continue;

            // Xmagefi ưu tiên số 1 -> Return sớm tiết kiệm CPU
            if (e.mtype === "xmagefi") return "def_fire"; 

            if (e.cooperative && e.hp < 350000) needLuck = true;
            if (e.target === character.name && character.hp < 4500) needNormalDef = true;
            if (e.target || e.max_hp < 5000) monsterDensity++;
        }

        if (needNormalDef) return "def";
        if (needLuck) return "luck";
        if (character.hp > 5500 && monsterDensity >= 4) return "mana";
        
        return "dame"; // Trạng thái mặc định
    },

    // ---- Logic của Priest (Ynhi) ----
    Ynhi: function() {
        // 1. Bị thiêu đốt -> Chuyển ngay sang đồ kháng lửa
        if (character.s?.burned) return "def_fire";

        let hasPhysical = false;
        let hasMagical = false;
        let needLuck = false;

        // 2. Duyệt quái xung quanh (tận dụng mảng monsters từ scanAll)
        for (const m of monsters) {
            const e = m.entity;
            if (m.distance > 300) continue;

            const isTargetingMe = e.target === character.name;
            const isCoop = e.cooperative;

            if (isTargetingMe && e.attack > 200) {
                if (e.damage_type === "physical") hasPhysical = true;
                if (e.damage_type === "magical") hasMagical = true;
            }

            if ((isTargetingMe && e.hp < 15000) || (isCoop && e.hp < 150000)) {
                needLuck = true;
            }
        }

        // Đồ Luck (2 bậc theo HP), chỉ vào khi máu thật sự đủ
        if (needLuck && character.hp > 6000) {
            return character.hp > 8000 ? "luck_full" : "luck_def";
        }

        // Đồ Gold khi có từ 2 rương trở lên
        const chestCount = Object.keys(parent.chests || {}).length;
        if (chestCount >= 2) return "gold";
        
        // Đồ phòng thủ khi bị quái mạnh đánh
        if (hasPhysical && hasMagical) return "def_mixed";
        if (hasPhysical) return "def_phys";
        if (hasMagical) return "def_mag";

        // 6. Mặc định sang đồ Dame
        return "dame";
    }

    
};

// =============================================================================
// 3. CORE SWAP ENGINE (Gửi Socket Batch & Quản lý State)
// =============================================================================
let isEquipping = false;
let currentSet = ""; // Lưu cờ Set hiện tại để chặn spam lệnh
let INTENDED_SET = "";

async function equipSet(setName) {
    // 1. Check an toàn cơ bản
    if (isEquipping || currentSet === setName) return;

    // 2. Lấy cấu hình đồ theo Tên Nhân Vật
    const charSets = EQUIPMENT_SETS[character.name];
    if (!charSets) return; // Không có dữ liệu thì bỏ qua

    const setItems = charSets[setName];
    if (!setItems || setItems.length === 0) {
        currentSet = setName; // Đánh dấu để tránh check lại
        return;
    }

    isEquipping = true;
    const validItems = [];

    // 3. Tìm các trang bị CHƯA được mặc
    for (const item of setItems) {
        const equipped = character.slots[item.slot];
        if (equipped && equipped.name === item.itemName && equipped.level === item.level && equipped.l === item.l) {
            continue;
        }

        const invIndex = character.items.findIndex(i => 
            i && i.name === item.itemName && i.level === item.level && i.l === item.l
        );

        if (invIndex !== -1) {
            validItems.push({ num: invIndex, slot: item.slot });
        }
    }

    // 4. Gửi batch lên server
    if (validItems.length > 0) {
        try {
            parent.socket.emit("equip_batch", validItems);
            await parent.push_deferred("equip_batch");
            currentSet = setName;
            game_log(`⚙ [${character.name}] Switched to [${setName.toUpperCase()}]`, "#4BFF4B");
        } catch (e) {
            console.error("equipBatch Error:", e);
        }
    } else {
        currentSet = setName; // Đã mặc đúng đồ
    }

    isEquipping = false;
}

// =============================================================================
// 4. HÀM ĐIỀU PHỐI (VÒNG LẶP)
// =============================================================================


function autoSwapEquipment() {
    if (smart.moving || isEquipping) return;

    const getTargetSet = GEAR_LOGIC[character.name];
    if (!getTargetSet) return; 

    // Lưu lại ý định thay đồ vào biến toàn cục
    INTENDED_SET = getTargetSet();
    
    equipSet(INTENDED_SET);
}


setInterval(autoSwapEquipment, 100);













