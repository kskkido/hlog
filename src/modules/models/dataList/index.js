import * as lib from '/modules/lib/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-items]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) => (!!el.children ? el : null),
    lib.parser.html(unknown)
  );
};

export const toMap = (x) => {
  return [
    x,
    lib.array.zip(
      lib.array.keys(lib.element.toArray(x.children)),
      lib.element.toArray(x.children)
    ),
  ];
};
