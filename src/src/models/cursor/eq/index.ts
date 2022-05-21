import * as Eq from 'fp-ts/Eq';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as number from 'fp-ts/number';
import * as types from '../types';

export const deep: Eq.Eq<types.Cursor> = Eq.fromEquals(
  (x, y) => number.Eq.equals(x.scale, y.scale) && ReadonlyArray.getEq(number.Eq).equals(x.position, y.position)
);
