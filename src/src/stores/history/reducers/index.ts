import * as rxjs from 'rxjs';
import * as models from 'models';
import * as types from '../types';

export const main =
  (state: types.State) =>
  (action: types.Action): rxjs.Observable<types.State> => {
    if (types.PushAction.is(action)) {
      return push(state)(action);
    } else if (types.BackAction.is(action)) {
      return back(state);
    } else if (types.ForwardAction.is(action)) {
      return forward(state);
    } else {
      return rxjs.of(state);
    }
  };

export const push =
  (state: types.State) =>
  (action: types.PushAction): rxjs.Observable<types.State> => {
    return rxjs.of(models.history.lib.push(action.payload)(state));
  };

export const back = (state: types.State): rxjs.Observable<types.State> => {
  return rxjs.of(models.history.lib.back(state));
};

export const forward = (state: types.State): rxjs.Observable<types.State> => {
  return rxjs.of(models.history.lib.forward(state));
};
