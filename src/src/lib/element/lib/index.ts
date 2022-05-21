import * as types from '../types';

export const above = (x: types.Element) => (w: Window) => {
  return w.innerHeight >= x.getBoundingClientRect().top;
};

export const below = (x: types.Element) => (w: Window) => {
  return w.innerHeight < x.getBoundingClientRect().top;
};
