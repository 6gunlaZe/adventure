
let codemode = 0

///////////////
const botToken = '7892397096:AAH7nDreQHQ9fPcsMJNi8MIRwZEDPQzFPgc'; // Thay YOUR_BOT_TOKEN bằng token của bạn
// Các mẫu cú pháp (dễ dàng thay đổi tại đây)
const syntaxExamples = [
  { key: 'reset', value: '1' },
  { key: 'fram', value: '1' },
  { key: 'bank', value: '1' },
  { key: 'crypt', value: '1' }
];

let lastUpdateId = 0;  // Biến để lưu trữ ID của bản cập nhật cuối cùng
const messageTimeout = 10 * 1000; // 10 giây (tính bằng milliseconds)
const initialDelay = 30 * 1000;  // 30 giây (tính bằng milliseconds)
const callbackTimeout = 10 * 1000; // 10 giây cho thời gian nhấn nút

let callbackQueryTimes = new Map();  // Lưu trữ thời gian nút callback query

// Hàm lấy các bản cập nhật từ Telegram
async function getUpdates() {
  const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`;

  console.log('Fetching updates...');  // Debug log: Đang gọi API

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Data received:', data);  // Debug log: Xem dữ liệu trả về từ API

    if (data.ok && data.result.length > 0) {
      for (let update of data.result) {
        lastUpdateId = update.update_id;
        const message = update.message;

        if (message) {
          const messageTime = new Date(message.date * 1000);  // Convert timestamp to Date object
          const currentTime = new Date();
          const timeDiff = currentTime - messageTime;  // Tính sự chênh lệch thời gian (milliseconds)

          // Chỉ xử lý tin nhắn nếu nó được gửi trong vòng 10 giây
          if (timeDiff <= messageTimeout) {
            console.log('Processing message:', message);  // Debug log: Xử lý tin nhắn
            analyzeMessage(message.text, message.chat.id);
          } else {
            console.log('Message is too old. Skipping...');
          }
        } else if (update.callback_query) {
          console.log('Processing callback query:', update.callback_query);  // Debug log: Xử lý callback query
          handleCallbackQuery(update.callback_query);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }

  // Đợi một khoảng thời gian trước khi tiếp tục lấy các bản cập nhật tiếp theo
  setTimeout(getUpdates, 2000);  // Gọi lại getUpdates sau 2 giây để tiếp tục nhận tin nhắn mới
}

// Hàm phân tích tin nhắn theo dạng (key, data)
function analyzeMessage(text, chatId) {
  if (text) {
    const regex = /^\(([^,]+),\s*(.+)\)$/;  // Kiểm tra định dạng (key, data)
    const match = text.match(regex);

    if (match) {
      const key = match[1].trim();
      let data = match[2].trim();
      if (!isNaN(data)) {
        data = parseFloat(data);  // Nếu là số, chuyển thành số
      }

      console.log('Matched key:', key);  // Debug log: Xem key
      console.log('Matched data:', data);  // Debug log: Xem data

      performTask(key, data, chatId);
      sendMessage(chatId, `Data received: ${key} = ${data}`);
    } else {
      // Chỉ gửi cú pháp mẫu khi người dùng nhập sai cú pháp
      sendSyntaxExamples(chatId);
    }
  }
}

// Hàm trả về các cú pháp mẫu
function getSyntaxExamples() {
  return syntaxExamples.map(example => `(${example.key}, ${example.value})`).join('\n');
}

// Hàm gửi các ví dụ cú pháp đúng cho người dùng
function sendSyntaxExamples(chatId) {
  const text = `Bạn đã nhập sai cú pháp. Hãy thử một trong các cú pháp sau:\n\n` + getSyntaxExamples();

  // Tạo các nút inline keyboard từ mảng syntaxExamples
  const reply_markup = {
    inline_keyboard: syntaxExamples.map(example => {
      return [
        { text: `Gửi (${example.key}, ${example.value})`, callback_data: `(${example.key}, ${example.value})` }
      ];
    })
  };

  sendMessage(chatId, text, reply_markup); // Gửi tin nhắn với inline keyboard
}

// Hàm gửi tin nhắn phản hồi (reply)
function sendMessage(chatId, text, reply_markup = {}) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
    reply_markup: reply_markup // Đảm bảo không gửi null
  };

  console.log('Sending message:', payload);  // Debug log: Xem payload

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => console.log('Message sent:', data))
  .catch(error => console.error('Error sending message:', error));
}

// Hàm xử lý khi người dùng nhấn vào nút trong inline keyboard
function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const text = callbackQuery.data;

  console.log('Handling callback query:', text);  // Debug log: Xử lý callback query

  // Kiểm tra thời gian của callback query
  const currentTime = new Date().getTime();
  const timestamp = callbackQuery.message.date * 1000;  // Lấy thời gian tạo của message chứa callback query
  const timeDiff = currentTime - timestamp;

  // Nếu thời gian quá lâu (10 giây), bỏ qua xử lý
  if (timeDiff > callbackTimeout) {
    console.log('Callback query expired. Skipping...');
	        sendSyntaxExamples(chatId);
    return;  // Bỏ qua callback query nếu thời gian quá lâu
  }

  // Nếu không quá lâu, thực hiện xử lý bình thường
  const regex = /^\(([^,]+),\s*(.+)\)$/;  // Kiểm tra định dạng (key, data)
  const match = text.match(regex);

  if (match) {
    const key = match[1].trim();
    let data = match[2].trim();
    if (!isNaN(data)) {
      data = parseFloat(data);  // Nếu là số, chuyển thành số
    }

    // Xử lý nhiệm vụ với key và data
    performTask(key, data, chatId);
    sendMessage(chatId, `Data received: ${key} = ${data}`);
  } else {
    sendMessage(chatId, 'Dữ liệu không hợp lệ!');
  }
}

// Hàm thực hiện nhiệm vụ (ví dụ: ghi lại dữ liệu hoặc thực hiện hành động khác)
function performTask(key, data, chatId) {
  console.log(`Nhiệm vụ thực hiện: key = ${key}, data = ${data}`);

  if (key === 'reset') {
    console.log('Thực hiện reset!');
	  parent.api_call("disconnect_character", {name: "haiz"});
    sendMessage(chatId, 'Nhiệm vụ reset đã hoàn thành!');
  } else if (key === 'fram') {
    console.log('Thực hiện fram!');
                respawn()
	  send_cm("MuaBan", "full");
	  sendMessage(chatId, 'Nhiệm vụ fram đã hoàn thành!');
  } else if (key === 'bank') {
    console.log('Thực hiện bank!');
    sendMessage(chatId, 'Nhiệm vụ bank đã hoàn thành!');
  } else if (key === 'crypt') {
    console.log('Thực hiện crypt!');
                codemode = 1
	  	        Key.push(data); 
	  sendMessage(chatId, 'Nhiệm vụ crypt đã hoàn thành!');
  } else {
    console.log('Không có nhiệm vụ xác định cho key:', key);  // Debug log: Kiểm tra trường hợp không có nhiệm vụ
    sendMessage(chatId, `Không có nhiệm vụ xác định cho key: ${key}`);
  }
}

// Khởi động bot sau khi chờ 30 giây
setTimeout(() => {
  sendMessage(6708647498, 'Bot is now starting...!');
	sendSyntaxExamples(6708647498);
  getUpdates(); // Gọi hàm getUpdates lần đầu tiên
}, 2000);





setTimeout(() => {
if (codemode == 0){ 
	load_code(7)
	  sendMessage(6708647498, 'Bot is haiz fram!');

}
	else if (codemode == 1) {
		load_code(38)
		  sendMessage(6708647498, 'Bot is crypt!');

	}
}, 10000);



let curenkey;
let Key = [];
let index = 0;
let landau;
let localkey;
let lastLoggedKey = null; // Key cuối cùng đã ghi "tru 1 key"

setInterval(function () {
    if (codemode != 1) return;

    let member1 = get_player("6gunlaZe");
    let member2 = get_player("Ynhi");

    if (
        character.map == "cave" &&
        distance(character, { x: -194, y: -1281 }) < 50 &&
        member1 && member2 &&
        distance(character, member1) < 50 &&
        distance(character, member2) < 50
    ) {

        if (character.esize < 9) {
            parent.api_call("disconnect_character", { name: "haiz" });
        }

        if (soluongitem("cryptkey") >= 1) {
            enter("crypt");
            landau = 1;
            // Không cần reset lastLoggedKey
        } else if (index < Key.length && character.map == "cave") {
            enter("crypt", Key[index]);
            game_log("Đăng nhập = " + Key[index]);
            localkey = Key[index];
            ghichu(localkey, "00", "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");
            Key.splice(index, 1);
            landau = 0;
        } else {
            parent.api_call("disconnect_character", { name: "haiz" });
        }

        setTimeout(function () {
            if (
                character.map == "cave" &&
                distance(character, { x: -194, y: -1281 }) < 50 &&
                member1 && member2 &&
                distance(character, member1) < 50 &&
                distance(character, member2) < 50
            ) {
                ghichu(localkey, "16 không đăng nhập được", "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");
            } else if (character.map == "crypt") {
                localkey = character.in; // Cập nhật localkey theo character.in
                if (localkey !== lastLoggedKey) {
                    ghichu(localkey, "tru 1 key", "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");
                    lastLoggedKey = localkey; // Đánh dấu key này đã được ghi
                }
            }
        }, 3000);
    }
}, 8000);




function soluongitem(name)
{
	let sl = 0
	//Iterate over every slot in our inventory.
	for(var i = 0; i <= 41; i++)
	{
		var curSlot = character.items[i];
		
		//Does the item name match?
		if(curSlot != null && curSlot.name == name)
		{
			sl += curSlot.q
		}
	}
	
	return sl
}












/////////////////////////////////////////////////////
let isActive = true;

setTimeout(() => {
  isActive = false; // Tắt hành động sau 20 giây
  console.log('Bot stopped after 20 seconds');
}, 20000); // Dừng hành động sau 20 giây

function hpp() {
  if (isActive) {
    console.log('Fetching updates...');
    // Thực hiện các hành động cập nhật ở đây
	  
if (character.hp/character.max_hp< 0.8 && character.mp > 100 ) {
   use_skill("use_hp");
} 
else if (character.mp/character.max_mp< 0.8) {
	use_skill("use_mp");
}
  else if (character.max_mp>character.mp)  use_skill("regen_mp");
	
	  
    // Bạn có thể gọi lại getUpdates() nếu cần để cập nhật liên tục trong 20 giây
    setTimeout(hpp, 300); 
  } else {
    console.log('Bot has stopped updating');
  }
}

hpp(); // Bắt đầu thực hiện () ngay khi mở trang


//////////////////////////////////////////////////////


// URL cơ bản đến danh sách issue của repo trên GitHub
const urlBase = "https://api.github.com/repos/6gunlaZe/game/issues";

// Mảng kết quả chứa các title đạt điều kiện
/**
 * Hàm lấy tối đa `limit` issue mới nhất theo thời điểm cập nhật,
 * sau đó lọc theo điều kiện:
 * - Nếu trùng `title` thì chỉ giữ issue có `body` dài nhất
 * - A = max(numbers), B = tổng số đoạn lặp của các số trùng → A + B < 10 => thêm vào Key
 * - hoặc số dòng < 10 && A < 11
 * - bỏ qua issue được tạo trong 2 ngày gần nhất
 */
async function fetchRecentIssues(limit = 500) {
  let allIssues = [];
  let page = 1;

  while (allIssues.length < limit) {
    const response = await fetch(
      `${urlBase}?state=all&sort=updated&direction=desc&per_page=100&page=${page}`
    );

    if (!response.ok) {
      console.error("Không thể lấy dữ liệu từ GitHub:", response.statusText);
      return;
    }

    const issues = await response.json();
    if (issues.length === 0) break;

    allIssues.push(...issues);
    if (issues.length < 100) break;

    page++;
  }

  // ⚠️ Lọc trùng title: chỉ giữ issue có body dài nhất
  const titleToIssue = new Map();

  for (const issue of allIssues) {
    const current = titleToIssue.get(issue.title);
    const currentLength = current?.body?.length || 0;
    const newLength = issue.body?.length || 0;

    if (!current || newLength > currentLength) {
      titleToIssue.set(issue.title, issue);
    }
  }

  const uniqueIssues = Array.from(titleToIssue.values()).slice(0, limit);

  if (uniqueIssues.length === 0) {
    console.log("⛔ Không có issue nào thỏa mãn.");
    return;
  }

  uniqueIssues.forEach(issue => {
    const createdAt = new Date(issue.created_at);
    const now = new Date();
    const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

    if (diffInDays <= 3) {
      console.log(`⏩ Bỏ qua: ${issue.title} | Mới tạo ${diffInDays.toFixed(1)} ngày trước`);
      return;
    }

    const body = issue.body || "";
    const lines = body.split('\n');
    const numberOfLines = lines.length;

    const numberMatches = body.match(/\d+(\.\d+)?/g);
    const numbers = numberMatches ? numberMatches.map(Number) : [];

    const countZero = numbers.filter(n => n === 0).length;
    if (countZero > 10) {
      console.log(`⛔ Bỏ qua: ${issue.title} | Số lần số 0 xuất hiện: ${countZero}`);
      return;
    }

    const A = numbers.length > 0 ? Math.max(...numbers) : 0;
    let B = 0;
    const positionsMap = {};

    numbers.forEach((num, idx) => {
      if (!positionsMap[num]) positionsMap[num] = [];
      positionsMap[num].push(idx);
    });

    for (const num in positionsMap) {
      const positions = positionsMap[num];
      if (positions.length >= 2) {
        let segments = 1;
        for (let i = 1; i < positions.length; i++) {
          if (positions[i] !== positions[i - 1] + 1) segments++;
        }
        B += segments;
      }
    }

    const C = A + B;
    if (C < 12  || (numberOfLines < 10 && A < 11)) {
      Key.push(issue.title);
      console.log(
        `✅ Đã thêm: ${issue.title} | Ngày tạo: ${createdAt.toISOString().split("T")[0]} | Số dòng: ${numberOfLines} | A: ${A} | B: ${B} | C: ${C}`
      );
    }
  });

  if (Key.length === 0) {
    console.log("⛔ Không có issue nào thỏa mãn điều kiện để thêm vào Key.");
  } else {
    console.log("📌 Danh sách Key:", Key);
  }
}

// Gọi hàm xử lý
fetchRecentIssues();




///////////////////////////////////////
////////////////////////////////////// Hẹn giờ săn hầm ngục (có delay kiểm tra Key)

console.log("⏳ Đợi 2 giây để kiểm tra điều kiện...");

setTimeout(() => {
    let now1 = new Date();

    let startTime1 = new Date();
    startTime1.setHours(14, 0, 0, 0); // 12:00 PM

    let endTime1 = new Date();
    endTime1.setHours(18, 0, 0, 0); // 6:00 PM

    let region1 = server.region;
    let serverIden1 = server.id;

    // Điều kiện kiểm tra
    let timeValid = now1 >= startTime1 && now1 <= endTime1;
    let enoughKeys = soluongitem("cryptkey") >= 1 || Key.length > 0;
    let enoughEnergy = character.esize > 10;
    let correctRegion = region1 == "EU";
    let correctServer = serverIden1 == "II";

    console.log("========== Kiểm Tra Hẹn Giờ Săn Hầm Ngục ==========");
    console.log("Thời gian hiện tại: ", now1.toLocaleString());
    console.log("Thời gian hợp lệ: ", timeValid ? "✔️ Đúng giờ" : "❌ Không đúng giờ");
    console.log("Số lượng khóa đủ: ", enoughKeys ? "✔️ Có đủ" : "❌ Không đủ" + Key.length);
    console.log("Esize đủ: ", enoughEnergy ? "✔️ Đủ > 10" : "❌ Không đủ");
    console.log("Khu vực đúng: ", correctRegion ? "✔️ EU" : `❌ Sai (${region1})`);
    console.log("Server đúng: ", correctServer ? "✔️ II" : `❌ Sai (${serverIden1})`);

    if (timeValid && enoughKeys && enoughEnergy && correctRegion && correctServer) {
        console.log("👉 Điều kiện thỏa mãn, bật codemode = 1 (săn hầm ngục)");
        codemode = 1;
    } else {
        console.log("⛔ Điều kiện KHÔNG thỏa mãn, không bật codemode");
    }
}, 5000); // delay 2000ms = 2 giây









function elixirUsage() {
    try {
        let elixir = character.slots.elixir?.name;
        let requiredElixir =  "candypop";

        // Use the required elixir if it's not currently equipped
        if (elixir !== requiredElixir && elixir != "pumpkinspice") {
            let item = locate_item("pumpkinspice");
            if (item) {
                use(item);
            }
        }

    } catch (e) {
        console.error("Error in elixirUsage function:", e);
    }
}

// Run elixirUsage once after 2 minutes (120000 milliseconds)
setTimeout(elixirUsage, 120000); 










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












