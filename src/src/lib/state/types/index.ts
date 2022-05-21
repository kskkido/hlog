import * as rxjs from 'rxjs';

export type Action<A, B> = { type: A; payload: B };

export type ActionSchema = Action<string, unknown>;

export type Reducer<A> = (state: A) => ($action: rxjs.Observable<ActionSchema>) => rxjs.Observable<A>;

export type ReducerMap<A> = {
  [K in keyof A]: Reducer<A[K]>;
};

export type StateOf<A> = A extends Reducer<infer B> ? B : never;
