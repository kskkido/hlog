import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as config from './config';
import * as state from './state';
import * as types from './types';

export { config, state, types };

export const main =
  (initialState = state.root.reducers.initialState) =>
  (_: config.types.Config): types.Store => {
    const $action = new rxjs.BehaviorSubject<state.root.actions.Action>(lib.store.action.noop);
    return [
      $action.pipe(rxjs.scan(state.root.reducers.main, initialState), rxjs.share(), rxjs.startWith(initialState)),
      (action: state.root.actions.Action) => {
        $action.next(action);
      }
    ];
  };
