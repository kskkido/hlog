export const fmap = (fn, xs) => {
  return xs.map(fn);
};

export const bind = (fn, xs) => {
  return join(fmap(fn, xs));
};

export const join = (xxs) => {
  return xxs.reduce((acc, xs) => {
    xs.forEach((x) => {
      acc.push(x);
    });
    return acc;
  }, []);
};

export const sort = (compare, xs) => {
  return xs.sort(compare);
};

export const init = (xs) => {
  return xs.slice(0, -1);
};

export const tail = (xs) => {
  return xs.slice(1);
};

export const head = (xs) => {
  return xs.length > 0 ? xs[0] : null;
};

export const last = (xs) => {
  return xs.length > 0 ? xs[xs.length - 1] : null;
};

export const mappend = (xs, ys) => {
  return [...xs, ...ys];
};

export const takeWhile = (fn, xs) => {
  let i = 0;
  while (i < xs.length && fn(xs[i], i)) {
    i += 1;
  }
  return xs.slice(0, i);
};

export const dropWhile = (fn, xs) => {
  let i = 0;
  while (i < xs.length && fn(xs[i], i)) {
    i += 1;
  }
  return xs.slice(i);
};

export const span = (fn, xs) => {
  return [takeWhile(fn, xs), dropWhile(fn, xs)];
};

export const partition = (fn, xs) => {
  return xs.reduce(
    (acc, x) => (fn(x) ? [[...acc[0], x], acc[1]] : [acc[0], [...acc[1], x]]),
    [[], []]
  );
};

export const matchLeft = (fn, fallback, xs) => {
  const [_head, _tail] = [head(xs), tail(xs)];
  return _head === null ? fallback : fn(_head, _tail);
};

export const matchRight = (fn, fallback, xs) => {
  const [_init, _last] = [init(xs), last(xs)];
  return _last === null ? fallback : fn(_init, _last);
};

export const keys = (xs) => {
  return xs.map((_, i) => i);
};

export const zipWith = (fn, xs, ys) => {
  const out = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i += 1) {
    out.push(fn(xs[i], ys[i], i));
  }
  return out;
};

export const zip = (xs, ys) => {
  return zipWith((x, y) => [x, y], xs, ys);
};
