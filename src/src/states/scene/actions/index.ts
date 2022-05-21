import * as types from '../types';

export const set = (payload: types.SetAction['payload']): types.SetAction => ({
  type: 'scene/set',
  payload
});
