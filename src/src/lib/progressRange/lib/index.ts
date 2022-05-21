import * as types from '../types';

export const toggle = (x: types.ProgressRange): types.ProgressRange => {
  return x === 0 ? 1 : 0;
};
