/*
decimal fractions (base 10)
*/
function test1() {
    const num = 0.012345
    console.log(num * 10 ** 0) //      0.012345
    console.log(num * 10 ** 1) //      0.12345
    console.log(num * 10 ** 2) //      1.2345
    console.log(num * 10 ** 3) //     12.345
    console.log(num * 10 ** 4) //    123.45
    console.log(num * 10 ** 5) //   1234.5
    console.log(num * 10 ** 6) //  12345
    console.log(num * 10 ** 7) // 123450
}

function test1() {
    console.log(0.625)
    console.log(6 / 10 + 2 / 100 + 5 / 1000)
    console.log(6 * 0.1 + 2 * 0.01 + 5 * 0.001)
    console.log(6 * 10 ** -1 + 2 * 10 ** -2 + 5 * 10 ** -3)
    console.log(6 * 10 ** 1/3 + 2 * 10 ** -2 + 5 * 10 ** -3)
}


function test1() {
    console.log(Number.isInteger(5))
    console.log(Number.isInteger(5.5))
}

function test1() {
    console.log(Number.MIN_VALUE)
    console.log(Number.MIN_VALUE / 2)
    console.log(Number.MIN_VALUE * 2)
    console.log(Number.MIN_VALUE * 4)
}

/*
Subnormals that underflow to zero when multiplying by 2.
Do they even exist?
*/
function test() {
    let value = Number.MIN_VALUE;
    let iterations = 0;
    console.log(iterations, value)
    while (value < 1) {
        value *= 2;
        iterations++;
        console.log(iterations, value)
    }
    console.log('done')
}

function test1() {
    let num = 0.00390625
    for (let i = 0; i < 8; i++) {
        num *= 2
    }
    console.log(num)
}

function test() {
    function checkNum(num) {
        for (let i = 0; i < 8; i++) {
            num *= 2
        }
        console.log(num)
        return (num & 1) === 1
    }
    console.log(checkNum(0.02734375)) // true
    console.log(checkNum(0.0234375)) // false
}

/*
Is repeated multiplication equivalent to exponentiation?
(doesn't seem so)
*/
function test1() {
    function repeatedMultiplication(num, upperBound) {
        for (let i = 0; i < upperBound; i++) {
            num *= 2
        }
        return num
    }
    // console.log(1 * (2 ** 10))
    // console.log(repeatedMultiplication(1, 10))
    
    // console.log(Number.MIN_VALUE * (2 ** 1023))
    // console.log(repeatedMultiplication(Number.MIN_VALUE, 1023))
    
    // console.log(Number.MIN_VALUE * (2 ** 1074))
    // console.log(repeatedMultiplication(Number.MIN_VALUE, 1074))

    console.log(Number.MIN_VALUE * (2 ** 1023))
    console.log(Number.MIN_VALUE * (2 ** 1024))
}

test()
