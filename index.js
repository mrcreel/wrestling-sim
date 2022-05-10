const randomNumberBetween = (min, max, isInteger = 1) => {
  console.log(`random number between ${min} and ${max}`)

  const randomNumberBetween = isInteger
    ? Math.floor(Math.random() * (max - min + 1) + min)
    : Math.random() * (max - min + 1) + min

  console.log(randomNumberBetween)
  return randomNumberBetween
}

const randomNumberFromMeanAndStd_diff = (mean, std_dif) => {
  /**
   * From :https://gist.github.com/ironwallaby/19d0e12fc43091d455ee
   */

  const randomNumberFromMeanAndStd_diff = Math.floor(
    mean + 2.0 * std_dif * (Math.random() + Math.random() + Math.random() - 1.5)
  )

  console.log(
    `randomNumberFromMeanAndStd_diff: ${randomNumberFromMeanAndStd_diff}`
  )

  return randomNumberFromMeanAndStd_diff
}

randomNumberFromMeanAndStd_diff(10, 1)
