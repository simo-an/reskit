import { replaceNumber } from "@reskit/number";
import { useTaggedRegexp, useNumberRegexp } from "@reskit/shared";
import { useCurrentDate, useDateTimeOffset, useTimeOffsetRegexp } from "./storage";
import { dynamicTimeMaskMap } from "./mask";

const timeOffsetList = [
  "yearOffset",
  "monthOffset",
  "weekOffset",
  "dayOffset",
  "hourOffset",
  "minuteOffset",
] as const;

const timeNameList = ["year", "month", "week", "day", "time"] as const;

type TDateTimeOffset = (typeof timeOffsetList)[number] | (typeof timeNameList)[number];

type PRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type IDateTimeOffsetText = PRecord<TDateTimeOffset, string>;

let INDEX = 0;
function getIndexI(): string {
  let result = "I";

  for (let i = 0; i < INDEX; i++) {
    result = `${result}I`;
  }

  INDEX++;

  return result;
}

function getDateTimeOffset(offsetText: IDateTimeOffsetText) {
  const offset = {
    // 与当前时间的偏差
    yearOffset: 0,
    monthOffset: 0,
    weekOffset: 0,
    dayOffset: 0,
    timeOffset: 0,
    hourOffset: 0,
    minuteOffset: 0,
  };

  Object.keys(offsetText).forEach((key) => {
    const text = offsetText[key as TDateTimeOffset];

    if (!text) {
      return;
    }

    const value = replaceNumber(text);
    const numList = useNumberRegexp(value);

    if (numList.length > 0 && value.includes("前")) {
      numList[0] = -numList[0];
    }

    if (key === "week" || key === "weekOffset") {
      if (key === "weekOffset" && numList.length > 0) offset.weekOffset += numList[0];
      if (key === "week" && numList.length === 0) offset.weekOffset += useDateTimeOffset(key, text);

      if (key === "week" && numList.length > 0) {
        let week = value;

        numList.forEach((num) => (week = week.replace(num.toString(), "")));

        offset.dayOffset += numList[0];
        offset.weekOffset += useDateTimeOffset(key, week);

        if (offset.weekOffset === 0) {
          // 本周时
          offset.dayOffset = offset.dayOffset - (useCurrentDate().week || 7);
        }

        offsetText[key] = week;
      }
    }

    if (key === "year" || key === "yearOffset") {
      if (key === "year") offset.yearOffset += useDateTimeOffset(key, text);
      if (key === "yearOffset" && numList.length > 0) offset.yearOffset += numList[0];
    }

    if (key === "month" || key === "monthOffset") {
      if (key === "month") offset.monthOffset += useDateTimeOffset(key, text);
      if (key === "monthOffset" && numList.length > 0) offset.monthOffset += numList[0];
    }

    if (key === "day" || key === "dayOffset") {
      if (key === "day") offset.dayOffset += useDateTimeOffset(key, text);
      if (key === "dayOffset" && numList.length > 0) offset.dayOffset += numList[0];
    }

    if (key === "time") {
      offset.timeOffset = useDateTimeOffset(key, text);
    }

    if (key === "hourOffset" || key === "minuteOffset") {
      if (numList.length > 0) offset[key] = numList[0];
    }
  });

  return offset;
}

function parseBaseTime(text: string) {
  let result = text;

  const regexp = useTimeOffsetRegexp();
  const regexpMap = {
    yearOffset: regexp.yearOffsetRegexp,
    monthOffset: regexp.monthOffsetRegexp,
    weekOffset: regexp.weekOffsetRegexp,
    dayOffset: regexp.dayOffsetRegexp,
    hourOffset: regexp.hourOffsetRegexp,
    minuteOffset: regexp.minuteOffsetRegexp,
    year: regexp.yearRegexp,
    month: regexp.monthRegexp,
    week: regexp.weekRegexp,
    day: regexp.dayRegexp,
    time: regexp.timeRegexp,
  };
  const timeList = (result.match(regexp.offsetRegexp) || []).filter((time) => !!time);

  dynamicTimeMaskMap.clear();

  timeList.forEach((time) => {
    const offset = useTaggedRegexp(time, regexpMap);

    Object.keys(offset).forEach((key) => {
      if (key === "week") {
        offset[key] = offset[key].replace(/[天日末]/g, "七");
      }

      offset[key as TDateTimeOffset] = offset[key as TDateTimeOffset].replace("的", "");
    });

    const mask = `DY_TIME_MASK_${getIndexI()}_` as const;
    dynamicTimeMaskMap.set(mask, {
      mask,
      text: time,
      value: getDateTimeOffset(offset),
    });
    result = result.replace(time, mask);
  });

  INDEX = 0;

  return result;
}

export { parseBaseTime };
