export const throttle = (tx, fn) => {
  let last = null;
  return (x) => {
    const now = new Date().getTime();
    if (last === null || now >= last + tx) {
      last = now;
      fn(x);
    }
  };
};

export const id = (x) => x;

export const pipe = (x, fn, ...fns) => {
  return fns.reduce((acc, gn) => gn(acc), fn(x));
};

export const flow = (fn, ...fns) => {
  return fns.reduce((gn, hn) => (x) => hn(gn(x)), fn);
};

export const apply = (x) => (fn) => {
  return fn(x);
};

export const constant = (x) => () => {
  return x;
};

export const tap = (fn) => (x) => {
  return fn(x), x;
};

export const log = tap(console.log);

export const flip = (fn) => {
  return (x, y) => fn(y, x);
};
