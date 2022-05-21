import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.HeaderElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="header"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<types.HeaderElement> => {
  return Option.fromEither(types.HeaderElement.decode(x));
};
