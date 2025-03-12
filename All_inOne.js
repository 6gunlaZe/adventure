const locations = {
    bat: [{ x: 1200, y: -782 }],
    bigbird: [{ x: 1343, y: 248 }],
    bscorpion: [{ x: -408, y: -1241 }],
    boar: [{ x: 19, y: -1109 }],
    cgoo: [{ x: -221, y: -274 }],
    crab: [{ x: -11840, y: -37 }],
    ent: [{ x: -420, y: -1960 }],
    fireroamer: [{ x: 222, y: -827 }],
    ghost: [{ x: -405, y: -1642 }],
    gscorpion: [{ x: 390, y: -1422 }],
    iceroamer: [{ x: 823, y: -45 }],
    mechagnome: [{ x: 0, y: 0 }],
    mole: [{ x: 14, y: -1072 }],
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
    spider: [{ x: 1247, y: -91 }],
    squig: [{ x: -1175, y: 422 }],
    wolf: [{ x: 433, y: -2745 }],
    wolfie: [{ x: 113, y: -2014 }],
    xscorpion: [{ x: -495, y: 685 }]
};

const home = 'plantoid';
const mobMap = 'desertland';
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








async function eventer() {
    const delay = 25;
    try {
        if (events) {
          //  handleEvents();
        } else if (stompyActive || skeletorActive) {
            //handleBosses();
        } else if (!get_nearest_monster({ type: home })) {
            handleHome();
        } else {
           // walkInCircle();
        }
    } catch (e) {
        console.error(e);
    }

    setTimeout(eventer, delay);
}



const targetNames = ["6gunlaZe", "Ynhi"];


