import { dynamicTimeMaskMap, stdDateMaskMap, stdTimeMaskMap, useMaskRegexp } from "./mask";
import { createDateTime, isEqualDate, useCurrentDate, useDateSplitRegexp } from "./storage";

// 获取解析的所有时间列表
function contextAnalysis(text: string) {
  let result = text;

  const dateTimeList: Array<Date> = [];

  const timeList = result.match(useMaskRegexp()) || [];

  if (timeList.length === 0) {
    return dateTimeList;
  }

  const textList: Array<string> = [];

  timeList.forEach((time) => {
    const [prev, next] = result.split(time);

    if (prev) {
      textList.push(prev);
    }
    textList.push(time);
    result = next;
  });
  if (result) {
    textList.push(result);
  }

  const baseline = useCurrentDate();
  const dateTime = {
    year: -1,
    month: -1,
    date: -1,
    hour: 0,
    minute: 0,
  };

  let hasBaseTime = false;
  let hasSTDTime = false;
  let hasSTDDate = false;

  textList.forEach((text) => {
    if (dynamicTimeMaskMap.has(text)) {
      const {
        yearOffset,
        monthOffset,
        weekOffset,
        dayOffset,
        timeOffset,
        hourOffset,
        minuteOffset,
      } = dynamicTimeMaskMap.get(text)!.value;

      hasBaseTime = true;

      if (!hasSTDDate) {
        dateTime.year = yearOffset + baseline.year;
        dateTime.month = monthOffset + baseline.month;
        dateTime.date = dayOffset + baseline.date;
      }
      if (!hasSTDTime) {
        if (isEqualDate(dateTime, baseline)) {
          dateTime.hour = hourOffset + baseline.hour;
          dateTime.minute = minuteOffset + baseline.minute;
        }

        if (weekOffset) {
          const baselineWeek = baseline.week || 7; // 0 -> 7

          dateTime.date = baseline.date + dayOffset + (weekOffset * 7 - baselineWeek);
        }
        if (timeOffset) {
          dateTime.hour = timeOffset;
          dateTime.minute = 0;
        }
      }

      return;
    }
    if (stdTimeMaskMap.has(text)) {
      const stdTime = stdTimeMaskMap.get(text)!.value;

      hasSTDTime = true;

      if (hasBaseTime && dateTime.hour) {
        dateTime.hour = dateTime.hour > 12 && stdTime.hour < 12 ? 12 + stdTime.hour : stdTime.hour;
      } else {
        dateTime.hour = stdTime.hour;
      }

      dateTime.minute = stdTime.minute;

      return;
    }
    if (stdDateMaskMap.has(text)) {
      const stdDate = stdDateMaskMap.get(text)!.value;

      hasSTDDate = true;

      dateTime.year = stdDate.year;
      dateTime.month = stdDate.month;
      dateTime.date = stdDate.day;

      return;
    }

    if (useDateSplitRegexp().test(text)) {
      // include divider
      if (hasBaseTime || hasSTDTime || hasSTDDate) {
        dateTimeList.push(createDateTime(dateTime));
      }

      hasSTDTime = false;
      hasSTDDate = false;
    }
  });

  if (hasBaseTime || hasSTDTime || hasSTDDate) {
    dateTimeList.push(createDateTime(dateTime));
  }

  return dateTimeList;
}

export { contextAnalysis };
