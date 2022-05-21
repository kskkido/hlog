import * as rxjs from 'rxjs';
import * as types from '../types';

export const includes = (xs: ReadonlyArray<types.State>) => (state: types.Store[0]) => {
  return state.pipe(rxjs.filter((x) => xs.includes(x)));
};

export const excludes = (xs: ReadonlyArray<types.State>) => (state: types.Store[0]) => {
  return state.pipe(rxjs.filter((x) => !xs.includes(x)));
};
