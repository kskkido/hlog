import * as lib from '../lib/index.js';

export const validate = lib.create(
  (x) => x instanceof Date && !isNaN(x.getTime()),
  () => ['date']
);
