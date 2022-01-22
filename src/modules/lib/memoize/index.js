export const once = (fn) => {
  const sym = Symbol();
  let cache = sym;
  return (x) => {
    if (cache === sym) {
      cache = fn(x);
    }
    return cache;
  };
};
