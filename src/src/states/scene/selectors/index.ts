import * as rxjs from 'rxjs';
import * as types from '../types';

export const includes = (xs: ReadonlyArray<types.State>) => ($state: rxjs.Observable<types.State>) => {
  return $state.pipe(
    rxjs.filter((x) => xs.includes(x)),
    rxjs.distinctUntilChanged()
  );
};

export const excludes = (xs: ReadonlyArray<types.State>) => ($state: rxjs.Observable<types.State>) => {
  return $state.pipe(
    rxjs.filter((x) => !xs.includes(x)),
    rxjs.distinctUntilChanged()
  );
};
