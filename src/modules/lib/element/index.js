import * as fn from '/modules/lib/fn/index.js';
import * as maybe from '/modules/lib/maybe/index.js';
import * as vector2 from '/modules/lib/vector2/index.js';

export const toArray = (xs) => {
  return [].slice.call(xs, 0);
};

export const toShape = (x) => {
  const rect = x.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    position: vector2.from(rect.x)(rect.y),
  };
};

export const toPosition = (x) => {
  const rect = x.getBoundingClientRect();
  return vector2.from(rect.x)(rect.y);
};

export const toComputedStyle = (x) => (w) => {
  return w.getComputedStyle(x, null);
};

export const toMatrix = (x) => (w) => {
  return fn.pipe(
    toComputedStyle(x)(w),
    (style) =>
      style.getPropertyValue('transform') ||
      style.getPropertyValue('-moz-transform') ||
      style.getPropertyValue('-webkit-transform') ||
      style.getPropertyValue('-ms-transform') ||
      style.getPropertyValue('-o-transform'),
    (cs) => cs.split('(')[1].split(')')[0].split(',')
  );
};

export const toTranslate = (x) => (w) => {
  return fn.pipe(toMatrix(x)(w), (matrix) =>
    vector2.from(matrix[4])(matrix[5])
  );
};

export const fromString = (cs) => (w) => {
  return fn.pipe(new w.DOMParser().parseFromString(cs, 'text/html'), (parsed) =>
    maybe.fmap(
      (html) => html.body.firstElementChild,
      maybe.guard(!parsed.querySelector('parsererror'), maybe.pure(parsed))
    )
  );
};

export const toClosest = (s) => (el) => (w) => {
  for (const relative of toParentStream(el)) {
    if (w.Element.prototype.matches.call(relative, s)) {
      return relative;
    }
  }

  return null;
};

export const toParentStream = function* (el) {
  let cache = el;
  do {
    yield cache;
    cache = cache.parentElement || cache.parentNode;
  } while (cache !== null && cache.nodeType === 1);
};
