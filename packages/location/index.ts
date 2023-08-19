import {
  updateLocations as _updateBuildings,
  updateDivider as _updateDivider,
  type ILocation,
} from "./src/storage";
import { clearLocationCache } from "./src/extract";

function updateLocations(buildings: ILocation[]) {
  _updateBuildings(buildings);
  clearLocationCache(true);
}

function updateDivider(divider: string) {
  _updateDivider(divider);
  clearLocationCache(true);
}

export { updateLocations, updateDivider, clearLocationCache };
export type { ILocation } from "./src/storage";
export { extractLocation } from "./src/extract";
export { updateCacheTime } from "./src/cache";
