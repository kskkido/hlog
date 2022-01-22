import * as lib from '/modules/lib/index.js';

export const fromWindow = (name) => (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll(`*[data-slot="${name}"]`))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.parser.html(unknown);
};

export const removeChild = (id) => (x) => {
  lib.element.toArray(x.querySelectorAll(`#${id}`)).forEach((child) => {
    x.removeChild(child);
  });
};

export const removeChildren = (x) => {
  lib.element.toArray(x.children).forEach((child) => {
    x.removeChild(child);
  });
};
