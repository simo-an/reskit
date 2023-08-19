## Install

Install `@reskit/room` by `pnpm`

```shell
pnpm add @reskit/room
```

## Run Test Demo

We don't have built in data.
You should set buildings by `updateBuildings` at first.

```typescript
import { updateBuildings } from "@reskit/room";

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

```typescript
import { extractRoom, updateBuildings } from "@reskit/room";

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
import type { IBuilding } from "@reskit/room";

const building1 = {
  "2F": [
    { name: "Agora", alias: "shengwang" },
    { name: "Colosseum", alias: ["theatre", "great theatre"] },
    "Stonehenge",
  ],
  "3F": [{ name: "Suzhou", alias: "Gusu" }, "Hangzhou"],
};
const building2 = {
  "1F": [{ name: "MountHuang", alias: "Mount-Huang" }, { name: "Chizhou" }, "Great Wall", "Google"],
};

const building3 = {
  East: [{ name: "Himalayas", alias: "Highest-Mountain" }],
};

const buildings: IBuilding[] = [
  { name: "Headquarters", floorMap: building1 },
  { name: "Affiliate", floorMap: building2 },
  // Building without name
  { floorMap: building3 },
];
```

Update building

```typescript
import { updateBuildings } from "@reskit/room";

updateBuildings(buildings);
```

Extract room location from text

```typescript
import { extractRoom, updateBuildings } from "@reskit/room";

console.warn(extractRoom("Let's have a meeting at Gusu tonight."));
console.warn(extractRoom("Let's have a meeting at Highest-Mountain tonight."));
```

The console will output

```text
["Headquarters/3F/Suzhou"]
[ 'East/Himalayas' ]
```

## Functions

### Custom divider

```typescript
import { extractRoom, updateDivider } from "@reskit/room";

updateDivider("-");

console.warn(extractRoom("Let's have a meeting at Gusu tonight."));
```

The console will output

```text
["Headquarters-3F-Suzhou"]
```

### Output the same room

```typescript
import { extractRoom, updateDivider } from "@reskit/room";

console.warn(extractRoom("Let's have a meeting at Chizhou! (Chizhou not Gusu!).", false));
```

The console will output

```text
[
  "Affiliate-1F-Chizhou",
  "Affiliate-1F-Chizhou",
  "Headquarters-3F-Suzhou"
]
```

### Using alias as the result

```typescript
import { extractRoom } from "@reskit/room";

console.warn(extractRoom("Let's have a meeting at Gusu tonight.", true, true));
```

The console will output

```text
[ 'Headquarters-3F-Gusu' ]
```

## Others

Welcome to create PR and make reskit/room better!
