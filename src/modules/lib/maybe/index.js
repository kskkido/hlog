export const pure = (x) => {
  return x;
};

export const fold = (x, gn) => (mx) => {
  return mx === null ? x : gn(mx);
};

export const fmap = (fn, mx) => {
  return fold(mx, (x) => pure(fn(x)))(mx);
};

export const bind = (fn, mx) => {
  return mx === null ? mx : fn(mx);
};

export const pass = (mx, my) => {
  return bind(() => my, mx);
};

export const guard = (bx, mx) => {
  return pass(bx ? [] : null, mx);
};

export const alternative = (mx, my) => {
  return mx === null ? my : mx;
};

export const tap = (fn, mx) => {
  return bind((x) => (fn(x), x), mx);
};

export const concat = (mxs) => {
  return mxs.filter((mx) => mx !== null);
};

export const sequence = (mxs) => {
  return mxs.reduce((macc, mx) => {
    return bind((acc) => fmap((x) => [...acc, x], mx), macc);
  }, pure([]));
};
