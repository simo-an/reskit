import chalk from "chalk";
import { extractEmoji, extractCommonEmoji } from "../index";

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

result = extractEmoji("this is the emoji 😁😃😆");
answer = ["😁", "😃", "😆"];
judge();

result = extractCommonEmoji("Hello ❤🧡💛💚💙💜🤎");
answer = ["❤", "🧡", "💛", "💚", "💙", "💜", "🤎"];

judge();

result = extractEmoji("👍🏻👍🏼👍🏽👍🏾👍🏿");
answer = ["👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿"];

judge();
