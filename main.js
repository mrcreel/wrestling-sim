import fs from 'fs'
import {
  randomNumber,
  normalizedRandomNumber,
  padZeros,
  generateResultMatrix,
  initWeightClasses,
  generateWrestler,
  generateTeam,
  generateLeague,
  generateMatch,
  generateDualMeet,
} from './functions.js'

const resultMatrix = generateResultMatrix(2)
generateMatch(1, 2, 2)

/*
// Week One
let dualMeet = generateDualMeet(100, 200)
dualMeet = generateDualMeet(300, 700)
dualMeet = generateDualMeet(400, 600)
dualMeet = generateDualMeet(500, 800)
// Week Two
dualMeet = generateDualMeet(100, 300)
dualMeet = generateDualMeet(200, 800)
dualMeet = generateDualMeet(400, 700)
dualMeet = generateDualMeet(500, 600)
// Week Three
dualMeet = generateDualMeet(100, 400)
dualMeet = generateDualMeet(200, 300)
dualMeet = generateDualMeet(500, 700)
dualMeet = generateDualMeet(600, 800)
// Week Four
dualMeet = generateDualMeet(100, 500)
dualMeet = generateDualMeet(200, 400)
dualMeet = generateDualMeet(300, 800)
dualMeet = generateDualMeet(600, 700)
// Week Five
dualMeet = generateDualMeet(100, 600)
dualMeet = generateDualMeet(200, 500)
dualMeet = generateDualMeet(300, 400)
dualMeet = generateDualMeet(700, 800)
// Week Six
dualMeet = generateDualMeet(100, 700)
dualMeet = generateDualMeet(200, 600)
dualMeet = generateDualMeet(300, 500)
dualMeet = generateDualMeet(400, 800)
// Week Seven
dualMeet = generateDualMeet(100, 800)
dualMeet = generateDualMeet(200, 700)
dualMeet = generateDualMeet(300, 600)
dualMeet = generateDualMeet(400, 500)
*/
