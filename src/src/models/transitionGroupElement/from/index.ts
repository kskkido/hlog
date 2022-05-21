import { pipe, flow } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';
import * as transitionGroupElementConfig from 'models/transitionGroupElementConfig';
import * as types from '../types';

export const window = (w: Window): ReadonlyArray<types.TransitionGroupElement> => {
  return pipe(
    Array.from(w.document.querySelectorAll('*[data-type~="transition-group"]')),
    ReadonlyArray.map(flow(Option.fromEitherK(lib.element.types.HTMLElement.decode), Option.map(element))),
    ReadonlyArray.compact
  );
};

export const element = (x: HTMLElement): types.TransitionGroupElement => {
  return [x, transitionGroupElementConfig.from.element(x)];
};
