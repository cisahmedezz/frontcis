export function getDateFrom16YearsAgo() {
  var today = new Date();
  var year = today.getFullYear() - 16;
  var month = today.getMonth() + 1; // Adding 1 because getMonth() returns zero-based values (0-11)
  var day = today.getDate();

  // Adjust the date if the current month/day is earlier than the month/day 16 years ago
  if (month < today.getMonth() || (month === today.getMonth() && day < today.getDate())) {
    year--; // Subtract 1 from the year
  }

  var dateFrom16YearsAgo = new Date(year, month - 1, day); // Subtracting 1 from the month to make it zero-based
  return dateFrom16YearsAgo;
}

export function calculateAge(birthdate) {
  var today = new Date();
  var birthDate = new Date(birthdate);

  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();

  // Check if the current month is earlier than the birth month,
  // or if the current month is the same as the birth month
  // but the current day is earlier than the birth day
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function hasDuplicates(arr) {
  const frequencyMap = {};

  for (const item of arr) {
    if (frequencyMap[item]) {
      return true;
    }
    frequencyMap[item] = true;
  }

  return false;
}

export function roundUp(num) {
  // Round up to the nearest whole number
  const roundedNum = Math.ceil(num);

  // Add .00 to the rounded number
  const result = roundedNum + 0.0;

  return result.toFixed(2);
}

export function convertArrayToChunks(inputArray) {
  // Create an object to store items grouped by code
  const groupedItems = {};

  // Iterate through the inputArray
  inputArray.forEach((item) => {
    const code = item.code;

    // If the code doesn't exist in groupedItems, create an empty array for it
    if (!groupedItems[code]) {
      groupedItems[code] = [];
    }

    // Push the item into the corresponding array based on the code
    groupedItems[code].push(item);
  });

  // Convert the groupedItems object into an array of arrays
  const resultArrays = Object.values(groupedItems);

  return resultArrays;
}

export function removeNumbersFromString(inputString) {
  // Use a regular expression to replace all numbers with an empty string
  const stringWithoutNumbers = inputString.replace(/\d/g, "");
  return stringWithoutNumbers;
}
