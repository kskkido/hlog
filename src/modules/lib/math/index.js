export const clamp = (x, min, max) => {
  return Math.max(Math.min(x, max), min);
};

export const margin = (x, y) => {
  return y === 0 ? x : -(1 - x / y);
};

export const lerp = (x, y, t) => {
  return (1 - t) * x + t * y;
};

export const lerpW = (x, y, t) => (z) => {
  return lerp(x, y, Math.abs(margin(x, y)) < z ? 1 : t);
};

export const range = (x, y) => {
  return y >= x ? [x, y] : [y, x];
};

export const between = (rx) => (x) => {
  return rx[0] <= x && x <= rx[1];
};
