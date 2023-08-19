import { getPaths } from "@reskit/shared";
import type { TNode } from "@reskit/shared";

interface ILocation extends TNode {
  name: string;
  hide?: boolean;
  alias?: Array<string> | string;
  items?: Array<ILocation>;
}

interface ILocationInformation {
  cells: string[];
  aliasMap: Map<string, string>;
  locationMap: Map<string, string>;
}

let d = "/";
let locations: ILocation[] = [];

let paths: Array<ILocation[]> = [];

function updateDivider(divider: string) {
  d = divider;
}

function updateLocations(value: ILocation[]) {
  locations.length = 0;
  locations.push(...value);
  paths = [];
}

function useLocation(): ILocationInformation {
  const cells = new Set<string>();
  const aliasMap = new Map<string, string>();
  const locationMap = new Map<string, string>();

  if (paths.length === 0) {
    paths = getPaths<ILocation>({ name: "__ROOT__", hide: true, items: locations });
  }

  paths.forEach((path) => {
    let location = "";
    path.forEach((node) => {
      if (node.hide) {
        return;
      }

      location = location ? `${location}${d}${node.name}` : node.name;

      if (!node.alias && node.items && node.items.length > 0) {
        return;
      }

      locationMap.set(node.name.toLowerCase(), location);
      cells.add(node.name.toLowerCase());

      if (!node.alias) {
        return;
      }

      if (typeof node.alias === "string") {
        node.alias = [node.alias];
      }

      node.alias.forEach((alias) => {
        aliasMap.set(alias.toLowerCase(), node.name);
        cells.add(alias.toLowerCase());
      });
    });
  });

  return {
    cells: Array.from(cells),
    aliasMap,
    locationMap,
  };
}

export { updateDivider, updateLocations, useLocation };
export type { ILocation };
