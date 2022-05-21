import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';
import * as transitions from '../transitions';

export const main: lib.state.types.Reducer<types.State> = (initialState) => ($action) => {
  return $action.pipe(
    rxjs.switchScan((state, action) => {
      if (types.PushAction.is(action)) {
        return transitions.push(state)(action);
      } else if (types.BackAction.is(action)) {
        return transitions.back(state);
      } else if (types.ForwardAction.is(action)) {
        return transitions.forward(state);
      } else {
        return rxjs.of(state);
      }
    }, initialState),
    rxjs.startWith(initialState)
  );
};
