import * as Ord from 'fp-ts/Ord';
import * as types from '../types';

export const offsetY = Ord.fromCompare<types.Element>((x, y) => {
  return x.getBoundingClientRect().top >= y.getBoundingClientRect().top ? 1 : -1;
});
