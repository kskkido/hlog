import * as lib from '/modules/lib/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-featured_post]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) => (typeof el.dataset.image === 'string' ? el : null),
    lib.parser.html(unknown)
  );
};

export const getImage = (x) => {
  return x.dataset.image;
};
