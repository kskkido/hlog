import * as lib from 'lib';
import * as models from 'models';
import * as actions from '../actions';

export type State = Record<string, models.postMetadata.types.PostMetadata>;

export const initialState: State = {};

export const main = lib.store.reducer.from<State, actions.Action>(initialState, {
  [actions.set.type]: (_, action) => action.payload
});
