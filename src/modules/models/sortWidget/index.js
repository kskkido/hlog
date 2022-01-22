import * as lib from '/modules/lib/index.js';
import * as sortType from '/modules/models/sortType/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-group="sort"]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.pass(
        sortType.fromUnknown(el.dataset.value),
        lib.maybe.guard(el.dataset.group === 'sort', lib.maybe.pure(el))
      ),
    lib.parser.html(unknown)
  );
};
