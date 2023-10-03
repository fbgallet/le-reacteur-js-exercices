const unitsAsLetters = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
];
const tensAsLetters = [
  "",
  "dix",
  "vingt",
  "trente",
  "quarante",
  "cinquante",
  "soixante",
  "soixante-dix",
  "quatre-vingt",
  "quatre-vingt-dix",
];
const hundredAsLetter = "cent";
const thousandAsLetters = "mille";
const millionAsLetters = "million";
const billionAsLetters = "milliard";

const numberToDigit = (num) => {
  let digits = [0, 0, 0];
  if (isNaN(num)) {
    console.log("Not a number!");
    return null;
  }

  digits[0] = Math.floor(num % 10);
  digits[1] = Math.floor((num % 100) / 10);
  digits[2] = Math.floor((num % 1000) / 100);
  //digits[3] = Math.floor(num / 1000);

  return digits;
};

const FloatToLetters = (num) => {
  let decimalArray = [];
  decimalArray = num
    .toString()
    .split(".")[1]
    ?.split("")
    .map((n) => parseInt(n));
  num = Math.trunc(num);

  let numberAsLetters = "";
  numberAsLetters += NumberToLetters(num) + " virgule";
  for (let j = 0; j < decimalArray.length; j++) {
    numberAsLetters += " " + NumberToLetters(decimalArray[j]);
  }
  return numberAsLetters;
};

const getNumberToLettersFromSubdivisedLargeNumber = (num) => {
  let numberAsLetters = "";
  let billionPart, millionPart, thousandPart;

  if (num > 999999) {
    if (num > 999999999) {
      billionPart = Math.floor(num / 1000000000);
      numberAsLetters += `${NumberToLetters(billionPart)} ${billionAsLetters}${
        billionPart === 1 ? "" : "s"
      }`;
    }
    if (billionPart) {
      num = num - billionPart * 1000000000;
      numberAsLetters += " ";
    }
    millionPart = Math.floor(num / 1000000);
    if (millionPart > 0)
      numberAsLetters += `${NumberToLetters(millionPart)} ${millionAsLetters}${
        millionPart === 1 ? "" : "s"
      }`;
  }
  if (millionPart) {
    num = num - millionPart * 1000000;
    numberAsLetters += " ";
  }
  thousandPart = Math.floor(num / 1000);
  let thousandPartAsNumber = NumberToLetters(thousandPart);
  if (thousandPart > 0)
    numberAsLetters += `${
      thousandPart > 1 ? thousandPartAsNumber : ""
    } ${thousandAsLetters}`;

  return numberAsLetters;
};

const getLettersForHundredsDigit = (digit, numberAsLetters) => {};

function NumberToLetters(num) {
  let numberAsLetters = "";
  if (num < 0) {
    numberAsLetters += "moins ";
    num = Math.abs(num);
  }
  if (isNaN(num) || num > 999999999999) return "Paramètre invalide";

  if (!Number.isInteger(num)) {
    numberAsLetters += FloatToLetters(num);
    return numberAsLetters;
  }

  if (num > 999) {
    numberAsLetters += getNumberToLettersFromSubdivisedLargeNumber(num);
  }

  let digits = numberToDigit(num);

  if (num < 17) {
    return numberAsLetters + unitsAsLetters[num];
  }

  for (let position = 2; position >= 0; position--) {
    // // fist version with num < 9999 used 4 digits
    // // thousands
    // if (position === 3) {
    //   if (digits[position] !== 0)
    //     numberAsLetters += `${unitsAsLetters[digits[position]]} mille`;
    // }

    // hundreds
    if (position === 2) {
      if (numberAsLetters !== "") numberAsLetters += " ";
      if (digits[2] !== 0)
        if (digits[2] !== 1)
          numberAsLetters += `${unitsAsLetters[digits[2]]} ${hundredAsLetter}${
            digits[1] === 0 && digits[0] === 0 ? "s" : ""
          }`;
        else numberAsLetters += hundredAsLetter;
    }

    // tens
    else if (position === 1) {
      if (numberAsLetters !== "") numberAsLetters += " ";
      if (digits[position] !== 0) {
        let twoDigitsNumber = digits[1] * 10 + digits[0];
        let specialTens = false;
        if (twoDigitsNumber > 70 && twoDigitsNumber < 80) {
          numberAsLetters += `${tensAsLetters[6]}${
            twoDigitsNumber === 71 ? " et " : "-"
          }`;
          specialTens = true;
          twoDigitsNumber -= 60;
        } else if (twoDigitsNumber > 90) {
          numberAsLetters += `${tensAsLetters[8]}-${
            twoDigitsNumber > 96 ? tensAsLetters[1] : ""
          }`;
          specialTens = true;
          twoDigitsNumber -= 80;
        }
        if (specialTens) {
          if (twoDigitsNumber < 17) {
            numberAsLetters += unitsAsLetters[twoDigitsNumber];
            position--;
          }
        } else {
          numberAsLetters += tensAsLetters[digits[1]];
          if (digits[1] === 8 && digits[0] === 0) numberAsLetters += "s";
        }
      }
    }

    // units
    else if (position === 0) {
      if (numberAsLetters !== "") {
        if (num > 16 && digits[0] != 0) {
          if (digits[0] != 1) numberAsLetters += "-";
          else numberAsLetters += " et ";
        }
      }
      if (digits[0] !== 0 || num === 0)
        numberAsLetters += unitsAsLetters[digits[0]];
    }
  }
  return numberAsLetters;
}

// console.log("-5:", NumberToLetters(-5));
// console.log("0:", NumberToLetters(0));
console.log("-1:", NumberToLetters(-1));
console.log("1:", NumberToLetters(1));
console.log("13:", NumberToLetters(13));
console.log("21:", NumberToLetters(21));
// console.log("91:", NumberToLetters(91));
// console.log("180:", NumberToLetters(180));
// console.log("300:", NumberToLetters(300));
console.log("471:", NumberToLetters(471));
console.log("3272:", NumberToLetters(3272));
// console.log("3.1415", NumberToLetters(3.1415));
console.log("1.61803:", NumberToLetters(1.61803));
// console.log("1 000 000:", NumberToLetters(1000000));
console.log("999 999 999 999:", NumberToLetters(999999999999), "\n"); //"42 181 230 932:",
