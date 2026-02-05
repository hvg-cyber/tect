/*
    Add add fnDidRunCallback to createSingleCallFunction()
*/
console.log('step 6')

// src\vs\base\common\lifecycle.ts
function dispose(arg) { // 326
    for (const d of arg) {
        d.dispose()
    }
}
function toDisposable(fn) { // 404
    return {dispose: fn}
}

// src\vs\base\common\functional.ts
function createSingleCallFunction(fn, fnDidRunCallback) {
    let didCall = false
    return function() {
		if (didCall) {
			return
		}
		didCall = true
        try {
            fn.apply(this, arguments)
        } finally {
            fnDidRunCallback()
        }
    }
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
        })
        
        targetWindow.setTimeout = function(handler, timeout, ...args) {
			const timeoutDisposables = new Set()
			const timeoutHandle = BaseWindow.TIMEOUT_HANDLES++
			BaseWindow.TIMEOUT_DISPOSABLES.set(timeoutHandle, timeoutDisposables)
            const handlerFn = createSingleCallFunction(handler, () => {
                debugger
				dispose(timeoutDisposables)
				BaseWindow.TIMEOUT_DISPOSABLES.delete(timeoutHandle)
			})
            const handle = window.vscodeOriginalSetTimeout.apply(this, [(...args) => {
                handlerFn(...args)
            }, timeout, ...args])
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

// entry point
function test1() {
    const baseWindow = new BaseWindow()
    const targetWindow = window
    baseWindow.enableMultiWindowAwareTimeout(targetWindow)
    
    const timeoutId1 = setTimeout((...args) => {
        console.log(...args)
        clearTimeout(timeoutId2)
    }, 2000, 'timeout', 1)
    
    const timeoutId2 = setTimeout((...args) => {
        console.log(...args)
    }, 3000, 'timeout', 2)
}

/*
    Using fnDidRunCallback effectively leads to the following situation,
    which is redundant
*/
function test() {
    const timeoutId1 = setTimeout(() => {
        console.log('hello')
        clearTimeout(timeoutId1)
    }, 2000)
}

test()
