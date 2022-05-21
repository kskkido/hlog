import * as t from 'io-ts';
import * as rxjs from 'rxjs';

export const Event = t.type({
  type: t.string,
  payload: t.unknown
});

export type Event = t.TypeOf<typeof Event>;

export type EventDispatch = (es: Event[]) => void;

export type EventSource = [rxjs.Observable<Event>, EventDispatch];
