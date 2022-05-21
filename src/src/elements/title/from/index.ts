import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const unique = (w: Window): Option.Option<lib.element.types.HTMLElement> => {
  return pipe(w.document.querySelector('#title'), Option.fromNullable, Option.chain(unknown));
};

export const window = (w: Window): ReadonlyArray<lib.element.types.HTMLElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="title"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<lib.element.types.HTMLElement> => {
  return Option.fromEither(lib.element.types.HTMLElement.decode(x));
};
