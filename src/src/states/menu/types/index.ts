import * as t from 'io-ts';
import * as models from 'models';

export const State = models.menu.types.Menu;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('menu/set'),
  payload: State
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const ToggleAction = t.type({
  type: t.literal('menu/toggle'),
  payload: t.undefined
});

export type ToggleAction = t.TypeOf<typeof ToggleAction>;

export const Action = t.union([SetAction, ToggleAction]);

export type Action = t.TypeOf<typeof Action>;
