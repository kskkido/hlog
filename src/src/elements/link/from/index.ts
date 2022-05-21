import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

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

export const window = (w: Window): ReadonlyArray<lib.element.types.HTMLAnchorElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="link"]')), ReadonlyArray.map(unknown))
  );
};

export const element = (el: Element): ReadonlyArray<lib.element.types.HTMLAnchorElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(el.querySelectorAll('*[data-type~="link"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<lib.element.types.HTMLAnchorElement> => {
  return Option.fromEither(lib.element.types.HTMLAnchorElement.decode(x));
};
