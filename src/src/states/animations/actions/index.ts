import * as types from '../types';

export const update =
  (action: types.UpdateAction['payload']['action']) =>
  (key: types.UpdateAction['payload']['key']): types.UpdateAction => {
    return {
      type: 'update/animations',
      payload: {
        key,
        action
      }
    };
  };
