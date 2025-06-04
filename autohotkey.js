
SetTitleMatchMode(2)
SetWinDelay(0)

Loop {
    ; Kiểm tra cửa sổ Microsoft Edge có đang mở không
    if (WinExist("ahk_exe msedge.exe")) {
        ; Kiểm tra trạng thái của cửa sổ Edge (Minimized hay không)
        edgeStatus := WinGetMinMax("ahk_exe msedge.exe") ; Lấy trạng thái MinMax
        if (edgeStatus = -1) {  ; Nếu Edge bị thu nhỏ
            ; Khôi phục Edge
            WinRestore("ahk_exe msedge.exe")
            Sleep(200)  ; Đợi một chút để Edge khôi phục
        }
    }

    Sleep(10000)  ; Kiểm tra lại sau 10s
}
