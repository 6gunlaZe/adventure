setInterval(() => {
  const modal = document.getElementById('Modal-NotificationWithButton');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show', 'fade');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  document.body.classList.remove('modal-open');
  document.body.style.overflow = 'auto';
}, 500); // Kiểm tra mỗi 0.5 giây



const modal = document.getElementById('Modal-NotificationWithButton');
if (modal) {
  modal.style.display = 'none';
  modal.classList.remove('show', 'fade');
  modal.setAttribute('aria-hidden', 'true');
}

// 2. Xóa toàn bộ backdrop nếu có
document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

// 3. Khôi phục cuộn cho body nếu bị khóa
document.body.classList.remove('modal-open');
document.body.style.overflow = 'auto';
// Ẩn yêu cầu đăng nhập
setInterval(() => {
  const overlay = document.querySelector('.l-req-login');
  if (overlay) overlay.remove();
}, 500); // kiểm tra mỗi 0.5 giây
