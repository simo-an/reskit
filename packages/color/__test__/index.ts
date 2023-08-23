import chalk from "chalk";
import { extractColor } from "../index";

let passed = false;
let caseNumber = 0;
let result: any;
let answer: any;

function judge(exit?: boolean) {
  caseNumber += 1;
  passed = result.toString() === answer.toString();

  if (!passed) {
    console.error(chalk.red(`Failed: ${caseNumber}`, "result: ", result, "answer: ", answer));
  } else {
    console.info(chalk.green(`Succeed: ${caseNumber}`, "result: ", result, "answer: ", answer));
  }
  exit && process.exit(0);
}

result = extractColor("Color is hsla(0, 30.50%, 18.60%, 0.30) and #aaaa11");
answer = ["hsla(0, 30.50%, 18.60%, 0.30)", "#aaaa11"];

judge();

result = extractColor("Color is rgba(62, 33, 33, 0.3) and hsl(0, 0.00%, 66.70%)");
answer = ["rgba(62, 33, 33, 0.3)", "hsl(0, 0.00%, 66.70%)"];

judge();

result = extractColor("Color is rgb(62, 33, 33) and hsl(0, 1%, 66%)");
answer = ["rgb(62, 33, 33)", "hsl(0, 1%, 66%)"];

judge();

result = extractColor("Color is #5c2b2b");
answer = ["#5c2b2b"];

judge();

result = extractColor("Color is #333");
answer = ["#333"];

judge();
