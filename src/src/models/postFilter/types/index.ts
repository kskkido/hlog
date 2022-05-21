import * as t from 'io-ts';
import * as orderType from 'models/orderType';
import * as postSortType from 'models/postSortType';
import * as viewType from 'models/viewType';

export const PostFilter = t.type({
  order: orderType.types.OrderType,
  sort: postSortType.types.PostSortType,
  view: viewType.types.ViewType
});

export type PostFilter = t.TypeOf<typeof PostFilter>;
