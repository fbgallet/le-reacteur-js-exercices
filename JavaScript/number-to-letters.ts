const unitsAsLetters: string[] = [
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
const tensAsLetters: string[] = [
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
const hundredAsLetter: string = "cent";
const thousandAsLetters: string = "mille";
const millionAsLetters: string = "million";
const billionAsLetters: string = "milliard";

const numberToDigit = (num: number): number[] | null => {
  let digits: number[] = [0, 0, 0];
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

const FloatToLetters = (num: number): string => {
  let decimalArray: number[] = [];
  decimalArray = num
    .toString()
    .split(".")[1]
    ?.split("")
    .map((n) => parseInt(n));
  num = Math.trunc(num);

  let numberAsLetters: string = "";
  numberAsLetters += NumberToLetters(num) + " virgule";
  for (let j = 0; j < decimalArray.length; j++) {
    numberAsLetters += " " + NumberToLetters(decimalArray[j]);
  }
  return numberAsLetters;
};

const getNumberToLettersFromSubdivisedLargeNumber = (num: number): string => {
  let numberAsLetters: string = "";
  let billionPart: number, millionPart: number, thousandPart: number;

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
  let thousandPartAsNumber: string = NumberToLetters(thousandPart);
  if (thousandPart > 0)
    numberAsLetters += `${
      thousandPart > 1 ? thousandPartAsNumber : ""
    } ${thousandAsLetters}`;

  return numberAsLetters;
};

const getLettersForHundredsDigit = (
  digit: number,
  numberAsLetters: string
): void => {};

function NumberToLetters(num: number): string {
  let numberAsLetters: string = "";
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

  let digits: number[] | null = numberToDigit(num);

  if (num < 17) {
    return numberAsLetters + unitsAsLetters[num];
  }

  if (digits)
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
            numberAsLetters += `${
              unitsAsLetters[digits[2]]
            } ${hundredAsLetter}${
              digits[1] === 0 && digits[0] === 0 ? "s" : ""
            }`;
          else numberAsLetters += hundredAsLetter;
      }

      // tens
      else if (position === 1) {
        if (numberAsLetters !== "") numberAsLetters += " ";
        if (digits[position] !== 0) {
          let twoDigitsNumber: number = digits[1] * 10 + digits[0];
          let specialTens: boolean = false;
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
