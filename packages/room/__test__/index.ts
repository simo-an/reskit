import { extractRoom, updateBuildings, updateDivider } from "../index";
import type { IBuilding } from "../index";

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
  { floorMap: building3 },
];

updateBuildings(buildings);

console.warn(extractRoom("Let's have a meeting at Gusu tonight."));
console.warn(extractRoom("Let's have a meeting at Highest-Mountain tonight.", true, true));

updateDivider("-");

console.warn(extractRoom("Let's have a meeting at Chizhou and Google tonight.", false));

console.warn(extractRoom("Let's have a meeting at Chizhou! (Chizhou not Gusu!).", false));

console.warn(extractRoom("Let's have a meeting at Gusu tonight.", true, true));
process.exit(0);
