import * as animationGroupElementConfig from 'models/animationGroupElementConfig';
import * as phaseElementConfig from 'models/phaseElementConfig';
import * as types from '../types';

export const element = (e: HTMLElement): types.TransitionGroupElementConfig => {
  return {
    animation: animationGroupElementConfig.from.element(e),
    phase: phaseElementConfig.from.element(e)
  };
};
