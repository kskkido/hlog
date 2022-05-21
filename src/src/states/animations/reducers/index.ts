import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as types from '../types';
import * as animation from 'states/animation';

export const main =
  ($time: rxjs.Observable<number>): lib.state.types.Reducer<types.State> =>
  (initialState) =>
  ($action) => {
    return $action.pipe(
      rxjs.filter(types.Action.is),
      rxjs.groupBy((action) => action.payload.key),
      rxjs.mergeMap(($group) =>
        rxjs.combineLatest([
          rxjs.of($group.key),
          animation.reducers.main($time)(initialState[$group.key] || 0)($group.pipe(rxjs.map((a) => a.payload.action)))
        ])
      ),
      rxjs.scan(
        (state, pair) => ({
          ...state,
          [pair[0]]: pair[1]
        }),
        initialState
      ),
      rxjs.startWith(initialState)
    );
  };
