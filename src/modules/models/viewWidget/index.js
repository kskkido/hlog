import * as lib from '/modules/lib/index.js';
import * as viewType from '/modules/models/viewType/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-group="view"'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.pass(
        viewType.fromUnknown(el.dataset.value),
        lib.maybe.guard(el.dataset.group === 'view', lib.maybe.pure(el))
      ),
    lib.parser.html(unknown)
  );
};
