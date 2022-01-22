import * as math from '/modules/lib/math/index.js';

export const reverse = (x) => {
  return round(x) * -1;
};

export const clamp = (x) => {
  return math.clamp(x, -1, 1);
};

export const round = (x) => {
  return x > 0 ? 1 : -1;
};

export const validate = (x) => {
  return -1 <= x && x <= 1;
};
