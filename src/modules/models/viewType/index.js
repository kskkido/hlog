import * as lib from '/modules/lib/index.js';

export const fromUnknown = lib.fn.flow(
  lib.validation.any(
    lib.validator.literal.create('grid'),
    lib.validator.literal.create('list')
  ),
  lib.validation.maybe
);
