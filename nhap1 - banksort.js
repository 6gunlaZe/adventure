// --- 1. LOG & HELPER BẮT LỖI ---
function log(msg, color = "#5ed1ff") {
	console.log(msg);
	if (typeof game_log === "function") game_log(msg, color);
}

function parseError(err) {
	if (!err) return "Unknown Error";
	if (typeof err === "string") return err;
	if (err.message) return err.message;
	try { return JSON.stringify(err); } catch (e) { return String(err); }
}

// --- 2. KHỞI TẠO CẤU TRÚC PHÂN LOẠI & DỮ LIỆU ORDER ---
const al_items = { order: {} };
const order = al_items.order;

order.names = ["Helmets", "Armors", "Underarmors", "Gloves", "Shoes", "Capes", "Rings", "Earrings", "Amulets", "Belts", "Orbs", "Weapons", "Shields", "Offhands", "Elixirs", "Potions", "Scrolls", "Crafting and Collecting", "Exchangeables", "Others"];
order.ids = ["helmet", "chest", "pants", "gloves", "shoes", "cape", "ring", "earring", "amulet", "belt", "orb", "weapon", "shield", "offhand", "elixir", "pot", "scroll", "material", "exchange", ""];

const offhands = new Set(["source", "quiver", "misc_offhand"]);
const scrolls = new Set(["cscroll", "uscroll", "pscroll", "offering"]);

order.item_ids = order.ids.map(() => []);

if (typeof G !== "undefined" && G.items) {
	object_sort(G.items, "gold_value").forEach(([id, item]) => {
		if (item.ignore) return;
		const idx = order.ids.findIndex(cat => 
			!cat || item.type === cat || 
			(cat === "offhand" && offhands.has(item.type)) || 
			(cat === "scroll" && scrolls.has(item.type)) || 
			(cat === "exchange" && item.e)
		);
		if (idx !== -1) order.item_ids[idx].push(id);
	});
}

const rank = new Map(order.ids.flatMap((_, c) => order.item_ids[c]).map((id, i) => [id, i]));

order.comparator = (a, b) =>
	(a == null) - (b == null) ||
	(a != null && (
		(rank.get(a.name) ?? 1e9) - (rank.get(b.name) ?? 1e9) ||
		a.name.localeCompare(b.name) ||
		(b.level ?? 0) - (a.level ?? 0)
	));

// --- 3. BẢNG DỮ LIỆU TẦNG VÀ TỐI ƯU BATCHING ---
const FLOOR_ENTRY = {
	bank: { bank_b: [1, -436], bank_u: [1, -436] },
	bank_b: { bank: [-264, -412], bank_u: [-104, -171] },
	bank_u: { bank: [0, -41], bank_b: [0, -41] },
};

// Hàm xử lý BATCH SONG SONG toàn bộ danh sách lệnh
async function runBatchFast(tasks, maxCC = 160) {
	const promises = [];
	for (const task of tasks) {
		// Kiểm tra Code Cost (CC) trước khi gửi thêm lệnh để không bị DC
		while (character.cc > maxCC) await sleep(25);
		promises.push(task().catch(e => e));
		// Khoảng nghỉ cực ngắn giữa các gói socket
		await sleep(5);
	}
	return Promise.all(promises);
}

