import { noop } from '../action/index.js';

export const from = (initialState, handlers) => {
  return (state = initialState, action = noop) => {
    return action.type in handlers
      ? handlers[action.type](state, action)
      : state;
  };
};

export const combine = (reducers, initialState) => {
  return (state = initialState, action) => {
    return Object.keys(reducers).reduce((acc, key) => {
      acc[key] = reducers[key](state[key], action);
      return acc;
    }, state);
  };
};
