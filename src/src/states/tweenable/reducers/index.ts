import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';
import * as transitions from '../transitions';

export const main =
  ($time: rxjs.Observable<number>): lib.state.types.Reducer<types.State> =>
  (initialState) =>
  ($action) => {
    return $action.pipe(
      rxjs.switchScan((state, action) => {
        if (types.SetAction.is(action)) {
          return transitions.set(state)(action);
        } else if (types.TweenAction.is(action)) {
          return transitions.tween($time)(state)(action);
        } else if (types.LinearAction.is(action)) {
          return transitions.linear($time)(state)(action);
        } else {
          return rxjs.of(state);
        }
      }, initialState),
      rxjs.startWith(initialState)
    );
  };
