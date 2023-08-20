## Install

Install `@reskit/location` by `pnpm`

```shell
pnpm add @reskit/location
```

## Run A Demo

We don't have built in data.
You should set locations by `updateLocations` at first.

```typescript
import { updateLocations, extractLocation } from "@reskit/location";

updateLocations([
  {
    name: "A",
    items: [
      {
        name: "B",
        items: [
          {
            name: "C",
            items: [{ name: "Suzhou", alias: "Gusu" }],
          },
          { name: "Mars", alias: ["Martis", "Huoxing"] },
        ],
      },
    ],
  },
]);
```

```typescript
import { extractLocation, updateBuildings } from "@reskit/location";

console.warn(extractLocation("Let's have a meeting at Gusu tomorrow"));
console.warn(extractLocation("Let's have a meeting at Martis tomorrow"));
```

The output will be

```text
["A/B/C/Suzhou"]
["A/B/Mars"]
```

## Apply to you project

Create a company that have two buildings `Headquarters` and `Affiliate`.

```typescript
const building1 = [
  {
    name: "2F",
    items: [
      { name: "Agora", alias: "shengwang" },
      "Stonehenge",
      {
        name: "East",
        items: [{ name: "Colosseum", alias: ["theatre", "great theatre"] }],
      },
    ],
  },
  {
    name: "3F",
    items: [{ name: "Suzhou", alias: "Gusu" }, "Hangzhou"],
  },
];

const building2 = [
  {
    name: "1F",
    items: [
      { name: "MountHuang", alias: "Mount-Huang" },
      { name: "Chizhou" },
      "Great Wall",
      "Google",
    ],
  },
];

const buildings = [
  { name: "Headquarters", items: building1 },
  { name: "Affiliate", items: building2 },
];
```

Update locations

```typescript
import { updateLocations } from "@reskit/location";

updateLocations(buildings);
```

Extract location from text

```typescript
import { extractLocation, updateLocations } from "@reskit/location";

console.warn(extractLocation("Let's have a meeting at the great theatre tonight."));
```

The console will output

```text
["Headquarters/2F/East/Colosseum"]
```

## Functions

Custom divider

```typescript
import { extractLocation, updateLocations, updateDivider } from "@reskit/location";

updateDivider("-");

console.warn(extractLocation("Let's have a meeting at Gusu tonight."));
```

The console will output

```text
["Headquarters-3F-Suzhou"]
```

Output all the same locations

```typescript
import { extractLocation, updateLocations, updateDivider } from "@reskit/location";

console.warn(extractLocation("Let's have a meeting at Chizhou! (Chizhou not Hangzhou!).", false));
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

Welcome to create PR and make reskit/location better!
