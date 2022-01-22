import { pipe } from '/modules/lib/fn/index.js';
import * as validation from '/modules/lib/validation/index.js';

export const create = (schema) => {
  return (xs) =>
    Object.entries(schema).reduce((acc, [key, validator]) => {
      return pipe(
        validation.of((ys) => (y) => ({ ...ys, [key]: y })),
        validation.apply(acc),
        validation.apply(validator(xs[key]))
      );
    }, validation.of({}));
};
