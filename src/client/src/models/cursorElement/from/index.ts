import { pipe } from 'fp-ts/function';
import * as Array from 'fp-ts/Array';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.CursorElement> => {
  return Array.compact(
    pipe(
      [].slice.call(w.document.querySelectorAll('[data-type~="cursor"]')),
      Array.map(Option.fromEitherK(types.CursorElement.decode))
    )
  );
};
