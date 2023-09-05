function diff<T, R extends keyof T>(s1: T[], s2: T[], key?: R): Set<T> {
  const s: Set<T> = new Set();
  const c: Map<T | T[R], boolean> = new Map();

  s2.forEach((d) => c.set(key == null ? d : d[key], true));
  s1.forEach((d) => !c.has(key == null ? d : d[key]) && s.add(d));

  return s;
}

function union<T, R extends keyof T>(s1: T[], s2: T[], key?: R): Set<T> {
  if (!key) {
    return new Set([...s1, ...s2]);
  }

  const s: Set<T> = new Set();
  const c: Map<T | T[R], boolean> = new Map();

  s1.forEach((d) => c.set(key == null ? d : d[key], true) && s.add(d));
  s2.forEach((d) => !c.has(key == null ? d : d[key]) && s.add(d));

  return s;
}

function intersect<T, R extends keyof T>(s1: T[], s2: T[], key?: R): Set<T> {
  const s: Set<T> = new Set();
  const c: Map<T | T[R], boolean> = new Map();

  s1.forEach((d) => c.set(key == null ? d : d[key], true));
  s2.forEach((d) => c.has(key == null ? d : d[key]) && s.add(d));

  return s;
}

export { diff, union, intersect };
