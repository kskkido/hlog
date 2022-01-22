export const fmap = (fn, gn) => {
  return (x) => fn(gn(x));
};

export const apply = (fn, gn) => {
  return (x) => fn(x)(gn(x));
};

export const bind = (fn, gn) => {
  return (x) => gn(fn(x))(x);
};

export const pure = (x) => {
  return (_) => x;
};

export const tap = (fn) => apply(pure, fn);
