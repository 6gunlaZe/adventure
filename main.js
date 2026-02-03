
let codemode = 0

///////////////
const botToken = '7892397096:AAH7nDreQHQ9fPcsMJNi8MIRwZEDPQzFPg1111111c'; // Thay YOUR_BOT_TOKEN bằng token của bạn
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
}, 13000); //chạy sau 13s, xác định xem là chơi kiểu gì



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

        if (character.esize < 6) {
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
            ghichu(localkey, "00", "");
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
                ghichu(localkey, "16 không đăng nhập được", "");
            } else if (character.map == "crypt") {
                localkey = character.in; // Cập nhật localkey theo character.in
                if (localkey !== lastLoggedKey) {
                    ghichu(localkey, "tru 1 key", "");
                    lastLoggedKey = localkey; // Đánh dấu key này đã được ghi
                }
            }
        }, 3000);
    }
}, 12000); // lặp lại mỗi 12s




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



setInterval(function() {
 if (character.rip) { ///////auto hoi sinh
	 framtay = 0
    respawn();
  }
}, 420000);


//////////////////////////////////////////////////////

const urlBase = "https://api.github.com/repos/6gunlaZe/game/issues";
const startFrom = new Date("2025-07-01"); // ⚠️ Chỉ lấy từ tháng 6/2024 trở lại

