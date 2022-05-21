import { pipe } from 'fp-ts/function';
import * as types from '../types';
import * as event from '../event';

export const at =
  <A>(ba: types.Behavior<A>) =>
  (t: number) => {
    return ba(t);
  };

export const pure = <A>(a: A): types.Behavior<A> => {
  return (_) => a;
};

export const map =
  <A, B>(fn: (x: A) => B) =>
  (ba: types.Behavior<A>): types.Behavior<B> => {
    return (t) => fn(ba(t));
  };

export const contramap =
  (fn: (x: number) => number) =>
  <A>(ba: types.Behavior<A>): types.Behavior<A> => {
    return (t) => ba(fn(t));
  };

export const chain =
  <A, B>(fn: (x: A) => types.Behavior<B>) =>
  (ba: types.Behavior<A>): types.Behavior<B> => {
    return (t) => fn(ba(t))(t);
  };

export const apply =
  <A, B>(ba: types.Behavior<A>) =>
  (bfn: types.Behavior<(x: A) => B>): types.Behavior<B> => {
    return (t) => bfn(t)(ba(t));
  };

export const liftA2 =
  <A, B, C>(fn: (x: A) => (y: B) => C) =>
  (ba: types.Behavior<A>) =>
  (bb: types.Behavior<B>): types.Behavior<C> => {
    return pipe(ba, map(fn), apply(bb));
  };

export const tap = apply(pure);

export const sequence = <A>(bas: ReadonlyArray<types.Behavior<A>>): types.Behavior<ReadonlyArray<A>> => {
  return bas.reduce(
    (bacc, ba) => liftA2<ReadonlyArray<A>, A, ReadonlyArray<A>>((as) => (a) => [...as, a])(bacc)(ba),
    pure([] as ReadonlyArray<A>)
  );
};

export const until =
  <A>(eba: types.Event<types.Behavior<A>>) =>
  (ba: types.Behavior<A>): types.Behavior<A> => {
    return (t) => (t < event.time(eba) ? at(ba)(t) : at(event.extract(eba))(t));
  };

export const after =
  <A>(eba: types.Event<types.Behavior<A>>) =>
  (ba: types.Behavior<A>): types.Behavior<A> => {
    return (t) => (t > event.time(eba) ? at(ba)(t) : at(event.extract(eba))(t));
  };

export const time: types.Behavior<number> = (t) => {
  return t;
};

export const transform =
  (bt: types.Behavior<number>) =>
  <A>(ba: types.Behavior<A>): types.Behavior<A> => {
    return (t) => at(ba)(at(bt)(t));
  };

export const snapshot =
  <A>(ea: types.Event<A>) =>
  <B>(bb: types.Behavior<B>): types.Event<[A, B]> => {
    return [event.time(ea), [event.extract(ea), at(bb)(event.time(ea))]];
  };
