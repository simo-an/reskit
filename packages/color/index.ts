import { fileToDataURL } from "@reskit/shared";
import type { Color } from "./src/entities/color";
import { extractColorFromImage } from "./src/extract";

const hexRegexp = /[#]([a-fA-F\d]{6}|[a-fA-F\d]{3})/gi;
const rgbRegexp = /[Rr][Gg][Bb][\(](((([\d]{1,3})[\,]{0,1})[\s]*){3})[\)]/gi;
const rgbaRegexp = /[Rr][Gg][Bb][Aa][\(](((([\d]{1,3}|[\d\.]{1,3})[\,]{0,1})[\s]*){4})[\)]/gi;
const hslRegexp = /[Hh][Ss][Ll][\(](((([\d]{1,3}|[\d\.\%]{2,6})[\,]{0,1})[\s]*){3})[\)]/gi;
const hslaRegexp =
  /[Hh][Ss][Ll][Aa][\(](((([\d]{1,3}|[\d\.\%]{2,6}|[\d\.]{1,3})[\,]{0,1})[\s]*){4})[\)]/gi;

let colorRegexp: RegExp;

function extractColor(text: string): string[] {
  if (!colorRegexp) {
    colorRegexp = new RegExp(
      `(${hexRegexp.source}|${rgbRegexp.source}|${rgbaRegexp.source}|${hslRegexp.source}|${hslaRegexp.source})`,
      "gi"
    );
  }
  return text.match(colorRegexp) || [];
}

async function extractImageColor(url: string | File, maxNum: number = 1): Promise<Color[]> {
  // https://github.com/scijs/get-pixels#readme
  // https://github.com/Namide/extract-colors
  if (url instanceof File) {
    url = await fileToDataURL(url);
  }

  return extractColorFromImage(url, maxNum);
}

export { extractColor, extractImageColor };
