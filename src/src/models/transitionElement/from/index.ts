import { pipe, flow } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';
import * as transitionElementConfig from 'models/transitionElementConfig';
import * as types from '../types';

export const parent = (x: HTMLElement): ReadonlyArray<types.TransitionElement> => {
  return pipe(
    Array.from(x.querySelectorAll('*[data-type~="transition"]')),
    ReadonlyArray.map(flow(Option.fromEitherK(lib.element.types.HTMLElement.decode), Option.map(element))),
    ReadonlyArray.compact
  );
};

export const window = (w: Window): ReadonlyArray<types.TransitionElement> => {
  return pipe(
    Array.from(w.document.querySelectorAll('*[data-type~="transition"]')),
    ReadonlyArray.map(flow(Option.fromEitherK(lib.element.types.HTMLElement.decode), Option.map(element))),
    ReadonlyArray.compact
  );
};

export const element = (x: HTMLElement): types.TransitionElement => {
  return [x, transitionElementConfig.from.element(x)];
};
