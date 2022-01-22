import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as vector2 from 'lib/vector2';
import * as shape_ from 'lib/shape';

export const shape = (x: Element): shape_.types.Shape => {
  const rect = x.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    position: vector2.from(rect.x)(rect.y)
  };
};

export const position = (x: Element): vector2.types.Vector2<number> => {
  return shape(x).position;
};

export const computedStyle = (x: Element) => (w: Window) => {
  return w.getComputedStyle(x, null);
};

export const matrix = (x: Element) => (w: Window) => {
  return pipe(
    computedStyle(x)(w),
    (style) =>
      style.getPropertyValue('transform') ||
      style.getPropertyValue('-moz-transform') ||
      style.getPropertyValue('-webkit-transform') ||
      style.getPropertyValue('-ms-transform') ||
      style.getPropertyValue('-o-transform'),
    (cs) => cs.split('(')[1].split(')')[0].split(',')
  );
};

export const translate = (x: Element) => (w: Window) => {
  return pipe(matrix(x)(w), (matrix) => vector2.from(matrix[4])(matrix[5]));
};

export const closest = (q: string) => (x: Element) => {
  for (const relative of Array.from(parentStream(x))) {
    if (Element.prototype.matches.call(relative, q)) {
      return relative;
    }
  }

  return null;
};

export const parentStream = function* (x: Element) {
  let cache: Element | ParentNode | null = x;
  do {
    yield cache;
    cache = cache.parentElement || cache.parentNode;
  } while (cache !== null && cache.nodeType === 1);
};

export const htmlElement = (x: Element): Option.Option<HTMLElement> => {
  return x instanceof HTMLElement ? Option.of(x) : Option.none;
};
