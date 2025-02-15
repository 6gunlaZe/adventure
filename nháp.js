const botToken = 'YOUR_BOT_TOKEN'; // Thay YOUR_BOT_TOKEN bằng token của bạn

// Khai báo các biến để lưu trữ key và data
let key = '';
let data = '';

// Các mẫu cú pháp
const syntaxExamples = [
  '(name, John)',  // Mẫu 1
  '(age, 25)',     // Mẫu 2
  '(city, Hanoi)'  // Mẫu 3
];

// Hàm lấy các bản cập nhật từ Telegram
function getUpdates() {
  const url = `https://api.telegram.org/bot${botToken}/getUpdates`;

  // Gọi API getUpdates để nhận các bản cập nhật tin nhắn
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);  // Xem toàn bộ dữ liệu trả về
      if (data.ok && data.result.length > 0) {
        // Duyệt qua các bản cập nhật và xử lý mỗi tin nhắn
        data.result.forEach(update => {
          const message = update.message;
          const text = message.text;
          const chatId = message.chat.id;

          // Phân tích và phản hồi tin nhắn
          analyzeMessage(text, chatId);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Hàm phân tích tin nhắn theo dạng (key, data)
function analyzeMessage(text, chatId) {
  if (text) {
    // Kiểm tra xem tin nhắn có phải là theo định dạng (key, data) không
    const regex = /^\(([^,]+),\s*(.+)\)$/; // Regular expression để kiểm tra định dạng (key, data)
    const match = text.match(regex);

    if (match) {
      key = match[1].trim();   // Lấy key từ tin nhắn
      data = match[2].trim();  // Lấy data từ tin nhắn

      // Kiểm tra xem data có phải là số hay không
      if (!isNaN(data)) {
        data = parseFloat(data);  // Nếu là số, chuyển thành kiểu số
      }

      // Phản hồi lại người dùng sau khi lưu key và data
      sendMessage(chatId, `Data received: ${key} = ${data}`);
    } else {
      // Nếu không đúng định dạng, thông báo cho người dùng và gửi các mẫu cú pháp đúng
      sendSyntaxExamples(chatId);
    }
  }
}

// Hàm trả về các cú pháp mẫu
function getSyntaxExamples() {
  return syntaxExamples.join('\n'); // Dùng \n để nối các mẫu cú pháp thành 1 chuỗi
}

// Hàm gửi các ví dụ cú pháp đúng cho người dùng
function sendSyntaxExamples(chatId) {
  const text = `Bạn đã nhập sai cú pháp. Hãy thử một trong các cú pháp sau:\n\n` + getSyntaxExamples();

  // Gửi tin nhắn với các nút chọn
  const reply_markup = {
    inline_keyboard: [
      [
        { text: 'Gửi (name, John)', callback_data: '(name, John)' },
        { text: 'Gửi (age, 25)', callback_data: '(age, 25)' },
      ],
      [
        { text: 'Gửi (city, Hanoi)', callback_data: '(city, Hanoi)' }
      ]
    ]
  };

  // Gửi tin nhắn cho người dùng với các nút bấm
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      reply_markup: reply_markup
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Example messages sent:', data);
  })
  .catch(error => {
    console.error('Error sending example messages:', error);
  });
}

// Hàm gửi tin nhắn phản hồi (reply)
function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Message sent:', data);
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
}

// Hàm xử lý khi người dùng nhấn vào nút trong inline keyboard
function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const text = callbackQuery.data; // Đây là dữ liệu được gửi từ nút bấm

  // Gửi lại tin nhắn người dùng đã chọn
  sendMessage(chatId, `Bạn đã chọn cú pháp: ${text}`);
}

// Gọi hàm getUpdates để nhận và phân tích tin nhắn
setInterval(getUpdates, 5000);  // Kiểm tra tin nhắn mới mỗi 5 giây

// Lắng nghe callback query từ người dùng khi họ nhấn nút
function listenForCallbackQueries() {
  const url = `https://api.telegram.org/bot${botToken}/getUpdates`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.ok && data.result.length > 0) {
        data.result.forEach(update => {
          if (update.callback_query) {
            handleCallbackQuery(update.callback_query);
          }
        });
      }
    })
    .catch(error => {
      console.error('Error listening for callback queries:', error);
    });
}

// Kiểm tra callback query mới mỗi 5 giây
setInterval(listenForCallbackQueries, 5000);
