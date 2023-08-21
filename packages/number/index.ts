import { toFullNumber, toFullLocalized } from "./src/extract";
import { createOrRegexp, useNumberRegexp } from "@reskit/shared";

/**
 * replace localized number to Arabic numerals
 * @param text
 */
function replaceNumber(text: string): string {
  let result = text;

  result = toFullLocalized(result);
  result = toFullNumber(result);

  return result;
}

/**
 * extract number from text
 * @param text raw text
 * @param keepRaw whether convert localize number to Arabic numerals
 */
function extractNumber(text: string, convert?: boolean): Array<number>;
function extractNumber(text: string, convert: boolean = true): Array<number | string> {
  const textResult = replaceNumber(text);
  const numResult = useNumberRegexp(textResult);

  if (convert || numResult.length === 0) {
    return numResult;
  }

  const numRegexp = createOrRegexp(numResult.sort((a, b) => String(b).length - String(a).length));
  const existTextList = textResult
    .split(numRegexp)
    .filter((item) => !!item)
    .sort((a, b) => b.length - a.length);

  return text.split(createOrRegexp(existTextList)).filter((text) => !!text);
}

export { extractNumber, replaceNumber };

export * from "./src/extract";
export * from "./src/localize";
