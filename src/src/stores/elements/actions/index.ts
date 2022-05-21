import * as types from '../types';

export const set = (payload: types.SetAction['payload']): types.SetAction => {
  return {
    type: 'set',
    payload
  };
};
