import * as lib from '/modules/lib/index.js';

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (x) =>
      typeof x.dataset.target === 'string' && x.dataset.target.length > 0
        ? x
        : null,
    lib.parser.html(unknown)
  );
};
