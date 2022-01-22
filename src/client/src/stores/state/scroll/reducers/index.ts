import * as models from 'models';
import * as store from 'lib/store';
import * as actions from '../actions';

export type State = models.scroll.types.Scroll;

export const initialState: State = {
  y: 0
};

export const main = store.reducer.from<State, actions.Action>(initialState, {
  [actions.set.type]: (_, action) => action.payload
});
