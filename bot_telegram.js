
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
}, 8000);



let curenkey
let Key = [];




setInterval(function() {
if (codemode != 1 )return
 let member1 = get_player("haiz1");
 let member2 = get_player("Ynhi");
	
if ( character.map == "cave" && distance(character, {x: -194, y: -1281}) < 50 && member1 && member2 ){

if (Key.length > 0) {
     curenkey = Key.shift();  // Xóa phần tử đầu tiên và lưu lại phần tử đó
	enter("crypt",curenkey);

} else {
	if ( soluongitem("cryptkey") >= 1 )enter("crypt");
	else parent.api_call("disconnect_character", {name: "haiz"});
}

}	
	
	
}, 5000);




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
  else if (character.max_mp>character.mp) return use_skill("regen_mp");
	
	  
    // Bạn có thể gọi lại getUpdates() nếu cần để cập nhật liên tục trong 20 giây
    setTimeout(getUpdates, 300); // Gọi lại getUpdates() mỗi giây nếu chưa dừng
  } else {
    console.log('Bot has stopped updating');
  }
}

hpp(); // Bắt đầu thực hiện () ngay khi mở trang


//////////////////////////////////////////////////////











