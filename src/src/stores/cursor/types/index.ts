import * as t from 'io-ts';
import * as rxjs from 'rxjs';
import * as models from 'models';

export const State = models.cursor.types.Cursor;

export type State = t.TypeOf<typeof State>;

export const SetAction = t.type({
  type: t.literal('set'),
  payload: State
});

export type SetAction = t.TypeOf<typeof SetAction>;

export const Action = SetAction;

export type Action = t.TypeOf<typeof Action>;

export type Store = readonly [rxjs.Observable<State>, (actions: ReadonlyArray<Action>) => void];
