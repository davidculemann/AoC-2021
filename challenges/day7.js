let lines = require('fs').readFileSync("./data/input7.txt", 'utf-8').split(',').map(e => parseInt(e))

console.log(lines)

function getFuelLong1(lines) {
    let fuels = []
    let maxPos = Math.max(...lines)
    for (let i = 0; i < maxPos; i++) {
        fuels.push(lines.map(e => Math.abs(e - i)).reduce((a, b) => a + b))
    }
    return Math.min(...fuels)
}

console.log(getFuelLong1(lines))

//============PART 2

function getFuelMean(lines) {
    const meanPos = Math.round(lines.reduce((a, b) => a + b) / lines.length)
    return lines.map(e => (Math.abs(e - meanPos) * (Math.abs(e - meanPos) + 1)) / 2).reduce((a, b) => a + b)
}

console.log(getFuelMean(lines))


function getFuelLong2(lines) {
    let fuels = []
    let maxPos = Math.max(...lines)
    for (let i = 0; i < maxPos; i++) {
        fuels.push(lines.map(e => (Math.abs(e - i) * (Math.abs(e - i) + 1)) / 2).reduce((a, b) => a + b))
    }
    return Math.min(...fuels)
}

console.log(getFuelLong2(lines))