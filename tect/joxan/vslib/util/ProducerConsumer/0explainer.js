/*
    Order of execution of promise callbacks
*/

function test1() {
    const promise = new Promise((resolve) => {
        resolve(888)
    })
    promise.then((value) => {
        console.log(value)
    })
    console.log('done')
}

function test1() {
    const promise = Promise.resolve(44)
    promise.then((value) => {
        console.log(value)
    })
    console.log('done')
}

function test1() {
    const promise1 = new Promise((resolve, reject) => {
        reject('Second')
    })
    promise1.then((value) => {
        console.log(value)
    }).catch((err) => {
        console.log(err)
    })

    const promise2 = new Promise((resolve, reject) => {
        resolve('First')
    })
    promise2.then((value) => {
        console.log(value)
    }).catch((err) => {
        console.log(err)
    })
}

function test() {
    const promise1 = new Promise((resolve, reject) => {
        reject('First')
    })
    promise1.catch((err) => {
        console.log(err)
    })

    const promise2 = new Promise((resolve, reject) => {
        resolve('Second')
    })
    promise2.then((value) => {
        console.log(value)
    })
}

test()

