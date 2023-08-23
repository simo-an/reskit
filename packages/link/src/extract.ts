declare let navigator: any;

const CONTROL_CODES = "\\u0000-\\u0020\\u007f-\\u009f";
const WEB_LINK_REGEXP = new RegExp(
  "(?:[a-zA-Z][a-zA-Z0-9+.-]{2,}:\\/\\/|data:|www\\.)[^{\\s'\"}" +
    CONTROL_CODES +
    '"]{2,}[^{\\s\'"}' +
    CONTROL_CODES +
    "\"')}\\],:;.!?]",
  "ug"
);

const WIN_ABSOLUTE_PATH = /(?<=^|\s)(?:[a-zA-Z]:(?:(?:\\|\/)[\w\.-]*)+)/;
const WIN_RELATIVE_PATH = /(?<=^|\s)(?:(?:\~|\.)(?:(?:\\|\/)[\w\.-]*)+)/;
const WIN_PATH = new RegExp(`(${WIN_ABSOLUTE_PATH.source}|${WIN_RELATIVE_PATH.source})`);
const POSIX_PATH = /(?<=^|\s)((?:\~|\.)?(?:\/[\w\.-]*)+)/;
const LINE_COLUMN = /(?:\:([\d]+))?(?:\:([\d]+))?/;
const isWindows =
  typeof navigator !== "undefined"
    ? navigator.userAgent && navigator.userAgent.indexOf("Windows") >= 0
    : false;
const PATH_LINK_REGEXP = new RegExp(
  `${isWindows ? WIN_PATH.source : POSIX_PATH.source}${LINE_COLUMN.source}`,
  "g"
);
const HTML_LINK_REGEXP = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/gi;
const LINK_REGEXPS = [WEB_LINK_REGEXP, PATH_LINK_REGEXP, HTML_LINK_REGEXP];

type LinkKind = "web" | "path" | "html" | "text";
type LinkPart = {
  kind: LinkKind;
  value: string;
  captures: string[];
};

function detectLinks(text: string): LinkPart[] {
  const kinds: LinkKind[] = ["web", "path", "html"];
  const result: LinkPart[] = [];

  function toNext(text: string, regexIndex: number) {
    if (regexIndex >= LINK_REGEXPS.length) {
      return result.push({ value: text, kind: "text", captures: [] });
    }

    const regexp = LINK_REGEXPS[regexIndex];

    let cursor = 0;
    let match;
    regexp.lastIndex = 0;

    while ((match = regexp.exec(text)) !== null) {
      const beforeMatch = text.substring(cursor, match.index);
      beforeMatch && toNext(beforeMatch, regexIndex + 1);

      const value = match[0];
      result.push({
        value: value,
        kind: kinds[regexIndex],
        captures: match.slice(1),
      });
      cursor = match.index + value.length;
    }

    const afterMatches = text.substring(cursor);

    afterMatches && toNext(afterMatches, regexIndex + 1);
  }

  toNext(text, 0);
  return result;
}

export { detectLinks };
