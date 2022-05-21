import * as t from 'io-ts';
import * as lib from 'lib';
import * as transitionElementConfig from '../../transitionElementConfig';

export const TransitionElement = t.tuple([
  lib.element.types.HTMLElement,
  transitionElementConfig.types.TransitionElementConfig
]);

export type TransitionElement = t.TypeOf<typeof TransitionElement>;
