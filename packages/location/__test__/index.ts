import { extractLocation, updateLocations, updateDivider } from "../index";
import type { ILocation } from "../index";

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
          { name: "Hangzhou" },
        ],
      },
    ],
  },
]);

console.warn(extractLocation("Let's have a meeting at Gusu tomorrow"));
console.warn(extractLocation("Let's have a meeting at Martis tomorrow"));

const building1: Array<ILocation> = [
  {
    name: "2F",
    items: [
      { name: "Agora", alias: "shengwang" },
      { name: "Stonehenge" },
      {
        name: "East",
        items: [{ name: "Colosseum", alias: ["theatre", "great theatre"] }],
      },
    ],
  },
  {
    name: "3F",
    items: [{ name: "Suzhou", alias: "Gusu" }, { name: "Hangzhou" }],
  },
];

const building2: Array<ILocation> = [
  {
    name: "1F",
    items: [
      { name: "MountHuang", alias: "Mount-Huang" },
      { name: "Chizhou" },
      { name: "Great Wall" },
      { name: "Google" },
    ],
  },
];

const buildings = [
  { name: "Headquarters", items: building1 },
  { name: "Affiliate", items: building2 },
];

updateLocations(buildings);

console.warn(extractLocation("Let's have a meeting at Gusu tonight."));

updateDivider("-");

console.warn(extractLocation("Let's have a meeting at Chizhou and Google tonight.", false));

console.warn(extractLocation("Let's have a meeting at Chizhou! (Chizhou not Hangzhou!).", false));
process.exit(0);

const data = [];
