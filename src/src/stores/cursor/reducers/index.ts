import * as rxjs from 'rxjs';
import * as types from '../types';

export const main = (_: types.State) => (action: types.Action) => {
  return rxjs.of(action.payload);
};
