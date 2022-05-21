import * as Eq from 'fp-ts/Eq';
import * as types from '../types';

export const deep = Eq.fromEquals<types.PostFilter>(
  (x, y) => x.order === y.order && x.sort === y.sort && x.view === y.view
);

