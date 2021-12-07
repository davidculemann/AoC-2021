let lines = require('fs').readFileSync("./data/input6.txt", 'utf-8').split(',')

function lanternFish(lines, days) {
    let cycleArr = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (const num of lines.map(e => parseInt(e))) {
        cycleArr[num]++
    }

    console.log(cycleArr)

    while (days > 0) {
        let lastNum = cycleArr[0]

        for (let i = 0; i < 8; i++) {
            cycleArr[i] = cycleArr[i + 1]
        }
        cycleArr[8] = lastNum
        cycleArr[6] += lastNum
        days--
    }

    return cycleArr.reduce((a, b) => a + b)
}

console.log(lanternFish(lines, 256))