import * as lib from '/modules/lib/index.js';

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) => (typeof el.id === 'string' && el.id.length > 0 ? el : null),
    lib.parser.html(unknown)
  );
};

export const toVisibilityStatus = (x) => (w) => {
  return w.pageYOffset + 1 >= w.pageYOffset + x.getBoundingClientRect().top ||
    w.pageYOffset + w.innerHeight >= w.document.body.offsetHeight
    ? 'in'
    : 'out';
};

export const compareByPositionY = (x, y) => {
  return x.getBoundingClientRect().top - y.getBoundingClientRect().top;
};
