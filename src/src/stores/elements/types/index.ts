import * as t from 'io-ts';
import * as lib from 'lib';
import * as rxjs from 'rxjs';

export type State = Record<string, lib.element.types.HTMLElement>;

export const SetAction = t.type({
  type: t.literal('set'),
  payload: t.type({
    key: t.string,
    element: lib.element.types.HTMLElement,
  })
})

export type SetAction = t.TypeOf<typeof SetAction>;

export const Action = SetAction;

export type Action = t.TypeOf<typeof Action>;

export type Store = readonly [rxjs.Observable<State>, (actions: ReadonlyArray<Action>) => void];

