function toNumber(s: string) {
  const code = s.charCodeAt(0);

  return code >= 48 && code < 58 ? code - 48 : -1;
}

function getRangeNumber(str: string, index: number) {
  let num = 0;
  let decimals = 0;

  while (index < str.length) {
    const n = str[index];

    if (n === ".") {
      decimals = 1;
      index++;
      continue;
    }

    const res = toNumber(n);
    if (res === -1) break;

    if (decimals === 0) {
      num = num * 10 + res;
    } else {
      decimals *= 10;
      num += res / decimals;
    }

    index++;
  }

  return { num, index };
}

export { toNumber, getRangeNumber };
