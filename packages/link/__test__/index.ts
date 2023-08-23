import chalk from "chalk";
import { extractLink } from "../index";

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

result = extractLink("the link is: ./usr/local/bin", { includePath: true });
answer = ["./usr/local/bin"];

judge();

result = extractLink("the link is: <a target='_blank' href='http://www.baidu.com/'>Baidu</a>");
answer = ["http://www.baidu.com/"];

judge();

result = extractLink("the link is: rte://xxxx/live-video/live?token=null&uid=null");
answer = ["rte://xxxx/live-video/live?token=null&uid=null"];

judge();

result = extractLink("the link is: https://blog.csdn.net/");
answer = ["https://blog.csdn.net/"];

judge();

result = extractLink("the link is: ftp://192.168.0.111/");
answer = ["ftp://192.168.0.111/"];

judge();

result = extractLink("the link is:https://www.jianshu.com/p/64e5ea5a1e61");
answer = ["https://www.jianshu.com/p/64e5ea5a1e61"];

judge();

result = extractLink("the file link is: file:///D:/Project//samples/index.html");
answer = ["file:///D:/Project//samples/index.html"];

judge();

result = extractLink(
  "the link is: http://www.google.com:80/s?wd=vue#page and visited mailto://www.baidu.com:80/s?wd=vue#page !"
);
answer = ["http://www.google.com:80/s?wd=vue#page", "mailto://www.baidu.com:80/s?wd=vue#page"];

judge();

result = extractLink("the link is: chrome://webrtc-internals/");
answer = ["chrome://webrtc-internals/"];

judge(true);
