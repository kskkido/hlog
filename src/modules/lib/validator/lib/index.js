import { flow } from '/modules/lib/fn/index.js';
import * as validation from '/modules/lib/validation/index.js';

export const create = (mx, fn) => {
  return (x) => (mx(x) ? validation.success(x) : validation.failure(fn(x)));
};

export const optional = (fn) => {
  return validation.any(
    create(
      (x) => x === undefined,
      () => ['optional']
    ),
    fn
  );
};

export const write = (vx, fn) => {
  return flow(vx, validation.write(fn));
};
