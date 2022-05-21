import * as types from '../types';

export const between = (rx: types.Range) => (n: number) => {
  return rx[0] <= n && n <= rx[1];
};

export const distance = (rx: types.Range) => {
  return rx[1] - rx[0];
};
