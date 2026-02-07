const ensure_equipped = (() => {
  const EQUIP_ADAPTABLE = {
    num: 0,
    slot: "",
  };
  const EQUIP_ADAPTER = Adapter("num", "slot");
  return (item_filter, slot) => {
    switch (typeof item_filter) {
      case "function":
        if (!item_filter(character.slots[slot])) {
          const index = get_index_of_item(item_filter);
          if (index != -1) {
            parent.socket.emit(
              "equip",
              EQUIP_ADAPTER(EQUIP_ADAPTABLE, index, slot)
            );
            return true;
          }
          return false;
        }
        return true;
      case "string":
        if (character.slots[slot]?.name != item_filter) {
          const index = get_index_of_item(item_filter);
          if (index != -1) {
            parent.socket.emit(
              "equip",
              EQUIP_ADAPTER(EQUIP_ADAPTABLE, index, slot)
            );
            return true;
          }
          return false;
        }
        return true;
    }
  };
})();





const JACKO_FILTER = ItemFilter.ofName("jacko").build();
const FTRINKET_FILTER = ItemFilter.ofName("ftrinket").build();
setInterval(() => {
  if (character.targets > 0) {
    if (can_use("scare") && ensure_equipped(JACKO_FILTER, "orb")) {
      use_skill("scare");
    }
  } else {
    ensure_equipped(FTRINKET_FILTER, "orb");
  }
}, 1000);




function Adapter(...properties) {
  return Function("object", ...properties, properties.map((initial) => {
    return "\tobject." + initial + " = " + initial + ";" 
  }).join("\n") + "return object");
}









if (character.name == "Geoffriel") {
  const BOOSTER_FILTER = new ItemFilter().names("luckbooster", "goldbooster").build();
  const MIDAS_FILTER = ItemFilter.ofName("handofmidas").build();
  const GOLD_RING_FILTER = ItemFilter.ofName("goldring").build();
  const WANDERER_GLOVE_FILTER = ItemFilter.ofName("wgloves").build();
  const LUCK_RING_FILTER = ItemFilter.ofName("ringofluck").build();
  const RESET_GEAR = () => {
    shift(character.items.findIndex(BOOSTER_FILTER), "luckbooster");
    ensure_equipped(WANDERER_GLOVE_FILTER, "gloves");
    ensure_equipped(LUCK_RING_FILTER, "ring2");
  };
  const LOOT_CHEST = (id) => {
    parent.socket.emit("open_chest", {
      id: id,
    });
  };
  RESET_GEAR();
  parent.socket.on("drop", ({ id, x, y }) => {
    if (distance_to_point(x, y) < 200) {
      let looted = false;
      let switched_midas = false;
      let index_of_booster = character.items.findIndex(BOOSTER_FILTER);
      ensure_equipped(GOLD_RING_FILTER, "ring2");
      ensure_equipped(MIDAS_FILTER, "gloves");
      shift(index_of_booster, "goldbooster");
      setTimeout(LOOT_CHEST, 500, id);
      setTimeout(RESET_GEAR, 1000);
    }
  });
}





async function smart_heal(threshold = 0.9) {

    // 2. Tìm danh sách đồng đội cần hồi máu
    const targets = lowest_health_partymember(threshold, true);
    if (targets.length === 0) return false;

    const mp3 = (G.skills["3shot"]?.mp || 0) * 1.1 + 300; // Buffer MP nhẹ

    // 3. Ưu tiên hồi máu đa mục tiêu (3shot)
    if (targets.length >= 3 && character.mp > mp3 && !is_on_cooldown("3shot")) {
        use_skill("3shot", targets.slice(0, 3));
        return true;
    } 
    
    // 4. Hồi máu đơn mục tiêu (attack thường)
    if (targets.length >= 1) {
        attack(targets[0]);
        return true;
    }

    return false;
}


function smart_equip(itemName, slot = "mainhand") {
    // 1. Kiểm tra xem món đồ đã mặc đúng chỗ chưa
    if (character.slots[slot]?.name === itemName) return true;

    // 2. Tìm vị trí (index) của món đồ trong hành trang
    const index = character.items.findIndex(i => i && i.name === itemName);

    // 3. Nếu tìm thấy và khác với thứ đang mặc, gửi lệnh lên server
    if (index !== -1) {
        parent.socket.emit("equip", { num: index, slot: slot });
        return true; 
    }

    return false; // Không có đồ trong túi
}


const FSM = {
    HEAL: "HEAL",
    AOE: "AOE",
    SINGLE: "SINGLE",
    IDLE: "IDLE"
};

let combatState = {
    monstersAOERange: [],     // inRange (radius 50)
    monstersCharRange: [],    // character.range
    leaderTarget: null,
    lastUpdate: 0,
    fsm: FSM.IDLE
};



