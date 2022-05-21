import * as rxjs from 'rxjs';
import * as types from '../types';

export const set =
  (_: types.State) =>
  (action: types.SetAction): rxjs.Observable<types.State> => {
    return rxjs.of(action.payload);
  };

export const move =
  (state: types.State) =>
  (action: types.MoveAction): rxjs.Observable<types.State> => {
    return rxjs.of({ ...state, position: action.payload });
  };

export const scale =
  (state: types.State) =>
  (action: types.ScaleAction): rxjs.Observable<types.State> => {
    return rxjs.of({ ...state, scale: action.payload });
  };
