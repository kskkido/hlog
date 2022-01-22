import * as array from '/modules/lib/array/index.js';
import * as maybe from '/modules/lib/maybe/index.js';
import * as parser from '/modules/lib/parser/index.js';
import * as element from '/modules/lib/element/index.js';
import * as letter from '/modules/models/letter/index.js';

export const fromWindow = (w) => {
  return maybe.concat(
    array.fmap(
      fromUnknown,
      element.toArray(w.document.querySelectorAll('*[data-word]'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return maybe.bind(
    (el) =>
      typeof el.dataset.word === 'string' && el.dataset.word.length > 0
        ? el
        : null,
    parser.html(unknown)
  );
};

export const toLetters = (x) => (attributes) => (w) => {
  return array.fmap(
    (c, i) =>
      letter.fromCharacter(c)({ ...attributes, style: `--index: ${i}` })(w),
    x.dataset.word.split('')
  );
};
