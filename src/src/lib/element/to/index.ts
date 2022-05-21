import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as vector2 from 'lib/vector2';
import * as shape_ from 'lib/shape';
import * as uuid from 'lib/uuid';
import * as visibility_ from 'lib/visibility';
import * as order from '../order';
import * as lib from '../lib';
import * as types from '../types';

export const shape = (x: types.Element): shape_.types.Shape => {
  const rect = x.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    position: vector2.from(rect.x)(rect.y)
  };
};

export const position = (x: types.Element): vector2.types.Vector2<number> => {
  return shape(x).position;
};

export const computedStyle = (x: types.Element) => (w: Window) => {
  return w.getComputedStyle(x, null);
};

export const matrix = (x: types.Element) => (w: Window) => {
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

export const translate = (x: types.Element) => (w: Window) => {
  return pipe(matrix(x)(w), (matrix) => vector2.from(matrix[4])(matrix[5]));
};

export const closest = (q: string) => (x: types.Element) => {
  for (const relative of Array.from(parentStream(x))) {
    if (Element.prototype.matches.call(relative, q)) {
      return relative;
    }
  }

  return null;
};

export const parentStream = function* (x: types.Element) {
  let cache: Element | ParentNode | null = x;
  do {
    yield cache;
    cache = cache.parentElement || cache.parentNode;
  } while (cache !== null && cache.nodeType === 1);
};

export const htmlElement = (x: types.Element): Option.Option<HTMLElement> => {
  return x instanceof HTMLElement ? Option.of(x) : Option.none;
};

export const children = (x: types.Element): ReadonlyArray<types.Element> => {
  return Array.from(x.children);
};

export const above =
  <A extends Element>(xs: ReadonlyArray<A>) =>
  (w: Window): ReadonlyArray<A> => {
    return pipe(
      xs,
      ReadonlyArray.sort(order.offsetY),
      ReadonlyArray.filter((element) => lib.above(element)(w))
    );
  };

export const below =
  <A extends Element>(xs: ReadonlyArray<A>) =>
  (w: Window): ReadonlyArray<A> => {
    return pipe(
      xs,
      ReadonlyArray.sort(order.offsetY),
      ReadonlyArray.filter((element) => lib.below(element)(w))
    );
  };

export const identifier = <A extends HTMLElement>(x: A): string => {
  if (x.dataset.uuid) {
    return x.dataset.uuid;
  } else {
    x.dataset.uuid = uuid.create();
    return x.dataset.uuid;
  }
};

export const visibility =
  <A extends HTMLElement>(x: A) =>
  (w: Window): visibility_.types.Visibility => {
    return w.scrollY + 1 >= w.scrollY + x.getBoundingClientRect().top ||
      w.scrollY + w.innerHeight >= w.document.body.offsetHeight
      ? 'visible'
      : 'hidden';
  };

export const scrollY =
  <A extends HTMLElement>(x: A) =>
  (w: Window) => {
    return x.getBoundingClientRect().top + w.scrollY;
  };

export const rendered = <A extends HTMLElement>(x: A): Option.Option<A> => {
  return pipe(Option.guard(x.offsetParent !== null), Option.apSecond(Option.of(x)));
};

export const pathLength = <A extends SVGGeometryElement>(x: A): number => {
  return x.getTotalLength();
};
