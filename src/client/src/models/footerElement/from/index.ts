import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.FooterElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="footer"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<types.FooterElement> => {
  return Option.fromEither(types.FooterElement.decode(x));
};
