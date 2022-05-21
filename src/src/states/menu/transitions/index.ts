import * as rxjs from 'rxjs';
import * as models from 'models';
import * as types from '../types';

export const set =
  (_: types.State) =>
  (action: types.SetAction): rxjs.Observable<types.State> => {
    return rxjs.of(action.payload);
  };

export const toggle =
  (state: types.State) =>
  (_: types.ToggleAction): rxjs.Observable<types.State> => {
    return rxjs.of(models.menu.lib.toggle(state));
  };