async function fetchRecentIssues(limit = 500) {
  let allIssues = [];
  let page = 1;
  let done = false;

  while (allIssues.length < limit && !done) {
const response = await fetch(
  `${urlBase}?state=all&sort=created&direction=desc&per_page=100&page=${page}`
);


	
  // 👉 Thêm kiểm tra 422 ngay tại đây
  if (response.status === 422) {
	console.log("🔍 Fetching page", page);
    console.warn("⚠️ Page vượt quá số trang tồn tại. Dừng vòng lặp.");
    break;
  }  
	  
	  
    if (!response.ok) {
      console.error("❌ Lỗi khi gọi API GitHub:", response.statusText);
      return;
    }

    const issues = await response.json();
    if (issues.length === 0) break;

    for (const issue of issues) {
      const createdAt = new Date(issue.created_at);

      if (createdAt < startFrom) {
      //  console.log(`⏩ [Page ${page}] Bỏ qua (quá cũ): ${issue.title} | ${createdAt.toISOString().split("T")[0]}`);
        continue;
      }

      allIssues.push(issue);
      if (allIssues.length >= limit) {
        done = true;
        break;
      }
    }

    if (issues.length < 100) break;
    page++;
  }

 // console.log("📊 Số issue còn lại sau lọc theo ngày:", allIssues.length);

  // ✅ Lọc trùng title, giữ bản có body dài nhất
  const titleToIssue = new Map();
  for (const issue of allIssues) {
    const current = titleToIssue.get(issue.title);
    const currentLength = current?.body?.length || 0;
    const newLength = issue.body?.length || 0;
    if (!current || newLength > currentLength) {
      titleToIssue.set(issue.title, issue);
    }
  }

  const uniqueIssues = Array.from(titleToIssue.values());
  const now = new Date();

  uniqueIssues.forEach(issue => {
    const createdAt = new Date(issue.created_at);

    const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
    if (diffInDays <= 2.3444) {
    //  console.log(`⏳ Bỏ qua (mới tạo 3 ngày): ${issue.title} - ${diffInDays.toFixed(1)} ngày trước`);
      return;
    }

    const body = issue.body || "";
    const lines = body.split("\n");
    const numberOfLines = lines.length;

    const numberMatches = body.match(/\d+(\.\d+)?/g);
    const numbers = numberMatches ? numberMatches.map(Number) : [];

    const countZero = numbers.filter(n => n === 0).length;
    if (countZero > 10) {
   // console.log(`🚫 Bỏ qua (quá nhiều số 0): ${issue.title} - ${countZero} lần`);
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

    if (C < 12 || (numberOfLines < 10 && A < 11)) {
      Key.push(issue.title);
     console.log(`✅ Thêm: ${issue.title} | Ngày tạo: ${createdAt.toISOString().split("T")[0]} | Dòng: ${numberOfLines} | A: ${A} | B: ${B} | C: ${C}`);
    } else {
  //    console.log(`🚫 Loại: ${issue.title} | C = ${C} quá lớn, dòng = ${numberOfLines}, A = ${A}`);
    }
  });

if (Key.length === 0) {
  console.log("⛔ Không có issue nào đạt điều kiện.");
} else {
  Key.reverse();  // Đảo ngược mảng Key tại chỗ
  console.log("📌 Danh sách Key:", Key);
}

}

fetchRecentIssues();




///////////////////////////////////////
////////////////////////////////////// Hẹn giờ săn hầm ngục (có delay kiểm tra Key)

console.log("⏳ Đợi 11.5 giây để kiểm tra điều kiện...");

setTimeout(() => {
    let now1 = new Date();

    let region1 = server.region;
    let serverIden1 = server.id;

    // Điều kiện kiểm tra
    let timeValid =
    (now1.getHours() >= 13 && now1.getHours() < 22) ||
    (now1.getHours() >= 0 && now1.getHours() < 4)  ||
    (now1.getHours() >= 7 && now1.getHours() < 10);
	
    let enoughKeys = soluongitem("cryptkey") >= 1 || Key.length > 0;
    let enoughEnergy = character.esize > 7;
    let correctRegion = region1 == "US";
    let correctServer = serverIden1 == "II";

    console.log("========== Kiểm Tra Hẹn Giờ Săn Hầm Ngục ==========");
    console.log("Thời gian hiện tại: ", now1.toLocaleString());
    console.log("Thời gian hợp lệ: ", timeValid ? "✔️ Đúng giờ" : "❌ Không đúng giờ");
    console.log("Số lượng khóa đủ: ", enoughKeys ? "✔️ Có đủ" : "❌ Không đủ" + Key.length);
    console.log("Esize đủ: ", enoughEnergy ? "✔️ Đủ > 7" : "❌ Không đủ");
    console.log("Khu vực đúng: ", correctRegion ? "✔️ EU" : `❌ Sai (${region1})`);
    console.log("Server đúng: ", correctServer ? "✔️ I" : `❌ Sai (${serverIden1})`);

    if (timeValid && enoughKeys && enoughEnergy && correctRegion && correctServer) {
        console.log("👉 Điều kiện thỏa mãn, bật codemode = 1 (săn hầm ngục)");
        codemode = 1;
    } else {
        console.log("⛔ Điều kiện KHÔNG thỏa mãn, không bật codemode");
    }
}, 11500); // delay 2000ms = 2 giây









function elixirUsage() {
    try {
        let elixir = character.slots.elixir?.name;
        let requiredElixir =  "candypop";

        // Use the required elixir if it's not currently equipped
		if ( get_nearest_monster({ type: "xmagefi" }) )
		{
		    let item2 = locate_item("elixirfires");
            if (elixir != "elixirfires" && item2 ) {
                use(item2);
            }
		}
		else if (character.map == "winter_instance" && !get_nearest_monster({ type: "xmagefi" }))
		{
		    let item1 = locate_item("hotchocolate");
            if (elixir != "hotchocolate" && item1) {
                use(item1);
            }
		}
        else if (elixir !== requiredElixir && elixir != "pumpkinspice") {
            let item = locate_item("pumpkinspice");
            if (item) {
                use(item);
            }
        }

    } catch (e) {
        console.error("Error in elixirUsage function:", e);
    }
}

setInterval(elixirUsage, 2000); // chạy elixirUsage mỗi 2s











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




//////////////////////////////////////////////////
/////////////////////////////////////////////////





var lastcc = 0;
init_ccmeter();
function init_ccmeter() {
	let $ = parent.$;
	let statbars = $('#bottommid');
	statbars.find('#ccmeter').remove();
	let ccmeter = $('<div id="ccmeter"></div>').css({
		fontSize: '15px',
		color: 'white',
		textAlign: 'center',
		display: 'table',
		width: "50%",
		margin: "0 auto"
	});
	let ccmeter_content = $('<div id="ccmetercontent"></div>')
	.html("<div><div id='ccmeterfill'></div></div>")
	.css({
		display: 'table-cell',
		verticalAlign: 'middle',
		background: 'green',
		border: 'solid gray',
		borderWidth: '4px 4px 0px, 4px',
		height: '15px',
		color: '#FFD700',
		textAlign: 'center',
		width: "100%",
	})
	.appendTo(ccmeter);
	statbars.children().first().after(ccmeter);
	update_ccmeter();
}
function update_ccmeter()
{
	let $ = parent.$;
	var fillAmount = ((character.cc/180)*100).toFixed(0);
	$("#ccmeterfill").css({
		background: 'red',
		height: '15px',
		color: '#FFD700',
		textAlign: 'center',
		width: fillAmount + "%",
	});
}
//Clean out an pre-existing listeners
if (parent.prev_handlersccmeter) {
    for (let [event, handler] of parent.prev_handlersccmeter) {
      parent.socket.removeListener(event, handler);
    }
}
parent.prev_handlersccmeter = [];
//handler pattern shamelessly stolen from JourneyOver
function register_ccmeterhandler(event, handler) 
{
    parent.prev_handlersccmeter.push([event, handler]);
    parent.socket.on(event, handler);
};
function ccmeter_playerhandler(event){
	if(event.cc != lastcc)
	{
		update_ccmeter();
		lastcc = event.cc;
	}
}
register_ccmeterhandler("player", ccmeter_playerhandler);


////////////////////////////
/////////////////////////////////

/************************************************
 * PARTY DAMAGE BAR - MEMORY OPTIMIZED
 ************************************************/
(function () {
    const G = (typeof parent !== 'undefined' && parent.entities) ? parent : window;
    if (!G || !G.entities) return;

    const $ = G.$;
    const UI_ID = "monster_damage_container";
    const TOGGLE_ID = "dmg_bar_toggle";
    const BAR_ID = "monster_damage_bar";
    const HP_TEXT_ID = "monster_hp_info";
    const DETAILS_ID = "monster_damage_details";
    const COLORS = ["#ff5555","#55ff55","#5599ff","#ffaa00","#aa66ff","#00ffff","#e67e22","#f1c40f"];


	
	
	
	
	if (!G.party_damage_data) G.party_damage_data = {}; 
    const DAMAGE = G.party_damage_data;
    
    // 1. THIẾT LẬP MẶC ĐỊNH LÀ TẮT
    let UI_ENABLED = false; 

    function initUI() {
        $(`#${UI_ID}, #${TOGGLE_ID}`).remove();

        // Nút bấm khởi tạo ở trạng thái OFF (Viền đỏ, Chữ OFF)
        $("body").append(`
            <div id="${TOGGLE_ID}" style="
                position:fixed; 
                top:180px; 
                right:10px; 
                width:50px; 
                height:50px; 
                background:rgba(0,0,0,0.85); 
                border:3px solid #ff5555; 
                border-radius:50%; 
                color:#fff; 
                display:flex; 
                align-items:center; 
                justify-content:center; 
                cursor:pointer; 
                z-index:10000; 
                pointer-events:all; 
                font-weight:bold; 
                font-size:25px; 
                user-select:none;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
            ">OFF</div>
        `);

        // Bảng UI chính khởi tạo ở trạng thái ẨN (display:none)
        $("body").append(`
            <div id="${UI_ID}" style="
                display:none; 
                position:fixed; 
                top:12px; 
                left:50%; 
                transform:translateX(-50%); 
                width:85%; 
                max-width:900px; 
                background:rgba(0,0,0,0.9); 
                border:2px solid #444; 
                border-radius:10px; 
                padding:12px; 
                z-index:9999; 
                pointer-events:none; 
                font-family:sans-serif;
            ">
                <div id="${HP_TEXT_ID}" style="text-align:center; font-size:14px; font-weight:bold; color:#fff; margin-bottom:10px;"></div>
                <div style="height:12px; background:#111; border-radius:6px; overflow:hidden; display:flex; border:1px solid #333; margin-bottom:12px;">
                    <div id="${BAR_ID}" style="display:flex; width:100%; height:100%;"></div>
                </div>
                <div id="${DETAILS_ID}" style="display:flex; justify-content:center; flex-wrap:wrap; gap:10px; font-size:11px;"></div>
            </div>
        `);

        // Xử lý sự kiện click để chuyển đổi ON/OFF
        $(`#${TOGGLE_ID}`).click(() => {
            UI_ENABLED = !UI_ENABLED;
            $(`#${UI_ID}`).toggle(UI_ENABLED);
            $(`#${TOGGLE_ID}`).css("border-color", UI_ENABLED ? "#55ff55" : "#ff5555");
            $(`#${TOGGLE_ID}`).text(UI_ENABLED ? "DMG" : "OFF");
        });
    }
	
	
	

    function getParty() {
        let p = [character.name];
        if (G.party_list) p = p.concat(G.party_list);
        return [...new Set(p)];
    }

    function onHit(data) {
        try {
            const targetId = data.actor || data.id; 
            const sourceId = data.target || data.hid;
            const targetEntity = G.entities[targetId];
            if (!sourceId || !targetId || !targetEntity || targetEntity.type !== "monster") return;

            let attackerName = (sourceId === character.id) ? character.name : (G.entities[sourceId] ? G.entities[sourceId].name : null);
            if (!attackerName || !getParty().includes(attackerName)) return;

            let dmg = (data.damage || 0) + (data.adr || 0) || data.amount || 0;
            if (dmg <= 0 || data.heal) return;

            if (!DAMAGE[targetId]) DAMAGE[targetId] = { lastUpdate: Date.now(), totals: {}, history: {} };
            let entry = DAMAGE[targetId];
            entry.lastUpdate = Date.now();
            entry.totals[attackerName] = (entry.totals[attackerName] || 0) + dmg;

            // TỐI ƯU: Chỉ tính DPS cho quái > 1 triệu máu
            if (targetEntity.max_hp >= 1000000) {
                if (!entry.history[attackerName]) entry.history[attackerName] = [];
                const now = Date.now();
                entry.history[attackerName].push({ t: now, d: dmg });
                
                // TỐI ƯU: Dọn dẹp mảng history ngay lập tức để tránh phình to RAM
                // Chỉ giữ lại data trong vòng 30 giây gần nhất
                if (entry.history[attackerName].length > 10) { 
                    entry.history[attackerName] = entry.history[attackerName].filter(h => now - h.t <= 30000);
                }
            }
        } catch (e) {}
    }

    function renderUI() {
        if (!UI_ENABLED) return;
        const targetId = character.target;
        const m = G.entities[targetId];
        if (!targetId || !m || m.type !== "monster") { $(`#${UI_ID}`).hide(); return; }
        $(`#${UI_ID}`).show();

        const now = Date.now();
        const data = DAMAGE[targetId] || { totals: {}, history: {} };
        let totalDmgAll = Object.values(data.totals).reduce((a, b) => a + b, 0);

        let targetEnt = G.entities[m.target] || (m.target === character.id ? character : null);
        $(`#${HP_TEXT_ID}`).html(`<span style="color:#f1c40f">${m.mtype.toUpperCase()}</span> | <span style="color:#ff5555">${m.hp.toLocaleString()}</span> / ${m.max_hp.toLocaleString()} | <span style="color:#bbb">Target: <span style="color:${targetEnt ? '#ff4444' : '#aaa'}">${targetEnt ? targetEnt.name : 'None'}</span></span>`);

        $(`#${BAR_ID}`).empty();
        $(`#${DETAILS_ID}`).empty();

        if (totalDmgAll > 0) {
            Object.keys(data.totals).sort((a, b) => data.totals[b] - data.totals[a]).forEach((p, i) => {
                const totalDmg = data.totals[p];
                const pct = (totalDmg / totalDmgAll * 100).toFixed(1);
                const color = COLORS[i % COLORS.length];

                let dpsText = "";
                if (data.history[p]) {
                    const rollingDmg = data.history[p].filter(h => now - h.t <= 30000).reduce((s, h) => s + h.d, 0);
                    dpsText = `<div style="color:#00ff00; font-size:10px;">DPS: ${Math.round(rollingDmg / 30).toLocaleString()}</div>`;
                }

                let pEnt = (p === character.name) ? character : Object.values(G.entities).find(e => e && e.name === p);
                let hpPct = pEnt ? (pEnt.hp / pEnt.max_hp * 100) : 0;
                let mpPct = pEnt ? (pEnt.mp / pEnt.max_mp * 100) : 0;

                $(`#${BAR_ID}`).append(`<div style="width:${pct}%; background:${color}; height:100%;"></div>`);
                $(`#${DETAILS_ID}`).append(`
                    <div style="min-width:140px; background:rgba(255,255,255,0.05); padding:6px; border-radius:4px; border-left: 3px solid ${color};">
                        <div style="font-weight:bold; color:${color}; display:flex; justify-content:space-between;"><span>${p}</span><span>${pct}%</span></div>
                        <div style="color:#eee; font-size:10px; margin: 2px 0;">Total: ${Math.round(totalDmg).toLocaleString()}</div>
                        ${dpsText}
                        <div style="width:100%; height:3px; background:#222; margin-top:4px; margin-bottom:2px;"><div style="width:${hpPct}%; height:100%; background:#ff3333;"></div></div>
                        <div style="width:100%; height:3px; background:#222;"><div style="width:${mpPct}%; height:100%; background:#3366ff;"></div></div>
                    </div>`);
            });
        }
    }

    G.socket.off("hit", onHit);
    G.socket.on("hit", onHit);

    // TỐI ƯU: Cơ chế dọn rác bộ nhớ nghiêm ngặt
    setInterval(() => {
        const now = Date.now();
        for (let id in DAMAGE) {
            // Xóa dữ liệu nếu: Quái không còn tồn tại, hoặc Quái đã chết, hoặc không có tương tác trong 40 giây
            if (!G.entities[id] || G.entities[id].hp < 1 || (now - DAMAGE[id].lastUpdate > 40000)) {
                delete DAMAGE[id]; 
            }
        }
    }, 5000); // Kiểm tra mỗi 5 giây để tiết kiệm CPU

    initUI();
    setInterval(renderUI, 250); // Tăng lên 250ms (4 lần/giây) để mượt mà mà vẫn nhẹ máy
})();


//////////////////////////////////////
////////////////////////////////////



