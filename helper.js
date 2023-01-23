function checkNumbers(inNumbers) {
  const results = {};

  const inNums = inNumbers.split(",");

  let nbrText;
  for (let idx = 0; idx < inNums.length; idx++) {
    nbrText = inNums[idx] * 1;
    if (isNaN(nbrText)) {
      results["numbersAreValid"] = false;
      results["message"] = `'nums=${inNumbers}' is not valid. '${inNums[
        idx
      ].trim()}' not a number.`;
      return results;
    }
    inNums[idx] = 1 * nbrText;
  }

  results["numbersAreValid"] = true;
  results["validatedNumbers"] = inNums;

  return results;
}

function calcMean(numbers) {
  // function calculates the mean of the numbers in the numbers array.
  // numbers must be checked for valid values BEFORE calling calcMean.

  let mean = 0.0;
  // total number via forEach
  numbers.forEach((number) => {
    mean = mean + number;
  });

  return mean / numbers.length;
}

function calcMedian(numbers) {
  /* function calculates the statistical median (middle) of the numbers in the numbers array.
     numbers must be checked for valid values BEFORE calling calcMedian.
  */

  let median;

  numbers.sort((a, b) => a - b);

  if (numbers.length % 2 === 0) {
    // even amount of numbers. Median is the average of the 2 middle numbers.
    let idx = numbers.length / 2;
    median = (numbers[idx - 1] + numbers[idx]) / 2.0;
  } else {
    // odd amount of numbers. Median is the middle number.
    let idx = Math.floor(numbers.length / 2.0);
    median = numbers[idx];
  }

  return median;
}

function calcMode(numbers) {
  /* function calculates the statistical mode (the number(s) that appeared the most) of the 
     numbers in the numbers array.
     numbers must be checked for valid values BEFORE calling calcMode.
  */

  const freq = {};

  // number frequency via forEach
  numbers.forEach((number) => {
    if (freq[number]) {
      freq[number] = freq[number] + 1;
    } else {
      freq[number] = 1;
    }
  });

  // freq is an oject with the number of times a number appeared in the
  //  numbers list.
  // for mode: find the number(s) that appeared the most
  // .clear() to clear the set, .add() to add to the set
  const mode = new Set();
  const keys = Object.keys(freq);
  let maxTimes = 0;
  keys.forEach((key) => {
    if (freq[key] > maxTimes) {
      maxTimes = freq[key];
      mode.clear();
      mode.add(key);
    } else {
      if (freq[key] === maxTimes) {
        mode.add(key);
      }
    }
  });

  return `${[...mode]}`;
}

function buildResponse(inOperation, inValue) {
  /* buildResponse builds the response object:
    {
      response: {
        "operation": inOperation,
        "value": inValue
      }
    }

  */

  return {
    response: {
      operation: inOperation,
      value: inValue,
    },
  };
}

module.exports = {
  buildResponse,
  calcMode,
  calcMedian,
  calcMean,
  checkNumbers,
};
