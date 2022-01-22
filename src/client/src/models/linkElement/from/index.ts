import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';
import * as types from '../types';

export const event = (e: Event) => {
  return pipe(
    lib.element.from.unknown(e.target),
    Option.chain((target) =>
      pipe(
        unknown(target),
        Option.alt(() => closest(target))
      )
    )
  );
};

export const closest = (el: Element) => {
  return pipe(lib.element.to.closest('*[data-type~="link"]')(el), unknown);
};

export const window = (w: Window): ReadonlyArray<types.LinkElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="link"]')), ReadonlyArray.map(unknown))
  );
};

export const element = (el: Element): ReadonlyArray<types.LinkElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(el.querySelectorAll('*[data-type~="link"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<types.LinkElement> => {
  return Option.fromEither(types.LinkElement.decode(x));
};
