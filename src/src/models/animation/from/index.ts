import * as animationConfig from 'models/animationConfig';
import * as types from '../types';
import * as constants from '../constants';

export const config = ({ animation: x }: animationConfig.types.AnimationConfig): types.Animation => {
  if (x === 'fadeIn') {
    return constants.fadeIn;
  } else if (x === 'fadeOut') {
    return constants.fadeOut;
  } else if (x === 'slideInBottom') {
    return constants.slideInBottom;
  } else {
    return constants.slideOutTop;
  }
};
