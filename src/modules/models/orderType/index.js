import * as lib from '/modules/lib/index.js';

export const fromUnknown = lib.fn.flow(
  lib.validation.any(
    lib.validator.literal.create('ascending'),
    lib.validator.literal.create('descending')
  ),
  lib.validation.maybe
);
