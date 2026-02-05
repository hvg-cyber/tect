/*
Current implementation of BinFrac.toBin() does not seem super intuitive to me.
This is an alternative implementation (which I also doesn't like).
Work in progress
*/

function toBin(num, exp) {
    if (num === 0) {
        return "0";
    }

    if (exp >= 0) {
        return num.toString(2) + "0".repeat(exp);
    }

    const shift = -exp;
    const bin = num.toString(2);

    let integerPart, fractionalPart;
    if (bin.length <= shift) {
        integerPart = "0";
        fractionalPart = "0".repeat(shift - bin.length) + bin;
    } else {
        console.log(333)
        integerPart = bin.slice(0, bin.length - shift);
        fractionalPart = bin.slice(bin.length - shift);
    }
    fractionalPart = fractionalPart.replace(/0+$/, "");
    if (fractionalPart === "") {
        return integerPart;
    }

    return integerPart + "." + fractionalPart;
}

debugger
console.log(toBin(512, -9))
