import * as lib from '/modules/lib/index.js';

export const fromUnknown = lib.fn.flow(
  lib.validation.any(
    lib.validator.literal.create('date'),
    lib.validator.literal.create('title'),
    lib.validator.literal.create('length')
  ),
  lib.validation.maybe
);

