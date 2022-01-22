import * as lib from 'lib';
import * as models from 'models';
import * as actions from '../actions';

export type State = models.phase.types.Phase;

export const initialState: State = 'preload';

export const main = lib.store.reducer.from<State, actions.Action>(initialState, {
  [actions.set.type]: (_, action) => action.payload
});
