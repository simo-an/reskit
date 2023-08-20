type RepeatMode = "?" | "+" | "*";

function createRegexp(text: string, flag?: string, format?: Record<string, string>) {
  if (!format) {
    return new RegExp(text, flag);
  }

  let regexpText = text;

  Object.keys(format).forEach((key) => {
    regexpText = regexpText.replace(new RegExp(`{${key}}`, "g"), format[key]);
  });

  return new RegExp(regexpText, flag);
}

function createOrRegexp(
  textList: Array<string | number>,
  repeat?: RepeatMode,
  flag?: string,
  format?: Record<string, string>
): RegExp {
  let regexpText = textList.join("|");

  if (repeat) {
    regexpText = `(${regexpText})${repeat}`;
  }

  return createRegexp(regexpText, flag || "g", format);
}

function createExistRegexp(
  textList: Array<string | number>,
  repeat?: RepeatMode,
  flag?: string
): RegExp {
  let regexpText = `${textList.join("?")}?`;

  if (repeat) {
    regexpText = `(${regexpText})${repeat}`;
  }

  return createRegexp(regexpText, flag || "g");
}

function useTaggedRegexp<T extends string>(
  text: string,
  regexpMap: Record<T, RegExp>
): Record<T, string> {
  const result: Record<string, string> = {};

  Object.entries<RegExp>(regexpMap).forEach(([tag, regexp]) => {
    const matchedList = text.match(regexp) || [];

    matchedList.forEach((matched) => (result[tag] = matched));
  });

  return result;
}

function useNumberRegexp(text: string): Array<number> {
  const result = text.match(/\d+/g) || [];

  return result.map((result) => parseFloat(result));
}

export { createRegexp, createOrRegexp, createExistRegexp, useNumberRegexp, useTaggedRegexp };
