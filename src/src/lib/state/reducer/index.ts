import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as types from '../types';

export const combine = <A>(rx: types.ReducerMap<A>): types.Reducer<A> => {
  return (initialState) => ($action) => {
    return rxjs
      .combineLatest(
        pipe(
          Object.keys(rx) as Array<keyof A>,
          ReadonlyArray.map((key) =>
            rx[key](initialState[key])($action).pipe(rxjs.map((value) => [key, value] as [keyof A, A[keyof A]]))
          )
        )
      )
      .pipe(
        rxjs.scan(
          (state, es) =>
            es.reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: value
              }),
              state
            ),
          initialState
        ),
        rxjs.distinctUntilChanged(),
        rxjs.shareReplay(1)
      );
  };
};
