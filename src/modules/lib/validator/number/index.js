import * as lib from '../lib/index.js';

export const validate = lib.create(
  (x) => typeof x === 'number' && !isNaN(x),
  () => ['number']
);
