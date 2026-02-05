/*
    Add promises
*/

// src\vs\base\common\async.ts
class ProducerConsumer { // 2307
    constructor() {
        this._unsatisfiedConsumers = []
        this._unconsumedValues = []
    }
	produce(value) {
		if (this._unsatisfiedConsumers.length > 0) {
			const resolve = this._unsatisfiedConsumers.shift()
            resolve(value)
		} else {
			this._unconsumedValues.push(value)
		}
	}
	consume() {
		if (this._unconsumedValues.length > 0) {
			const value = this._unconsumedValues.shift()
            return Promise.resolve(value)
		} else {
			return new Promise((resolve) => {
                this._unsatisfiedConsumers.push(resolve)
            })
		}
	}
}

// entry point
function test1() {
    const producerConsumer = new ProducerConsumer()
    producerConsumer.produce(123)
    producerConsumer.consume().then((value) => {
        console.log(value)
    })
}

function test() {
    const producerConsumer = new ProducerConsumer()
    producerConsumer.consume().then((value) => {
        console.log(value)
    })
    producerConsumer.produce(456)
}

function test1() {
    const producerConsumer = new ProducerConsumer()
    setTimeout(() => {
        producerConsumer.produce(789)
    }, 1000)
    producerConsumer.consume().then((value) => {
        console.log(value)
    })
}

test()
