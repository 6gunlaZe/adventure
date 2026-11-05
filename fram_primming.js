// ==========================================
// 🛠️ CẤU HÌNH THÔNG SỐ BAIT BOT (B-SCORPION)
// ==========================================
const CONFIG = {
    MONSTER_TYPE: "bscorpion",                        // Loại quái cần dụ
    WAITING_SPOT: { map: "desertland", x: -405, y: -1246 }, // Tọa độ điểm chờ duy nhất
    KITE_CENTER:  { x: -405, y: -1246 },               // Tọa độ tâm B để kite vòng tròn
    
    // 🟢 TÁCH 2 NGƯỠNG ĐỘC LẬP THEO ĐÚNG Ý BÁC:
    KITE_DIST:       90,                               // Dưới mức này (< 75px): Quái quá sát -> Kite né ra xa (chưa đánh)
    MIN_ATTACK_DIST: 50,                               // Phải lớn hơn hoặc bằng mức này Mới đủ khoảng cách an toàn để đứng tấn công lấy aggro

    KITE_RADIUS:  115,                                 // Bán kính cố định vòng tròn quanh tâm B
    KITE_STEP_DIST: 36,                                // Bước dịch chuyển nhỏ trên vòng tròn
    MOVE_COOLDOWN:  150                                // Giãn cách thời gian giữa các bước đi (ms)
};

// Mảng chứa danh sách quái quét được quanh nhân vật
let monsters = [];
let lastMoveTime = 0; // Theo dõi thời điểm dịch chuyển gần nhất

// Quét danh sách quái từ game engine (Zero-Allocation)
function scanMonsters() {
    monsters.length = 0;
    
    const entities = parent.entities;
    for (let id in entities) {
        const e = entities[id];
        if (e.type === "monster" && !e.dead) {
            monsters.push({
                entity: e,
                distance: distance(character, e)
            });
        }
    }
}

// ==========================================
// 🚀 VÒNG LẶP CHÍNH (GAME LOOP)
// ==========================================
async function mainGameLoop() {
    // 1. Kiểm tra sinh tồn & trạng thái HP/di chuyển dài
    if (character.rip || character.hp < 5000) {
        return setTimeout(mainGameLoop, 1000);
    }
    
    if (smart.moving) {
        return setTimeout(mainGameLoop, 250);
    }

    // 2. Quét danh sách quái xung quanh
    scanMonsters();

    // 3. Tìm quái mục tiêu gần nhất
    let target = null;
    let minDistance = Infinity;
    
    const len = monsters.length;
    for (let i = 0; i < len; i++) {
        const m = monsters[i];
        const e = m.entity;
        
        if (e.mtype === CONFIG.MONSTER_TYPE) {
            if (m.distance < minDistance) {
                minDistance = m.distance;
                target = e;
            }
        }
    }

    // 4. KHÔNG CÓ QUÁI => VỀ ĐIỂM CHỜ DUY NHẤT
    if (!target || distance(character, CONFIG.KITE_CENTER) > 150 ) {
        if (character.map !== CONFIG.WAITING_SPOT.map || distance(character, CONFIG.WAITING_SPOT) > 25) {
            if (!smart.moving) {
                smart_move(CONFIG.WAITING_SPOT);
                game_log("⏳ Không thấy quái bscorpion, đang về điểm chờ...", "#FFA500");
            }
        }
        return setTimeout(mainGameLoop, 300);
    }

    const distToTarget = distance(character, target);
    const now = Date.now();

    // 5. LOGIC ĐIỀU HƯỚNG CHUẨN XÁC
    if (distToTarget < CONFIG.KITE_DIST) {
        // --- TRƯỜNG HỢP 1: QUÁI QUÁ GẦN (< KITE_DIST) -> KITE NÉ RA XA, TUYỆT ĐỐI KHÔNG ĐÁNH ---
        if (now - lastMoveTime >= CONFIG.MOVE_COOLDOWN) {
            lastMoveTime = now;

            const bx = CONFIG.KITE_CENTER.x;
            const by = CONFIG.KITE_CENTER.y;
            const radius = CONFIG.KITE_RADIUS;

            const angleToChar = Math.atan2(character.y - by, character.x - bx);
            const mobX = target.real_x || target.x;
            const mobY = target.real_y || target.y;
            const angleToMob = Math.atan2(mobY - by, mobX - bx);

            let angleDiff = angleToChar - angleToMob;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            const direction = angleDiff >= 0 ? 1 : -1;

            const deltaAngle = (CONFIG.KITE_STEP_DIST / radius) * direction;
            const nextAngle = angleToChar + deltaAngle;

            const nextX = bx + radius * Math.cos(nextAngle);
            const nextY = by + radius * Math.sin(nextAngle);

            move(nextX, nextY);
        }
    } 
    if (distToTarget >= CONFIG.MIN_ATTACK_DIST) {
        // --- TRƯỜNG HỢP 2: QUÁI ĐÃ Ở ĐỦ XA (>= MIN_ATTACK_DIST) -> ĐỨNG YÊN TẤN CÔNG LẤY AGGRO ---
        if (can_attack(target)) {
            try {
                await attack(target);
            } catch (err) {}
        }
    } 

    // Nhịp lặp phản hồi mượt mà
    setTimeout(mainGameLoop, 50);
}

// Khởi chạy hệ thống Bait Bot
mainGameLoop();
game_log("🎯 Bait B-Scorpion Bot: Đã chuẩn hóa ngưỡng tối thiểu để tấn công (MIN_ATTACK_DIST)!", "#00FF00");








setInterval(function() {
    use_hp_or_mp1()
}, 200); 






setInterval(() => character.rip && respawn(), 50000);


function use_hp_or_mp1() {
	if (safeties && mssince(last_potion) < min(200, character.ping * 3)) return resolving_promise({ reason: "safeties", success: false, used: false });
	if (is_on_cooldown("use_hp")) return resolving_promise({ success: false, reason: "cooldown" });
	if (character.c?.fishing && character.mp > 200) return;
	var skill = null;
	if (character.mp / character.max_mp < 0.2) skill = "use_mp";
	else if (character.hp / character.max_hp < 0.6) skill = "use_hp";
	else if (character.mp / character.max_mp < 0.9) skill = "use_mp";
	else if (character.hp / character.max_hp < 0.9) skill = "use_hp";

	if (!skill) return resolving_promise({ reason: "full", success: false, used: false });
	last_potion = new Date();
	return use_skill(skill);
}





setInterval(function() {
	
    if (!character.party) {
        send_party_request("haiz");
    } else if (character.party !== "haiz") {
        leave_party();
    }
}, 2000); // 2000ms = 2 giây chạy 1 lần











