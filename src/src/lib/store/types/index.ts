import * as rxjs from 'rxjs';

export type Action<A extends string, B> = { type: A; payload: B };

export type ActionSchema = Action<string, unknown>;

export type ActionCreator<A extends string, B, C = B> = ((payload: B) => Action<A, C>) & {
  type: A;
};

export type ActionTypeOf<A extends ActionSchema> = A extends ActionSchema ? A['type'] : never;

export type ActionOf<A> = A extends ActionCreator<infer B, any, infer C> ? Action<B, C> : never;

export type Reducer<S> = (state: S | undefined, action: ActionSchema) => S;

export type Reducers<S> = {
  [K in keyof S]: Reducer<S[K]>;
};

export type Store<A, B = ActionSchema> = [rxjs.Observable<A>, Dispatch<B>];

export type Dispatch<A = ActionSchema> = (actions: A[]) => void;
