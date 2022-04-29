import fs from "fs"

// Generate random number
export function randomNumber(min, max, isInteger = 1) {
  if (isInteger) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  } else {
    return Math.random() * (max - min + 1) + min
  }
}
// randomNumber(3,18)

// Generate a random number by mean and standard deviation
///https://gist.github.com/ironwallaby/19d0e12fc43091d455ee
export function normalizedRandomNumber(mean, std) {
  return Math.floor(
    mean + 2.0 * std * (Math.random() + Math.random() + Math.random() - 1.5)
  )
}
// normalizedRandomNumber(100, 15)

export function padZeros(num, test) {
  return num < test ? `0${num}` : num
}

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

  fs.writeFileSync("./data/weightClasses.json", JSON.stringify(weightClasses))
}
// initWeightClasses

export function generateResultMatrix(numTeams) {
  const resultMatrix = []

  for (let cl = 1; cl <= 12; cl++) {
    const classArray = []
    for (let tr = 1; tr <= numTeams; tr++) {
      const wrestler = {
        id: tr * 100 + cl,
        weightClass: cl,
        teamId: tr * 100,
        matches: 0,
        wins: 0,
        losses: 0,
        points: 0,
      }

      classArray.push(wrestler)
    }

    resultMatrix.push(classArray)
  }
  fs.writeFileSync("./data/resultMatrix.json", JSON.stringify(resultMatrix))
  return resultMatrix
}
// generateResultsMatrix(11)

export function generateWrestler(teamId, weightClass) {
  const wrestler = {}

  wrestler.teamId = teamId
  wrestler.wrestlerId = teamId + weightClass

  const weightClasses = JSON.parse(fs.readFileSync("./data/weightClasses.json"))
  wrestler.weightClass = weightClass
  wrestler.weight = randomNumber(
    weightClasses[weightClass - 1].minWeight,
    weightClasses[weightClass - 1].maxWeight
  )

  const attributeScore = normalizedRandomNumber(100, 15)
  wrestler.attributeScore = attributeScore

  return wrestler
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
  wrestlersToRemove.forEach((ele) => {
    team[ele] = ""
  })
  return team
}
// generateTeam(4)

// Denerate league and write it to a JSON file
export function generateLeague(numTeams) {
  const league = []

  for (let tId = 1; tId <= numTeams; tId++) {
    const team = generateTeam(tId)
    league.push(team)
  }
  fs.writeFileSync("./data/league.json", JSON.stringify(league))
  return league
}
// generateLeague(20)

