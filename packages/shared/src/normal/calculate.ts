import { toNumber, getRangeNumber } from "./number";

type Operation = "+" | "-" | "*" | "/";
type Bracket = "(" | ")";

type Token = Operation | Bracket;

function isLeftBracket(token?: string) {
  return token === "(";
}

function computeTwoNumber(num1: number, num2: number, operation: Token) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return Math.floor(num1 / num2);
    default:
      break;
  }

  return 0;
}

function isPriorityHigher(operation: Token, compared: Token) {
  return ["*", "/"].includes(operation) && ["+", "-"].includes(compared);
}

function calculate(text: string) {
  const nStack: number[] = [];
  const oStack: Token[] = [];

  function compute() {
    if (isLeftBracket(oStack.at(-1))) {
      return;
    }

    const num1 = nStack.pop();
    const num2 = nStack.pop();
    const operation = oStack.pop();

    if (num1 != null && num2 != null && operation) {
      nStack.push(computeTwoNumber(num2, num1, operation));
    }
  }

  function isInsertAvailable(operation: Operation) {
    const head = oStack.at(-1);

    return !head || isLeftBracket(head) || isPriorityHigher(operation, head);
  }

  for (let i = 0; i < text.length; i++) {
    const data = text[i];

    if (data === " ") continue;

    switch (data) {
      case "(": {
        oStack.push(data);
        break;
      }
      case ")": {
        while (oStack.at(-1) !== "(") {
          compute();
        }
        oStack.pop();
        break;
      }

      case "+":
      case "-":
      case "*":
      case "/": {
        let left = i - 1;
        while (left >= 0 && text[left] === " ") {
          left -= 1;
        }

        if (data === "-" && (i === 0 || isLeftBracket(text[left]))) {
          nStack.push(0);
        }
        let insertable = isInsertAvailable(data);

        while (!insertable) {
          compute();
          insertable = isInsertAvailable(data);
        }

        oStack.push(data);
        break;
      }
      default: {
        const { num, index } = getRangeNumber(text, i);

        i = index - 1;
        nStack.push(num);
        break;
      }
    }
  }

  while (oStack.length > 0) {
    compute();
  }

  return nStack[0] || 0;
}

export { calculate };
