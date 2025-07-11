let delay = 130;  // Thời gian lặp mặc định

async function ChuyendoiITEM() {
    const leader = get_player("haiz");
    const damer = get_player("6gunlaZe");
    const currentTime = performance.now();
    
    const mobsInRange = Object.values(parent.entities).filter(entity => 
        entity.visible && entity.type === "monster" &&
        entity.target === character.name &&
        !entity.dead &&
        distance(character, entity) <= 100
    );

    // Tách theo loại damage
    const physicalMobs = mobsInRange.filter(mob => mob.damage_type === "physical");
    const magicalMobs = mobsInRange.filter(mob => mob.damage_type === "magical");

    // Tách theo máu
    const lowHpMobs = mobsInRange.filter(mob =>
        mob.hp < 7000 &&
        mob.target === character.name &&
        leader &&
        distance(character, leader) <= 100 &&
        mob.mtype !== "nerfedmummy" &&
        mob.mtype !== "nerfedbat"
    );

    // Kiểm tra thời gian
    if (currentTime - eTime < 120) return;

    // Nếu đang di chuyển
    if (smart.moving) {
        eTime = currentTime;
        equipSet('nogold');
        delay = 250; // Đổi delay nếu đang di chuyển
        setTimeout(ChuyendoiITEM, delay); // Tạo lại setTimeout với delay mới
        return;
    }

    // Kiểm tra nếu có boss "xmagefi"
    if (get_nearest_monster({ type: "xmagefi" })) {
        eTime = currentTime;
        equipSet('bossburn');
        delay = 300; // Đổi delay khi gặp boss
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra điều kiện máu thấp
    if ((character.max_hp < 10000 && character.hp / character.max_hp < 0.9 && lowHpMobs.length === 0) || (character.max_hp < 10000 && character.hp / character.max_hp < 0.75)) {
        eTime = currentTime;
        equipSet('fram');
        delay = 200; // Đổi delay nếu máu thấp
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra nếu đang cần phòng thủ
    if (checkdef === 0 && character.hp / character.max_hp < 0.64) {
        checkdef = 1;
        eTime = currentTime;
        equipSet('deff');
        delay = 400; // Đổi delay khi phòng thủ
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra điều kiện phòng thủ và thay đổi trang bị
    if (checkdef === 1 && character.hp / character.max_hp > 0.78) {
        eTime = currentTime;
        equipSet('nodeff');
        checkdef = 0;
        delay = 250; // Đổi delay khi không cần phòng thủ
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra điều kiện cần heal
    if (checkheall === 0 && character.hp / character.max_hp > 0.65 && ((leader && leader.hp < 10000) || (damer && damer.hp < 5000))) {
        checkheall = 1;
        eTime = currentTime;
        equipSet('healmax');
        delay = 200; // Đổi delay khi heal
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra khi đã heal xong
    if (checkheall === 1 && ((leader && leader.hp > 14000) && (damer && damer.hp > 7000))) {
        eTime = currentTime;
        equipSet('fram');
        checkheall = 0;
        delay = 250; // Đổi delay khi đã heal xong
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra không có mob máu thấp và giảm luck
    if (lowHpMobs.length === 0 && checkluckk > 0) {
        eTime = currentTime;
        equipSet('Unluck');
        checkluckk -= 1;
        delay = 350; // Đổi delay khi không có mob máu thấp
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra mob máu thấp và sử dụng luck booster
    if (lowHpMobs.length >= 1 && character.map !== "winter_instance") {
        eTime = currentTime;
        let slot = locate_item("luckbooster");
        if (slot === -1) shift(0, 'luckbooster');
        equipSet('luck');
        checkluckk = 5;
        delay = 250; // Đổi delay khi sử dụng luck booster
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra mob vật lý và thay đổi trang bị
    if (physicalMobs.length >= 1 && checkheall === 0 && checkdef === 0) {
        eTime = currentTime;
        equipSet('vatly');
        delay = 150; // Đổi delay khi gặp mob vật lý
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Kiểm tra mob phép và thay đổi trang bị
    else if ((magicalMobs.length >= 1 && character.hp / character.max_hp < 0.65) || character.map === "winter_instance") {
        eTime = currentTime;
        equipSet('phep');
        delay = 200; // Đổi delay khi gặp mob phép
        setTimeout(ChuyendoiITEM, delay);
        return;
    }

    // Nếu không có điều kiện nào đúng, tiếp tục lặp lại với delay mặc định
    setTimeout(ChuyendoiITEM, delay);
}

// Gọi lần đầu tiên
ChuyendoiITEM();
