import { createOrRegexp, createRegexp } from "@reskit/shared";

let dateTimeOffsetMap: Record<string, Record<string, number>> = {};

function useDateTimeOffset(date: string, time: string) {
  if (!dateTimeOffsetMap[date]) {
    return 0;
  }
  const data = dateTimeOffsetMap[date];

  return data && data[time as keyof typeof data];
}

let useTimeOffsetRegexp = (): Record<string, RegExp> => {
  return {};
};

//////////////////////////

let specialTimeMap: Record<string, number> = {};

function useSpecialTime(date: keyof typeof specialTimeMap): number {
  return specialTimeMap[date];
}

let useSpecialTimeRegexp = (): RegExp => {
  return new RegExp("");
};

//////////////////////////
let standardDateMap: Record<string, string> = {};

let useStandardDateRegexp = (): Record<string, RegExp> => {
  return {};
};

//////////////////////////

let dateSplitList = ["~", "-", "—"];
let dateSplitRegexp: RegExp;

function useDateSplitRegexp() {
  if (!dateSplitRegexp) {
    dateSplitRegexp = createOrRegexp(dateSplitList, undefined, undefined, undefined, false);
  }
  dateSplitRegexp.lastIndex = 0;

  return dateSplitRegexp;
}

//////////////////////////
interface IDateTime {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  week?: number;
}

function useCurrentDate(): IDateTime {
  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    week: date.getDay(),
  };
}

function createDateTime(dateTime: IDateTime) {
  const date = new Date();

  if (dateTime.year >= 0) date.setFullYear(dateTime.year);
  if (dateTime.month >= 0) date.setMonth(dateTime.month - 1);
  if (dateTime.date >= 0) date.setDate(dateTime.date);

  if (dateTime.hour >= 0) date.setHours(dateTime.hour);
  if (dateTime.minute >= 0) date.setMinutes(dateTime.minute);

  date.setSeconds(0, 0);

  return date;
}

function isEqualDate(date1: IDateTime, date2: IDateTime) {
  return date1.year === date2.year && date1.month === date2.month && date1.date === date2.date;
}

function setLocalized(localized: {
  useTimeOffsetRegexp: () => Record<string, RegExp>;
  useSpecialTimeRegexp: () => RegExp;
  useStandardDateRegexp: () => Record<string, RegExp>;
  dateSplitList: string[];
  specialTimeMap: Record<string, number>;
  dateTimeOffsetMap: Record<string, Record<string, number>>;
}) {
  useTimeOffsetRegexp = localized.useTimeOffsetRegexp;
  useSpecialTimeRegexp = localized.useSpecialTimeRegexp;
  useStandardDateRegexp = localized.useStandardDateRegexp;

  dateSplitList = localized.dateSplitList;
  specialTimeMap = localized.specialTimeMap;
  dateTimeOffsetMap = localized.dateTimeOffsetMap;
}

export {
  setLocalized,
  isEqualDate,
  dateTimeOffsetMap,
  useTimeOffsetRegexp,
  useDateTimeOffset,
  useSpecialTimeRegexp,
  useSpecialTime,
  useStandardDateRegexp,
  createDateTime,
  useCurrentDate,
  useDateSplitRegexp,
};
