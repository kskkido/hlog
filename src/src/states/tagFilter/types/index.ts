import * as t from 'io-ts';
import * as models from 'models';

export const State = models.tagFilter.types.TagFilter;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('tagFilter/set'),
  payload: t.partial({
    order: models.orderType.types.OrderType,
    sort: models.tagSortType.types.TagSortType,
    view: models.viewType.types.ViewType
  })
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const Action = SetAction;

export type Action = t.TypeOf<typeof Action>;
