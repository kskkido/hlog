import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';

export const name =
  (name: string) =>
  (w: Window): Option.Option<lib.element.types.HTMLElement> => {
    return pipe(
      window(w).find((x) => x.dataset.name === name),
      Option.fromNullable
    );
  };

export const window = (w: Window): ReadonlyArray<lib.element.types.HTMLElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="slot"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<lib.element.types.HTMLElement> => {
  return Option.fromEither(lib.element.types.HTMLElement.decode(x));
};
