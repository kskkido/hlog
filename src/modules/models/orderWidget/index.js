import * as lib from '/modules/lib/index.js';
import * as orderType from '/modules/models/orderType/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-group="order"]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.pass(
        orderType.fromUnknown(el.dataset.value),
        lib.maybe.guard(el.dataset.group === 'order', lib.maybe.pure(el))
      ),
    lib.parser.html(unknown)
  );
};
