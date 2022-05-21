import { identity } from 'fp-ts/function';
import * as Ord from 'fp-ts/Ord';
import * as types from '../types';

export const transform = <A>(x: types.OrderType): ((o: Ord.Ord<A>) => Ord.Ord<A>) => {
  return x === 'ascending' ? identity : Ord.reverse;
};
