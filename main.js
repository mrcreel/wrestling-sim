import {
  randomNumber,
  normalizedRandomNumber,
  generateWrestler
} from './functions.js'

const wrestlers = []
let matchResult = []

// Make Test Players
for (let index = 1; index <= 4; index++) {
  wrestlers.push(generateWrestler(index, 1))
}

// Test match
const match = (first, second) => {
  const w1 = wrestlers[first]
  const w2 = wrestlers[second]
  let winner=''
  let loser = ''
  ///
  const sigma = Math.abs((w1.attribute - w2.attribute)/3) > 15 ? Math.abs((w1.attribute - w2.attribute)/3) : 15

  const w1Score = normalizedRandomNumber(w1.attribute, sigma)
  const w2Score = normalizedRandomNumber(w2.attribute, sigma)

  const std = Math.abs(w1Score - w2Score)/sigma

  if(w1Score === w2Score) {
    const w1wins = (randomNumber(0,1,0) <= 0.5) ? 1 : 0
    const matchResult = [w1wins, 3, 'Decision ']

    w1.stats[0]++, w2.stats[0]++
    if(w1wins){
      w1.stats[1]++
      w1.stats[2] += matchResult[1]
      winner = w1.id
      loser = w2.id
    } else {
      w2.stats[1]++
      w2.stats[2] += matchResult[1]
      winner = w2.id
      loser = w1.id
    }
    return matchResult
  }


  const w1wins =  w1Score > w2Score ? 1 : 0
  matchResult = std >= 3 ? [w1wins, 6,''] : std >= 2 ? [w1wins, 5, 'Technical Fall'] : std >= 1 ? [w1wins, 4, 'Major Decision'] : [w1wins, 3, 'Decision']

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

  w1.stats[0]++, w2.stats[0]++
  if(w1wins){
    w1.stats[1]++
    w1.stats[2] += matchResult[1]
    winner = w1.id
    loser = w2.id
  } else {
    w2.stats[1]++
    w2.stats[2] += matchResult[1]
    winner = w2.id
    loser = w1.id
  }

  console.log(`Wrestler ${winner} defeated Wrestler ${loser} via ${matchResult[2]} for ${matchResult[1]} points.`)

  return matchResult
}

match(0, 1)
match(2, 3)
match(0, 3)
match(1, 2)
match(0, 2)
match(1, 3)

console.log(wrestlers)