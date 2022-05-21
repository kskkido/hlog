import * as t from 'io-ts';
import * as models from 'models';

export const State = models.postFilter.types.PostFilter;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('postFilter/set'),
  payload: t.partial({
    order: models.orderType.types.OrderType,
    sort: models.postSortType.types.PostSortType,
    view: models.viewType.types.ViewType
  })
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const Action = SetAction;

export type Action = t.TypeOf<typeof Action>;
