import { detectLinks } from "./src/extract";

interface IExtractLinkOptions {
  toLowerCase?: boolean;
  includePath?: boolean;
}

/**
 * link format: protocol://hostname[:port]/path/[;parameters][?query]#fragment
 * @param text raw text
 * @param options whether convert to lowercase ou extract path link
 * @returns links
 */
function extractLink(text: string, options: IExtractLinkOptions = {}): string[] {
  const tokens = (text && detectLinks(text)) || [];
  const links: string[] = [];

  tokens.forEach(({ kind, value }) => {
    if ((kind === "web" || (options.includePath && kind === "path")) && value) {
      links.push(options.toLowerCase ? value.toLowerCase() : value);
    }
  });

  return links;
}

export { extractLink };
