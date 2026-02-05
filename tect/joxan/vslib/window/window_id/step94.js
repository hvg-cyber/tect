/*
    When I open a new window,
    it is not added to the windows map in dom.ts

    The following pieces are not used anywhere:
    vscodeWindowId
    windows map
    registerWindow
    corresponding events

    Why are they present in the codebase?

    The only way I can test it is by using
    BrowserAuxiliaryWindowService and 'remote web'

*/

// src\vs\base\browser\dom.ts
const windows = new Map()
function registerWindow() { // 65

}

// src\vs\workbench\services\auxiliaryWindow\browser\auxiliaryWindowService.ts
class BrowserAuxiliaryWindowService {
    open() {
        let targetWindow
        registerWindow(targetWindow)
    }
}

const auxiliaryWindowService = new BrowserAuxiliaryWindowService()
auxiliaryWindowService.open()
