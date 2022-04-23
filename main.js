import {
  randomNumber,
  normalizedRandomNumber
} from './functions.js'

const wrestlers = []

// Make Test Players
for (let index = 1; index <= 4; index++) {
  const wrestler = {}

  wrestler.id = index
  wrestler.attribute = normalizedRandomNumber(100,15)

  wrestlers.push(wrestler)
}

console.log('**Wrestlers**')
console.log(wrestlers)

// Test match
const match = (first, second) => {
  const w1 = wrestlers[first]
  const w2 = wrestlers[second]
  ///
  console.log(`Wrestler ${w1.id} vs Wrestler ${w2.id}`)

  const w1Strongest = w1.attribute > w2.attribute
  console.log(w1Strongest)

  const sigma = Math.abs((w1.attribute - w2.attribute)/3) > 15 ? Math.abs((w1.attribute - w2.attribute)/3) : 15
  console.log(`sigma: ${sigma}`)

  console.log('-----------------')
  const w1Score = normalizedRandomNumber(w1.attribute, sigma)
  console.log(`w1Score(${w1.attribute}): ${w1Score}`)
  const w2Score = normalizedRandomNumber(w2.attribute, sigma)
  console.log(`w2Score(${w2.attribute}): ${w2Score}`)

  const std = Math.abs(w1Score - w2Score)/sigma
  console.log(`std: ${std}`)

  if(w1Score === w2Score) {
    const w1wins = (randomNumber(0,1,0) <= 0.5) ? 1 : 0
    const matchResult = [w1wins, 3, 'Decision ']
    console.log(matchResult)
    return ///////TODO!!!!!
  }

  let matchResult = []
  const w1wins =  w1Score > w2Score ? 1 : 0
  matchResult = std >= 3 ? [w1wins, 6,''] : std >= 2 ? [w1wins, 5, 'Technical Fall'] : std >= 1 ? [w1wins, 4, 'Major Decision'] : [w1wins, 3, 'Decision ']

  if(std >= 3){
    const bigWinResult = randomNumber(1,4)
    switch (bigWinResult) {
      case 1:
        matchResult[2] = 'Fall'
        break;
      case 2:
        matchResult[2] = 'Forfeit'
        break;
      case 3:
        matchResult[2] = 'Default'
        break;
      default:
        matchResult[2] = 'Disqualification '
        break;
    }

  }
  console.log(matchResult)

}

match(3, 2)