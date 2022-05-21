import * as rxjs from 'rxjs';
import * as types from '../types';
import * as state from 'lib/state';

export const reducer = <A>(fn: state.types.Reducer<A>, initialState: A): types.Store<A> => {
  const $actions = new rxjs.Subject<ReadonlyArray<types.ActionSchema>>();
  return [
    fn(initialState)($actions.pipe(rxjs.mergeMap((actions) => rxjs.from(actions)))).pipe(
      rxjs.distinctUntilChanged(),
      rxjs.share()
    ),
    $actions.next.bind($actions)
  ];
};
