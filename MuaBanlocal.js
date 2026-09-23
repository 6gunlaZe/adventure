
let urls = [
    "https://raw.githubusercontent.com/6gunlaZe/adventure/refs/heads/main/6_MUA-BAN.js",
];

urls.forEach((url) => loadURLs(url, 3)); // Thử tối đa 3 lần

function loadURLs(url, retries = 3) {
    let attempt = 0;
	

    while (attempt < retries) {
        try {
            var ajax = new XMLHttpRequest();
            ajax.open('GET', url, false); // synchronous
            ajax.send(null);

            if (ajax.status === 200) {
                var script = ajax.responseText || ajax.response;
                eval.apply(window, [script]);
                console.log(`✅ Script loaded successfully from ${url} (attempt ${attempt + 1})`);
                return true;
            } else {
                console.warn(`❌ Attempt ${attempt + 1} failed with status: ${ajax.status}`);
            }
        } catch (e) {
            console.warn(`⚠️ Attempt ${attempt + 1} threw an error: ${e}`);
        }

        attempt++;
    }

    console.error(`🚫 Failed to load script from ${url} after ${retries} attempts. Logging out...`);
    parent.api_call("disconnect_character", {name: "MuaBan"});
    return false;
}









///////////////////



























































/////////////////////////////////////////////////////
// CHECK LUCKY SLOT + AUTO UPGRADE (NON-BLOCKING)
/////////////////////////////////////////////////////

