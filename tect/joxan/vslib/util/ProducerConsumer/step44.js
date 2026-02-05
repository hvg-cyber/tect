/*
	Add DeferredPromise
*/

// src\vs\base\common\async.ts
class DeferredPromise { // 1731
    constructor() {
        console.log('DeferredPromise')
		this.p = new Promise((c, e) => {
			this.completeCallback = c
			this.errorCallback = e
		})
    }
	complete(value) {
        this.completeCallback(value)
	}
	error(err) {
        this.errorCallback(err)
	}
}
class ProducerConsumer { // 2307
    constructor() {
        this._unsatisfiedConsumers = []
        this._unconsumedValues = []
    }
	produce(value) {
		if (this._unsatisfiedConsumers.length > 0) {
			const deferred = this._unsatisfiedConsumers.shift()
			this._resolveOrRejectDeferred(deferred, value)
		} else {
			this._unconsumedValues.push(value)
		}
	}
	_resolveOrRejectDeferred(deferred, value) {
		if (value.ok) {
			deferred.complete(value.value)
		} else {
			deferred.error(value.error)
		}
	}
	consume() {
		if (this._unconsumedValues.length > 0) {
			const value = this._unconsumedValues.shift()
			if (value.ok) {
				return Promise.resolve(value.value)
			} else {
				return Promise.reject(value.error)
			}
		} else {
			const deferred = new DeferredPromise()
			this._unsatisfiedConsumers.push(deferred)
			return deferred.p
		}
	}
}

// entry point
function test1() {
    const producerConsumer = new ProducerConsumer()
    producerConsumer.produce({ ok: true, value: 123 })
    producerConsumer.consume().then((value) => {
        console.log(value)
    })
}

function test1() {
    const producerConsumer = new ProducerConsumer()
    producerConsumer.consume().then((value) => {
        console.log(value)
    })
    producerConsumer.produce({ ok: true, value: 123 })
}

function test() {
    const producerConsumer = new ProducerConsumer()
    setTimeout(() => {
        producerConsumer.produce({ ok: true, value: 123 })
    }, 1000)
    producerConsumer.consume().then((value) => {
        console.log(value)
    })
}

test()
