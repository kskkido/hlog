import * as vector2 from '/modules/lib/vector2/index.js';

export const toPosition = (s) => {
  return s.position;
};

export const toCenterPosition = (s) => {
  return vector2.bimap((x) => x - s.width / 2)((y) => y - s.height / 2)(
    s.position
  );
};
