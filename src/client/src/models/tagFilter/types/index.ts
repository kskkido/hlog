import * as t from 'io-ts';
import * as orderType from 'models/orderType';
import * as tagSortType from 'models/tagSortType';

export const TagFilter = t.type({
  order: orderType.types.OrderType,
  sort: tagSortType.types.TagSortType
});

export type TagFilter = t.TypeOf<typeof TagFilter>;
