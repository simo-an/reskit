## Install

Install `@reskit/number` by `pnpm`

```shell
pnpm add @reskit/number
```

## Preparation

Before use `@reskit/number` to extract number, you should set localized data.

> At version 1.2.0 , we only support chinese

```typescript
import { extractNumber, updateLocalized, replaceNumber } from "../index";
import { zhLocalize, zhAlgorithm, createZhRegexp } from "@reskit/number";

updateLocalized(
  {
    ...zhLocalize,
    regexp: createZhRegexp(),
  },
  zhAlgorithm
);
```

## Run Test Demo

After prepared, run a test demo

```typescript
const result = extractNumber(
  "我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度"
);

console.info(result);
```

The console will output:

```text
[12, 3, 1000, 175000, 18619994211, 23]
```

## Functions

### Keep raw text

```typescript
const result = extractNumber(
  "我想订明天中午十二点的餐馆，三个人，走路1千多米能到，十七点五万元以内，预留手机号为18619994211，明天二十三摄氏度",
  false
);

console.info(result);
```

The console will output:

```text
["十二", "三", "1千", "十七点五万", "18619994211", "二十三"]
```

### Just replace number

```typescript
const result = replaceNumber("造价在十七点五万元以内");

console.info(result);
```

The console will output:

```text
造价在175000元以内
```

## Others

Welcome to create PR and make reskit/number better!
