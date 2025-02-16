const botToken = '7892397096:AAH7nDreQHQ9fPcsMJNi8MIRwZEDPQzFPgc'; // Thay YOUR_BOT_TOKEN bằng token của bạn

// Các mẫu cú pháp (dễ dàng thay đổi tại đây)
const syntaxExamples = [
  { key: 'reset', value: '1' },
  { key: 'fram', value: '1' },
  { key: 'bank', value: '1' },
  { key: 'crypt', value: '1' }
];

let lastUpdateId = 0;  // Biến để lưu trữ ID của bản cập nhật cuối cùng

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
          console.log('Processing message:', message);  // Debug log: Xử lý tin nhắn
          analyzeMessage(message.text, message.chat.id);
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

  sendMessage(chatId, `Bạn đã chọn cú pháp: ${text}`);
}

// Hàm thực hiện nhiệm vụ (ví dụ: ghi lại dữ liệu hoặc thực hiện hành động khác)
function performTask(key, data, chatId) {
  console.log(`Nhiệm vụ thực hiện: key = ${key}, data = ${data}`);

  if (key === 'reset') {
    console.log('Thực hiện reset!');
    sendMessage(chatId, 'Nhiệm vụ reset đã hoàn thành!');
  } else if (key === 'fram') {
    console.log('Thực hiện fram!');
    sendMessage(chatId, 'Nhiệm vụ fram đã hoàn thành!');
  } else {
    console.log('Không có nhiệm vụ xác định cho key:', key);  // Debug log: Kiểm tra trường hợp không có nhiệm vụ
    sendMessage(chatId, `Không có nhiệm vụ xác định cho key: ${key}`);
  }
}

// Gọi hàm getUpdates lần đầu tiên
getUpdates();
