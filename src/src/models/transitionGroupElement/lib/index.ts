import * as types from '../types';

export const above = (x: types.TransitionGroupElement) => (w: Window) => {
  return w.innerHeight >= x[0].getBoundingClientRect().top;
};

export const below = (x: types.TransitionGroupElement) => (w: Window) => {
  return w.innerHeight < x[0].getBoundingClientRect().top;
};
