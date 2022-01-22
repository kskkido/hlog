export const from = (x) => (y) => {
  return [x, y];
};

export const toX = (vx) => {
  return vx[0];
};

export const toY = (vx) => {
  return vx[1];
};

export const fmap = (fn) => (vx) => {
  return bimap(fn)(fn)(vx);
};

export const bimap = (fn) => (gn) => (vx) => {
  return from(fn(toX(vx)))(gn(toY(vx)));
};

export const fold = (fn) => (vx) => {
  return fn(toX(vx), toY(vx));
};

export const transpose = (vxs) => {
  const [vx, vy] = vxs;
  return from(from(toX(vx))(toX(vy)))(from(toY(vx))(toY(vy)));
};

export const add = (vx) => (vy) => {
  return bimap(
    (x) => x + toX(vx),
    (y) => y + toY(vy),
    vx
  );
};

export const equal = (fn) => (vx, vy) => {
  return fn(toX(vx), toX(vy)) && fn(toY(vx), toY(vy));
};
