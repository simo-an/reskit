import { capitalize } from "./utils";

function createEntry(subModule: string) {
  const funcName = `extract${capitalize(subModule)}`;
  const template = `
function ${funcName}(): string {
  console.warn("${funcName}");
  return "${funcName}"
}

export { ${funcName} }
  `;

  return template.trim();
}

function createTestDemo(subModule: string) {
  const funcName = `extract${capitalize(subModule)}`;
  const template = `
import { ${funcName} } from "../index";

let passed = false;
let caseNumber = 0;
let result: any;
let answer: any;

function judge(exit?: boolean) {
  caseNumber += 1;
  passed = result.toString() === answer.toString();

  if (!passed) {
    console.error(\`Failed: \${caseNumber}\`, "result: ", result, "answer: ", answer);
  } else {
    console.info(\`Succeed: \${caseNumber}\`, "result: ", result, "answer: ", answer);
  }
  exit && process.exit(0);
}

result = ${funcName}();
answer = "${funcName}";

judge(true);
  `;

  return template.trim();
}

export { createEntry, createTestDemo };
