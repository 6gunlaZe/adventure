const botToken = '7892397096:AAH7nDreQHQ9fPcsMJNi8MIRwZEDPQzFPgc'; // Thay YOUR_BOT_TOKEN bằng token của bạn

// Các mẫu cú pháp (dễ dàng thay đổi tại đây)
const syntaxExamples = [
  { key: 'reset', value: '1' },
  { key: 'fram', value: '1' },
  { key: 'bank', value: '1' },
  { key: 'crypt', value: '1' }
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
      const key = match[1].trim();   // Lấy key từ tin nhắn
      let data = match[2].trim();    // Lấy data từ tin nhắn

      // Kiểm tra xem data có phải là số hay không
      if (!isNaN(data)) {
        data = parseFloat(data);  // Nếu là số, chuyển thành kiểu số
      }

      // Thực hiện một nhiệm vụ khi người dùng nhập đúng định dạng
      performTask(key, data, chatId);  // Gọi hàm để thực hiện nhiệm vụ

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
  return syntaxExamples.map(example => `(${example.key}, ${example.value})`).join('\n'); // Dùng \n để nối các mẫu cú pháp thành 1 chuỗi
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

// Hàm thực hiện nhiệm vụ (ví dụ: ghi lại dữ liệu hoặc thực hiện hành động khác)
function performTask(key, data, chatId) {
  // Giả sử nhiệm vụ là ghi lại key và data vào một hệ thống nào đó
  // (Ví dụ: lưu vào cơ sở dữ liệu, gọi API khác, hoặc thực hiện tính toán)
  console.log(`Nhiệm vụ thực hiện: key = ${key}, data = ${data}`);

  // Cập nhật thêm logic ở đây tùy theo nhiệm vụ bạn muốn thực hiện
  // Ví dụ: Nếu key là 'reset', thực hiện thao tác reset:
  if (key === 'reset') {
    // Giả sử bạn muốn reset một giá trị nào đó hoặc thực hiện hành động đặc biệt
    console.log('Thực hiện reset!');
    sendMessage(chatId, 'Nhiệm vụ reset đã hoàn thành!');
  } 
  // Thực hiện các nhiệm vụ khác tùy theo key
  else if (key === 'fram') {
    console.log('Thực hiện fram!');
    sendMessage(chatId, 'Nhiệm vụ fram đã hoàn thành!');
  } 
  // Có thể thêm các điều kiện khác cho các key khác như 'bank', 'crypt'
  else {
    sendMessage(chatId, `Không có nhiệm vụ xác định cho key: ${key}`);
  }
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
