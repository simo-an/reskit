import { useLocation } from "./storage";
import { cache, clearCache, clearNextTick } from "./cache";

let extractRegexp: RegExp | null = null;

function clearLocationCache(regexp?: boolean) {
  clearCache();
  regexp && (extractRegexp = null);
}

function isLocationAlias(name: string) {
  return cache.aliasMap && cache.aliasMap.has(name.toLowerCase());
}
function getCellViaAlias(alias: string) {
  return cache.aliasMap && cache.aliasMap.get(alias.toLowerCase());
}

function getLocation(name: string, keepAlias: boolean) {
  const isAlias = isLocationAlias(name);
  const cell = isAlias ? getCellViaAlias(name) : name;
  const location = cell && cache.locationMap && cache.locationMap.get(cell.toLowerCase());

  if (location) {
    return keepAlias && isAlias ? location.replace(new RegExp(`${cell}$`), name) : location;
  }
}

function createExtractRegexp() {
  extractRegexp = new RegExp(
    cache.cells.reduce((prev, value) => (prev ? `${prev}|${value}` : value), ""),
    "gi"
  );

  return extractRegexp;
}

function createLocationInformation() {
  clearNextTick();

  if (cache.locationMap && cache.locationMap.size > 0) {
    return;
  }

  const cell = useLocation();

  cache.cells = cell.cells;
  cache.aliasMap = cell.aliasMap;
  cache.locationMap = cell.locationMap;
}

/**
 * extract locations
 * @param text raw text
 * @param unique whether to deduplicate
 * @param keepAlias whether to use alias
 *
 * @return locations
 */
function extractLocation(text: string, unique = true, keepAlias = false): Array<string> {
  createLocationInformation();
  if (!extractRegexp) {
    createExtractRegexp();
  }

  const locations: string[] = [];
  const matchResult = text.match(extractRegexp!) || [];

  matchResult.forEach((result) => {
    const location = getLocation(result, keepAlias);
    location && locations.push(location);
  });

  return unique ? Array.from(new Set(locations)) : locations;
}

export { extractLocation, clearLocationCache };
