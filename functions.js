export function randomNumber (min, max, isInteger = 1) {
  if (isInteger) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    return Math.random() * (max - min + 1) + min;
  }
};

// module.exports = {randomNumber}