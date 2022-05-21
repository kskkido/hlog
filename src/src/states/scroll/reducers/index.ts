import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';

export const main: lib.state.types.Reducer<types.State> =
  (state) =>
  ($action: rxjs.Observable<lib.state.types.ActionSchema>): rxjs.Observable<types.State> => {
    return $action.pipe(
      rxjs.filter(types.SetAction.is),
      rxjs.scan((_, action) => action.payload, state),
      rxjs.startWith(state)
    );
  };
