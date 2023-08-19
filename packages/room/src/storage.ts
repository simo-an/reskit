type ICell =
  | {
      name: string;
      alias?: Array<string> | string;
    }
  | string;
type IBuilding = {
  name?: string;
  floorMap: Record<TFloor, ICell[]>;
};
type TFloor = "1F" | "2F" | "3F" | "4F" | "5F" | "6F" | "7F" | "8F" | `${number}F` | string;

const buildings: IBuilding[] = [];

let d = "/";

interface IRoomInformation {
  cells: Array<string>;
  aliasMap: Map<string, string>;
  roomMap: Map<string, string>;
}

function useRoomCell(): IRoomInformation {
  const cells = new Set<string>();
  const aliasMap = new Map<string, string>();
  const roomMap = new Map<string, string>();

  function addRoom(cell: ICell, floor: TFloor, building?: string) {
    const cellName = typeof cell !== "string" ? cell.name : cell;

    cells.add(cellName);
    roomMap.set(
      cellName.toLowerCase(),
      building ? `${building}${d}${floor}${d}${cellName}` : `${floor}${d}${cellName}`
    );

    if (typeof cell === "string") {
      return;
    }

    if (typeof cell.alias === "string") {
      aliasMap.set(cell.alias.toLowerCase(), cell.name);
      return cells.add(cell.alias);
    }
    if (Array.isArray(cell.alias)) {
      cell.alias.forEach((alias) => {
        aliasMap.set(alias.toLowerCase(), cell.name);
        cells.add(alias);
      });
    }
  }

  buildings.forEach(({ name, floorMap }) => {
    Object.entries(floorMap).forEach(([floor, rooms]) => {
      rooms && rooms.forEach((room) => addRoom(room, floor, name));
    });
  });

  return {
    cells: Array.from(cells),
    aliasMap,
    roomMap,
  };
}

function updateBuildings(value: IBuilding[]) {
  buildings.length = 0;
  buildings.push(...value);
}

function updateDivider(divider: string = "-") {
  d = divider;
}

export { type IBuilding, type ICell, updateBuildings, useRoomCell, updateDivider };
