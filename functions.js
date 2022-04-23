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

export function initWeightClasses(){
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
  return weightClasses
}

export function generateWrestler(index, teamId){
  const weightClasses = initWeightClasses()
  const wrestler = {}

  wrestler.id = 100 * teamId + index
  wrestler.wtClass = index
  wrestler.weight = randomNumber(weightClasses[index-1].minWeight, weightClasses[index-1].maxWeight)
  wrestler.attribute = normalizedRandomNumber(100,15)
  wrestler.stats = [0, 0, 0] /// [matches, wins, points]

  return wrestler
}

export function createTeam(teamId){

  const team = []

  for (let w = 1; w <= 12; w++) {
    let wrestler = generateWrestler(w, teamId)
    team.push(wrestler)
  }

  const teamSize = normalizedRandomNumber(10, 1)

  for (let r = 0; r < 12 - teamSize; r++) {
    const toRemove = randomNumber(0, team.length)
    team.splice(toRemove, 1)
  }
  return team
}

export function createLeague(numTeams){
  const teams = []
  for(let t = 1; t <= numTeams; t++){
    const team = {}
    team.id = 100 * t
    team.wrestlers = createTeam(t)

    console.log(t, team)

    teams.push(team)
  }
}
