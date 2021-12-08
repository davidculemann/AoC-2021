let lines = require('fs').readFileSync("./data/input8.txt", 'utf-8').split('\n')

function decodeEasy(lines) {
    let oneFourSevenEightCounter = 0
    const lengthList = [2, 3, 4, 7]

    for (let line of lines) {
        const display = line.slice(line.indexOf('|') + 2, line.length)
        const digits = display.split(" ")
        console.log(digits)
        for (const digit of digits) {
            if (lengthList.includes(digit.length)) {
                oneFourSevenEightCounter++
            }
        }
    }
    return oneFourSevenEightCounter
}

console.log(decodeEasy(lines))