async function attackLoop() {
    let delay = null; // Default delay
    const X = locations[home][0].x; // X coordinate of home location
    const Y = locations[home][0].y; // Y coordinate of home location
    const now = performance.now();
    try {
        let nearest = null;

        // Find the nearest monster based on the targetNames
        for (let i = 0; i < targetNames.length; i++) {
            nearest = get_nearest_monster_v2({
                target: targetNames[i],
                check_min_hp: true,  // Checking for monster with minimum HP
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
                    check_min_hp: true,
                });
                if (nearest) break;
            }
        }

        // If a monster is found and is in range, execute the attack
        if (nearest && is_in_range(nearest)) {
            await attack(nearest); // Initiate attack
            delay = ms_to_next_skill("attack"); // Calculate delay for the next attack
        }
    } catch (e) {
        //console.error(e);
    }
    setTimeout(attackLoop, delay);
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
        const aoe = character.mp >= character.mp_cost * 2 + G.skills.cleave.mp + 320;
        const cc = character.cc < 135;
        const zapperMobs = ["plantoid"];
        const stMaps = ["", "winter_cove", "arena", "",];
        const aoeMaps = ["halloween", "goobrawl", "spookytown", "tunnel", "main", "winterland", "cave", "level2n", "level2w", "desertland"];
        let tank = get_entity("nhiY");

        if (character.ctype === "warrior") {
            try {
                if (tank && tank.hp < tank.max_hp * 0.4 && character.name === "haiz") {
                    //console.log("Calling handleStomp");
                    handleStomp(Mainhand, stMaps, aoeMaps, tank);
                }
                if (character.ctype === "warrior") {
                    //console.log("Calling handleCleave");
                    handleCleave(Mainhand, aoe, cc, stMaps, aoeMaps, tank);
                    //console.log("Calling handleWarriorSkills");
                    handleWarriorSkills(tank);
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
    if (!is_on_cooldown("stomp")) {
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

function handleWeaponSwap(stMaps, aoeMaps, Mainhand, offhand) {
    const currentTime = performance.now();
    if (stMaps.includes(character.map) && currentTime - eTime > 50) {
        eTime = currentTime;
        equipSet('single');
    } else if (aoeMaps.includes(character.map) && currentTime - eTime > 50) {
        eTime = currentTime;
        equipSet('aoe');
    }
}

let lastCleaveTime = 0;
const CLEAVE_THRESHOLD = 500; // Time in milliseconds between cleave uses

function handleCleave(Mainhand, aoe, cc, stMaps, aoeMaps, tank) {
    const currentTime = performance.now();
    const timeSinceLastCleave = currentTime - lastCleaveTime;
    const mapsToInclude = ["desertland", "goobrawl", "main", "level2w", "cave", "halloween", "spookytown", "tunnel", "winterland", "level2n"];
    const monstersInRange = Object.values(parent.entities).filter(({ type, visible, dead, x, y }) =>
        type === "monster" &&
        visible &&
        !dead &&
        distance(character, { x, y }) <= G.skills.cleave.range
    );

    const untargetedMonsters = monstersInRange.filter(({ target }) => !target)

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

async function handleWarriorSkills(tank) {
    if (!is_on_cooldown("warcry") && !character.s.warcry && character.s.darkblessing) {
        await use_skill("warcry");
    }

    const crabsInRange = Object.values(parent.entities)
        .filter(entity => entity.mtype === "crabx" && entity.visible && !entity.dead && distance(character, entity) <= G.skills.agitate.range);
    const untargetedCrabs = crabsInRange.filter(monster => !monster.target);

    if (!is_on_cooldown("agitate") && crabsInRange.length >= 5 && untargetedCrabs.length === 5 && tank) {
        await use_skill("agitate");
    }

    const mobTypes = ["bat", "bigbird"];
    const mobsInRange = Object.values(parent.entities)
        .filter(entity => mobTypes.includes(entity.mtype) && entity.visible && !entity.dead && distance(character, entity) <= G.skills.agitate.range);
    const untargetedMobs = mobsInRange.filter(monster => !monster.target);

    if (!is_on_cooldown("agitate") && mobsInRange.length >= 3 && untargetedMobs.length >= 3 && !smart.moving && tank) {
        let porc = get_nearest_monster({ type: "porcupine" });
        if (!is_in_range(porc, "agitate")) {
            await use_skill("agitate");
        }
    }

    if (!is_on_cooldown("charge")) {
        await use_skill("charge");
    }

    if (!is_on_cooldown("hardshell") && character.hp < 12000) {
        await use_skill("hardshell");
    }

    for (let id in parent.entities) {
        let current = parent.entities[id];
        if (current.mtype === "ent" && current.target !== character.name) {
            if (is_in_range(current, "taunt") && !is_on_cooldown("taunt")) {
                await use_skill("taunt", current.id);
                game_log("Taunting " + current.name, "#FFA600");
            }
        }
    }
}



function scytheSet() {
    unequip("offhand");
    equipBatch([
        { itemName: "bataxe", slot: "mainhand", level: 6, l: "l" },
    ]);
}

function basherSet() {
    unequip("offhand");
    equipBatch([
        { itemName: "basher", slot: "mainhand", level: 7, l: "l" }
    ]);
}

//l: "l"  == L lock
async function equipBatch(data) {
    if (!Array.isArray(data)) {
        game_log("Can't equipBatch non-array");
        return handleEquipBatchError("Invalid input: not an array");
    }
    if (data.length > 15) {
        game_log("Can't equipBatch more than 15 items");
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
            game_log("Item " + itemName + " is already equipped in " + slot + " slot. Skipping.");
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
        return //handleEquipBatchError("No valid items to equip");
    }

    try {
        parent.socket.emit("equip_batch", validItems);
        parent.push_deferred("equip_batch");
    } catch (error) {
        console.error('Error in equipBatch:', error);
        return handleEquipBatchError("Failed to equip items");
    }
}





































const equipmentSets = {

    dps: [
        //{ itemName: "dexearring", slot: "earring2", level: 5, l: "l" },
        { itemName: "orbofstr", slot: "orb", level: 5, l: "l" },
        { itemName: "suckerpunch", slot: "ring1", level: 2, l: "l" },
        { itemName: "suckerpunch", slot: "ring2", level: 2, l: "u" },
    ],
    luck: [
        { itemName: "rabbitsfoot", slot: "orb", level: 2, l: "l" },
        { itemName: "ringhs", slot: "ring2", level: 0, l: "l" },
        { itemName: "ringofluck", slot: "ring1", level: 0, l: "l" },
        //{ itemName: "tshirt88", slot: "chest", level: 0, l: "l" } 
    ],
    single: [
        { itemName: "fireblade", slot: "mainhand", level: 9, l: "l" },
        { itemName: "fireblade", slot: "offhand", level: 9, l: "l" },
    ],
    aoe: [
        { itemName: "ololipop", slot: "mainhand", level: 9, l: "l" },
        { itemName: "ololipop", slot: "offhand", level: 8, l: "l" },
    ],
    stealth: [
        { itemName: "stealthcape", slot: "cape", level: 0, l: "l" },
    ],
    cape: [
        { itemName: "vcape", slot: "cape", level: 4, l: "l" },
    ],
    xp: [
        { itemName: "talkingskull", slot: "orb", level: 4, l: "l" },
        //{ itemName: "northstar", slot: "amulet", level: 0, l: "l" },
    ],
    orb: [
        { itemName: "orbofstr", slot: "orb", level: 5, l: "l" },
    ],
    mana: [
        { itemName: "tshirt9", slot: "chest", level: 6, l: "l" }
    ],
    stat: [
        { itemName: "coat", slot: "chest", level: 13, l: "l" }
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

















