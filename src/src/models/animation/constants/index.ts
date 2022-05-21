import { flow } from 'fp-ts/function';
import * as lib from 'lib';
import * as types from '../types';

export const fadeIn: types.Animation = (e) => (t) => {
  e.style.opacity = `${1 * t}`;
};

export const fadeOut = flow(fadeIn, lib.animation.reverse);

export const slideInBottom: types.Animation = (e) => (t) => {
  e.style.transform = `translateY(${100 - 100 * t}%)`;
};

export const slideOutTop = flow(slideInBottom, lib.animation.reverse);

export const slideInBottomPx =
  (n: number): types.Animation =>
  (e) =>
  (t) => {
    e.style.transform = `translateY(${n - n * t}px)`;
  };

export const empty: types.Animation = () => () => null;
