import * as t from 'io-ts';
import * as rxjs from 'rxjs';
import * as models from 'models';

export const State = models.history.types.History;

export type State = t.TypeOf<typeof State>;

export const PushAction = t.type({
  type: t.literal('push'),
  payload: models.location.types.Location
});

export type PushAction = t.TypeOf<typeof PushAction>;

export const BackAction = t.type({
  type: t.literal('back'),
  payload: t.void
});

export type BackAction = t.TypeOf<typeof BackAction>;

export const ForwardAction = t.type({
  type: t.literal('forward'),
  payload: t.void
});

export type ForwardAction = t.TypeOf<typeof ForwardAction>;

export const Action = t.union([PushAction, BackAction, ForwardAction]);

export type Action = t.TypeOf<typeof Action>;

export type Store = readonly [rxjs.Observable<State>, (actions: ReadonlyArray<Action>) => void];
