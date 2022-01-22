import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.ItemElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(w.document.querySelectorAll('*[data-type~="item"]')), ReadonlyArray.map(unknown))
  );
};

export const element = (el: Element): ReadonlyArray<types.ItemElement> => {
  return ReadonlyArray.compact(
    pipe(Array.from(el.querySelectorAll('*[data-type~="item"]')), ReadonlyArray.map(unknown))
  );
};

export const unknown = (x: unknown): Option.Option<types.ItemElement> => {
  return Option.fromEither(types.ItemElement.decode(x));
};
