import * as rxjs from 'rxjs';
import * as types from '../types';

export const main =
  (state: types.State) =>
  (action: types.Action): rxjs.Observable<types.State> => {
    if (action.type === 'set') {
      return set(state)(action);
    } else {
      return rxjs.of(state);
    }
  };

export const set =
  (state: types.State) =>
  (action: types.Action): rxjs.Observable<types.State> => {
    if (!(action.payload.key in state)) {
      return rxjs.of({
        ...state,
        [action.payload.key]: action.payload.value
      });
    } else {
      return rxjs.of(state);
    }
  };
