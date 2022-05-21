import * as animationElementConfig from 'models/animationElementConfig';
import * as types from '../types';

export const element = (e: HTMLElement): types.TransitionElementConfig => {
  return {
    animation: animationElementConfig.from.element(e)
  };
};
