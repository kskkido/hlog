import * as rxjs from 'rxjs';

export type Atom<A, B extends ActionSchema> = [rxjs.Observable<A>, Dispatch<B>];

export type Action<A, B> = { type: A; payload: B };

export type Dispatch<A extends ActionSchema> = (action: A) => void;

export type ActionSchema = Action<string, unknown>;

export type ValueOf<A> = A extends Atom<infer B, infer _> ? B : never;

export type ActionOf<A> = A extends Atom<infer _, infer B> ? B : never;
