import * as lib from '/modules/lib/index.js';
import * as orientation from '/modules/models/orientation/index.js';
import * as orientationObserver from '/modules/models/orientationObserver/index.js';

export const fromObserver = (ox) => {
  return fromOrientation(orientationObserver.getOrientation(ox))(ox);
};

export const fromOrientation = (o) => (el) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(el.querySelectorAll(`*[data-items=${o}]`))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.pass(
        orientation.fromUnknown(el.dataset.items),
        lib.maybe.pure(el)
      ),
    lib.parser.html(unknown)
  );
};

export const getOrientation = (x) => {
  return x.dataset.items;
};
