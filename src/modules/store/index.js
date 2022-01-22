import * as state from './state/index.js';

export { state };

export const create =
  (initialState = state.root.reducers.initialState) =>
  (w) => {
    const $action = new w.rxjs.BehaviorSubject().pipe(w.rxjs.share());
    return [
      $action.pipe(
        w.rxjs.scan(state.root.reducers.main, initialState),
        w.rxjs.share(),
        w.rxjs.startWith(initialState)
      ),
      (action) => {
        $action.next(action);
      },
    ];
  };
