import * as lib from '/modules/lib/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-type="heading"]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.bind(
        (heading) =>
          typeof heading.id === 'string' && heading.id.length > 0
            ? heading
            : null,
        el.dataset.type === 'heading' ? el : null
      ),
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
