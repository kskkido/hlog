export const at = (bx) => (t) => {
  return bx(t);
};

export const occurence = (ex) => {
  return [ex[0], ex[1]];
};

export const transform = (bx) => (bt) => {
  return (t) => at(bx)(at(bt)(t));
};

export const untilB = (bx) => (eby) => {
  return (tx) => {
    const [ty, by] = occurence(eby);
    return tx < ty ? at(bx)(tx) : at(by)(ty);
  };
};

export const handleE = (ex) => (fn) => {
  const [tx, x] = occurence(ex);
  return constantE(tx)(fn(tx)(x));
};

export const constantE = (t) => (x) => {
  return [t, x];
};

export const after10 = (bx) => (by) => {
  return untilB(bx)(handleE(constantE(10)(null))(() => () => by));
};

export const raceE = (ex) => (ey) => {
  return occurence(ex)[0] <= occurence(ey)[0] ? ex : ey;
};

export const snapshot = (ex) => (by) => {
  const [tx, x] = occurence(ex);
  return constantE(tx)([x, at(by)(tx)]);
};

export const joinE = (eex) => {
  return occurence(eex)[1];
};
