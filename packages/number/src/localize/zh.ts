import { createOrRegexp, createRegexp } from "@reskit/shared";

const toNumMap: Record<string, number> = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
  零: 0,
  〇: 0,
  两: 2,
  半: 0.5,
};

const toLocalMap: Record<number, string> = {
  0: "零",
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
};

const unitMap: Record<string, number> = {
  十: 10,
  百: 100,
  千: 1000,
  万: 10000,
  亿: 100000000,
};
const unitList = Object.keys(unitMap);

const decimalFlag = "点";
const fractionBase = "又";
const fractionFlag = "分之";
const negativeFlag = "负";

const zhLocalize = {
  localNumber: toNumMap,
  numberLocal: toLocalMap,
  unit: unitMap,
  decimalFlag,
};

let localRegexp: RegExp;
let unitRegexp: RegExp;
let numberRegexp: RegExp;
let localNumberRegexp: RegExp;
let mixedNumberRegexp: RegExp;
let localDecimalRegexp: RegExp;
let localFractionRegexp: RegExp;
let localNegativeRegexp: RegExp;

let mixedRegexp: RegExp;

function createZhRegexp() {
  if (!localRegexp) {
    const localNumberList = Object.keys(toNumMap);
    const numberList = Object.keys(toLocalMap);
    const unitList = Object.keys(unitMap);

    const numberLikeList = [...localNumberList, ...unitList];

    localRegexp = createOrRegexp(localNumberList, "+");
    unitRegexp = createOrRegexp(unitList);
    numberRegexp = createOrRegexp(numberList, "+");
    localNumberRegexp = createOrRegexp(numberLikeList, "+");
    mixedNumberRegexp = createOrRegexp([...numberLikeList, ...numberList], "+");

    localDecimalRegexp = createRegexp(`{int}${decimalFlag}{decimal}{unit}`, "g", {
      int: `(${numberLikeList.join("|")})+`,
      decimal: `(${localNumberList.join("|")})+`,
      unit: `(${unitList.join("|")})?(${localNumberList.join("|")})*`,
    });

    localFractionRegexp = createRegexp(
      `{base}${fractionBase}?{denominator}${fractionFlag}{numerator}`,
      "g",
      {
        base: `(${numberLikeList.join("|")})?`,
        denominator: `(${numberLikeList.join("|")})+`,
        numerator: `(${numberLikeList.join("|")})+`,
      }
    );

    localNegativeRegexp = createRegexp(`${negativeFlag}的?{int}`, "g", {
      int: `(${[...numberLikeList, fractionBase, fractionFlag, decimalFlag].join("|")})+`,
    });

    mixedRegexp = createRegexp("{front}{unit}{back}", "g", {
      front: "(\\d+(.\\d+)?)",
      unit: `(${unitList.join("|")})`,
      back: "(\\d+)?",
    });
  }

  return {
    localRegexp,
    unitRegexp,
    numberRegexp,
    mixedNumberRegexp,
    localNumberRegexp,
    localDecimalRegexp,
    localFractionRegexp,
    localNegativeRegexp,
    mixedRegexp,
  };
}

function isUnit(n: string) {
  return unitList.some((u) => u === n);
}
function isStepUnit(n: string) {
  return ["万", "亿"].includes(n);
}
function isZero(n: string) {
  return n === "零";
}

/**
 * convert num|unit|num|unit... to number
 * @param text num|unit|num|unit...
 * @returns num
 */
function convertUnitNumber(text: string): number {
  let sum = 0;
  let prev = 0;
  let prevUnit = "";
  let i = 0;

  while (i < text.length) {
    const n = text[i];

    if (i === 0 && isUnit(n)) {
      sum = unitMap[n];
      i++;
      continue;
    }

    if (isUnit(n)) {
      sum = isStepUnit(n) ? (sum + prev) * unitMap[n] : sum + prev * unitMap[n];
      prevUnit = isZero(text[i + 1]) ? "" : n;
      prev = 0;
      i++;
    }

    let start = i;
    while (i < text.length && !isUnit(text[i])) {
      i++;
    }

    if (i > start) {
      prev = convertNumber(text.substring(start, i));
    }
  }

  if (prevUnit) {
    prev = (prev * unitMap[prevUnit]) / 10;
  }

  return sum + prev;
}

function convertDecimalNumber(text: string) {
  const [intText, decimalText] = text.split(decimalFlag);
  const unit = decimalText.at(-1);

  let int = toNumber(intText.trim());
  let decimal = toNumber(decimalText.trim());

  if (unit && isUnit(unit)) {
    int = int * unitMap[unit];
    let i = 0;
    while (isZero(decimalText[i])) {
      i += 1;
      decimal = decimal / 10;
    }

    return int + decimal / 10;
  }

  return parseFloat(`${int}.${decimal}`);
}

function convertFractionNumber(text: string): number {
  let [baseText, numText] = text.split(fractionBase);

  if (!numText) {
    numText = baseText;
    baseText = "";
  }

  let [denominatorText, numeratorText] = numText.split(fractionFlag);

  let base = baseText ? toNumber(baseText.trim()) : 0;
  let denominator = toNumber(denominatorText.trim());
  let numerator = toNumber(numeratorText.trim());

  return base + numerator / denominator;
}

function convertNegativeNumber(text: string): number {
  text = text.split(negativeFlag)[1];

  if (text.startsWith("的")) {
    text = text.split("的")[1];
  }

  return -toNumber(text);
}

function hasUnit(text: string) {
  let withUnit = unitRegexp.test(text);

  unitRegexp.lastIndex = 0;

  return withUnit;
}

/**
 * convert num|num|num... to number (without unit)
 * @param text
 * @returns
 */
function convertNumber(text: string): number {
  let sum = 0;

  for (let i = 0; i < text.length; i++) {
    sum = sum * 10 + (toNumMap[text[i]] || 0);
  }
  return sum;
}

/**
 * convert number-text to text
 * @param text raw text
 * @returns number
 */
function toNumber(text: string): number {
  if (text.startsWith(negativeFlag)) {
    return convertNegativeNumber(text);
  }
  if (text.includes(decimalFlag)) {
    return convertDecimalNumber(text);
  }
  if (text.includes(fractionFlag)) {
    return convertFractionNumber(text);
  }

  if (hasUnit(text)) {
    return convertUnitNumber(text);
  }

  return convertNumber(text);
}

function convertMixedNumber(text: string): string {
  if (!isNaN(Number(text))) {
    return text;
  }

  let result = text.split("");

  for (let i = 0; i < result.length; i++) {
    const n = parseInt(result[i]);

    if (Number.isInteger(n)) {
      result[i] = toLocalMap[n];
    }

    if (
      result[i] === "." &&
      i !== 0 &&
      1 !== result.length - 1 &&
      mixedNumberRegexp.test(result[i - 1])
    ) {
      mixedNumberRegexp.lastIndex = 0;

      if (mixedNumberRegexp.test(result[i + 1]) || Number.isInteger(parseInt(result[i + 1]))) {
        result[i] = decimalFlag;
      }

      mixedNumberRegexp.lastIndex = 0;
    }
  }

  return result.join("");
}

function toLocalized(num: number | string): string {
  if (typeof num === "string") {
    return convertMixedNumber(num);
  }

  let result = "";
  let index = 0;

  while (num) {
    result = toLocalMap[num % 10] + result;
    num = Math.floor(num / 10);
    index++;
  }

  return result;
}

const zhAlgorithm = {
  toNumber,
  toLocalized,
};

export { zhLocalize, zhAlgorithm };
export { createZhRegexp };
