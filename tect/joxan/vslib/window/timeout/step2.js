/*
    Add a simple wrapper
*/
console.log('step 2')

// src\vs\workbench\browser\window.ts
class BaseWindow {
    enableMultiWindowAwareTimeout(targetWindow) {
        const originalSetTimeout = targetWindow.setTimeout
        const originalClearTimeout = targetWindow.clearTimeout
        targetWindow.setTimeout = function(handler, timeout, ...args) {
            // return originalSetTimeout.apply(this, [handler, timeout, ...args])
            return originalSetTimeout(handler, timeout, ...args)
        }
        targetWindow.clearTimeout = function(timeoutHandle) {
            // originalClearTimeout.apply(this, [timeoutHandle])
            originalClearTimeout(timeoutHandle)
        }
    }
}

const baseWindow = new BaseWindow()
const targetWindow = window
baseWindow.enableMultiWindowAwareTimeout(targetWindow)

const timeoutId1 = setTimeout(() => {
    console.log('timeout 1')
    clearTimeout(timeoutId2)
}, 2000)

const timeoutId2 = setTimeout(() => {
    console.log('timeout 2')
}, 3000)
