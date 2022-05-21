import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';

export const main: lib.state.types.Reducer<types.State> = (state) => ($action) => {
  return $action.pipe(
    rxjs.filter(types.Action.is),
    rxjs.map((action) => action.payload),
    rxjs.startWith(state)
  );
};
