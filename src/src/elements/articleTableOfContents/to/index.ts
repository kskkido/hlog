import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as elements from 'elements';

export const anchors = (x: lib.element.types.HTMLElement): ReadonlyArray<lib.element.types.HTMLAnchorElement> => {
  return pipe(
    elements.anchor.from.element(x),
    ReadonlyArray.filter((e) => pipe(e.dataset.target, t.string.is))
  );
};

export const targets =
  (x: lib.element.types.HTMLElement) =>
  (w: Window): ReadonlyArray<[lib.element.types.HTMLAnchorElement, lib.element.types.HTMLElement]> => {
    return pipe(
      anchors(x),
      ReadonlyArray.map((a) =>
        pipe(
          elements.anchor.to.target(a)(w),
          Option.map((t) => [a, t] as [typeof a, typeof t])
        )
      ),
      ReadonlyArray.compact
    );
  };
