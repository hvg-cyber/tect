/*
128              2 **  7
 64              2 **  6
 32              2 **  5
 16              2 **  4
  8              2 **  3
  4              2 **  2
  2              2 **  1
  1              2 **  0
  0.5            2 ** -1
  0.25           2 ** -2
  0.125          2 ** -3
  0.0625         2 ** -4
  0.03125        2 ** -5
  0.015625       2 ** -6
  0.0078125      2 ** -7
  0.00390625     2 ** -8
255.99609375




*/

const widget = document.querySelector('.widget')
const bits = widget.querySelectorAll('.bit')
const intPart = widget.querySelector('.int_part').children
const fracPart = widget.querySelector('.frac_part').children
const leftCol = widget.querySelector('.col_left')
const rightCol = widget.querySelector('.col_right')

// Кнопки теперь всегда активны, так как сдвиг бесконечный
function updateShiftButtons() {
    // Убраны условия if (intPart[0]... == '1')
    shiftLeftButton.disabled = false // Кнопка влево всегда доступна
    shiftRightButton.disabled = false // Кнопка вправо всегда доступна
}


function addRowLeft(pow) {
    const row = document.createElement('div')
    row.classList.add('row')
    leftCol.append(row)
    
    const numElem = document.createElement('div')
    const arr = String(1 * (2 ** pow)).split('.')
    arr[0] = arr[0].padStart(3, ' ')
    numElem.textContent = arr.join('.')
    row.append(numElem)
}

function addRowRight(pow) {
    const row = document.createElement('div')
    row.classList.add('row')
    rightCol.append(row)
    
    const leftParen = document.createElement('span')
    leftParen.textContent = '('
    row.append(leftParen)
    
    const baseElem = document.createElement('span')
    baseElem.textContent = '2'
    row.append(baseElem)
    
    const powElem = document.createElement('sup')
    powElem.textContent = pow
    row.append(powElem)
    
    const rightParen = document.createElement('span')
    rightParen.textContent = ')'
    row.append(rightParen)
}

function addRow(elem, pow) {
    if (elem.textContent === '1') {
        addRowLeft(pow)
        addRowRight(pow)
    }
    return pow - 1
}

function updateSumContainer(dec) {
    leftCol.textContent = ''
    rightCol.textContent = ''
    if (dec == 0) {
        return
    }
    let pow = 7
    for (const elem of intPart) {
        pow = addRow(elem, pow)
    }
    for (const elem of fracPart) {
        pow = addRow(elem, pow)
    }
    const separator = document.createElement('div')
    separator.classList.add('separator')
    leftCol.append(separator)
    const sum = document.createElement('div')
    const arr = String(dec).split('.')
    arr[0] = arr[0].padStart(3, ' ')
    sum.textContent = arr.join('.')
    sum.classList.add('row')
    leftCol.append(sum)
}

function updateWidget(dec) {
    updateShiftButtons()
    updateSumContainer(dec)
}

// Вспомогательная функция для применения новой строки бит (16 символов)
function applyBits(bitString) {
    const intStr = bitString.substring(0, 8)   // Берем первые 8 символов (целая часть)
    const fracStr = bitString.substring(8, 16) // Берем оставшиеся 8 (дробная часть)
    
    updateBinNumber(intStr + '.' + fracStr)    // Рисуем 0 и 1 в квадратиках
    
    let bf = BinFrac.fromBin(intStr + '.' + fracStr) // Создаем объект числа
    const dec = bf.toDec()                           // Переводим в десятичное
    decNumberInput.value = dec                       // Пишем число в инпут
    updateWidget(dec)                                // Обновляем список (2**7 + ...)
}


function doLeftShift() {
    // 1. Собираем все 16 бит в одну длинную строку "0000000100000000"
    let s = ""
    for (const elem of intPart) s += elem.textContent
    for (const elem of fracPart) s += elem.textContent
    
    // 2. ГЛАВНОЕ: берем строку со 2-го символа и приклеиваем 1-й символ в конец
    // substring(1) — всё кроме первого символа
    // s[0] — тот самый бит, который "улетел" влево
    let newS = s.substring(1) + s[0] 
    
    applyBits(newS) // Применяем результат
}


function doRightShift() {
    // 1. Собираем строку бит
    let s = ""
    for (const elem of intPart) s += elem.textContent
    for (const elem of fracPart) s += elem.textContent
    
    // 2. ГЛАВНОЕ: берем последний символ и ставим его перед всей строкой
    // s[15] — последний бит (индекс 15, так как всего 16 бит)
    // substring(0, 15) — первые 15 бит (от 0 до 14 индекса)
    let newS = s[15] + s.substring(0, 15)
    
    applyBits(newS)
}


const decNumberInput = widget.querySelector('.dec_number')
decNumberInput.oninput = () => {
    let bf = new BinFrac(Number(decNumberInput.value))
    updateBinNumber(bf.toBin())
    updateWidget(decNumberInput.value)
    decNumberInput.setCustomValidity('')
}

const shiftLeftButton = widget.querySelector('.shift_left')
const shiftRightButton = widget.querySelector('.shift_right')
shiftLeftButton.onclick = doLeftShift
shiftRightButton.onclick = doRightShift

document.body.onkeydown = (event) => {
    if (event.code === 'ArrowLeft') doLeftShift()
    if (event.code === 'ArrowRight') doRightShift()
}

const allOnesButton = widget.querySelector('.all_ones')
allOnesButton.onclick = () => {
    let bf = BinFrac.fromBin('11111111.11111111')
    updateBinNumber(bf.toBin())
    const dec = bf.toDec()
    decNumberInput.value = dec
    updateWidget(dec)
}

const allZerosButton = widget.querySelector('.all_zeros')
allZerosButton.onclick = () => {
    updateBinNumber('0.0')
    decNumberInput.value = 0
    updateWidget(0)
}

function createBinFrac() {
    let binFrac = ''
    for (const elem of intPart) binFrac += elem.textContent
    binFrac += '.'
    for (const elem of fracPart) binFrac += elem.textContent
    return BinFrac.fromBin(binFrac)
}

function updateBinNumber(binFrac) {
    const arr = binFrac.split('.')
    const intPartDigits = arr[0].padStart(8, '0').slice(-8)
    const fracPartDigits = arr[1].padEnd(8, '0').slice(0, 8)
    for(let i = 0; i < 8; i++) {
        intPart[i].textContent = intPartDigits[i]
    }
    for(let i = 0; i < 8; i++) {
        fracPart[i].textContent = fracPartDigits[i]
    }
}

for(const elem of bits) {
    elem.onclick = () => {
        elem.textContent = elem.textContent === '0' ? '1' : '0'
        let bf = createBinFrac()
        updateBinNumber(bf.toBin())
        const dec = bf.toDec()
        decNumberInput.value = dec
        updateWidget(dec)
    }
}
