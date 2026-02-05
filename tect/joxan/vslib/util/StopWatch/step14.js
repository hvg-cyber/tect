/*
    Starting point
*/

function test1() {
    const startTime = this.Date.now()
    setTimeout(() => {
        const stopTime = Date.now()
        console.log(stopTime - startTime)
    }, 1000)
}

function test() {
    class StopWatch {
        constructor() {
            this._startTime = Date.now()
        }
        stop() {
            this._stopTime = Date.now()
            return this._stopTime - this._startTime
        }
    }
    
    const stopWatch1 = new StopWatch()
    setTimeout(() => {
        console.log(stopWatch1.stop())
    }, 1000)

    const stopWatch2 = new StopWatch()
    setTimeout(() => {
        console.log(stopWatch2.stop())
    }, 2000)
}

test()
