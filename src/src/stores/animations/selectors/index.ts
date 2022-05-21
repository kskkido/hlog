import * as Option from 'fp-ts/Option';
import * as Record from 'fp-ts/Record';
import * as rxjs from 'rxjs';
import * as types from '../types';

export const lookup = (key: string) => (state: types.Store[0]) => {
  return state.pipe(
    rxjs.map(Record.lookup(key)),
    rxjs.map(Option.toNullable),
    rxjs.filter((x): x is Exclude<typeof x, null> => x !== null)
  );
};

export const lookupValue = (key: string) => (state: types.Store[0]) => {
  return lookup(key)(state).pipe(rxjs.mergeMap((store) => store[0]));
};
