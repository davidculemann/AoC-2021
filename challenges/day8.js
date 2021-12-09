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

//console.log(decodeEasy(lines))

//===========part 2============
function decodeHard(lines) {

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    let totalSum = 0

    // for reference mark positions that each number covers (on a 7 digit display):

    // n0: ['p1', 'p2', 'p3', 'p5', 'p6', 'p7'],
    // n1: ['p3', 'p6'],
    // n2: ['p1', 'p3', 'p4', 'p5', 'p7'],
    // n3: ['p1', 'p3', 'p4', 'p6', 'p7'],
    // n4: ['p2', 'p3', 'p4', 'p6'],
    // n5: ['p1', 'p2', 'p4', 'p6', 'p7'],
    // n6: ['p1', 'p2', 'p4', 'p5', 'p6', 'p7'],
    // n7: ['p1', 'p3', 'p7'],
    // n8: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
    // n9: ['p1', 'p2', 'p3', 'p4', 'p6', 'p7']

    for (let line of lines) {
        let positions = { p1: '', p2: '', p3: '', p4: '', p5: '', p6: '', p7: '' }
        let numCodes = { c0: '', c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '', c9: '' }

        //get 10 digit input
        let digitString = line.slice(0, line.indexOf('|') - 1)
        let digitArr = digitString.split(' ').map(e => e.split("").sort().join(""))

        //get 4 digit display
        let displayString = line.slice(line.indexOf('|') + 2, line.length)
        let displayArr = displayString.split(' ').map(e => e.split("").sort().join(""))


        //fill in the codes for 1,4,7,8 based on unique length
        numCodes.c1 = digitArr.filter(e => e.length === 2)[0]
        numCodes.c4 = digitArr.filter(e => e.length === 4)[0]
        numCodes.c7 = digitArr.filter(e => e.length === 3)[0]
        numCodes.c8 = digitArr.filter(e => e.length === 7)[0]

        //1. compare 1 and 7 to find p1
        for (const char of numCodes.c7) {
            if (!numCodes.c1.includes(char)) {
                positions.p1 = char
            }
        }

        //2. compare 0, 6 and 9 to identify them (all 6 char long)
        let zeroSixNine = digitArr.filter(e => e.length === 6)
        let zeroSix = []

        //3. find 9 by getting the number that has all of 4's letters
        for (const num of zeroSixNine) {
            let includes = true
            for (const char of numCodes.c4) {
                if (!num.includes(char)) {
                    includes = false
                }
            }
            if (includes === true) {
                numCodes.c9 = num
                zeroSix = zeroSixNine.filter((e) => e !== numCodes.c9)
            }
        }

        //4. find 0 from 6 because it has both chars of 1
        for (const num of zeroSix) {
            let includes = true
            for (const char of numCodes.c1) {
                if (!num.includes(char)) {
                    includes = false
                }
            }
            if (includes === true) {
                numCodes.c0 = num
            }
            else { numCodes.c6 = num }
        }

        //5. find the position 6 letter by finding the common letter in 6 and 1 (bottom right)
        //   then position 3 is the other character of 1 that is not in 6
        for (const char of numCodes.c1) {
            if (numCodes.c6.includes(char)) {
                positions.p6 = char
            }
            else { positions.p3 = char }
        }

        //6. find the position 4 letter by finding what is in 6 and 9 but not 0
        for (const char of numCodes.c9) {
            if (numCodes.c6.includes(char) && !numCodes.c0.includes(char)) {
                positions.p4 = char
            }
        }

        //7. find the position 2 letter by finding what digit of 4 is not yet in the positions object
        for (const char of numCodes.c4) {
            if (char !== positions.p3 && char !== positions.p6 && char !== positions.p4) {
                positions.p2 = char
            }
        }

        //8. find the last two position's letters by comparing to 9 (pos 7 is in 9 but pos 5 is not)

        for (const char of numCodes.c9) {
            if (!Object.values(positions).includes(char)) {
                positions.p7 = char
                positions.p5 = letters.filter(e => !Object.values(positions).includes(e))[0]
            }
        }

        //9. find the codes for remmaining digits (2, 3, 5) 
        let twoThreeFive = digitArr.filter(e => e.length === 5)
        for (const num of twoThreeFive) {
            if (!num.includes(positions.p3)) {
                numCodes.c5 = num
            }
            else if (num.includes(positions.p5)) {
                numCodes.c2 = num
            }
            else { numCodes.c3 = num }
        }

        //10. decode the display
        let displayNum = ''
        for (const num of displayArr) {
            displayNum += (Object.keys(numCodes).find(key => numCodes[key] === num)).slice(1, 2)
        }

        //add the display to the running total
        totalSum += parseInt(displayNum)
        numCode = numCodes
        position = positions
    }
    //return the sum of each display
    return totalSum
}

console.log(decodeHard(lines))