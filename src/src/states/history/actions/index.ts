import * as types from '../types';

export const push = (payload: types.PushAction['payload']): types.PushAction => ({
  type: 'history/push',
  payload
});

export const back = (): types.BackAction => ({
  type: 'history/back',
  payload: undefined,
});

export const forward = (): types.ForwardAction => ({
  type: 'history/forward',
  payload: undefined,
});
