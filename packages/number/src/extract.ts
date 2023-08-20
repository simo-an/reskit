interface ILocalizedRegexp {
  localRegexp: RegExp;
  unitRegexp: RegExp;
  numberRegexp: RegExp;
  localDecimalRegexp: RegExp;
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
  toLocalized: (num: number) => string;
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

function replaceLocalInt(text: string) {
  const intList = text.match(regexp.numberRegexp) || [];
  const unitList = Object.keys(data.unit);

  let result = text;

  intList.forEach((int) => {
    if (!unitList.includes(int)) {
      result = result.replace(int, algorithm.toNumber(int).toString());
    }
  });

  return result;
}

function replaceLocalDecimal(text: string) {
  const decimalList = text.match(regexp.localDecimalRegexp) || [];
  let result = text;

  decimalList.forEach((decimal) => {
    result = result.replace(decimal, algorithm.toNumber(decimal).toString());
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

export {
  replaceLocalInt,
  replaceLocalDecimal,
  replaceMixed,
  updateLocalized,
  updateLocalizedData,
  updateLocalizedAlgorithm,
};
