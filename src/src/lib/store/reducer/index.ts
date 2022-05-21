import * as types from '../types';

export const from = <S, A extends types.ActionSchema>(
  initialState: S,
  handlers: {
    [T in A['type']]: (state: S, action: Extract<A, { type: T }>) => S;
  }
): types.Reducer<S> => {
  return (state = initialState, action) => {
    const reducer = handlers[action.type as A['type']];
    return reducer ? reducer(state, action as Extract<A, { type: A['type'] }>) : state;
  };
};

export const combine = <S>(reducers: types.Reducers<S>, initialState: S): types.Reducer<S> => {
  return (state = initialState, action) => {
    return (Object.keys(reducers) as Array<keyof S>).reduce((acc, key) => {
      acc[key] = reducers[key](state[key], action);
      return acc;
    }, state);
  };
};
