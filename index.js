function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getStandardDeviation(newMean, newStd){
  /// Get STD of abilities
  const seedNumbers = []
  for (let index = 0; index < 12; index++) {
    const element = index
    seedNumbers.push(randomIntFromInterval(1, 100))
  }
  const sum = seedNumbers.reduce((a, c) => a + c, 0)
  const oldMean = sum / seedNumbers.length
  const oldStd = Math.sqrt(
    seedNumbers
      .map((x) => Math.pow(x - oldMean, 2))
      .reduce((a, b) => a + b) / seedNumbers.length
  )

  const finalNumbers = []
  for (let index = 0; index < 12; index++) {
    const element = index
    const newAbility = Math.floor(
      (newStd * (seedNumbers[index] - oldMean)) / oldStd + newMean
    )
    finalNumbers.push(newAbility)
  }
  return finalNumbers
}

///1. Set-up classes
const weights = [285, 212, 189, 167, 155, 145, 138, 132, 126, 118, 112, 103]

const weightClasses = []
for (let i = 12; i > 0; i--) {
  const classTemplate = []
  const maxWeight = weights[i - 1]
  let minWeight = 92
  if (i < 10) {
    minWeight = weights[i + 1]
  }
  classTemplate.classId = i
  classTemplate.minWeight = minWeight + 1
  classTemplate.maxWeight = maxWeight

  weightClasses.push(classTemplate)
}

///2. Initialize team

function createTeam(t) {
  const team = []
  team.id = t*100

  const getAbilities = getStandardDeviation(100, 15)
  /// Create players
  for (let index = 0; index < weightClasses.length; index++) {
    const wrestler = {}
    wrestler.teamId = 100 * t
    wrestler.id = wrestler.teamId + index + 1
    wrestler.weightClass = index + 1

    const minWeight = weightClasses[index].minWeight
    const maxWeight = weightClasses[index].maxWeight
    wrestler.weight = randomIntFromInterval(minWeight, maxWeight)
    wrestler.abilityScore = getAbilities[index]

    team.push(wrestler)
  }
  return team
}

///3.  Create array of Teams
const teams = []

for (let t = 1; t <= 24; t++) {
  teams.push(createTeam(t))
}

///4. Create meet
const team0 = teams[0]
const team1 = teams[1]
console.log(`Team ${team0.id} vs Team ${team1.id}`)

const wrestler0 = team0[0]
const wrestler1 = team1[0]

console.log(`Wrestler0: ${wrestler0.id}(${wrestler0.abilityScore}) vs Wrestler1: ${wrestler1.id}(${wrestler1.abilityScore})`)
console.log()

let wrestlerS = scoreS = wrestlerW = scoreW = ''
if(wrestler0.abilityScore > wrestler1.abilityScore) {
  wrestlerS = wrestler0
  scoreS = wrestler0.abilityScore
  wrestlerW = wrestler1.id
  scoreW= wrestler1.abilityScore
} else {
  wrestlerS = wrestler1
  scoreS = wrestler1.abilityScore
  wrestlerW = wrestler0.id
  scoreW = wrestler0.abilityScore
}

const sigma = (scoreS - scoreW)/3

const pS = getStandardDeviation(scoreS, sigma)[Math.floor(Math.random()*12)]
console.log(`WreaslerS ${wrestlerS.id} Ability(${scoreS}) --> ${pS}`)

const pW = getStandardDeviation(scoreS, sigma)[Math.floor(Math.random()*12)]
console.log(`wrestlerW ${wrestlerW} Ability(${scoreW}) --> ${pW}`)

console.log(pS > pW)