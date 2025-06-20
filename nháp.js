

const modal = document.getElementById('Modal-NotificationWithButton');
if (modal) {
  modal.style.display = 'none';
  modal.classList.remove('show'); // Nếu dùng Bootstrap, remove class show để tắt animation
}

const backdrop = document.querySelector('.modal-backdrop');
if (backdrop) {
  backdrop.style.display = 'none';
}











const url = "https://api.github.com/repos/6gunlaZe/game/issues";

// Mảng để lưu các tiêu đề issue có số dòng body dưới 8

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Không thể lấy dữ liệu từ GitHub');
    }
    return response.json();
  })
  .then(issues => {
    const currentTime = new Date(); // Lấy thời gian hiện tại
    const twentyFourHoursAgo = new Date(currentTime - 28 * 60 * 60 * 1000); // Thời gian 24 giờ trước

    issues.forEach(issue => {
      // Chuyển đổi thời gian tạo issue thành đối tượng Date
      const createdAt = new Date(issue.created_at);

      // Kiểm tra nếu issue được tạo trong vòng 24 giờ qua
      if (createdAt >= twentyFourHoursAgo) {
        // Đếm số dòng trong body (tách theo '\n')
        const lines = issue.body ? issue.body.split('\n') : [];
        const numberOfLines = lines.length;

        // Nếu số dòng trong body dưới 8, thêm tiêu đề vào mảng Key
        if (numberOfLines < 10) {
          Key.push(issue.title);
          console.log(`Đã thêm key: ${issue.title}`);
        }
      }
    });

    // Sau khi xử lý xong, bạn có thể kiểm tra hoặc làm gì với mảng Key
    console.log('Mảng Key chứa các tiêu đề issue:', Key);
  })
  .catch(error => {
    console.error('Lỗi:', error);
  });

