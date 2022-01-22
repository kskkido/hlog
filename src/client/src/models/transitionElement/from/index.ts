import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.TransitionElement> => {
  return pipe(
    Array.from(w.document.querySelectorAll('[data-transition_trigger]')),
    ReadonlyArray.map(Option.fromEitherK(types.TransitionElement.decode)),
    ReadonlyArray.compact
  );
};
