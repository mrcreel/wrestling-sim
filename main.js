import fs from 'fs'
import {
  randomNumber,
  normalizedRandomNumber,
  padZeros,
  generateResultsMatrix,
  initWeightClasses,
  generateWrestler,
  generateTeam,
  generateLeague,
  generateMatch,
  generateDualMeet,
} from './functions.js'
const resultMatrix = generateResultsMatrix(8)
// let dualMeet = generateDualMeet(100, 200, resultMatrix)
let dualMeet = generateDualMeet(100, 200)
dualMeet = generateDualMeet(300, 700)
dualMeet = generateDualMeet(400, 600)
dualMeet = generateDualMeet(500, 800)

console.log(dualMeet[1])
/*

console.log(dualMeet[1])
*/
