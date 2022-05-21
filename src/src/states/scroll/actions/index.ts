import * as types from '../types';

export const set = (payload: types.SetAction['payload']): types.SetAction => ({
  type: 'scroll/set',
  payload
});

export const tween = (payload: types.TweenAction['payload']): types.TweenAction => ({
  type: 'scroll/tween',
  payload
});

export const linear = (payload: types.LinearAction['payload']): types.LinearAction => ({
  type: 'scroll/linear',
  payload
});
