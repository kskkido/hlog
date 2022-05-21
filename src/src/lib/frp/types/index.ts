import * as Reader from 'fp-ts/Reader';

export type Behavior<A> = Reader.Reader<number, A>;

export type Event<A> = [number, A];
