#include <Windows.h>
#include <iostream>

int main() {
    const char* windowTitle = "countdownmaster";

    HWND hwnd = FindWindowA(NULL, windowTitle);
    // HWND hwnd = FindWindowA("Chrome_WidgetWin_1", NULL);
    if (hwnd != NULL) {
        // Ensure that the window handle is valid before using SetWindowPos
        

        bool t = SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 500, 500, (SWP_NOSIZE | SWP_NOMOVE | SWP_NOACTIVATE));
        bool tt = SetWindowPos(hwnd, HWND_BOTTOM, 0, 0, 500, 500, (SWP_NOSIZE | SWP_NOMOVE | SWP_NOACTIVATE));

        if (t) {
            std::cout << "SetWindowPos succeeded." << std::endl;
        } else {
            std::cerr << "SetWindowPos failed." << std::endl;
        }
    } else {
        std::cerr << "Window not found." << std::endl;
    }

    return 0;
}
