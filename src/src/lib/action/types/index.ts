import * as rxjs from 'rxjs';

export type Action<A, B> = { type: A; payload: B };

export type ActionSchema = Action<string, unknown>;

export type ActionSource = [rxjs.Observable<ActionSchema>, Dispatch];

export type Dispatch = (actions: ActionSchema[]) => void;
