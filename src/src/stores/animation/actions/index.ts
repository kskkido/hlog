import * as types from '../types';

export const linear = (payload: types.LinearAction['payload']): types.LinearAction => ({
  type: 'linear',
  payload
});

export const tween = (payload: types.TweenAction['payload']): types.TweenAction => ({
  type: 'tween',
  payload
});
