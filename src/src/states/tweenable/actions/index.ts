import * as types from '../types';

export const linear = (payload: types.LinearAction['payload']): types.LinearAction => ({
  type: 'tweenable/linear',
  payload
});

export const tween = (payload: types.TweenAction['payload']): types.TweenAction => ({
  type: 'tweenable/tween',
  payload
});
