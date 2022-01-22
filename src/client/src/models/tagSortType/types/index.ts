import * as t from 'io-ts';

export const TagSortType = t.union([t.literal('name'), t.literal('size')]);

export type TagSortType = t.TypeOf<typeof TagSortType>;
