import * as types from '../types';

export const vector = ([x, y]: [number, number]): types.Range => {
  return y >= x ? [x, y] : [y, x];
};
