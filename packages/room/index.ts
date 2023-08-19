import {
  updateBuildings as _updateBuildings,
  updateDivider as _updateDivider,
  type IBuilding,
} from "./src/storage";
import { clearRoomCache } from "./src/extract";

function updateBuildings(buildings: IBuilding[]) {
  _updateBuildings(buildings);
  clearRoomCache(true);
}

function updateDivider(divider: string) {
  _updateDivider(divider);
  clearRoomCache(true);
}

export { updateBuildings, updateDivider, clearRoomCache };
export type { IBuilding, ICell } from "./src/storage";
export { extractRoom } from "./src/extract";
export { updateCacheTime } from "./src/cache";
