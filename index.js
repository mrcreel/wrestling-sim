const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getStandardDeviation = (newMean, newStd) => {
  /// Get STD of abilities
  const seedNumbers = []
  for (let index = 0; index < 12; index++) {
    const element = index
    seedNumbers.push(randomIntFromInterval(1, 100))
  }
  const sum = seedNumbers.reduce((a, c) => a + c, 0)
  const oldMean = sum / seedNumbers.length
  const oldStd = Math.sqrt(
    seedNumbers.map((x) => Math.pow(x - oldMean, 2)).reduce((a, b) => a + b) /
      seedNumbers.length
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

const scores = (abilityS, abilityW) => {
  const sigma = (abilityS - abilityW) / 3 > 15 ? (abilityS - abilityW) / 3 : 15
  const pS = getStandardDeviation(abilityS, sigma)[Math.floor(Math.random() * 12)]
  const pW = getStandardDeviation(abilityW, sigma)[Math.floor(Math.random() * 12)]
  const stdDiffs = Math.abs(pS-pW)/sigma

  const pts = stdDiffs > 3 ? 6: stdDiffs > 2 ? 5 : stdDiffs > 1 ? 4 : 3

  console.log(pts)
  return([pS, pW, pts])
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

const createTeam = (t) => {
  const team = []
  team.id = t * 100

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

for (let t = 1; t <= 8; t++) {
  teams.push(createTeam(t))
}

///4. Create meet

const meet = (teamA, teamB) => {
  console.log(`Team ${teams[teamA].id} vs Team ${teams[teamB].id}`)
  console.log('====================')
  for (let w = 1; w <= 1; w++) {
    const padTens = w < 10 ? '0' : ''

    const abilityA = teams[teamA][w - 1].abilityScore
    const abilityB = teams[teamB][w - 1].abilityScore

    let scoreA = scoreB = matchPoints= 0


    if (abilityA > abilityB) {
      const matchScore = scores(abilityA, abilityB)
      scoreA = matchScore[0]
      scoreB = matchScore[1]
      matchPts = scoreA > scoreB ? matchScore[2] : 0
    } else {
      const matchScore = scores(abilityB, abilityA)
      scoreA = matchScore[1]
      scoreB = matchScore[0]
      matchPts = scoreA < scoreB ? 0 : matchScore[2]
    }

    console.log(
      `Match ${padTens}${w}: Wrestler ${teams[teamA][w - 1].id}(${
        abilityA
      }) ==> Scored ${scoreA} vs Wrestler ${teams[teamB][w - 1].id}(${
        abilityB
      }) ==> Scored ${scoreB}`
    )
  }
}

meet(0,1)


