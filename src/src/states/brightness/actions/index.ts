import * as types from '../types';

export const set = (payload: types.SetAction['payload']): types.SetAction => ({
  type: 'brightness/set',
  payload
});

export const toggle: types.ToggleAction = {
  type: 'brightness/toggle',
  payload: undefined
};
