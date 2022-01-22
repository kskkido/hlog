import * as types from '../types';

export const path = (x: string): types.Location => {
  return { path: x, state: null };
};
