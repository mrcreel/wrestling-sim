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

let resultMatrix = generateResultsMatrix(8)

let dualMeet = generateDualMeet(100, 200, resultMatrix)
dualMeet = generateDualMeet(300, 700, dualMeet[1])
dualMeet = generateDualMeet(400, 600, dualMeet[1])
dualMeet = generateDualMeet(500, 800, dualMeet[1])

console.log(dualMeet[1])
