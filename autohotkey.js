

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






