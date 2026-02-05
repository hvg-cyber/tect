/*
BaseWindow              src\vs\workbench\browser\window.ts
    BrowserWindow       src\vs\workbench\browser\window.ts
    NativeWindow        src\vs\workbench\electron-browser\window.ts
    AuxiliaryWindow     src\vs\platform\auxiliaryWindow\electron-main\auxiliaryWindow.ts
    AuxiliaryWindow     src\vs\workbench\services\auxiliaryWindow\browser\auxiliaryWindowService.ts
    CodeWindow          src\vs\platform\windows\electron-main\windowImpl.ts

TODO: Why do we need AuxiliaryWindow?
TODO: Why do we need CodeWindow?

*/

// src\vs\workbench\electron-browser\window.ts
class NativeWindow {
}

// src\vs\workbench\electron-browser\desktop.main.ts
class DesktopMain {
    open() {
        new NativeWindow()
    }
}
function main() {
	const workbench = new DesktopMain()
	return workbench.open()
}

/*
    TODO: Who calls main() ?
*/
main()
