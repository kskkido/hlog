import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';

export const main: lib.state.types.Reducer<types.State> = (initialState) => ($action) => {
  return $action.pipe(
    rxjs.switchScan((state, action) => {
      if (types.SetAction.is(action)) {
        return rxjs.of(action.payload);
      } else {
        return rxjs.of(state);
      }
    }, initialState),
    rxjs.startWith(initialState)
  );
};
