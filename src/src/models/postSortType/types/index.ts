import * as t from 'io-ts';

export const PostSortType = t.union([
  t.literal('date'),
  t.literal('title'),
  t.literal('length')
]);

export type PostSortType = t.TypeOf<typeof PostSortType>;