(async () => {

    /*********************************************************
     * LISTEN q_data – CHỈ BẮT PERFECT 0000
     *********************************************************/
    parent.socket._callbacks.$q_data.length = 1;

    parent.socket.on("q_data", (event) => {
        const slot = event.num;
        const nums = event.p?.nums;
        if (!nums) return;
      // game_log(`Slot ${slot} nums: ${nums.join(",")}`);  
		
        if (
            nums[0] === 0 &&
            nums[1] === 0 &&
            nums[2] === 0 &&
            nums[3] === 0
        ) {
            const time = new Date().toLocaleString();
            game_log(`PERFECT 0000 | Slot ${slot} | ${time}`);
            ghichu(
                "PERFECT 0000 LOG",
                `Slot ${slot} hit 0000 at ${time}`,
                "dsfsdfsdfsdfsd"
            );
        }
    });

    /*********************************************************
     * TRY SWAP – SLOT BẬN THÌ BỎ QUA (KHÔNG BLOCK)
     *********************************************************/
    async function trySwapToSlot(itemSlot, targetSlot) {
        try {
            const targetItem = character.items[targetSlot];

            // né scroll đang chiếm slot
            if (targetItem && targetItem.name === "scroll0") {
                const empty = character.items.findIndex(it => it === null);
                if (empty === -1) return false;
                await swap(targetSlot, empty);
            }

            await swap(itemSlot, targetSlot);
            return true;

        } catch (e) {
            return false;
        }
    }

    /*********************************************************
     * UPGRADE RETRY – KHÔNG TREO, THÊM TIMEOUT
     *********************************************************/
    async function upgradeRetry(slot, scroll, timeout = 10000) {
        const start = Date.now();
        while (true) {
            if (Date.now() - start > timeout) {
                game_log(`Upgrade slot ${slot} TIMEOUT`);
                return false;
            }

            if (character.q?.upgrade != null) {
                await sleep(500);
                continue;
            }

            try {
                await upgrade(slot, scroll);
                game_log(`Upgrade slot ${slot} SUCCESS`);
                return true;
            } catch (e) {
                await sleep(500);
            }
        }
    }

    /*********************************************************
     * AUTO UPGRADE LOOP – KHÔNG BAO GIỜ ĐỨNG MÃ
     *********************************************************/
    async function autoUpgradeLoop() {
        for (;;) {
            if (character.esize <= 3 || character.map !== "main") {
                await sleep(1000);
                continue;
            }

            for (let i = 0; i < 42; i++) {

                if (character.q?.upgrade != null) {
                    await sleep(500);
                    continue;
                }

                // --- đảm bảo helmet ---
                let helmet = locate_item("helmet");
                if (helmet === -1) {
                    await buy("helmet");
                    helmet = locate_item("helmet");
                } else {
                    const h = character.items[helmet];
                    if (h && h.level === 7) {
                        await sell(helmet);
                        await buy("helmet");
                        helmet = locate_item("helmet");
                    }
                }

                // --- swap helmet vào slot i ---
                if (helmet !== i && helmet !== -1) {
                    const ok = await trySwapToSlot(helmet, i);
                    if (!ok) continue;
                }

                // --- đảm bảo scroll ---
                let scroll = locate_item("scroll0");
                if (scroll === -1) {
                    await buy("scroll0", 1000); // mua ít tránh lag
                    scroll = locate_item("scroll0");
                }

                // --- upgrade slot i ---
                if (helmet !== -1 && scroll !== -1) {
                    await upgradeRetry(i, scroll);
                }
            }

            await sleep(1000); // nghỉ 1s sau 1 vòng upgrade
        }
    }

    /*********************************************************
     * AUTO BUY & SELL HELMET – RIÊNG TASK // chỉ dùng khi muốn tìm lucky slot
     *********************************************************/
    async function helmetManager() {
        for (;;) {
            try {
                const helmets = character.items
                    .map((it, idx) => ({ item: it, slot: idx }))
                    .filter(it => it.item && it.item.name === "helmet");

                if (helmets.length <= 1) {
                    await buy("helmet");
                    game_log(`Đã mua thêm helmet vì chỉ còn ${helmets.length} chiếc`);
                }

                for (const h of helmets) {
                    if (h.item.level === 7) {
                        await sell(h.slot);
                        game_log(`Đã bán helmet level 7 ở slot ${h.slot}`);
                    }
                }
            } catch (e) {
                game_log(`Lỗi khi xử lý helmet: ${e}`);
            }

            await sleep(2000); // nghỉ 2s trước khi check lại
        }
    }

	

/*********************************************************
 * JOB: UPGRADE ITEM A Ở SLOT 31
 *********************************************************/
	
async function smartUpgradeManager() {
    const TARGET_SLOT = 31;
    const INTERVAL_NORMAL = 260000;
    const INTERVAL_FAST = 300;
	
	const UPGRADE_CONFIG = [
    {
        name: "coatxxx",
        min_level: 7,
        max_level: 8, // Chỉ nâng cấp nếu dưới level 9
        levels: {
            7: { scroll: "scroll1"},
            8: { scroll: "scroll1"}
        }
    },
	
    {
        name: "pouchbow",
        min_level: 7,
        max_level: 7, // Chỉ nâng cấp nếu dưới level 9
        levels: {
            7: { scroll: "scroll1", offering: "offeringp"},
        }
    },
		
    {
        name: "fireblade111",
        min_level: 7,
        max_level: 7,
        levels: {
            7: { scroll: "scroll2", offering: "offeringp" },
            // ... thêm các level khác
        }
    }
    ];
	
	
    let lastRun = 0;

    for (;;) {
        try {
            if (character.q?.upgrade) {
                await sleep(500);
                continue;
            }

// --- A. TÍNH TOÁN INTERVAL ---
// Đếm xem có bao nhiêu item trong config đang đợi nâng cấp
let eligibleCount = 0;
let targetItemData = null;

for (let i = 0; i < character.items.length; i++) {
    const it = character.items[i];
    if (!it) continue;

    const cfg = UPGRADE_CONFIG.find(c =>
        c.name === it.name &&
        it.level >= c.min_level &&
        it.level < (c.max_level + 1)
    );

    if (cfg) {
        eligibleCount++;
        if (!targetItemData)
            targetItemData = { slot: i, ...cfg, currentLevel: it.level };
    }
}

// Nếu >3 item thì bật fast mode 60s
if (eligibleCount > 3 && Date.now() > fastModeUntil) {
    fastModeUntil = Date.now() + 60000;
}

// Nếu đang trong fast mode thì chạy nhanh
const currentInterval =
    Date.now() < fastModeUntil ? INTERVAL_FAST : INTERVAL_NORMAL;
			
			
			
            if (Date.now() - lastRun < currentInterval) {
                await sleep(500);
                continue;
            }

            // --- B. THỰC HIỆN UPGRADE ---
            if (!targetItemData) {
                await sleep(1000);
                continue;
            }

            // 1. Di chuyển vào slot đích (31)
            if (targetItemData.slot !== TARGET_SLOT) {
                if (!await trySwapToSlot(targetItemData.slot, TARGET_SLOT)) {
                    await sleep(500);
                    continue;
                }
            }

            // 2. Lấy thông tin scroll/offering dựa trên level hiện tại
            const levelSettings = targetItemData.levels[targetItemData.currentLevel];
            if (!levelSettings) {
                game_log(`Chưa cấu hình level ${targetItemData.currentLevel} cho ${targetItemData.name}`);
                await sleep(1000);
                continue;
            }

            const scrollSlot = locate_item(levelSettings.scroll);
            const offeringSlot = levelSettings.offering ? locate_item(levelSettings.offering) : -1;

            if (scrollSlot === -1) {
                game_log(`Thiếu ${levelSettings.scroll} để nâng cấp ${targetItemData.name}`);
                await sleep(5000);
                continue;
            }

            // 3. Tiến hành Upgrade
            game_log(`[UPGRADE] ${targetItemData.name} +${targetItemData.currentLevel} -> +${targetItemData.currentLevel + 1}`);
            
	// Dùng kỹ năng tăng tốc
	if (can_use("massproductionpp") && !character.s.massproductionpp)
		use_skill("massproductionpp");
	else if (can_use("massproduction") && !character.s.massproduction)
		use_skill("massproduction");
			
            // Nếu có offering thì dùng, không thì chỉ dùng scroll
            if (offeringSlot !== -1) {
                await upgrade(TARGET_SLOT, scrollSlot, offeringSlot);
            } else {
                await upgrade(TARGET_SLOT, scrollSlot);
            }

            lastRun = Date.now();

        } catch (e) {
            game_log(`Error: ${e}`);
        }
        await sleep(500);
    }
}


///////////////////////////
//////////////////////////

	
	
	
	
    // --- chạy song song 2 task ---
	
  //  autoUpgradeLoop();
  //  helmetManager();
	smartUpgradeManager()


})();

