import chalk from "chalk";
import { diff, union, intersect } from "../src/algorithm/dc/set";

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

result = Array.from(diff([1, 2, 3], [2, 3, 4]));
answer = [1];

judge();

result = Array.from(union([1, 2, 3], [2, 3, 4]));
answer = [1, 2, 3, 4];

judge();

result = Array.from(intersect([1, 2, 3], [2, 3, 4]));
answer = [2, 3];

judge();

class User {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  toString() {
    return `${this.id}:${this.name}`;
  }
}

result = Array.from(
  diff(
    [new User(1, "1"), new User(2, "2"), new User(3, "3")],
    [new User(2, "2"), new User(3, "3"), new User(4, "4")],
    "id"
  )
);
answer = [new User(1, "1")];

judge();

result = Array.from(
  union(
    [new User(1, "1"), new User(2, "2"), new User(3, "3")],
    [new User(2, "2"), new User(3, "3"), new User(4, "4")],
    "id"
  )
);
answer = [new User(1, "1"), new User(2, "2"), new User(3, "3"), new User(4, "4")];

judge();

result = Array.from(
  intersect(
    [new User(1, "1"), new User(2, "2"), new User(3, "3")],
    [new User(2, "2"), new User(3, "3"), new User(4, "4")],
    "id"
  )
);
answer = [new User(2, "2"), new User(3, "3")];

judge();
