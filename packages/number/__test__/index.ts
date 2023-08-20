import {
  extractNumber,
  updateLocalized,
  replaceLocalInt,
  replaceLocalDecimal,
  replaceMixed,
  replaceNumber,
} from "../index";
import { zhLocalize, zhAlgorithm, createZhRegexp } from "../index";

updateLocalized(
  {
    ...zhLocalize,
    regexp: createZhRegexp(),
  },
  zhAlgorithm
);

let passed = false;
let caseNumber = 0;
let result;
let answer;

function judge(exit?: boolean) {
  caseNumber += 1;
  passed = result.toString() === answer.toString();

  if (!passed) {
    console.error(`Failed: ${caseNumber}`, "result: ", result, "answer: ", answer);
  } else {
    console.info(`Succeed: ${caseNumber}`, "result: ", result, "answer: ", answer);
  }
  exit && process.exit(0);
}
result = extractNumber(
  "我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度",
  false
);
answer = ["十二", "三", "1千", "十七点五万", "18619994211", "二十三"];

judge();

result = extractNumber(
  "我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度"
);
answer = [12, 3, 1000, 175000, 18619994211, 23];

judge();

result = replaceNumber("走路1千多米能到");
answer = "走路1000多米能到";
judge();

result = replaceNumber(
  "我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度"
);
answer =
  "我想订明天中午12点的餐馆，3个人，走路1000多米能到，175000元以内，预留手机号为18619994211，明天23摄氏度";

judge();

result = replaceNumber("造价在十七点五万元以内");
answer = "造价在175000元以内";
judge();

result = zhAlgorithm.toNumber("十七点零五万");
answer = 170500;
judge();

result = zhAlgorithm.toNumber("二零二二");
answer = 2022;
judge();

result = zhAlgorithm.toNumber("一千零八");
answer = 1008;
judge();

result = zhAlgorithm.toNumber("一百零八");
answer = 108;
judge();

result = zhAlgorithm.toNumber("十七万");
answer = 170000;
judge();

result = zhAlgorithm.toNumber("两万三千四百二十三");
answer = 23423;
judge();

result = replaceNumber("走路1千多米能到");
answer = "走路1000多米能到";
judge();

result = replaceMixed("今年是2千零2十年");
answer = "今年是二千零二十年";

judge();

result = zhAlgorithm.toNumber("十三");
answer = 13;

judge();

result = replaceLocalDecimal("答案是十三点一四");
answer = "答案是13.14";

judge();

result = replaceLocalInt("今天是二零二二年的第一天");
answer = "今天是2022年的第1天";

judge();

result = zhAlgorithm.toNumber("三点一");
answer = 3.1;

judge();

result = zhAlgorithm.toLocalized(2002);
answer = "二零零二";
judge();

result = zhAlgorithm.toLocalized(12234);
answer = "一二二三四";
judge();

result = zhAlgorithm.toNumber("二零零二");
answer = 2002;
judge();

result = zhAlgorithm.toNumber("两千两百二十二");
answer = 2222;
judge();

result = zhAlgorithm.toNumber("两千八百五");
answer = 2850;
judge();
