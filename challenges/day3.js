let lines = require('fs').readFileSync("./data/inputW3-1.txt", 'utf-8')
    .split('\n')

// console.log(lines)

// let gammaRate = ""
// let epsilonRate = ""

// for (let i = 0; i < 12; i++) {
//     let oneOccurence = 0
//     let zeroOccurence = 0

//     for (const line of lines) {
//         if (line[i] === '1') {
//             oneOccurence++
//         }
//         else { zeroOccurence++ }
//     }

//     if (oneOccurence > zeroOccurence) {
//         gammaRate += '1'
//         epsilonRate += '0'
//     }
//     else {
//         gammaRate += '0'
//         epsilonRate += '1'
//     }
// }
// console.log(epsilonRate, gammaRate)
// console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))

//=======================================

let CO2rating = ""
let O2rating = ""
let O2lines = [...lines]
let CO2lines = [...lines]

//oxygen rating (most common bit)
let O2counter = 0
while (O2lines.length > 1) {
    let oneOccurence = 0
    let zeroOccurence = 0
    let mostCommon = ''

    for (const line of O2lines) {
        if (line[O2counter] === '1') {
            oneOccurence++
        }
        else { zeroOccurence++ }
    }

    if (oneOccurence > zeroOccurence) {
        mostCommon = '1'
    }
    else if (oneOccurence < zeroOccurence) {
        mostCommon = '0'
    }
    else { mostCommon = '1' }
    O2lines = O2lines.filter(e => e[O2counter] === mostCommon)
    O2counter++
    console.log(O2counter)
}

//CO2 rating (most common bit)
let CO2counter = 0
while (CO2lines.length > 1) {
    let oneOccurence = 0
    let zeroOccurence = 0
    let mostCommon = ''

    for (const line of CO2lines) {
        if (line[CO2counter] === '1') {
            oneOccurence++
        }
        else { zeroOccurence++ }
    }

    if (oneOccurence > zeroOccurence) {
        mostCommon = '1'
    }
    else if (oneOccurence < zeroOccurence) {
        mostCommon = '0'
    }
    else { mostCommon = '1' }
    CO2lines = CO2lines.filter(e => e[CO2counter] !== mostCommon)
    CO2counter++
    console.log(CO2lines)
    console.log(CO2counter)
}

console.log(O2lines[0])
console.log(CO2lines)