interface ILocationCache {
  cells: string[];
  aliasMap: Map<string, string> | null;
  locationMap: Map<string, string> | null;
}
let cache: ILocationCache = {
  cells: [],
  aliasMap: null,
  locationMap: null,
};
let __CACHE_TIME__ = 5 * 60 * 1000;
let cacheTimer: NodeJS.Timeout | number | null;

function clearNextTick() {
  if (cacheTimer) {
    clearTimeout(cacheTimer);
    cacheTimer = null;
  }

  cacheTimer = setTimeout(clearCache, __CACHE_TIME__);
}

function clearCache() {
  cache.cells.length = 0;
  cache.aliasMap && cache.aliasMap.clear();
  cache.locationMap && cache.locationMap.clear();

  cache.aliasMap = null;
  cache.locationMap = null;
}

function updateCacheTime(time: number) {
  __CACHE_TIME__ = time;
}

export { cache, __CACHE_TIME__, clearCache, clearNextTick, updateCacheTime };
