import * as types from '../types';

export const from =
  <A, B = A>(fn: (x: A) => B) =>
  <C extends string>(type: C): types.ActionCreator<C, A, B> => {
    return Object.assign((x: A): types.Action<C, B> => ({ payload: fn(x), type }), {
      type
    });
  };
