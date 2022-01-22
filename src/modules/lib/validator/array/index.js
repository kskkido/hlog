import { pipe } from '/modules/lib/fn/index.js';
import * as validation from '/modules/lib/validation/index.js';
import * as lib from '../lib/index.js';

export const create = (validator) => {
  return (xs) =>
    xs.reduce(
      (acc, x) =>
        pipe(
          validation.of((ys) => (y) => ys.concat(y)),
          validation.apply(acc),
          validation.apply(validator(x))
        ),
      validation.of([])
    );
};

export const validate = lib.create(
  (x) => Array.isArray(x),
  () => ({
    code: 'array',
    message: `Failed to validate. Expected Array`,
  })
);
