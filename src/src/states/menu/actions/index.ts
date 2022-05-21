import * as types from '../types';

export const set = (payload: types.SetAction['payload']): types.SetAction => ({
  type: 'menu/set',
  payload
});

export const toggle: types.ToggleAction = {
  type: 'menu/toggle',
  payload: undefined
};
