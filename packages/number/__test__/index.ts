import {
  extractNumber,
  updateLocalized,
  toFullNumber,
  replaceLocalDecimal,
  replaceLocalFraction,
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
  "我想明天中午十二点和三个人走1千多米，花费十七点五万元以内，有百分之四十的概率温度在二十三摄氏度"
);
answer = [12, 3, 1000, 175000, 0.4, 23];

console.warn(result.toString(), answer.toString());

judge(true);

result = extractNumber("答案是负的一又十分之四");
answer = [-1.4];
judge();

result = extractNumber("答案是负十分之三");
answer = [-0.3];
judge();

result = extractNumber("今年是二〇二二年");
answer = [2022];
judge();

result = extractNumber("我有一百万");
answer = [1000000];
judge();

result = replaceNumber("这次考试有百分之五十的人及格了");
answer = "这次考试有0.5的人及格了";
judge();

result = replaceNumber("答案是一又四分之一");
answer = "答案是1.25";
judge();

result = replaceNumber("走路1千多米能到");
answer = "走路1000多米能到";
judge();

result = replaceNumber("整个路程有1.2千米");
answer = "整个路程有1200米";

judge();

result = replaceNumber("这道题的答案是四十分之3百");
answer = "这道题的答案是7.5";

judge();

result = extractNumber("这里有四十分之三的人在说活");
answer = [0.075];

judge();

result = replaceLocalFraction("这里有四分之三的人在说活");
answer = ["这里有0.75的人在说活"];

judge();

result = extractNumber("6月28日，1006个人在1间163平的房间开会", false);
answer = ["6", "28", "1006", "1", "163"];

judge();

result = extractNumber(
  "我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度",
  false
);
answer = ["十二", "三", "1千", "十七点五万", "18619994211", "二十三"];

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

result = replaceMixed("今年是2千零2十年");
answer = "今年是二千零二十年";

judge();

result = zhAlgorithm.toNumber("十三");
answer = 13;

judge();

result = replaceLocalDecimal("答案是十三点一四");
answer = "答案是13.14";

judge();

result = toFullNumber("今天是二零二二年的第一天");
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
