import * as lib from '/modules/lib/index.js';
import * as toggleRange from '/modules/models/toggleRange/index.js';

export const fromUnknown = lib.fn.flow(
  lib.validation.any(
    lib.validator.literal.create('grid'),
    lib.validator.literal.create('list')
  ),
  lib.validation.maybe
);

export const fromToggleRange = (x) => {
  return x === -1 ? 'grid' : 'list';
};

export const toToggleRange = (x) => {
  return toggleRange.clamp(x === 'grid' ? -1 : 1);
};

export const toggle = (x) => {
  return x === 'grid' ? 'list' : 'grid';
};
