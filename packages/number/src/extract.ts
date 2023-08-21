interface ILocalizedRegexp {
  localRegexp: RegExp;
  unitRegexp: RegExp;
  numberRegexp: RegExp;
  mixedNumberRegexp: RegExp;
  localNumberRegexp: RegExp;
  localDecimalRegexp: RegExp;
  localFractionRegexp: RegExp;
  mixedRegexp: RegExp;
}

interface ILocalizedData {
  unit: Record<string, number>;
  localNumber: Record<string, number>;
  numberLocal: Record<number, string>;
  decimalFlag: string;
  regexp: ILocalizedRegexp;
}

interface ILocalizedAlgorithm {
  toNumber: (text: string) => number;
  toLocalized: (num: number | string) => string;
}

let data: ILocalizedData;
let regexp: ILocalizedRegexp;
let algorithm: ILocalizedAlgorithm;

function updateLocalizedData(_data: ILocalizedData) {
  data = _data;
  regexp = _data.regexp;
}

function updateLocalizedAlgorithm(_algorithm: ILocalizedAlgorithm) {
  algorithm = _algorithm;
}

function updateLocalized(_data?: ILocalizedData, _algorithm?: ILocalizedAlgorithm) {
  _data && updateLocalizedData(_data);
  _algorithm && updateLocalizedAlgorithm(_algorithm);
}

function replaceLocalDecimal(text: string) {
  const decimalList = text.match(regexp.localDecimalRegexp) || [];

  let result = text;

  decimalList.forEach((decimal) => {
    result = result.replace(decimal, algorithm.toNumber(decimal).toString());
  });

  return result;
}

function replaceLocalFraction(text: string) {
  const fractionList = text.match(regexp.localFractionRegexp) || [];
  let result = text;

  fractionList.forEach((fraction) => {
    result = result.replace(fraction, algorithm.toNumber(fraction).toString());
  });

  return result;
}

function replaceMixed(text: string) {
  const mixedList = text.match(regexp.mixedRegexp) || [];

  let result = text;

  mixedList.forEach((mixed) => {
    (mixed.match(/\d+/g) || []).forEach((num) => {
      result = result.replace(num, algorithm.toLocalized(parseInt(num)));
    });
  });

  return result;
}

function toFullNumber(text: string) {
  const intList = text.match(regexp.localNumberRegexp) || [];
  const unitList = Object.keys(data.unit);

  let result = text;

  intList.forEach((int) => {
    if (!unitList.includes(int)) {
      result = result.replace(int, algorithm.toNumber(int).toString());
    }
  });

  return result;
}

function toFullLocalized(text: string): string {
  let result = text;

  result = algorithm.toLocalized(text);

  result = replaceLocalDecimal(result);
  result = replaceLocalFraction(result);

  return result;
}

export {
  toFullNumber,
  replaceLocalDecimal,
  replaceLocalFraction,
  replaceMixed,
  toFullLocalized,
  updateLocalized,
  updateLocalizedData,
  updateLocalizedAlgorithm,
};