/// đã xong nhiệm vụ tìm ra lucky slot
////////////////////////////////////////////////
//////////////////////////////////////////////////////





//////////////////////////////////
function ghichu(title, mess, key_auto1) {
  const token = key_auto1;  // Thay bằng token của bạn
  const repoOwner = '6gunlaZe';  // Tên người sở hữu repo
  const repoName = 'game';  // Tên repository
  const issueTitle = title;
  const newLine = mess;  // Nội dung dòng mới cần thêm vào

  // Tìm kiếm các issue có tiêu đề trùng với title trong repository cụ thể
  fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(issueTitle)}+repo:${repoOwner}/${repoName}`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.items.length === 0) {
      // Nếu không tìm thấy issue với tiêu đề này, tạo mới issue
      fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`,
        },
        body: JSON.stringify({
          title: issueTitle,
          body: newLine,  // Thêm nội dung dòng mới vào body
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Issue mới đã được tạo:', data);
      })
      .catch(error => {
        console.error('Lỗi khi tạo Issue:', error);
      });
    } else {
      // Nếu đã tồn tại issue, thêm dòng mới vào body của issue đầu tiên tìm được
      const issueNumber = data.items[0].number;  // Lấy số của issue đầu tiên
      const issueUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}`;

      // Lấy nội dung hiện tại của issue
      fetch(issueUrl, {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })
      .then(response => response.json())
      .then(issueData => {
        // Kiểm tra nếu issueData.body có giá trị, nếu không thì khởi tạo giá trị mới
        const updatedBody = (issueData.body || '') + '\n' + newLine; // Thêm dòng mới vào cuối body

        // Cập nhật lại nội dung của issue
        fetch(issueUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
          },
          body: JSON.stringify({
            title: issueData.title, // Giữ nguyên tiêu đề
            body: updatedBody,  // Cập nhật nội dung của issue
          }),
        })
        .then(response => response.json())
        .then(updatedData => {
          console.log('Issue đã được cập nhật:', updatedData);
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật Issue:', error);
        });
      })
      .catch(error => {
        console.error('Lỗi khi lấy nội dung issue:', error);
      });
    }
  })
  .catch(error => {
    console.error('Lỗi khi tìm kiếm issue:', error);
  });
}


///////////////////////////////
////////////////////////////// LOG GOLD MỖI LẦN VÀO

function formatGold(gold) {
    const b = gold / 1_000_000_000;
    return `${gold} (${b.toFixed(2)} b)`;
}

function logGold() {
    
        const time = new Date().toLocaleString("vi-VN");

        ghichu(
            "GOLD CHANGE LOG",
            `→ ${formatGold(character.gold)}  | Time: ${time}`,
            "èwerwerwerwerwer"
        );

   
}

// logGold()  //tạm ngưng log gold

/////////////////////////
/////////////////////////





///////////////////////////////////////////////////
////////////////////////////////////////////////


