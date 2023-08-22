import chalk from "chalk";
import { extractMathExpression, computeMathExpression } from "../index";

let passed = false;
let caseNumber = 0;
let result: any;
let answer: any;

function judge(exit?: boolean) {
  caseNumber += 1;
  passed = result.toString() === answer.toString();

  if (!passed) {
    console.info(chalk.red(`Failed: ${caseNumber}`, "result: ", result, "answer: ", answer));
  } else {
    console.info(chalk.green(`Succeed: ${caseNumber}`, "result: ", result, "answer: ", answer));
  }
  exit && process.exit(0);
}

result = computeMathExpression("Calculate 65+28.6+35+71.4");
answer = "Calculate 200";

judge();

result = extractMathExpression("Calculate +1.1+1.2+1.3+1.4");
answer = ["+1.1+1.2+1.3+1.4"];

judge();

result = computeMathExpression("Answer: 1+ 3+(4-5)*6/ 3");
answer = "Answer: 2";

judge();

result = computeMathExpression("Calculate .1+ 3+4-5");
answer = "Calculate .3";

judge();

result = extractMathExpression("Calculate 1+3+(4-5");
answer = [];

judge();

result = extractMathExpression("Calculate 1+3+4-5");
answer = ["1+3+4-5"];

judge(true);
