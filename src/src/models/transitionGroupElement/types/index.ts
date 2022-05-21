import * as t from 'io-ts';
import * as lib from 'lib';
import * as transitionGroupElementConfig from '../../transitionGroupElementConfig';

export const TransitionGroupElement = t.tuple([
  lib.element.types.HTMLElement,
  transitionGroupElementConfig.types.TransitionGroupElementConfig
]);

export type TransitionGroupElement = t.TypeOf<typeof TransitionGroupElement>;
