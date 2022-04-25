import fs from 'fs'

// initWeightClasses()
// Generate random number
export function randomNumber (min, max, isInteger = 1) {
  if (isInteger) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    return Math.random() * (max - min + 1) + min;
  }
}

// Generate a random number by mean and standard deviation
///https://gist.github.com/ironwallaby/19d0e12fc43091d455ee
export function normalizedRandomNumber(mean, std) {
  return Math.floor(mean + 2.0 * std * (Math.random() + Math.random() + Math.random() - 1.5))
}

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

  return weightClasses
}

export function generateWrestler(teamId, weightClass){
  const wrestler = {}

  wrestler.teamId = teamId
  wrestler.wrestlerId = teamId + weightClass

  const weightClasses = JSON.parse(fs.readFileSync('./data/weightClasses.json'))
  wrestler.weightClass = weightClass
  wrestler.weight = randomNumber(weightClasses[weightClass-1].minWeight, weightClasses[weightClass-1].maxWeight)

  const attributeScore = normalizedRandomNumber(100, 15)
  wrestler.attributeScore = attributeScore

  return wrestler
}

export function generateTeam(id) {
  const team = []
  team.teamId = id * 100
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

export function generateLeague(numTeams){
  const league = []

  for(let tId = 1; tId <= numTeams; tId++){
    const team = generateTeam(tId)
    league.push(team)
  }

  console.log(league)
  const json = JSON.stringify(league)
  fs.writeFileSync('./data/league.json', json)
  return league
}
generateLeague(8)
