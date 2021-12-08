let lines = require('fs').readFileSync("./data/input5.txt", 'utf-8')
    .split('\n');

function getIntersections(lines) {
    //turn each input coordinate set into an array of two arrays: [[x1, y1], [x2, y2]]
    const linesSplit = lines.map(e => e.split(" -> ").map(el => el.split(",")))

    //create grid
    let grid = [...Array(1000)].map((e) => Array(1000).fill(0))

    //object for storing coordinates
    let coordObj = { x1: 0, x2: 0, y1: 0, y2: 0 }

    for (const coordArr of linesSplit) {
        coordObj.x1 = coordArr[0][0]
        coordObj.y1 = coordArr[0][1]
        coordObj.x2 = coordArr[1][0]
        coordObj.y2 = coordArr[1][1]

        //for constant x (vertical line)
        if (coordObj.x1 === coordObj.x2) {
            for (let i = Math.min(coordObj.y1, coordObj.y2); i <= Math.max(coordObj.y1, coordObj.y2); i++) {
                grid[i][coordObj.x1]++
            }
        }
        //for constant y (horizontal line)
        else if (coordObj.y1 === coordObj.y2) {
            for (let i = Math.min(coordObj.x1, coordObj.x2); i <= Math.max(coordObj.x1, coordObj.x2); i++) {
                grid[coordObj.y1][i]++
            }
        }
    }
    //sum up intersections
    let intersectionCount = 0

    for (const row of grid) {
        for (const point of row) {
            if (point > 1) {
                intersectionCount++
            }
        }
    }

    return intersectionCount
}

console.log(getIntersections(lines))