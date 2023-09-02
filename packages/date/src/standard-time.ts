import { stdTimeMaskMap } from "./mask";

interface ITime {
  hour: number;
  minute: number;
}

import { useStandardDateRegexp } from "./storage";

let INDEX = 0;
function getIndexI(): string {
  let result = "I";

  for (let i = 0; i < INDEX; i++) {
    result = `${result}I`;
  }

  INDEX++;

  return result;
}

function parseStandardTime(text: string) {
  let result = text;

  const { HHMMRegexp } = useStandardDateRegexp();
  const timeList = (result.match(HHMMRegexp) || []).filter((time) => !!time);

  stdTimeMaskMap.clear();

  timeList.forEach((time) => {
    const [, , hour, , minute] = HHMMRegexp.exec(time) || [];

    const mask = `STD_TIME_MASK_${getIndexI()}_` as const;
    stdTimeMaskMap.set(mask, {
      mask,
      text: time,
      value: {
        hour: parseFloat(hour || "0"),
        minute: parseFloat(minute || "0"),
      },
    });
    result = result.replace(time, mask);

    HHMMRegexp.lastIndex = 0;
  });

  INDEX = 0;

  return result;
}

export { parseStandardTime };
