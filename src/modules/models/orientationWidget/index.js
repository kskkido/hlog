import * as lib from '/modules/lib/index.js';
import * as orientation from '/modules/models/orientation/index.js';

export const fromGroup = (group) => (w) => {
  return fromWindow(w).filter((x) => getGroup(x) === group);
};

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('*[data-orientation]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.pass(
        orientation.fromUnknown(el.dataset.orientation),
        lib.maybe.guard(
          typeof el.dataset.group === 'string',
          lib.maybe.pure(el)
        )
      ),
    lib.parser.html(unknown)
  );
};

export const getGroup = (x) => {
  return x.dataset.group;
};

export const getOrientation = (x) => {
  return x.dataset.orientation;
};
