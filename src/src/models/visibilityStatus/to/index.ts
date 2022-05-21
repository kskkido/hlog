import * as types from '../types';

export const range = (x: types.VisibilityStatus): 0 | 1 => {
  return x === 'hidden' ? 0 : 1;
};
