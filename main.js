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

const resultsMatrix = generateResultsMatrix(8)
const matchResult = generateMatch(711, 811)
const matchClass = matchResult[4] - matchResult[0] -1
const matchTeamW = (matchResult[0]/100)-1
const matchTeamL = (matchResult[1]/100)-1

resultsMatrix[matchClass][matchTeamW][2]++
resultsMatrix[matchClass][matchTeamW][3]++
resultsMatrix[matchClass][matchTeamW][5]+=matchResult[2]
resultsMatrix[matchClass][matchTeamL][2]++
resultsMatrix[matchClass][matchTeamL][4]++


console.log(resultsMatrix[matchClass])
