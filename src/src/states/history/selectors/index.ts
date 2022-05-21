import * as rxjs from 'rxjs';
import * as types from '../types';

export const location = ($state: rxjs.Observable<types.State>) => {
  return $state.pipe(
    rxjs.map((s) => s.present),
    rxjs.filter((x): x is Exclude<typeof x, null> => x !== null)
  );
};
