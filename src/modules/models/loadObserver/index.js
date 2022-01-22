import * as array from '/modules/lib/array/index.js';
import * as maybe from '/modules/lib/maybe/index.js';
import * as parser from '/modules/lib/parser/index.js';
import * as element from '/modules/lib/element/index.js';

export const fromWindow = (w) => {
  return maybe.concat(
    array.fmap(
      fromUnknown,
      element.toArray(w.document.querySelectorAll('*[data-observer="load"]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return maybe.bind(
    (el) => (el.dataset.observer === 'load' ? el : null),
    parser.html(unknown)
  );
};
