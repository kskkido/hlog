import * as types from '../types';

export const above = (x: types.TransitionElement) => (w: Window) => {
  return w.innerHeight >= x[0].getBoundingClientRect().top;
};

export const below = (x: types.TransitionElement) => (w: Window) => {
  return w.innerHeight < x[0].getBoundingClientRect().top;
};
