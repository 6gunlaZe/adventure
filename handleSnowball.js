function handleSnowball() {
  if (can_use("snowball")) {
    const currentTime = new Date().getTime(); // Lấy thời gian hiện tại (ms)
    
    for (const id in parent.entities) {
      const entity = parent.entities[id];
      
      // Kiểm tra loại quái vật
      if (entity.type !== "monster") continue;
      
      // Kiểm tra xem quái vật có chết hoặc không thể thấy không
      if (entity.dead || !entity.visible) continue;
      
      // Kiểm tra mtype của quái vật có phải là "goo" không
      if (entity.mtype !== "goo") continue;
      
      // Kiểm tra quái vật có bị đóng băng không
      if (entity.s["frozen"]) continue;
      
      // Kiểm tra khoảng cách với quái vật có lớn hơn 200 không
      if (distance(character, entity) > 200) continue;
      
      // Kiểm tra xem quái vật đã bị bắn tuyết
      if (entity.snowballed) {
        // Kiểm tra thời gian debuff đã hết 5 giây chưa
        if (currentTime - entity.snowballedTime > 3700) {
          // Debuff đã hết, cho phép bắn lại
          entity.snowballed = false; // Xóa cờ snowballed
        } else {
          // Nếu debuff chưa hết, bỏ qua
          continue;
        }
      }
      
      // Sử dụng kỹ năng snowball vào quái vật
      use_skill("snowball", entity);
      
      // Đánh dấu quái vật là đã bị bắn tuyết và lưu thời gian bắn tuyết
      entity.snowballed = true;
      entity.snowballedTime = currentTime; // Lưu thời gian bắn tuyết (ms)
      
      // Dừng vòng lặp sau khi sử dụng kỹ năng vào một quái vật
      break;
    }
  }
}

// Gọi hàm `handleSnowball` mỗi 100ms
setInterval(handleSnowball, 100);
