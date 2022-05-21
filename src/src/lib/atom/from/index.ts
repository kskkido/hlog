import * as rxjs from 'rxjs';
import * as types from '../types';

export const reducer = <A, B extends types.ActionSchema>(
  fn: (state: A, action: B) => rxjs.Observable<A>,
  initialState: A
): types.Atom<A, B> => {
  const noop = Symbol();
  const $action = new rxjs.BehaviorSubject<B | typeof noop>(noop);
  return [
    $action.pipe(
      rxjs.switchScan((state, action) => (action === noop ? rxjs.of(state) : fn(state, action)), initialState),
      rxjs.share(),
      rxjs.startWith(initialState)
    ),
    $action.next.bind($action)
  ];
};
