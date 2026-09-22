// --- 1. LOG SONG SONG (CONSOLE + GAME LOG) ---
function log(msg, color = "#5ed1ff") {
	console.log(msg);
	if (typeof game_log === "function") {
		game_log(msg, color);
	}
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

// --- 3. BẢNG DỮ LIỆU TẦNG VÀ HELPER ---
const FLOOR_ENTRY = {
	bank: { bank_b: [1, -436], bank_u: [1, -436] },
	bank_b: { bank: [-264, -412], bank_u: [-104, -171] },
	bank_u: { bank: [0, -41], bank_b: [0, -41] },
};

async function runLimited(entries, worker, cap = 180) {
	const inflight = [];
	for (const entry of entries) {
		while (character.cc > cap) await sleep(100);
		inflight.push(worker(entry));
		await sleep(10);
	}
	return Promise.allSettled(inflight);
}

// --- 4. HÀM SẮP XẾP TẠI CỔNG TẦNG (ĐÃ SỬA ĐỂ BỎ QUA 2 PACK ĐẦU) ---
function sortAllBank(allowedPacks, invSlots, sortedBank, cursor) {
	if (!character.bank) return Promise.resolve();

	// Chỉ lấy các pack thuộc tầng hiện tại VÀ nằm trong danh sách allowedPacks
	const floorPacks = Object.keys(bank_packs).filter(k => k !== "gold" && bank_packs[k][0] === character.map);
	const packs = floorPacks.filter(p => allowedPacks.includes(p));

	if (!packs.length) return Promise.resolve();

	const cmp = order.comparator;

	invSlots = invSlots || Array.from({ length: 42 }, (_, i) => i).filter(i => !character.items[i]);
	if (!invSlots.length) return Promise.resolve();

	if (!sortedBank) {
		const arr = packs.flatMap(pack => character.bank[pack]).sort(cmp);
		sortedBank = {};
		packs.forEach((pack, i) => { sortedBank[pack] = arr.slice(i * 42, (i + 1) * 42); });
	}

	cursor = cursor == null ? 0 : (cursor + 1) % invSlots.length;
	const slot = invSlots[cursor], item = character.items[slot];
	const next = () => sortAllBank(allowedPacks, invSlots, sortedBank, cursor);

	if (!item) {
		for (const pack of packs)
			for (let i = 0; i < 42; i++)
				if (character.bank[pack][i] && cmp(character.bank[pack][i], sortedBank[pack][i]))
					return bank_retrieve(pack, i, slot).then(next);
		invSlots.splice(cursor, 1);
		return sleep(50).then(next);
	}

	for (const pack of packs)
		for (let i = 0; i < 42; i++)
			if (!cmp(item, sortedBank[pack][i]) && cmp(character.bank[pack][i], sortedBank[pack][i]))
				return bank_store(slot, pack, i).then(next);

	return Promise.resolve(sortedBank);
}

// --- 5. TIẾN TRÌNH CHẠY CHÍNH ---
(async function startSortingProcess() {
	log("[START] Bắt đầu tiến trình sắp xếp ngân hàng...", "#2ef288");

	if (!character.bank) return log("[ERROR] Bạn chưa đứng ở trong Ngân Hàng!", "#ff4d4d");
	if (!character.esize) return log("[ERROR] Cần ít nhất 1 ô trống trong túi đồ!", "#ff4d4d");

	try {
		// Danh sách tất cả các pack hiện có trong ngân hàng
		const allPacks = Object.keys(character.bank)
			.filter(k => k !== "gold" && bank_packs[k])
			.sort((a, b) => +a.replace("items", "") - +b.replace("items", ""));

		// Chỉ định các pack ĐÍCH ĐỂ CHỨA ĐỒ (bỏ qua 2 pack đầu tiên)
		const targetPacks = allPacks.slice(2);

		if (targetPacks.length === 0) {
			return log("[ERROR] Cần ít nhất 3 pack ngân hàng để thực hiện chừa 2 pack đầu!", "#ff4d4d");
		}

		// Đếm tổng số đồ hiện có
		const totalItems = allPacks.flatMap(pack => character.bank[pack]).filter(Boolean).length;
		const maxCapacity = targetPacks.length * 42;

		if (totalItems > maxCapacity) {
			return log(`[ERROR] Bạn có ${totalItems} món đồ nhưng các pack cho phép chỉ chứa được ${maxCapacity} món! Hãy giải phóng bớt túi đồ.`, "#ff4d4d");
		}

		const packFloor = pack => {
			const n = +pack.replace("items", "");
			return n <= 7 ? "bank" : n <= 23 ? "bank_b" : "bank_u";
		};

		const unlockedFloors = new Set(allPacks.map(packFloor));
		log(`[INFO] Lấy đồ từ toàn bộ ${allPacks.length} pack, chuyển hết vào ${targetPacks.length} pack khả dụng (đã bỏ 2 pack đầu).`);

		let curFloor = character.map;
		const go = async to => {
			if (!to || curFloor === to || !unlockedFloors.has(to)) return;
			log(`[TRAVEL] Di chuyển: ${curFloor} -> ${to}`);
			const [x, y] = FLOOR_ENTRY[to]?.[curFloor] ?? [];
			if (x != null && y != null) {
				await smart_move({ map: to, x, y });
				curFloor = to;
			}
		};

		// PHASE 1: GỘP CÁC STACK ĐỒ CHƯA ĐẦY
		log("[PHASE 1] Gộp các stack đồ chưa đầy...");
		let mergeCount = 0;
		const unmergeable = new Set();

		while (true) {
			const stackList = {};
			for (const pack of allPacks) {
				character.bank[pack].forEach((item, i) => {
					if (!item?.q) return;
					const max = G.items[item.name]?.s;
					if (!max || item.q >= max) return;
					const key = item.p ? `${item.name}|${item.p}` : item.name;
					if (!unmergeable.has(key)) (stackList[key] ??= []).push([pack, i, item.q]);
				});
			}

			let merged = false;
			for (const key in stackList) {
				const stacks = stackList[key];
				if (stacks.length < 2) continue;

				const limit = G.items[key.split("|")[0]].s;
				stacks.sort((a, b) => a[2] - b[2]);
				let lo = 0, hi = stacks.length - 1;
				while (lo < hi && stacks[lo][2] + stacks[hi][2] > limit) hi--;
				if (lo >= hi) { lo = 0; hi = stacks.length - 1; }

				const [loPack, loSlot, loQ] = stacks[lo], [hiPack, hiSlot, hiQ] = stacks[hi];
				const needed = limit - hiQ, needSplit = loQ > needed;

				const free = Array.from({ length: 42 }, (_, i) => i).filter(i => !character.items[i]);
				if (free.length < (needSplit ? 3 : 2)) { log("[WARN] Túi đồ đầy, dừng gộp stack.", "#ff9900"); break; }
				const [f0, f1, f2] = free;

				await go(packFloor(hiPack)); await bank_retrieve(hiPack, hiSlot, f0);
				await go(packFloor(loPack)); await bank_retrieve(loPack, loSlot, f1);

				if (needSplit) { await split(f1, needed); await swap(f2, f0); }
				else if (character.items[f0]?.name === character.items[f1]?.name) { await swap(f0, f1); }

				// Cất ngược lại: Nếu pack cũ là 2 pack đầu thì ưu tiên tìm slot mới trong targetPacks
				if (character.items[f1]) {
					const destPack = targetPacks.includes(loPack) ? loPack : targetPacks[0];
					await go(packFloor(destPack));
					await bank_store(f1, destPack);
				}
				if (character.items[f0]) {
					const destPack = targetPacks.includes(hiPack) ? hiPack : targetPacks[0];
					await go(packFloor(destPack));
					await bank_store(f0, destPack);
				}

				const nowHi = character.bank[hiPack]?.[hiSlot]?.q ?? 0;
				const nowLo = character.bank[loPack]?.[loSlot]?.q ?? 0;

				if (nowHi === hiQ && nowLo === loQ) {
					unmergeable.add(key);
					continue;
				}

				log(`[MERGE] Gộp ${key}: ${loQ}+${hiQ} -> ${nowHi}+${nowLo}`);
				mergeCount++;
				merged = true;
				break;
			}
			if (!merged) break;
		}
		log(`[PHASE 1] Hoàn thành gộp ${mergeCount} cặp đồ.`);

		// PHASE 2: PHÂN LOẠI & DI CHUYỂN ĐỒ VỀ CÁC PACK MỤC TIÊU
		log("[PHASE 2] Sắp xếp vị trí đồ toàn cục...");
		const flat = allPacks.flatMap(pack =>
			character.bank[pack].map((item, i) => item ? { item, curPack: pack, curSlot: i } : null).filter(Boolean)
		);

		flat.sort((a, b) => order.comparator(a.item, b.item));

		// Gán vị trí target ĐÚNG và CHỈ NẰM TRONG targetPacks
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

		let iters = 0;
		while (iters++ < 500) {
			const held = flat.filter(inInv);
			const unplaced = flat.filter(e => !placed(e) && !inInv(e));
			if (!held.length && !unplaced.length) break;

			let progress = false;

			if (held.length) {
				const byFloor = new Map();
				held.forEach(e => {
					const list = byFloor.get(packFloor(e.targetPack)) ?? [];
					list.push(e);
					byFloor.set(packFloor(e.targetPack), list);
				});

				for (const [floor, entries] of byFloor) {
					await go(floor);
					const results = await runLimited(entries, entry => {
						const occupant = loc.get(`${entry.targetPack}:${entry.targetSlot}`);
						const invSlot = entry.curSlot;
						return bank_store(entry.curSlot, entry.targetPack, entry.targetSlot).then(() => {
							updateLoc(entry, entry.targetPack, entry.targetSlot);
							if (occupant && occupant !== entry) updateLoc(occupant, "__inv__", invSlot);
						});
					});
					if (results.some(r => r.status === "fulfilled")) progress = true;
				}
			}

			const stillUnplaced = flat.filter(e => !placed(e) && !inInv(e));
			if (stillUnplaced.length) {
				const freeSlots = Array.from({ length: 42 }, (_, i) => i).filter(i => !character.items[i]);
				const batch = stillUnplaced.slice(0, freeSlots.length);
				const byFloor = new Map();
				batch.forEach(e => {
					const list = byFloor.get(packFloor(e.curPack)) ?? [];
					list.push(e);
					byFloor.set(packFloor(e.curPack), list);
				});

				for (const [floor, entries] of byFloor) {
					await go(floor);
					const results = await runLimited(entries, entry => {
						const fi = freeSlots.pop();
						return bank_retrieve(entry.curPack, entry.curSlot, fi).then(() => updateLoc(entry, "__inv__", fi));
					});
					if (results.some(r => r.status === "fulfilled")) progress = true;
				}
			}

			if (!progress) break;
		}

		// PHASE 3: TINH CHỈNH VỊ TRÍ CỤC BỘ (TRUYỀN `targetPacks` VÀO ĐỂ KHÔNG SẮP XẾP NHẦM LẠI 2 PACK ĐẦU)
		log("[PHASE 3] Tinh chỉnh thứ tự từng tầng...");
		for (const floor of unlockedFloors) {
			await go(floor);
			await new Promise((resolve) => {
				sortAllBank(targetPacks).then(resolve).catch(resolve);
			});
		}

		log("[SUCCESS] Sắp xếp hoàn tất! 2 pack đầu tiên đã trống hoàn toàn.", "#00ff66");
	} catch (err) {
		log(`[FATAL ERROR] Lỗi: ${err.message || err}`, "#ff4d4d");
	}
})();
