// Generate random number
export function randomNumber (min, max, isInteger = 1) {
  if (isInteger) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    return Math.random() * (max - min + 1) + min;
  }
}

// Generate a random number with mean and standard deviation
///https://gist.github.com/ironwallaby/19d0e12fc43091d455ee
export function normalizedRandomNumber(mean, std) {
  return Math.floor(mean + 2.0 * std * (Math.random() + Math.random() + Math.random() - 1.5))
}