// --- 4. TIẾN TRÌNH CHẠY TỐC ĐỘ CAO ---
(async function startSortingProcessFast() {
	log("[START] Bắt đầu sắp xếp tốc độ cao (Batch Processing)...", "#2ef288");

	if (!character.bank) return log("[ERROR] Bạn chưa đứng ở trong Ngân Hàng!", "#ff4d4d");

	try {
		const allPacks = Object.keys(character.bank)
			.filter(k => k !== "gold" && bank_packs[k])
			.sort((a, b) => +a.replace("items", "") - +b.replace("items", ""));

		const targetPacks = allPacks.slice(2);
		if (targetPacks.length === 0) {
			return log("[ERROR] Cần ít nhất 3 pack ngân hàng để bỏ qua 2 pack đầu!", "#ff4d4d");
		}

		const totalItems = allPacks.flatMap(pack => character.bank[pack]).filter(Boolean).length;
		const maxCapacity = targetPacks.length * 42;

		if (totalItems > maxCapacity) {
			return log(`[ERROR] Quá tải! Có ${totalItems} món nhưng chỉ chứa được ${maxCapacity} món!`, "#ff4d4d");
		}

		const packFloor = pack => {
			const n = +pack.replace("items", "");
			return n <= 7 ? "bank" : n <= 23 ? "bank_b" : "bank_u";
		};

		const unlockedFloors = new Set(allPacks.map(packFloor));
		let curFloor = character.map;

		const go = async to => {
			if (!to || curFloor === to || !unlockedFloors.has(to)) return;
			log(`[TRAVEL] Di chuyển: ${curFloor} -> ${to}`);
			const [x, y] = FLOOR_ENTRY[to]?.[curFloor] ?? [];
			if (x != null && y != null) {
				if (character.moving) stop();
				await smart_move({ map: to, x, y });
				await sleep(100);
				curFloor = character.map;
			}
		};

	
		
		
		
		
// =====================================================================
		// --- PHASE 0: GỘP STACK CHUẨN XÁC 100% (CHỐNG LAG & CHỐNG LỖI BOUND/SHINY) ---
		// =====================================================================
		log("[PHASE 0] Đang kiểm tra và lập kế hoạch gom stack an toàn...");

		// Hàm hỗ trợ chờ Server phản hồi (Chống lag/ping cao)
		async function waitUntil(conditionFn, timeout = 1500) {
			const start = Date.now();
			while (Date.now() - start < timeout) {
				if (conditionFn()) return true;
				await sleep(50);
			}
			return false;
		}

		// 1. Quét toàn bộ kho tìm ô dở dang (q < maxStack)
		const partialGroups = new Map();
		for (const pack of allPacks) {
			const items = character.bank[pack];
			if (!items) continue;
			for (let i = 0; i < 42; i++) {
				const it = items[i];
				if (!it) continue;

				const maxStack = parent.G.items[it.name]?.s || 1;
				const currentQty = it.q || 1;

				if (maxStack > 1 && currentQty < maxStack) {
					// 📌 VÁ LỖI TOÀN DIỆN: Phân biệt cả Name, Level, Shiny (p), Bound (b) và Variant (v)
					const key = `${it.name}_${it.level || 0}_${it.p || ""}_${it.b || ""}_${it.v || ""}`;
					if (!partialGroups.has(key)) partialGroups.set(key, []);
					partialGroups.get(key).push({ pack, slot: i, qty: currentQty, maxStack });
				}
			}
		}

		// 2. Lập danh sách gom hàng loạt
		const pendingRetrieves = []; 

		for (const [key, slots] of partialGroups) {
			if (slots.length < 2) continue;
			const maxStack = slots[0].maxStack;
			slots.sort((a, b) => a.qty - b.qty);

			while (slots.length >= 2) {
				const batchToMerge = [];
				let currentSum = 0;
				for (let i = 0; i < slots.length; i++) {
					if (currentSum + slots[i].qty <= maxStack) {
						currentSum += slots[i].qty;
						batchToMerge.push(slots[i]);
					}
				}
				if (batchToMerge.length < 2) break;

				const mainTargetPack = batchToMerge[0].pack;

				for (const item of batchToMerge) {
					const idx = slots.findIndex(s => s.pack === item.pack && s.slot === item.slot);
					if (idx !== -1) slots.splice(idx, 1);

					pendingRetrieves.push({
						pack: item.pack,
						slot: item.slot,
						mainTargetPack: mainTargetPack
					});
				}
			}
		}

		if (pendingRetrieves.length === 0) {
			log("[PHASE 0] Kho đồ đã hoàn tất tối ưu, không có ô dở dang nào cần gom.");
		} else {
			log(`[PHASE 0] Lập kế hoạch gom ${pendingRetrieves.length} ô dở dang. Bắt đầu...`, "#ffaa00");

			// 3. Thực thi gom hàng loạt
			while (pendingRetrieves.length > 0) {
				const freeInvSlots = [];
				for (let i = 0; i < character.items.length; i++) {
					if (!character.items[i]) freeInvSlots.push(i);
				}

				if (freeInvSlots.length === 0) {
					log("[WARNING] Túi đồ không còn ô trống! Dừng gom.", "#ffcc00");
					break;
				}

				const currentBatch = pendingRetrieves.splice(0, freeInvSlots.length);

				// --- BƯỚC A: RÚT THEO TẦNG ---
				const retrievesByFloor = new Map();
				for (let i = 0; i < currentBatch.length; i++) {
					const item = currentBatch[i];
					const invSlot = freeInvSlots[i];
					const floor = packFloor(item.pack);

					if (!retrievesByFloor.has(floor)) retrievesByFloor.set(floor, []);
					retrievesByFloor.get(floor).push({
						pack: item.pack,
						slot: item.slot,
						invSlot: invSlot,
						mainTargetPack: item.mainTargetPack
					});
				}

				const itemsInHand = []; 
				for (const [floor, itemsToGet] of retrievesByFloor) {
					await go(floor); 
					for (const target of itemsToGet) {
						if (!character.bank[target.pack]?.[target.slot]) continue;
						
						await bank_retrieve(target.pack, target.slot, target.invSlot);
						
						// Chờ Server xác nhận item đã về túi đồ (Tối đa 1.5s, chống lag)
						const success = await waitUntil(() => character.items[target.invSlot] !== null);
						if (success) {
							itemsInHand.push({ invSlot: target.invSlot, mainTargetPack: target.mainTargetPack });
						}
					}
				}

				// --- BƯỚC B: CẤT THEO TẦNG MỤC TIÊU ---
				const storesByFloor = new Map();
				for (const item of itemsInHand) {
					const targetFloor = packFloor(item.mainTargetPack);
					if (!storesByFloor.has(targetFloor)) storesByFloor.set(targetFloor, []);
					storesByFloor.get(targetFloor).push(item);
				}

				for (const [floor, itemsToStore] of storesByFloor) {
					await go(floor); 
					for (const item of itemsToStore) {
						if (!character.items[item.invSlot]) continue;
						
						await bank_store(item.invSlot, item.mainTargetPack);
						
						// Chờ Server xác nhận item đã rời khỏi túi đồ (Tối đa 1.5s, chống lag)
						await waitUntil(() => character.items[item.invSlot] === null);
					}
				}
			}

			log("[PHASE 0] Hoàn tất gom stack 100% an toàn và chính xác!", "#00ff66");
		}
		// =====================================================================
		
		
		
		
		
		

		// =====================================================================
		
		// --- PHASE 1: SẮP XẾP VỊ TRÍ TOÀN CỤC BẰNG BATCH (CẢ TÚI CÙNG LÚC) ---
		log("[PHASE 1] Lên bản đồ vị trí & gom/chuyển đồ siêu tốc...");
		
		const flat = allPacks.flatMap(pack =>
			character.bank[pack].map((item, i) => item ? { item, curPack: pack, curSlot: i } : null).filter(Boolean)
		);

		flat.sort((a, b) => order.comparator(a.item, b.item));

		flat.forEach((e, i) => {
			e.targetPack = targetPacks[Math.floor(i / 42)];
			e.targetSlot = i % 42;
		});

		const loc = new Map(flat.map(e => [`${e.curPack}:${e.curSlot}`, e]));
		const placed = e => e.curPack === e.targetPack && e.curSlot === e.targetSlot;
		const inInv = e => e.curPack === "__inv__";

		const updateLoc = (e, newPack, newSlot) => {
			loc.delete(`${e.curPack}:${e.curSlot}`);
			e.curPack = newPack; e.curSlot = newSlot;
			loc.set(`${newPack}:${newSlot}`, e);
		};

		let loopCount = 0;
		while (loopCount++ < 100) {
			const unplaced = flat.filter(e => !placed(e));
			if (!unplaced.length) break;

			// Bước A: Cất toàn bộ đồ đang giữ trên túi vào ngân hàng (nếu có)
			const held = flat.filter(inInv);
			if (held.length) {
				const byFloor = new Map();
				held.forEach(e => {
					const list = byFloor.get(packFloor(e.targetPack)) ?? [];
					list.push(e);
					byFloor.set(packFloor(e.targetPack), list);
				});

				for (const [floor, entries] of byFloor) {
					await go(floor);
					const tasks = entries.map(entry => async () => {
						const occupant = loc.get(`${entry.targetPack}:${entry.targetSlot}`);
						const invSlot = entry.curSlot;
						await bank_store(entry.curSlot, entry.targetPack, entry.targetSlot);
						updateLoc(entry, entry.targetPack, entry.targetSlot);
						if (occupant && occupant !== entry) updateLoc(occupant, "__inv__", invSlot);
					});
					await runBatchFast(tasks);
				}
			}

			// Bước B: Rút TOÀN BỘ túi đồ (42 món) cùng một lượt
			const stillUnplaced = flat.filter(e => !placed(e) && !inInv(e));
			if (!stillUnplaced.length) continue;

			const freeSlots = Array.from({ length: 42 }, (_, i) => i).filter(i => !character.items[i]);
			if (!freeSlots.length) {
				await sleep(50);
				continue;
			}

			const batch = stillUnplaced.slice(0, freeSlots.length);
			const byFloor = new Map();
			batch.forEach(e => {
				const list = byFloor.get(packFloor(e.curPack)) ?? [];
				list.push(e);
				byFloor.set(packFloor(e.curPack), list);
			});

			for (const [floor, entries] of byFloor) {
				await go(floor);
				const tasks = entries.map(entry => async () => {
					const fi = freeSlots.pop();
					if (fi == null) return;
					await bank_retrieve(entry.curPack, entry.curSlot, fi);
					updateLoc(entry, "__inv__", fi);
				});
				await runBatchFast(tasks);
			}
		}

		// --- PHASE 2: TINH CHỈNH TẠI CHỖ (BATCH SWAP) ---
		log("[PHASE 2] Tinh chỉnh hoàn thiện các pack...");
		for (const pack of targetPacks) {
			const floor = packFloor(pack);
			await go(floor);
			
			// Kiểm tra và rút/cất nhanh các ô lệch vị trí trong cùng pack
			const packItems = character.bank[pack];
			if (!packItems) continue;

			// Tự động sắp xếp các ô chưa chuẩn trong pack
			const freeSlot = Array.from({ length: 42 }, (_, i) => i).find(i => !character.items[i]);
			if (freeSlot == null) continue;

			for (let i = 0; i < 42; i++) {
				const item = packItems[i];
				if (!item) continue;
				// Kiểm tra nếu có vật phẩm cần đổi chỗ
				for (let j = i + 1; j < 42; j++) {
					const nextItem = packItems[j];
					if (nextItem && order.comparator(item, nextItem) > 0) {
						// Hoán đổi cực nhanh qua 1 ô trống trên túi
						await bank_retrieve(pack, j, freeSlot);
						await bank_store(i, pack, j);
						await bank_store(freeSlot, pack, i);
						break;
					}
				}
			}
		}

		log("[SUCCESS] Sắp xếp hoàn tất siêu tốc! 2 pack đầu tiên đã trống.", "#00ff66");
	} catch (err) {
		log(`[FATAL ERROR] Lỗi: ${parseError(err)}`, "#ff4d4d");
	}
})();
