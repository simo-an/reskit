import { calculate } from "@reskit/shared";
import { extractFourArithmetic } from "./src/extract";

function extractMathExpression(text: string): string[] {
  const tokens = extractFourArithmetic(text);

  return tokens.map((t) => t.data);
}

function computeMathExpression(text: string): string {
  const tokens = extractFourArithmetic(text);
  let result = "";

  let start = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const num = calculate(token.data);
    result = result.concat(text.substring(start, token.start), num.toString());
    start = token.end;
  }

  return result;
}

export { extractMathExpression, computeMathExpression };
