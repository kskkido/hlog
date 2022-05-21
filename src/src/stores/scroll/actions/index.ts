import * as types from '../types';

export const set = (payload: types.SetAction['payload']): types.SetAction => ({
  type: 'set',
  payload
});

export const tween = (payload: types.TweenAction['payload']): types.TweenAction => ({
  type: 'tween',
  payload
});

export const linear = (payload: types.LinearAction['payload']): types.LinearAction => ({
  type: 'linear',
  payload
});
