import * as types from '../types';

export const toggle = (x: types.Brightness): types.Brightness => {
  return x === 'light' ? 'dark' : 'light';
};
