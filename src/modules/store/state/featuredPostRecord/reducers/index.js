import * as lib from '/modules/lib/index.js';
import * as actions from '../actions/index.js';

export const initialState = {};

export const main = lib.store.reducer.from(initialState, {
  [actions.set.type]: (_, action) => action.payload,
  [actions.update.type]: (state, action) => ({
    ...state,
    [action.payload.key]: action.payload.value,
  }),
  [actions.update.type]: (state, action) =>
    action.payload.reduce(
      (acc, entry) => ({ ...acc, [entry[0]]: entry[1] }),
      state
    ),
});
