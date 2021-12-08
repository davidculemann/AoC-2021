let lines = require('fs').readFileSync("./data/input3.txt", 'utf-8')
    .split('\n')

console.log(lines)

function powerConsumption(lines) {
    let gammaRate = ""
    let epsilonRate = ""

    for (let i = 0; i < 12; i++) {
        let oneOccurence = 0
        let zeroOccurence = 0

        for (const line of lines) {
            if (line[i] === '1') {
                oneOccurence++
            }
            else { zeroOccurence++ }
        }

        if (oneOccurence > zeroOccurence) {
            gammaRate += '1'
            epsilonRate += '0'
        }
        else {
            gammaRate += '0'
            epsilonRate += '1'
        }
    }
    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

//===============part 2========================

function lifeSupportRating(lines) {
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
    }

    //CO2 rating (least common bit)
    let CO2counter = 0
    while (CO2lines.length > 1) {
        let oneOccurence = 0
        let zeroOccurence = 0
        let leastCommon = ''

        for (const line of CO2lines) {
            if (line[CO2counter] === '1') {
                oneOccurence++
            }
            else { zeroOccurence++ }
        }

        if (zeroOccurence < oneOccurence) {
            leastCommon = '0'
        }
        else if (oneOccurence < zeroOccurence) {
            leastCommon = '1'
        }
        else { leastCommon = '0' }
        if (zeroOccurence !== 0 && oneOccurence !== 0) {
            CO2lines = CO2lines.filter(e => e[CO2counter] === leastCommon)
        }
        CO2counter++
    }
    return parseInt(CO2lines[0], 2) * parseInt(O2lines[0], 2)
}

console.log(lifeSupportRating(lines))