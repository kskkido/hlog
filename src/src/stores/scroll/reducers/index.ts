import * as rxjs from 'rxjs';
import * as types from '../types';

export { types };

export const main = (state: types.State) => (action: types.Action) => {
  if (types.SetAction.is(action)) {
    return set(state)(action);
  } else {
    return rxjs.of(state);
  }
};

export const set =
  (_: types.State) =>
  (action: types.SetAction): rxjs.Observable<types.State> => {
    return rxjs.of(action.payload);
  };
