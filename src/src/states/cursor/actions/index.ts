import * as types from '../types';

export const set = (payload: types.SetAction['payload']): types.SetAction => ({
  type: 'cursor/set',
  payload
});

export const move = (payload: types.MoveAction['payload']): types.MoveAction => ({
  type: 'cursor/move',
  payload
});

export const scale = (payload: types.ScaleAction['payload']): types.ScaleAction => ({
  type: 'cursor/scale',
  payload
});
