import * as Ord from 'fp-ts/Ord';
import * as types from '../types';

export const offsetY = Ord.fromCompare<types.TransitionGroupElement>((x, y) => {
  return x[0].getBoundingClientRect().top >= y[0].getBoundingClientRect().top ? 1 : -1;
});
