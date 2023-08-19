import { useRoomCell } from "./storage";
import { cache, clearCache, clearNextTick } from "./cache";

let extractRegexp: RegExp | null = null;

function clearRoomCache(regexp?: boolean) {
  clearCache();
  regexp && (extractRegexp = null);
}

function isRoomAlias(name: string) {
  return cache.aliasMap && cache.aliasMap.has(name.toLowerCase());
}
function getCellViaAlias(alias: string) {
  return cache.aliasMap && cache.aliasMap.get(alias.toLowerCase());
}

function getRoom(alias: string, keepAlias: boolean) {
  const isAlias = isRoomAlias(alias);
  const cell = isAlias ? getCellViaAlias(alias) : alias;
  const room = cell && cache.roomMap && cache.roomMap.get(cell.toLowerCase());

  if (room) {
    return keepAlias && isAlias ? room.replace(new RegExp(`${cell}$`), alias) : room;
  }
}

function createExtractRegexp() {
  extractRegexp = new RegExp(
    cache.cells.reduce((prev, value) => (prev ? `${prev}|${value}` : value), ""),
    "gi"
  );

  return extractRegexp;
}

function createRoomInformation() {
  clearNextTick();

  if (cache.roomMap && cache.roomMap.size > 0) {
    return;
  }

  const cell = useRoomCell();

  cache.cells = cell.cells;
  cache.aliasMap = cell.aliasMap;
  cache.roomMap = cell.roomMap;
}

/**
 * extract room location
 * @param text raw text
 * @param unique whether to deduplicate
 * @param keepAlias whether to use alias
 *
 * @return rooms
 * Perf 22317 chars, no cache 2.4ms, cache 1.5ms
 */
function extractRoom(text: string, unique = true, keepAlias = false): Array<string> {
  createRoomInformation();
  if (!extractRegexp) {
    createExtractRegexp();
  }

  const rooms: string[] = [];
  const matchResult = text.match(extractRegexp!) || [];

  matchResult.forEach((result) => {
    const room = getRoom(result, keepAlias);
    room && rooms.push(room);
  });

  return unique ? Array.from(new Set(rooms)) : rooms;
}

export { extractRoom, clearRoomCache };
