export const lookup = (k, rx) => {
  return k in rx ? rx[k] : null;
};

export const keys = (compare, rx) => {
  return Object.keys(rx).sort(compare);
};

export const values = (compare, rx) => {
  return keys(compare, rx).map((key) => rx[key]);
};

export const collect = (compare, fn, rx) => {
  const out = [];
  for (const k of keys(compare, rx)) {
    out.push(fn(k, rx[k]));
  }
  return out;
};

export const toArray = (rx) => {
  return collect(
    (x, y) => x.localeCompare(y),
    (k, v) => [k, v],
    rx
  );
};
