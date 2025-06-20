

const modal = document.getElementById('Modal-NotificationWithButton');
if (modal) {
  modal.style.display = 'none';
  modal.classList.remove('show'); // Nếu dùng Bootstrap, remove class show để tắt animation
}

const backdrop = document.querySelector('.modal-backdrop');
if (backdrop) {
  backdrop.style.display = 'none';
}




let avoidingDanger = false;
const dangerTypes = ["gpurplepro", "gbluepro", "gredpro", "ggreenpro"];
let checkwwall = 1;
const maxAttempts = 5;

function check_danger_nearby() {
    return Object.values(parent.entities).some(ent =>
        ent && ent.type === "monster" && !ent.dead && ent.visible &&
        dangerTypes.includes(ent.mtype) &&
        distance(character, ent) < (avoidingDanger ? 100 : 70)
    );
}

function kite(taget, kite_range = 20) {
    if (smart.moving || !taget) return;

    // Cập nhật trạng thái né tránh
    if (check_danger_nearby()) avoidingDanger = true;
    else avoidingDanger = false;

	
    // Chọn mục tiêu kite
let haize = get_player("6gunlaZe");
let currentTarget = (avoidingDanger && haize) ? haize : taget;

if (avoidingDanger) kite_range = 10;

const radius = kite_range;
let attempts = 0;

const originalPosition = {
    x: currentTarget.real_x,
    y: currentTarget.real_y
};



	
    while (attempts < maxAttempts) {
        const angleOffset = Math.PI / 3.5 * checkwwall + (Math.random() - 0.5) * Math.PI / 10;
        const angleFromTarget = Math.atan2(character.y - currentTarget.real_y, character.x - currentTarget.real_x);
        const endGoalAngle = angleFromTarget + angleOffset;

        const endGoal = {
            x: currentTarget.real_x + radius * Math.cos(endGoalAngle),
            y: currentTarget.real_y + radius * Math.sin(endGoalAngle)
        };

        if (can_move_to(endGoal.x, endGoal.y)) {
            xmove(endGoal.x, endGoal.y);
            return;
        }

        checkwwall = -checkwwall; // đảo chiều
        attempts++;
    }

    // Không tìm được vị trí tốt, quay về gần target
    xmove(originalPosition.x, originalPosition.y);
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

