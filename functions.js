import fs from 'fs'

// Generate random number
export function randomNumber (min, max, isInteger = 1) {
  if (isInteger) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    return Math.random() * (max - min + 1) + min;
  }
}
// randomNumber(3,18)

// Generate a random number by mean and standard deviation
///https://gist.github.com/ironwallaby/19d0e12fc43091d455ee
export function normalizedRandomNumber(mean, std) {
  return Math.floor(mean + 2.0 * std * (Math.random() + Math.random() + Math.random() - 1.5))
}
// normalizedRandomNumber(100, 15)

// Write weight class ranges to a file
export function initWeightClasses() {
  const weights = [285, 212, 189, 167, 155, 145, 138, 132, 126, 118, 112, 103]

  const weightClasses = []

  for (let i = 12; i > 0; i--) {
    const classTemplate = {}
    const maxWeight = weights[i - 1]
    let minWeight = 92
    if (i < 10) {
      minWeight = weights[i + 1]
    }
    classTemplate.weightClass = 13 - i
    classTemplate.minWeight = minWeight + 1
    classTemplate.maxWeight = maxWeight

    weightClasses.push(classTemplate)
  }

  const json = JSON.stringify(weightClasses)
  fs.writeFileSync('./data/weightClasses.json', json)
}
// initWeightClasses

export function generateWrestler(teamId, weightClass){
  const wrestler = {}

  wrestler.teamId = teamId
  wrestler.wrestlerId = teamId + weightClass

  const weightClasses = JSON.parse(fs.readFileSync('./data/weightClasses.json'))
  wrestler.weightClass = weightClass
  wrestler.weight = randomNumber(weightClasses[weightClass-1].minWeight, weightClasses[weightClass-1].maxWeight)

  const attributeScore = normalizedRandomNumber(100, 15)
  wrestler.attributeScore = attributeScore
}
//generateWrestler(7,3)

export function generateTeam(id) {
  const team = []
  // Create 12 wrestlers
  for (let w = 1; w <= 12; w++) {
    team.push(generateWrestler(id * 100, w))
  }
  // Team size is randNumber w/ mean 10 & sd 1
  const teamSize = normalizedRandomNumber(10, 1)

  // Need to remove random wrestlers to get to Required Size
  const numToRemove = 12 - teamSize
  const wrestlersToRemove = []
  let i = 1
  // Select <numToRemove> random wrestlers
  do {
    const rem = randomNumber(0, 11)
    if (wrestlersToRemove.indexOf(rem) == -1) {
      wrestlersToRemove.push(rem)
    }
    i++
  } while (wrestlersToRemove.length < numToRemove)
  // Set removed wrestler element to ''
  wrestlersToRemove.forEach(ele => {
    team[ele] = ''
  });
  return team
}
// generateTeam(4)

// Denerate league and write it to a JSON file
export function generateLeague(numTeams){
  const league = []

  for(let tId = 1; tId <= numTeams; tId++){
    const team = generateTeam(tId)
    league.push(team)
  }
  fs.writeFileSync('./data/league.json', JSON.stringify(league))
  return league
}
generateLeague(20)

// Generate match
export function generateMatch(w1, w2){
  let league = JSON.parse(fs.readFileSync('./data/league.json'))
  let teams = JSON.parse(fs.readFileSync('./data/teams.json'))
  const w1teamId = Math.floor(w1 / 100)
  const w1id = w1 - w1teamId * 100
  const w1info = league[w1teamId - 1][w1id - 1]

  const w2teamId = Math.floor(w2 / 100)
  const w2id = w2 - w2teamId * 100
  const w2info = league[w2teamId - 1][w2id - 1]

  console.log(w1info)
  console.log(w2info)
  console.log()

  const sigma = Math.abs((w1info.attributeScore - w2info.attributeScore)/3) > 15 ? Math.abs((w1info.attributeScore - w2info.attributeScore)/3) : 15
  const w1Score = normalizedRandomNumber(w1info.attributeScore, sigma)
  const w2Score = normalizedRandomNumber(w2info.attributeScore, sigma)
  // If tie, rerun match function
  if(w1Score == w2Score) {match(w1, w2)}
  const diffs = Math.abs(w1Score - w2Score)/sigma

  let matchResult = diffs >= 3 ? [6,''] : diffs >= 2 ? [5, 'Technical Fall'] : diffs >= 1 ? [4, 'Major Decision'] : [3, 'Decision']
  if(diffs >= 3){
    const bigWinResult = randomNumber(1,4)
    switch (bigWinResult) {
      case 1:
        matchResult[1] = 'Fall'
        break;
      case 2:
        matchResult[1] = 'Forfeit'
        break;
      case 3:
        matchResult[1] = 'Default'
        break;
      default:
        matchResult[1] = 'Disqualification '
        break;
    }
  }

  league[w1teamId - 1][w1id - 1].stats.matches++
  league[w2teamId - 1][w2id - 1].stats.matches++

  let winner = ''
  let loser = ''
  let teamResult = []
  if(w1Score > w2Score){
    winner = w1info.wrestlerId
    league[w1teamId - 1][w1id - 1].stats.wins++
    league[w1teamId - 1][w1id - 1].stats.points+=matchResult[0]
    loser = w2info.wrestlerId
    teamResult = [w1teamId, w2teamId, matchResult[0]]

  } else {
    winner = w2info.wrestlerId
    league[w2teamId - 1][w2id - 1].stats.wins++
    league[w2teamId - 1][w2id - 1].stats.points+=matchResult[0]
    loser = w1info.wrestlerId
    teamResult = [w2teamId, w1teamId, matchResult[0]]
  }

  console.log(`sigma = ${sigma}`)
  console.log('diffs:', diffs)
  console.log()
  console.log(`w1attributeScore = ${w1info.attributeScore < 100 ? '0' + w1info.attributeScore : w1info.attributeScore} | Score: ${w1Score < 100 ? '0' + w1Score : w1Score} |`)

  console.log(`                       |            | Wrestler ${winner} defeats Wrestler ${loser} by ${matchResult[1]}(${matchResult[0]} points)`)

  console.log(`w2attributeScore = ${w2info.attributeScore < 100 ? '0' + w2info.attributeScore : w2info.attributeScore} | Score: ${w2Score < 100 ? '0' + w2Score : w2Score} |`)
  console.log(teamResult)
  console.log()
  console.log('w1:', league[w1teamId - 1][w1id - 1].stats)
  console.log('w2:', league[w2teamId - 1][w2id - 1].stats)

  return teamResult
}
// generateMatch(112, 2012)