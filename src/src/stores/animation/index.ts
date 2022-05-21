import * as rxjs from 'rxjs';
import * as actions from './actions';
import * as reducers from './reducers';
import * as types from './types';

export { types, reducers, actions };

export const main =
  ($time: rxjs.Observable<number>) =>
  (initialState: types.State): types.Store => {
    const noop = Symbol();
    const $actions = new rxjs.BehaviorSubject<ReadonlyArray<types.Action | typeof noop>>([noop]);
    return [
      $actions.pipe(
        rxjs.mergeMap((actions) => rxjs.from(actions)),
        rxjs.filter((action): action is types.Action => action !== noop),
        rxjs.switchScan((state, action) => {
          return reducers.main($time)(state)(action);
        }, initialState),
        rxjs.startWith(initialState),
        rxjs.shareReplay(1)
      ),
      (actions) => {
        $actions.next(actions);
      }
    ];
  };
