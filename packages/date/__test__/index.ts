import chalk from "chalk";
import { extractDate, updateLocalized } from "../index";
import { zhLocalize, createZhRegexp } from "../index";

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

updateLocalized({
  useRegexp: createZhRegexp(),
  data: zhLocalize,
});

result = extractDate("今天早上到明天晚上都要开会！");
let d1 = new Date();
d1.setHours(10, 0, 0, 0);
let d2 = new Date();
d2.setDate(d2.getDate() + 1);
d2.setHours(20, 0, 0, 0);
answer = [d1, d2];

judge();
