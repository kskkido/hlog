import * as t from 'io-ts';
import * as animation from 'states/animation';

export const State = t.record(t.string, animation.types.State);

export type State = t.TypeOf<typeof State>;

export const UpdateAction = t.type({
  type: t.literal('update/animations'),
  payload: t.type({
    key: t.string,
    action: animation.types.Action
  })
});

export type UpdateAction = t.TypeOf<typeof UpdateAction>;

export const Action = UpdateAction;

export type Action = t.TypeOf<typeof Action>;
