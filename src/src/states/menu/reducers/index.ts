import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';
import * as transitions from '../transitions';

export const main: lib.state.types.Reducer<types.State> = (state) => ($action) => {
  return $action.pipe(
    rxjs.switchScan((state, action) => {
      if (types.SetAction.is(action)) {
        return transitions.set(state)(action);
      } else if (types.ToggleAction.is(action)) {
        return transitions.toggle(state)(action);
      } else {
        return rxjs.of(state);
      }
    }, state),
    rxjs.startWith(state)
  );
};
