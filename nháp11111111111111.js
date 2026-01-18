#Requires AutoHotkey v2
SetTimer CheckImage, 3000 ; 

CheckImage() {
    CoordMode "Pixel", "Screen"

    ; Lấy tọa độ và kích thước của màn hình ảo (toàn bộ các màn hình nếu có)
    minX := DllCall("User32.dll\GetSystemMetrics", "int", 76)
    minY := DllCall("User32.dll\GetSystemMetrics", "int", 77)
    width := DllCall("User32.dll\GetSystemMetrics", "int", 78)
    height := DllCall("User32.dll\GetSystemMetrics", "int", 79)

    maxX := minX + width - 1
    maxY := minY + height - 1

    ; Danh sách các file ảnh mẫu theo kích thước khác nhau
    ; Đảm bảo bạn có các file này trong thư mục C:\ahk\
    imageFiles := [
        "C:\ahk\1.png", ; Ảnh mẫu 1 (ví dụ: kích thước lớn nhất)
        "C:\ahk\2.png", ; Ảnh mẫu 2 (ví dụ: kích thước trung bình)
        "C:\ahk\3.png", ; Ảnh mẫu 3 (ví dụ: kích thước nhỏ)
        "C:\ahk\4.png"  ; Ảnh mẫu 4 (ví dụ: kích thước rất nhỏ)
        ; Thêm các file ảnh khác vào đây nếu cần, ví dụ: "C:\ahk\5.png", "C:\ahk\6.png"
    ]

    Local fx := 0, fy := 0
    Local foundImage := false      ; Biến cờ để đánh dấu đã tìm thấy ảnh hay chưa
    Local foundImageName := ""     ; Tên của file ảnh đã tìm thấy

    ; Hàm ẩn danh để tắt ToolTip, gán vào một biến
    ; Điều này đảm bảo SetTimer nhận được một Function Object hợp lệ
    Local clearToolTipFunc := () => ToolTip()

    ; Duyệt qua từng file ảnh mẫu để tìm kiếm
    for index, currentImageFile in imageFiles {
        ; Kiểm tra xem file ảnh có tồn tại không
        if !FileExist(currentImageFile) {
            ; Tùy chọn: Bạn có thể bỏ qua file này hoặc hiển thị một cảnh báo nếu muốn
            ; ToolTip("❌ Cảnh báo: File ảnh không tồn tại: " currentImageFile, "Lỗi File")
            Continue ; Bỏ qua file hiện tại và chuyển sang file tiếp theo trong danh sách
        }

        ; Thực hiện ImageSearch trên toàn màn hình với từng ảnh mẫu
        ; Giữ nguyên "*10" hoặc tăng nhẹ nếu cần (ví dụ "*15") để cho phép sai lệch nhỏ về màu sắc.
        result := ImageSearch(&fx, &fy, minX, minY, maxX, maxY, "*10 " currentImageFile)

        if (result) {
            foundImage := true
            foundImageName := currentImageFile
            ToolTip("✅ Tìm thấy ảnh (" foundImageName ") tại tọa độ: " fx ", " fy)
            ; Dừng ToolTip sau 2 giây (2000 ms) - Cú pháp SetTimer đã sửa ĐÚNG
            SetTimer clearToolTipFunc, -2000
            break ; Thoát vòng lặp ngay khi tìm thấy ảnh đầu tiên
        }
    }

    ; Nếu không tìm thấy ảnh nào sau khi thử tất cả các mẫu
    if (!foundImage) {
        ToolTip("❌ Không tìm thấy ảnh nào trên màn hình với các mẫu đã cho.")
        ; Dừng ToolTip sau 1.5 giây (1500 ms) - Cú pháp SetTimer đã sửa ĐÚNG
        SetTimer clearToolTipFunc, -1500
    }
}

return ; Lệnh 'return' ở đây là cần thiết để script không thực thi tiếp các lệnh không nằm trong hàm khi khởi động.
























    //////////////////////////////////












    #Requires AutoHotkey v2
SetTimer CheckImage, 3000 ; 

; Biến đếm số lần tìm kiếm không thành công (đặt toàn cục)
noImageFoundCount := 0

