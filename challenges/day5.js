let lines = require('fs').readFileSync("./data/input5.txt", 'utf-8')
    .split('\n');

/*
PSEUDOCODE
declare an 2d array with 1000 arrays and 1000 0s in each array (GRID)
take lines and for each element in lines where either x or y is constant, split the element into an array at the arrow
  within the same array, split the numbers on the comma (which will create a second layer of arrays)
    for each element of the array, create an object
      {x1: array[0][0], x2: array[1][0], y1: array[0][1], y2: array[1][1] }
      if object.x1===objext.x2:
        for loop from math.min of object.y1, object.y2 to math.max of object.y1, object.y2
          set grid[i][x1] to be +1
      else if object.y1===objext.y2:
        for loop from math.min of object.x1, object.x2 to math.max of object.x1, object.x2
          set grid[y1][i] to be +1

  INTERSECTION_COUNT=0;

  for every row of GRID:
    for every element of row:
      if element > 1:
        INTERSECTION_COUNT ++;

  [['899', '63'] , ['899', '53']]

  compare the two inside arrays
    if element[0] of array 0 ===element[0] of array 0, then
      declare an object which has {y1, y2, x} property
      y1=> array1[0]
      y2 => array2[1]
    else if element[1] of array 1===element[1]of array 1:
      declare an array xArr made of the 0th array's first element, and the 1st array's first element


  ['63', '53', '899']
  ['899,63' , '899,53']
*/

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