interface IDateTimeOffset {
  yearOffset: number;
  monthOffset: number;
  weekOffset: number;
  dayOffset: number;
  timeOffset: number;
  hourOffset: number;
  minuteOffset: number;
}

interface IDate {
  year: number;
  month: number;
  day: number;
}

interface ITime {
  hour: number;
  minute: number;
}

interface IBaseTimeMask {
  mask: string;
  text: string;
  value: IDateTimeOffset;
}
interface ISTDDateMask {
  mask: string;
  text: string;
  value: IDate;
}
interface ISTDTimeMask {
  mask: string;
  text: string;
  value: ITime;
}

const dynamicTimeMaskMap = new Map<`DY_TIME_MASK_${string}_` | string, IBaseTimeMask>();
const stdDateMaskMap = new Map<`STD_DATE_MASK_${string}_` | string, ISTDDateMask>();
const stdTimeMaskMap = new Map<`STD_TIME_MASK_${string}_` | string, ISTDTimeMask>();

let maskRegexp: RegExp;
function useMaskRegexp() {
  if (!maskRegexp) {
    maskRegexp = /(DY|STD)_(TIME|DATE)_MASK_I+_/g;
  }

  return maskRegexp;
}

export { dynamicTimeMaskMap, stdDateMaskMap, stdTimeMaskMap, useMaskRegexp };