CheckImage() {
    global noImageFoundCount  ; Đảm bảo biến toàn cục được tham chiếu đúng

    CoordMode "Pixel", "Screen"

    ; Lấy tọa độ và kích thước của màn hình ảo (toàn bộ các màn hình nếu có)
    minX := DllCall("User32.dll\GetSystemMetrics", "int", 76)
    minY := DllCall("User32.dll\GetSystemMetrics", "int", 77)
    width := DllCall("User32.dll\GetSystemMetrics", "int", 78)
    height := DllCall("User32.dll\GetSystemMetrics", "int", 79)

    maxX := minX + width - 1
    maxY := minY + height - 1

    ; Danh sách các file ảnh mẫu theo kích thước khác nhau
    ; Đảm bảo bạn có các file này trong thư mục C:\ahk\
    imageFiles := [
        "C:\ahk\1.png", ; Ảnh mẫu 1 (ví dụ: kích thước lớn nhất)
        "C:\ahk\2.png", ; Ảnh mẫu 2 (ví dụ: kích thước trung bình)
        "C:\ahk\3.png", ; Ảnh mẫu 3 (ví dụ: kích thước nhỏ)
        "C:\ahk\4.png"  ; Ảnh mẫu 4 (ví dụ: kích thước rất nhỏ)
        ; Thêm các file ảnh khác vào đây nếu cần, ví dụ: "C:\ahk\5.png", "C:\ahk\6.png"
    ]

    Local fx := 0, fy := 0
    Local foundImage := false      ; Biến cờ để đánh dấu đã tìm thấy ảnh hay chưa
    Local foundImageName := ""     ; Tên của file ảnh đã tìm thấy

    ; Hàm ẩn danh để tắt ToolTip, gán vào một biến
    ; Điều này đảm bảo SetTimer nhận được một Function Object hợp lệ
    Local clearToolTipFunc := () => ToolTip()

    ; Duyệt qua từng file ảnh mẫu để tìm kiếm
    for index, currentImageFile in imageFiles {
        ; Kiểm tra xem file ảnh có tồn tại không
        if !FileExist(currentImageFile) {
            ; Tùy chọn: Bạn có thể bỏ qua file này hoặc hiển thị một cảnh báo nếu muốn
            ; ToolTip("❌ Cảnh báo: File ảnh không tồn tại: " currentImageFile, "Lỗi File")
            Continue ; Bỏ qua file hiện tại và chuyển sang file tiếp theo trong danh sách
        }

        ; Thực hiện ImageSearch trên toàn màn hình với từng ảnh mẫu
        ; Giữ nguyên "*10" hoặc tăng nhẹ nếu cần (ví dụ "*15") để cho phép sai lệch nhỏ về màu sắc.
        result := ImageSearch(&fx, &fy, minX, minY, maxX, maxY, "*10 " currentImageFile)

        if (result) {
            foundImage := true
            foundImageName := currentImageFile
            ToolTip("✅ Tìm thấy ảnh (" foundImageName ") tại tọa độ: " fx ", " fy)
            ; Dừng ToolTip sau 2 giây (2000 ms) - Cú pháp SetTimer đã sửa ĐÚNG
            SetTimer clearToolTipFunc, -2000
            break ; Thoát vòng lặp ngay khi tìm thấy ảnh đầu tiên
        }
    }

    ; Nếu không tìm thấy ảnh nào sau khi thử tất cả các mẫu
    if (!foundImage) {
        ToolTip("❌ Không tìm thấy ảnh nào trên màn hình với các mẫu đã cho.")
        ; Dừng ToolTip sau 1.5 giây (1500 ms) - Cú pháp SetTimer đã sửa ĐÚNG
        SetTimer clearToolTipFunc, -1500

        ; Tăng biến đếm số lần tìm kiếm không thành công
        noImageFoundCount++

        ; Nếu đã tìm 10 lần mà không thấy ảnh, tắt Microsoft Edge
        if (noImageFoundCount >= 10) {
            ToolTip("❌ Không tìm thấy ảnh sau 10 lần tìm, tắt Microsoft Edge.")
            ; Dừng ToolTip sau 2 giây
            SetTimer clearToolTipFunc, -2000

            ; Dùng ProcessClose để tắt Microsoft Edge
            ProcessClose "msedge.exe"


            ; Đặt lại biến đếm về 0
            noImageFoundCount := 0
        }
    } else {
        ; Nếu tìm thấy ảnh, đặt lại biến đếm
        noImageFoundCount := 0
    }
}

return ; Lệnh 'return' ở đây là cần thiết để script không thực thi tiếp các lệnh không nằm trong hàm khi khởi động.






/////////////////////////////////////////

SetTitleMatchMode(2)
SetWinDelay(0)

lastLaunchCheck := A_TickCount
lastRestoreCheck := A_TickCount

Loop {
    currentTime := A_TickCount

    ; Mỗi 60s: mở Edge nếu chưa chạy
    if (currentTime - lastLaunchCheck >= 60000) {
        if !WinExist("ahk_exe msedge.exe") {
            Run("msedge.exe")
            Sleep(1000)
        }
        lastLaunchCheck := currentTime
    }

    ; Mỗi 10s: khôi phục nếu Edge bị thu nhỏ, không activate
    if (currentTime - lastRestoreCheck >= 10000) {
        if WinExist("ahk_exe msedge.exe") {
            edgeStatus := WinGetMinMax("ahk_exe msedge.exe")
            if (edgeStatus = -1) {
                WinRestore("ahk_exe msedge.exe")
                Sleep(200)
                stopFlashing("ahk_exe msedge.exe")  ; Tắt nhấp nháy taskbar
                ; Không activate hay bring-to-front, tránh làm phiền
            }
        }
        lastRestoreCheck := currentTime
    }

    Sleep(5000)
}

; Tắt nhấp nháy thanh taskbar
stopFlashing(winTitle) {
    hwnd := WinExist(winTitle)
    if hwnd {
        flash := Buffer(20, 0)
        NumPut("UInt", 20, flash, 0)     ; cbSize
        NumPut("Ptr", hwnd, flash, 4)    ; hwnd
        NumPut("UInt", 0, flash, 12)     ; dwFlags = 0 (stop flashing)
        NumPut("UInt", 0, flash, 16)     ; uCount + dwTimeout
        DllCall("FlashWindowEx", "Ptr", flash)
    }
}



    





