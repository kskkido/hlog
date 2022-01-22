import * as lib from 'lib';
import * as models from 'models';
import * as actions from '../actions';

export type State = models.history.types.History;

export const initialState: State = {
  past: [],
  present: null,
  future: []
};

export const main = lib.store.reducer.from<State, actions.Action>(initialState, {
  [actions.push.type]: (state, action) => models.history.lib.push(action.payload)(state),
  [actions.back.type]: (state) => models.history.lib.back(state),
  [actions.forward.type]: (state) => models.history.lib.forward(state)
});
