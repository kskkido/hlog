import * as lib from '../lib/index.js';

export const create = (literal) => {
  return lib.create(
    (x) => x === literal,
    () => ['literal']
  );
};
