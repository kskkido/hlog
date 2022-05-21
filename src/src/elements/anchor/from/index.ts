import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const title =
  (s: string) =>
  (w: Window): Option.Option<lib.element.types.HTMLAnchorElement> => {
    return pipe(w.document.querySelector(`a[title=${s}]`), Option.fromNullable, Option.chain(unknown));
  };

export const element = (e: lib.element.types.Element): ReadonlyArray<lib.element.types.HTMLAnchorElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(e.querySelectorAll('*[data-type~="anchor"]')), ReadonlyArray.map(unknown))
  );
};

export const window = (w: Window): ReadonlyArray<lib.element.types.HTMLAnchorElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="anchor"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<lib.element.types.HTMLAnchorElement> => {
  return pipe(lib.element.types.HTMLAnchorElement.decode(x), Option.fromEither);
};
