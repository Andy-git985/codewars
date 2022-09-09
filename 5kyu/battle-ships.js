// 5 kyu Battle ships: Sunk damaged or not touched?
// Your task in the kata is to determine how many boats are sunk damaged and untouched from a set amount of attacks. You will need to create a function that takes two arguments, the playing board and the attacks.
// Example Game
// The board

// Boats are placed either horizontally, vertically or diagonally on the board. 0 represents a space not occupied by a boat. Digits 1-3 represent boats which vary in length 1-4 spaces long. There will always be at least 1 boat up to a maximum of 3 in any one game. Boat sizes and board dimentions will vary from game to game.
// Attacks

// Attacks are calculated from the bottom left, first the X coordinate then the Y. There will be at least one attack per game, and the array will not contain duplicates.

// [[2, 1], [1, 3], [4, 2]];

// First attack      `[2, 1]` = `3`
// Second attack `[1, 3]` = `0`
// Third attack     `[4, 2]` = `1`
// Function Initialization

// board = [[0,0,0,2,2,0],
//          [0,3,0,0,0,0],
//          [0,3,0,1,0,0],
//          [0,3,0,1,0,0]];
// attacks = [[2, 1], [1, 3], [4, 2]];
// damagedOrSunk(board, attacks);

// Scoring
// 1 point for every whole boat sank.
// 0.5 points for each boat hit at least once (not including boats that are sunk).
// -1 point for each whole boat that was not hit at least once.
// Sunk or Damaged
// `sunk` = all boats that are sunk
// `damaged` = all boats that have been hit at least once but not sunk
// `notTouched/not_touched` = all boats that have not been hit at least once
// Output

// You should return a hash with the following data

// `sunk`, `damaged`, `notTouched`, `points`

// Example Game Output

// In our above example..
// First attack: `boat 3` was damaged, which increases the `points` by `0.5`
// Second attack: miss nothing happens
// Third attack: `boat 1` was damaged, which increases the `points` by `0.5`
// `boat 2` was untouched so `points -1` and `notTouched +1` in Javascript/Java/C# and `not_touched +1` in Python/Ruby.
// No whole boats sank
// Return Hash

// { sunk: 0, damaged: 2 , notTouched: 1, points: 0 }


function damagedOrSunk (board, attacks){
  board = board.reverse()
  const ships = board.reduce((acc, val) => [...acc, ...val], []).filter(Boolean)
  const shipsCount = ships.reduce((o,i) => {
    if (!o[i]) o[i] = 0
    o[i]++
    return o
  }, {})
  const attackValues = attacks.map(e => board[e[1] - 1][e[0] - 1])
  const attackCount = attackValues.filter(Boolean).reduce((o,i) => {
    if (!o[i]) o[i] = 0
    o[i]++
    return o
  }, {})
  const sunk = Object.keys(attackCount).filter(k => attackCount[k] === shipsCount[k]).length
  const damaged = Object.keys(attackCount).filter(k => attackCount[k] < shipsCount[k] && attackCount[k] > 0).length
  const notTouched = Object.keys(shipsCount).filter(k => !Object.keys(attackCount).includes(k)).length
  const points = (sunk * 1) + (damaged * 0.5) - (notTouched * 1)
  return {sunk, damaged, notTouched, points}
}

// Game 1
var board = [ [0, 0, 1, 0],
              [0, 0, 1, 0],
              [0, 0, 1, 0] ];
          
var attacks = [[3, 1], [3, 2], [3, 3]];
var result = damagedOrSunk(board, attacks);

console.log(result.sunk === 1) // "There should be 1 ship sunk"
console.log(result.damaged === 0) // "There should be 0 ship damaged"
console.log(result.notTouched === 0) // "There should be 0 ship notTouched"
console.log(result.points  === 1) // "there should be a 1 point score"

// Game 2
var board = [ [3, 0, 1],
              [3, 0, 1],
              [0, 2, 1], 
              [0, 2, 0] ];

var attacks = [[2, 1], [2, 2], [ 3, 2], [3, 3]]
var result = damagedOrSunk(board, attacks)

console.log(result.sunk === 1) // "There should be 1 ship sunk"
console.log(result.damage === 1) // "There should be 1 ship damaged"
console.log(result.notTouched === 1) // "There should be 1 ship notTouched"
