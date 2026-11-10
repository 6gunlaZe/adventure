// ==========================================
// ⚔️ HỆ THỐNG ĐỔI TRANG BỊ TỰ ĐỘNG (DÙNG EQUIP_BATCH)
// ==========================================

// Biến trạng thái chống spam lệnh
let isEquipping = false;
let currentSet = "";

// Cấu hình các bộ trang bị cho nhân vật của bạn
const EQUIPMENT_SETS = {
    [character.name]: {
        // Set mặc định: Tay chính (fireblade +7) + Tay phụ (shield +0)
        "default": [
            { slot: "mainhand", itemName: "fireblade", level: 10 },
            { slot: "offhand", itemName: "fireblade", level: 9 }
        ],
        "combat": [
            { slot: "mainhand", itemName: "vhammer", level: 9, l: "u" },
            { slot: "offhand", itemName: null } // null để biểu thị ô này cần tháo ra
        ]
    }
};

// Hàm equipSet chuẩn của bạn (đã được tinh chỉnh thêm xử lý tháo offhand nếu cần)
async function equipSet(setName) {
    if (isEquipping) return;

    const charSets = EQUIPMENT_SETS[character.name];
    if (!charSets) return;

    const setItems = charSets[setName];
    if (!setItems || setItems.length === 0) {
        currentSet = setName;
        return;
    }

    const isItemMatch = (gameItem, configItem) => {
        // Nếu config yêu cầu slot phải trống (như offhand: null)
        if (!configItem.itemName) {
            return !gameItem; // Khớp nếu trong game slot đang trống
        }
        if (!gameItem) return false;
        if (gameItem.name !== configItem.itemName) return false;
        
        if (configItem.level !== undefined && configItem.level !== 'x' && gameItem.level !== configItem.level) {
            return false;
        }
        
        if (configItem.l !== undefined && configItem.l !== 'x' && gameItem.l !== configItem.l) {
            return false;
        }

        return true;
    };

    const validItems = [];
    let isFullyEquipped = true;
    let needUnequipOffhand = false;

    for (const item of setItems) {
        const equipped = character.slots[item.slot];
        
        if (isItemMatch(equipped, item)) {
            continue; 
        }

        isFullyEquipped = false;

        // Trường hợp đặc biệt: Nếu cấu hình yêu cầu slot offhand phải trống mà đang có đồ -> Cần tháo ra trước
        if (item.slot === "offhand" && !item.itemName && character.slots.offhand) {
            needUnequipOffhand = true;
            continue;
        }

        // Tìm món đồ trong túi đồ
        const invIndex = character.items.findIndex(i => isItemMatch(i, item));

        if (invIndex !== -1) {
            validItems.push({ num: invIndex, slot: item.slot });
        }
    }

    if (isFullyEquipped) {
        if (currentSet !== setName) {
            currentSet = setName;
            game_log(`⚙ [${character.name}] Switched to [${setName.toUpperCase()}]`, "#4BFF4B");
        }
        return;
    }

    // Thực hiện đổi đồ an toàn
    if (validItems.length > 0 || needUnequipOffhand) {
        isEquipping = true;
        try {
            // Bước 1: Tháo offhand trước nếu chuyển sang vũ khí 2 tay mà offhand đang vướng đồ
            if (needUnequipOffhand) {
                await unequip("offhand");
            }

            // Bước 2: Gửi batch đổi đồ các món còn lại
            if (validItems.length > 0) {
                parent.socket.emit("equip_batch", validItems);
                await parent.push_deferred("equip_batch");
            }
        } catch (e) {
            console.error("equipBatch Error:", e);
        } finally {
            isEquipping = false;
        }
    }
}

// ==========================================
// 🔄 VÒNG LẶP QUÉT QUÁI & GỌI SET ĐỒ (100ms)
// ==========================================
async function weaponSwitchLoop() {
    let triggerCondition = false;
    
    // Quét tất cả quái quanh mình để xét điều kiện
    for (const id in parent.entities) {
        const e = parent.entities[id];
        if (e.type === "monster" && !e.dead) {
            // Điều kiện của bạn: Level 1, burned, máu < 500 HOẶC máu quái > 2000
            if ((e.level === 1 && e.s?.burned && e.hp < 500)) {
                triggerCondition = true;
                break; 
            }
        }
    }

    // Quyết định dùng set nào dựa vào điều kiện quái
    const targetSet = triggerCondition ? "combat" : "default";
    
    // Gọi hàm equipSet của bạn
    await equipSet(targetSet);

    // Lặp lại sau mỗi 100ms
    setTimeout(weaponSwitchLoop, 100);
}

// Khởi chạy vòng lặp
weaponSwitchLoop();
game_log("⚔️ Weapon EquipSet Loop: Đã kích hoạt thành công!", "#00FF00");
