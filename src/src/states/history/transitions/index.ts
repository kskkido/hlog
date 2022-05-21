import * as rxjs from 'rxjs';
import * as models from 'models';
import * as types from '../types';

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
