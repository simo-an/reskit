interface IToken {
  start: number;
  end: number;
  data: string;
}

const operations = ["+", "-", "*", "/"];
const leftBracket = "(";
const rightBracket = ")";
const brackets = [leftBracket, rightBracket];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const point = ".";
const sign = [...operations, ...brackets, ...numbers, point];
const prefix = ["+", "-", "(", ...numbers];
const divider = [...operations, point];

function isValidMathExpression(expression: string) {
  let bracket = 0;

  for (let i = 0; i < expression.length; i++) {
    const s = expression[i];

    if (s === leftBracket) {
      bracket += 1;
    } else if (s === rightBracket) {
      bracket -= 1;
    }

    if (bracket < 0) {
      return false;
    }

    if (
      i > 0 &&
      divider.includes(expression[i]) &&
      (divider.includes(expression[i - 1]) || i === expression.length - 1)
    ) {
      return false;
    }
  }

  return bracket === 0;
}

function extractFourArithmetic(text: string): IToken[] {
  const tokens: IToken[] = [];

  let start = -1;

  function createToken(end: number) {
    const expression = text.substring(start, end);

    if (isValidMathExpression(expression)) {
      tokens.push({
        start,
        end,
        data: expression,
      });
    }
    start = -1;
  }

  for (let i = 0; i < text.length; i++) {
    const n = text[i];

    if (n === " ") {
      continue;
    }

    const isSign = sign.includes(n);

    if (start === -1 && prefix.includes(n)) {
      start = i;
    }
    if (!isSign && start >= 0) {
      createToken(i);
    }
  }

  if (start >= 0) {
    createToken(text.length);
  }

  return tokens;
}

export { extractFourArithmetic };
