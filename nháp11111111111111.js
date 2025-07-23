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

