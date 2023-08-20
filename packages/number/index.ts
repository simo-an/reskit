import { replaceLocalDecimal, replaceLocalInt, replaceMixed } from "./src/extract";
import { createOrRegexp, useNumberRegexp } from "@reskit/shared";

/**
 * replace localized number to Arabic numerals
 * @param text
 */
function replaceNumber(text: string): string {
  let result = text;

  result = replaceLocalDecimal(result);
  result = replaceMixed(result);
  result = replaceLocalInt(result);

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

  if (convert) {
    return numResult;
  }

  const existTextList = textResult.split(createOrRegexp(numResult));
  const convertTextList = text.split(createOrRegexp(existTextList));

  return convertTextList.filter((text) => !!text);
}

export { extractNumber, replaceNumber };

export * from "./src/extract";
export * from "./src/localize";
