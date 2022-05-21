import * as t from 'io-ts';
import * as models from 'models';

export const State = models.cursor.types.Cursor;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('cursor/set'),
  payload: State
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const MoveAction = t.type({
  type: t.literal('cursor/move'),
  payload: t.tuple([t.number, t.number])
});

export type MoveAction = t.TypeOf<typeof MoveAction>;

export const ScaleAction = t.type({
  type: t.literal('cursor/scale'),
  payload: t.number
});

export type ScaleAction = t.TypeOf<typeof ScaleAction>;

export const Action = t.union([SetAction, MoveAction, ScaleAction]);

export type Action = t.TypeOf<typeof Action>;
