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
/**
 * Make resultMatrix an array of objects with strings
 */

const resultMatrix = JSON.parse(fs.readFileSync('./data/classResults.json'))

const data = [
  { team: 100, wrestler: 101, matches: 7, w: '06', l: 1, pts: '29' },
  { team: 200, wrestler: 201, matches: 7, w: '05', l: 2, pts: '22' },
  { team: 300, wrestler: 301, matches: 7, w: '04', l: 3, pts: '15' },
  { team: 400, wrestler: 401, matches: 7, w: '02', l: 5, pts: '07' },
  { team: 500, wrestler: 501, matches: 7, w: '00', l: 7, pts: '00' },
  { team: 600, wrestler: 601, matches: 7, w: '01', l: 6, pts: '05' },
  { team: 700, wrestler: 701, matches: 7, w: '06', l: 1, pts: '30' },
  { team: 800, wrestler: 801, matches: 7, w: '04', l: 3, pts: '18' }
]

/*
const res = data.sort(function (a, b) {
  // return a[3].localeCompare(b[3]) || a[5] - b[5];
  return b.w.localeCompare(a.w) || b.pts - a.pts
})
*/

console.log(parseInt(data[3].pts))