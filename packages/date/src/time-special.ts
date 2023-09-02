import { useSpecialTime, useSpecialTimeRegexp } from "./storage";
import { toFullNumber } from "@reskit/number";
// 一点半 解析为 1:30
function parseSpecialTime(text: string) {
  let result = text;
  const specialTimeRegexp = useSpecialTimeRegexp();

  const timeList = (result.match(specialTimeRegexp) || []).filter((time) => !!time);

  timeList.forEach((time) => {
    const [hour, minute] = time.replace("分", "").split("点");

    const hh = hour ? `${useSpecialTime(hour as any) || toFullNumber(hour)}` : "00";
    const mm = minute ? `${useSpecialTime(minute as any) || toFullNumber(minute)}` : "00";

    const timeText = `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}`;

    result = result.replace(time, timeText);
  });

  return result;
}

export { parseSpecialTime };