// Generate match
export function generateMatch(team1, team2, matchClass, resultMatrix) {
  let arrResultMatrix = []

  if (resultMatrix !== undefined) {
    arrResultMatrix = resultMatrix
  } else {
    arrResultMatrix = JSON.parse(fs.readFileSync("./data/resultMatrix.json"))
  }

  let league = JSON.parse(fs.readFileSync("./data/league.json"))
  console.log(arguments)

  const matchParticipants = []
  for (let x = 0; x < 2; x++) {
    const participant = {}
    console.log(x)

    const stats = arrResultMatrix[arguments[2] - 1][x + 1]
    const info = league[arguments[x] - 1][arguments[2] - 1]

    console.log("stats:", stats)

    /*
    console.log("info", info)

    participant.teamId = arguments[x]
    participant.weightClass = arguments[2]
    participant.weight = info.weight
    participant.attributeScore = info.attributeScore

    console.log("participant", participant)

    matchParticipants.push(participant)
    */
  }

  console.log(matchParticipants)
  return

  const w2teamId = Math.floor(wrestler2 / 100)
  const w2id = wrestler2 - w2teamId * 100
  const w2info = league[w2teamId - 1][w2id - 1]

  const sigma =
    Math.abs((w1info.attributeScore - w2info.attributeScore) / 3) > 15
      ? Math.abs((w1info.attributeScore - w2info.attributeScore) / 3)
      : 15
  const w1Score = normalizedRandomNumber(w1info.attributeScore, sigma)
  const w2Score = normalizedRandomNumber(w2info.attributeScore, sigma)
  // If tie, rerun match function
  if (w1Score === w2Score) {
    generateMatch(wrestler1, wrestler2, resultMatrix)
  }

  const diffs = Math.abs(w1Score - w2Score) / sigma

  let matchResult =
    diffs >= 3
      ? [6, ""]
      : diffs >= 2
      ? [5, "Technical Fall"]
      : diffs >= 1
      ? [4, "Major Decision"]
      : [3, "Decision"]
  if (diffs >= 3) {
    const bigWinResult = randomNumber(1, 4)
    switch (bigWinResult) {
      case 1:
        matchResult[1] = "Fall"
        break
      case 2:
        matchResult[1] = "Forfeit"
        break
      case 3:
        matchResult[1] = "Default"
        break
      default:
        matchResult[1] = "Disqualification"
        break
    }
  }

  let winner = ""
  let loser = ""
  let teamResult = []

  if (w1Score > w2Score) {
    winner = w1info.wrestlerId
    loser = w2info.wrestlerId
    teamResult = [
      w1teamId * 100,
      w2teamId * 100,
      matchResult[0],
      matchResult[1],
      winner,
      loser,
      w1info.weightClass,
    ]

    resultMatrix[classOfMatch][w1teamId - 1][2]++
    resultMatrix[classOfMatch][w1teamId - 1][3]++
    resultMatrix[classOfMatch][w1teamId - 1][5] += teamResult[2]
    resultMatrix[classOfMatch][w2teamId - 1][2]++
    resultMatrix[classOfMatch][w2teamId - 1][4]++
  } else {
    winner = w2info.wrestlerId
    loser = w1info.wrestlerId
    teamResult = [
      w2teamId * 100,
      w1teamId * 100,
      matchResult[0],
      matchResult[1],
      winner,
      loser,
      w2info.weightClass,
    ]

    resultMatrix[classOfMatch][w2teamId - 1][2]++
    resultMatrix[classOfMatch][w2teamId - 1][3]++
    resultMatrix[classOfMatch][w2teamId - 1][5] += teamResult[2]
    resultMatrix[classOfMatch][w1teamId - 1][2]++
    resultMatrix[classOfMatch][w1teamId - 1][4]++
  }
  return [teamResult, resultMatrix]
}
// generateMatch(106, 206)

export function generateDualMeet(team1, team2) {
  //Import stats
  const league = JSON.parse(fs.readFileSync("./data/league.json"))
  const resultMatrix = JSON.parse(fs.readFileSync("./data/classResults.json"))

  const team1roster = league[Math.floor(team1 / 100) - 1]
  const team2roster = league[Math.floor(team2 / 100) - 1]
  const meetTeamScoring = []

  let m = 1
  console.log(`Team ${team1} vs Team ${team2}`)

  const team1scoring = {
    teamId: team1,
    matches: 0,
    wins: 0,
    losses: 0,
    points: 0,
  }
  meetTeamScoring.push(team1scoring)
  const team2Scoring = {
    teamId: team2,
    matches: 0,
    wins: 0,
    losses: 0,
    points: 0,
  }
  meetTeamScoring.push(team2Scoring)

  const results = []
  for (let matchClass = 0; matchClass < 12; matchClass++) {
    const undefCheck =
      team1roster[matchClass].wrestlerId === undefined ||
      team2roster[matchClass].wrestlerId === undefined
    if (!undefCheck) {
      const result = generateMatch(
        team1roster[matchClass].wrestlerId,
        team2roster[matchClass].wrestlerId,
        resultMatrix
      )
      results.push(result[0])

      console.log(
        `Match ${padZeros(m, 10)}: Class: ${padZeros(
          matchClass + 1,
          10
        )} => Wrestler ${padZeros(
          result[0][4],
          1000
        )} defeated Wrestler ${padZeros(result[0][5], 1000)} by ${
          result[0][3]
        } for ${result[0][2]} points`
      )
      meetTeamScoring[0].matches++
      meetTeamScoring[1].matches++

      if (Math.floor(result[0][4] / 100) * 100 === team1) {
        meetTeamScoring[0].wins++
        meetTeamScoring[0].points += result[0][2]
        meetTeamScoring[1].losses++
      } else {
        meetTeamScoring[1].wins++
        meetTeamScoring[1].points += result[0][2]
        meetTeamScoring[0].losses++
      }
      m++
    }
  }
  console.log(
    "=========================================================================================="
  )
  console.log(meetTeamScoring)
  fs.writeFileSync("./data/classResults.json", JSON.stringify(resultMatrix))
  return [meetTeamScoring, resultMatrix, results, meetTeamScoring]
}
// generateDualMeet(1000, 200)
