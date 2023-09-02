import { replaceNumber } from "@reskit/number";
import { parseBaseTime } from "./time-base";
import { parseSpecialTime } from "./time-special";
import { parseStandardDate } from "./standard-date";
import { contextAnalysis } from "./analysis";
import { updateLocalized as updateLocalizedNumber } from "@reskit/number";
import { setLocalized } from "./storage";

let isLocalized = false;

function extractDate(text: string) {
  let result = text;

  if (!isLocalized && typeof __DEV__ === "boolean" && __DEV__) {
    console.warn("@reskit/date not localized.");
  }

  result = parseBaseTime(result);
  result = parseSpecialTime(result);
  result = replaceNumber(result);

  result = parseSpecialTime(result);
  result = parseStandardDate(result);

  const dates = contextAnalysis(result);

  return dates;
}

interface ILocalizedData {
  useRegexp: {
    useTimeOffsetRegexp: () => Record<string, RegExp>;
    useSpecialTimeRegexp: () => RegExp;
    useStandardDateRegexp: () => Record<string, RegExp>;
  };
  data: {
    dateSplitList: string[];
    specialTimeMap: Record<string, number>;
    dateTimeOffsetMap: Record<string, Record<string, number>>;
    zhNumber: {
      data: any;
      algorithm: any;
    };
  };
}

function updateLocalized({ useRegexp, data }: ILocalizedData) {
  updateLocalizedNumber(data.zhNumber.data, data.zhNumber.algorithm);

  setLocalized({
    ...useRegexp,
    ...data,
  });

  isLocalized = true;
}

export { extractDate, updateLocalized };
