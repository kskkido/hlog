import * as types from '../types';

export const set =
  (value: types.SetAction['payload']['value']) =>
  (key: types.SetAction['payload']['key']): types.SetAction => {
    return {
      type: 'set',
      payload: {
        key,
        value
      }
    };
  };
