/*
    Add trim(), ltrim() and rtrim()
*/
console.log('Step 20')

// src\vs\base\common\strings.ts
function trim(haystack) { // 130
	return haystack.trim()
}
function ltrim(haystack) { // 140
	return haystack.trimStart(haystack)
}
function rtrim(haystack) { // 163
	return haystack.trimEnd(haystack)
}

// entry point
function test() {
    console.log(`"${trim(' hello ')}"`)
    console.log(`"${ltrim(' hello ')}"`)
    console.log(`"${rtrim(' hello ')}"`)
}

test()
