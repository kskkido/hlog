import * as types from '../types';

export const push = (payload: types.PushAction['payload']): types.PushAction => ({
  type: 'push',
  payload
});

export const back = (): types.BackAction => ({
  type: 'back',
  payload: undefined
});

export const forward = (): types.ForwardAction => ({
  type: 'forward',
  payload: undefined
});
