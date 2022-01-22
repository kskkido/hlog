import * as types from '../types';

export const time = <A>(ea: types.Event<A>): number => {
  return ea[0];
};

export const map =
  <A, B>(fn: (x: A) => B) =>
  (ea: types.Event<A>): types.Event<B> => {
    return [time(ea), fn(extract(ea))];
  };

export const join = <A>(eea: types.Event<types.Event<A>>) => {
  return eea[1];
};

export const extract = <A>(ea: types.Event<A>) => {
  return ea[1];
};

export const duplicate = <A>(ea: types.Event<A>): types.Event<types.Event<A>> => {
  return [time(ea), ea];
};

export const extend =
  <A, B>(fn: (x: types.Event<A>) => B) =>
  (ea: types.Event<A>) => {
    return map(fn)(duplicate(ea));
  };

export const race =
  <A>(ea: types.Event<A>) =>
  (eb: types.Event<A>) => {
    return time(ea) < time(eb) ? ea : eb;
  };
