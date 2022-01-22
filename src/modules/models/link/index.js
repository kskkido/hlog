import * as lib from '/modules/lib/index.js';

export const fromEvent = (e) => (w) => {
  return lib.maybe.alternative(
    fromUnknown(e.target),
    lib.maybe.bind((target) => fromClosest(target)(w), e.target || null)
  );
};

export const fromClosest = (el) => (w) => {
  return lib.maybe.bind(
    fromUnknown,
    lib.element.toClosest('*[data-type="link"]')(el)(w)
  );
};

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-type="link"]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.guard(
        el.dataset.type === 'link' &&
          typeof el.href === 'string' &&
          el.href.length > 0,
        lib.maybe.pure(el)
      ),
    lib.parser.html(unknown)
  );
};
