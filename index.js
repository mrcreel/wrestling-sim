const randomNumberBetween = (min, max, isInteger = 1) => {
  return isInteger
    ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.random() * (max - min + 1) + min
}

const randomNumberFromMeanAndStd_diff = (mean, std_dif) => {
  /**
   * From :https://gist.github.com/ironwallaby/19d0e12fc43091d455ee
   */
  return Math.floor(
    mean + 2.0 * std_dif * (Math.random() + Math.random() + Math.random() - 1.5)
  )
}

const padZeros = (num, test) => {
  return num < test ? `0${num}` : num
}

const weightClasses = [
  { weightClass: 1, minWeight: 94, maxWeight: 106 },
  { weightClass: 2, minWeight: 107, maxWeight: 113 },
  { weightClass: 3, minWeight: 114, maxWeight: 120 },
  { weightClass: 4, minWeight: 121, maxWeight: 126 },
  { weightClass: 5, minWeight: 127, maxWeight: 132 },
  { weightClass: 6, minWeight: 133, maxWeight: 138 },
  { weightClass: 7, minWeight: 139, maxWeight: 145 },
  { weightClass: 8, minWeight: 146, maxWeight: 152 },
  { weightClass: 9, minWeight: 153, maxWeight: 167 },
  { weightClass: 10, minWeight: 168, maxWeight: 189 },
  { weightClass: 11, minWeight: 190, maxWeight: 220 },
  { weightClass: 12, minWeight: 221, maxWeight: 285 },
]

const matchResults = []

const createWrestler = (weightClassIndex, teamIndex) => {
  const wrestler = {}

  const weightClass = weightClassIndex + 1
  const teamId = teamIndex + 1

  wrestler.teamId = teamId
  wrestler.wrestlerId = teamId * 100 + weightClass
  wrestler.wrestlerWeight = randomNumberBetween(
    weightClasses[weightClassIndex].minWeight,
    weightClasses[weightClassIndex].maxWeight
  )
  wrestler.abilityScore = randomNumberFromMeanAndStd_diff(100, 15)
  wrestler.record = { wins: 0, losses: 0 }

  return wrestler
}

const createTeam = (teamIndex) => {
  const teamRoster = []

  for (let weightClassIndex = 0; weightClassIndex < 12; weightClassIndex++) {
    const wrestler = createWrestler(weightClassIndex, teamIndex)
    teamRoster.push(wrestler)
  }

  const teamRosterSize = randomNumberFromMeanAndStd_diff(10, 1)

  const wrestlersToRemove = []
  while (wrestlersToRemove.length < 12 - teamRosterSize) {
    const w2r = randomNumberBetween(0, 11)
    if (wrestlersToRemove.indexOf(w2r) === -1) {
      wrestlersToRemove.push(w2r)
    }
  }

  for (let index = 0; index < wrestlersToRemove.length; index++) {
    const element = wrestlersToRemove[index]
    teamRoster[element] = ''
  }

  return teamRoster
}

const createLeague = (numberOfTeams) => {
  const leagueTeams = []

  for (let idx = 0; idx < numberOfTeams; idx++) {
    leagueTeams.push(createTeam(idx))
  }

  return leagueTeams
}

const leagueTeams = createLeague(2)

const createMatch = (weightClassIndex, teamAid, teamBid) => {
  const matchParticipants = []
  const matchResult = {}
  matchResult.weightClass = weightClassIndex

  const teamAwrestler = leagueTeams[teamAid][weightClassIndex]
  const teamBwrestler = leagueTeams[teamBid][weightClassIndex]

  const abilityDifference = Math.abs(
    teamAwrestler.abilityScore - teamBwrestler.abilityScore
  )

  if (isNaN(abilityDifference)) {
    console.log(`No match in Class ${weightClassIndex}`)
    return /*  */
  } else {
    matchParticipants.teamAwrestler = teamAwrestler
    matchParticipants.teamBwrestler = teamBwrestler
    console.log(matchParticipants)
    const sigma = abilityDifference / 3 < 15 ? 15 : abilityDifference / 3 < 15

    const teamAwrestlerScore = randomNumberFromMeanAndStd_diff(
      teamAwrestler.abilityScore,
      sigma
    )
    const teamBwrestlerScore = randomNumberFromMeanAndStd_diff(
      teamBwrestler.abilityScore,
      sigma
    )

    if (teamAwrestlerScore === teamBwrestlerScore) {
      createMatch(weightClassIndex, teamAid, teamBid)
    }

    console.log(
      `teamAwrestlerScore(${padZeros(
        teamAwrestler.abilityScore,
        100
      )}): ${padZeros(teamAwrestlerScore, 100)}`
    )
    console.log(
      `teamBwrestlerScore(${padZeros(
        teamBwrestler.abilityScore,
        100
      )}): ${padZeros(teamBwrestlerScore, 100)}`
    )

    if (teamAwrestlerScore > teamBwrestlerScore) {
      matchResult.winner = teamAwrestler.teamId
      matchResult.loser = teamBwrestler.teamId
    } else {
      matchResult.winner = teamBwrestler.teamId
      matchResult.loser = teamAwrestler.teamId
    }

    matchResults.push(matchResult)

    console.log(matchResult)
  }
  console.log(matchResults)
  return matchResult
}

createMatch(7, 0, 1)
