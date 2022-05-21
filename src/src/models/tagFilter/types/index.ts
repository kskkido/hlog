import * as t from 'io-ts';
import * as viewType from 'models/viewType';
import * as orderType from 'models/orderType';
import * as tagSortType from 'models/tagSortType';

export const TagFilter = t.type({
  view: viewType.types.ViewType,
  sort: tagSortType.types.TagSortType,
  order: orderType.types.OrderType
});

export type TagFilter = t.TypeOf<typeof TagFilter>;