function targetLoop() {
    try {
        const rangeThreshold = 50;
        const leader = get_player("haiz");
        const X = leader ? leader.x : character.x;
        const Y = leader ? leader.y : character.y;

        const {
            targets, // giữ lại nếu bạn dùng sau
            inRange: monstersInRangeList,
            characterRange: monsterscharacterRange
        } = getPrioritizedTargets(
            targetNames,
            X, Y,
            rangeThreshold,
            { statusEffects: ["cursed"] }
        );

        combatState.monstersAOERange = monstersInRangeList;
        combatState.monstersCharRange = monsterscharacterRange;
        combatState.leaderTarget = leader ? get_target_of(leader) : null;
        combatState.lastUpdate = Date.now();

    } catch (e) {}

    setTimeout(targetLoop, 250);
}




async function attackLoop() {
    let delay = 40;

    try {
        if (character.rip || smart.moving || is_disabled(character) || Date.now() - combatState.lastUpdate > 5000 ){
        return setTimeout(attackLoop, 40);
        }

        const ms = ms_to_next_skill("attack");

        //chặn chạy quá sớm
        if (ms >= Math.max(10, character.ping / 10)){
            setTimeout(attackLoop, Math.min(ms-50, 180));
            return;
        }
      

        if (ms > 200) delay = 90;
        else if (ms > 100) delay = 40;
        else if (ms > 60) delay = 20;
        else delay = 5;


        // ===== CONTEXT =====
        const leader = get_player("haiz");
        const healer = get_player("Ynhi");
        const f1112 = get_player(f1111);

        const aoeMonsters = combatState.monstersAOERange;
        const allMonsters = combatState.monstersCharRange;
        const leaderTarget = combatState.leaderTarget;

        const mapHealBonus = character.map === "winter_instance" ? 6000 : 0;

        const mp5 = (G.skills["5shot"]?.mp || 0) * 1.1 + 500;
        const mp3 = (G.skills["3shot"]?.mp || 0) * 1.1 + 500;

        // ===== FSM DECISION =====
        combatState.fsm = FSM.IDLE;

        const fieldgen0 = get_nearest_monster({ type: "fieldgen0" });

        if (
            (leader && leader.hp < 10500 + mapHealBonus) ||
            (healer && healer.hp < 8000 + mapHealBonus) ||
            (f1112 && f1112.hp / f1112.max_hp < 0.5) ||
            (fieldgen0 && fieldgen0.hp / fieldgen0.max_hp < 0.7)
        ) {
            combatState.fsm = FSM.HEAL;
        }
        else if ((character.hp < 6500 && smart.moving) || character.hp < 4500 ){
              //khi máu yếu và đang di chuyển thông minh không làm gì cả 
        }
        else if (
            allMonsters.length >= 5 &&
            character.mp > mp5 &&
            leader && leader.hp > 10000 &&
            !is_on_cooldown("5shot")
        ) {
            combatState.fsm = FSM.AOE;
        }
        else if (
            allMonsters.length >= 3 &&
            character.mp > mp3 &&
            leader && leader.hp > 10000 &&
            !is_on_cooldown("3shot")
        ) {
            combatState.fsm = FSM.AOE;
        }
        else if (
            allMonsters.length > 0 ||
            (leaderTarget && is_in_range(leaderTarget))
        ) {
            combatState.fsm = FSM.SINGLE;
        }

        // ===== FSM EXECUTION =====

        switch (combatState.fsm) {

            case FSM.HEAL: {
              
               if (!smart_equip("cupid")) break;
                const healTargets = lowest_health_partymember(0.9, true);
                if (!healTargets.length) break;

                attack(healTargets[0]);

                break;
            }

            case FSM.AOE: {
              
               if (aoeMonsters.length >= 5)smart_equip("boomm")
               else smart_equip("fire");

               if (character.slots.mainhand?.name == "cupid") break;
              
                if (aoeMonsters.length >= 5 && character.mp > mp5) {
                     use_skill("5shot", aoeMonsters.slice(0, 5));
                }
                else if (aoeMonsters.length >= 3 && character.mp > mp3) {
                     use_skill("3shot", aoeMonsters.slice(0, 3));
                }
                else if (allMonsters.length >= 5 && character.mp > mp5) {
                     use_skill("5shot", allMonsters.slice(0, 5));
                }
                else if (allMonsters.length >= 3 && character.mp > mp3) {
                     use_skill("3shot", allMonsters.slice(0, 3));
                }
                break;
            }

            case FSM.SINGLE: {
              
               if (aoeMonsters.length >= 5)smart_equip("boomm")
               else smart_equip("fire");
              
                if (aoeMonsters.length > 0) {
                     attack(aoeMonsters[0]);
                }
                else if (allMonsters.length > 0) {
                     attack(allMonsters[0]);
                }
                else if (leaderTarget && is_in_range(leaderTarget) && !leaderTarget.dead) {
                    if (get_targeted_monster() !== leaderTarget)
                        change_target(leaderTarget);
                     attack(leaderTarget);
                }
                break;
            }

            case FSM.IDLE:
            default:
                break;
        }

    } catch (e) {}

    setTimeout(attackLoop, delay);
}




targetLoop();
attackLoop();























