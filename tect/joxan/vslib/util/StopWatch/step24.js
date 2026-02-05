/*
    Simple implementation of StopWatch
*/

// src\vs\base\common\stopwatch.ts
class StopWatch {
    static create() {
        return new StopWatch()
    }
    constructor() {
        this._startTime = Date.now()
        this._stopTime = -1
    }
    stop() {
        this._stopTime = Date.now()
    }
    reset() {
        this._startTime = Date.now()
        this._stopTime = -1
    }
    elapsed() {
        if (this._stopTime === -1) {
            return Date.now() - this._startTime
        }
        return this._stopTime - this._startTime
    }
}
