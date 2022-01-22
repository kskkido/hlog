import * as t from 'io-ts';
import * as orderType from 'models/orderType';
import * as postSortType from 'models/postSortType';

export const PostFilter = t.type({
  order: orderType.types.OrderType,
  sort: postSortType.types.PostSortType
});

export type PostFilter = t.TypeOf<typeof PostFilter>;
