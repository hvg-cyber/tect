/*
    Add TIMEOUT_HANDLES, TIMEOUT_DISPOSABLES, dispose() and toDisposable()
*/
console.log('step 4')

// src\vs\base\common\lifecycle.ts
function dispose(arg) { // 326
    for (const d of arg) {
        d.dispose()
    }
}
function toDisposable(fn) { // 404
    return {dispose: fn}
}

// src\vs\workbench\browser\window.ts
class BaseWindow {
    static TIMEOUT_HANDLES = Number.MIN_SAFE_INTEGER
    static TIMEOUT_DISPOSABLES = new Map()
    enableMultiWindowAwareTimeout(targetWindow) {
        const originalSetTimeout = targetWindow.setTimeout
		Object.defineProperty(targetWindow, 'vscodeOriginalSetTimeout', { 
            get: () => originalSetTimeout
        })
        
        const originalClearTimeout = targetWindow.clearTimeout
		Object.defineProperty(targetWindow, 'vscodeOriginalClearTimeout', { 
            get: () => originalClearTimeout 
        });
        
        targetWindow.setTimeout = function(handler, timeout, ...args) {
			const timeoutDisposables = new Set()
			const timeoutHandle = BaseWindow.TIMEOUT_HANDLES++
			BaseWindow.TIMEOUT_DISPOSABLES.set(timeoutHandle, timeoutDisposables)
            const handle = window.vscodeOriginalSetTimeout.apply(this, [handler, timeout, ...args])
            const timeoutDisposable = toDisposable(() => {
                window.vscodeOriginalClearTimeout.apply(this, [handle])
            })
            timeoutDisposables.add(timeoutDisposable)
            console.log(BaseWindow.TIMEOUT_DISPOSABLES)
			return timeoutHandle
        }

        targetWindow.clearTimeout = function(timeoutHandle) {
			const timeoutDisposables = typeof timeoutHandle === 'number' ? 
                BaseWindow.TIMEOUT_DISPOSABLES.get(timeoutHandle) : 
                undefined
			if (timeoutDisposables) {
				dispose(timeoutDisposables)
				BaseWindow.TIMEOUT_DISPOSABLES.delete(timeoutHandle)
			} else {
				originalClearTimeout.apply(this, [timeoutHandle])
			}
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
