import * as rxjs from 'rxjs';
import * as types from '../types';

export const main = (_: types.State) => (action: types.Action): rxjs.Observable<types.State> => {
  return rxjs.of(action.payload);
};
