/*
    Starting point
    Using builtin setTimeout() and clearTimeout()
*/
console.log('step 1')

function test1() {
    const timeoutId1 = setTimeout(() => {
        console.log('timeout 1')
        clearTimeout(timeoutId2)
    }, 2000)
    
    const timeoutId2 = setTimeout(() => {
        console.log('timeout 2')
    }, 3000)
}

// with arguments
function test() {
    const timeoutId1 = setTimeout((...args) => {
        console.log(...args)
        clearTimeout(timeoutId2)
    }, 2000, 'timeout', 1)

    const timeoutId2 = setTimeout((...args) => {
        console.log(...args)
    }, 3000, 'timeout', 2)
}

test()
