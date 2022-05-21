import * as Eq from 'fp-ts/Eq';
import * as types from '../types';

export const deep = Eq.fromEquals<types.TagMetadata>(
  (x, y) => x.name === y.name && x.size === y.size && x.url === y.url
);
