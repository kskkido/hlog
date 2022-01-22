import * as lib from '/modules/lib/index.js';

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (x) => (x.tagName === 'A' ? x : null),
    lib.parser.html(unknown)
  );
};
