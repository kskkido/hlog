import * as array from '/modules/lib/array/index.js';
import * as maybe from '/modules/lib/maybe/index.js';
import * as parser from '/modules/lib/parser/index.js';
import * as element from '/modules/lib/element/index.js';

export const fromWindow = (w) => {
  return maybe.concat(
    array.fmap(
      fromUnknown,
      element.toArray(w.document.querySelectorAll('*[data-observer="scroll"]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return maybe.bind(
    (el) => (el.dataset.observer === 'scroll' ? el : null),
    parser.html(unknown)
  );
};

export const toStatus = (x) => (w) => {
  return w.innerHeight > x.getBoundingClientRect().top ? 'in' : 'out';
};

export const compareByPositionY = (x, y) => {
  return x.getBoundingClientRect().top - y.getBoundingClientRect().top;
};
