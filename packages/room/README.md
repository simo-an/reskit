## Install

Install `@reskit/room` by `pnpm`

```shell
pnpm add @reskit/room
```

## Run Test Demo

We don't have built in datas.
You should set buildings by `updateBuildings` at first.

```typesctipt
import { updateBuildings } from "../index";

updateBuildings([
  {
    name: "GalacticSystem",
    floorMap: {
      SolarSystem: [{ name: "Mars", alias: ["Martis"] }],
    },
  },
]);
```

> That means I create a building `GalacticSystem`.
>
> This building has a floor `SolarSystem`.
>
> At this floor, there is a meeting room `Mars`, we also call the meeeting-room `Martis`.

You can extract the meeting room location from a text by `extractRoom`

```typesctipt
import { extractRoom, updateBuildings } from "../index";

updateBuildings([
  {
    name: "GalacticSystem",
    floorMap: {
      SolarSystem: [{ name: "Mars", alias: ["Martis"] }],
    },
  },
]);

console.warn(extractRoom("Let's have a meeting at Mars tomorrow"));
console.warn(extractRoom("Let's have a meeting at Martis tomorrow"));
```

The output will be

```text
["GalacticSystem/SolarSystem/Mars"]
["GalacticSystem/SolarSystem/Mars"]
```

## Apply to you project

Create a company that have two buildings `Headquarters` and `Affiliate`.

```typescript
const building1 = {
  "2F": [
    { name: "Agora", alias: "shengwang" },
    { name: "Colosseum", alias: ["theatre", "greate theatre"] },
    "Stonehenge",
  ],
  "3F": [{ name: "Suzhou", alias: "Gusu" }, "Hangzhou"],
};
const building2 = {
  "1F": [{ name: "MountHuang", alias: "Mount-Huang" }, { name: "Chizhou" }, "Great Wall", "Google"],
};

const buildings = [
  { name: "Headquarters", floorMap: building1 },
  { name: "Affiliate", floorMap: building2 },
];
```

Update building

```typescript
import { updateBuildings } from "../index";

updateBuildings(buildings);
```

Extract room location from a text

```typescript
import { extractRoom, updateBuildings } from "../index";

console.warn(extractRoom("Let's have a meeting at Gusu tonight."));
```

The console will output

```text
["Headquarters/3F/Suzhou"]
```

Custom divider

```typescript
import { extractRoom, updateBuildings, updateDivider } from "../index";

updateDivider("-");

console.warn(extractRoom("Let's have a meeting at Gusu tonight."));
```

The console will output

```text
["Headquarters-3F-Suzhou"]
```

Output all the same meeting-room

```typescript
import { extractRoom, updateBuildings, updateDivider } from "../index";

console.warn(extractRoom("Let's have a meeting at Chizhou! (Chizhou not Hangzhou!).", false));
```

The console will output

```text
[
  "Affiliate-1F-Chizhou",
  "Affiliate-1F-Chizhou",
  "Headquarters-3F-Hangzhou"
]
```

## Others

Welcome to create PR and make rekKit better!
