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











