UI check dame boss

/************************************************
 * PARTY DAMAGE BAR - FINAL VERIFIED WORKING
 ************************************************/
(function () {
    const G = (typeof parent !== 'undefined' && parent.entities) ? parent : window;
    if (!G || !G.entities) return;

    const $ = G.$;
    const UI_ID = "monster_damage_container";
    const BAR_ID = "monster_damage_bar";
    const HP_TEXT_ID = "monster_hp_info";
    const DETAILS_ID = "monster_damage_details";
    const COLORS = ["#ff5555","#55ff55","#5599ff","#ffaa00","#aa66ff","#00ffff","#e67e22","#f1c40f"];

    if (!G.party_damage_data) G.party_damage_data = {}; 
    const DAMAGE = G.party_damage_data;

    function getParty() {
        let p = [character.name];
        if (G.party_list) p = p.concat(G.party_list);
        return [...new Set(p)];
    }

    function initUI() {
        $(`#${UI_ID}`).remove();
        $("body").append(`
            <div id="${UI_ID}" style="position:fixed; top:12px; left:50%; transform:translateX(-50%); width:85%; max-width:850px; background:rgba(0,0,0,0.9); border:2px solid #555; border-radius:8px; padding:10px; z-index:9999; pointer-events:none; font-family:sans-serif;">
                <div id="${HP_TEXT_ID}" style="text-align:center; font-size:15px; font-weight:bold; color:#fff; margin-bottom:8px;"></div>
                <div style="height:14px; background:#1a1a1a; border-radius:7px; overflow:hidden; display:flex; border:1px solid #333;">
                    <div id="${BAR_ID}" style="display:flex; width:100%; height:100%;"></div>
                </div>
                <div id="${DETAILS_ID}" style="display:flex; justify-content:center; flex-wrap:wrap; gap:12px; margin-top:8px; font-size:12px; font-weight:bold;"></div>
            </div>
        `);
    }

    function onHit(data) {
        try {
            // Logic đảo ngược đã xác nhận chạy đúng cho game
            const targetId = data.actor || data.id; 
            const sourceId = data.target || data.hid;

            if (!sourceId || !targetId) return;

            let attackerName = null;
            if (sourceId === character.id) attackerName = character.name;
            else if (G.entities[sourceId]) attackerName = G.entities[sourceId].name;

            const targetEntity = G.entities[targetId];

            if (attackerName && getParty().includes(attackerName)) {
                if (targetEntity && targetEntity.type === "monster") {
                    
                    let dmg = (data.damage || 0) + (data.adr || 0);
                    if (!data.damage && data.amount) dmg = data.amount;
                    
                    if (dmg > 0 && !data.heal) {
                        if (!DAMAGE[targetId]) DAMAGE[targetId] = { lastUpdate: Date.now() };
                        DAMAGE[targetId][attackerName] = (DAMAGE[targetId][attackerName] || 0) + dmg;
                        DAMAGE[targetId].lastUpdate = Date.now();
                    }
                }
            }
        } catch (e) {}
    }

    function renderUI() {
        const targetId = character.target;
        const m = G.entities[targetId];
        if (!targetId || !m || m.type !== "monster") { $(`#${UI_ID}`).hide(); return; }
        $(`#${UI_ID}`).show();

        const data = DAMAGE[targetId] || {};
        let total = 0;
        const players = Object.keys(data).filter(p => p !== 'lastUpdate');
        players.forEach(p => total += data[p]);

        $(`#${HP_TEXT_ID}`).html(`<span style="color:#f1c40f">${m.mtype.toUpperCase()}</span> | <span style="color:#ff5555">${m.hp.toLocaleString()}</span> / ${m.max_hp.toLocaleString()}`);
        $(`#${BAR_ID}`).empty();
        $(`#${DETAILS_ID}`).empty();

        if (total > 0) {
            players.sort((a, b) => data[b] - data[a]).forEach((p, i) => {
                const dmg = data[p];
                const pct = (dmg / total * 100).toFixed(1);
                const color = COLORS[i % COLORS.length];
                $(`#${BAR_ID}`).append(`<div style="width:${pct}%; background:${color}; height:100%;"></div>`);
                $(`#${DETAILS_ID}`).append(`<div style="color:${color}; background:rgba(255,255,255,0.1); padding:2px 8px; border-radius:4px;">${p}: <span style="color:#fff">${Math.round(dmg).toLocaleString()}</span> (${pct}%)</div>`);
            });
        }
    }

    G.socket.off("hit", onHit);
    G.socket.on("hit", onHit);

    setInterval(() => {
        const now = Date.now();
        for (let id in DAMAGE) {
            if (!G.entities[id] || G.entities[id].hp < 10 || (now - DAMAGE[id].lastUpdate > 20000)) delete DAMAGE[id];
        }
    }, 1000);

    initUI();
    setInterval(renderUI, 150);
})();








