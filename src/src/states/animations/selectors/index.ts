import * as Option from 'fp-ts/Option';
import * as Record from 'fp-ts/Record';
import * as rxjs from 'rxjs';
import * as types from '../types';

export const lookup = (key: string) => ($state: rxjs.Observable<types.State>) => {
  return $state.pipe(
    rxjs.map(Record.lookup(key)),
    rxjs.map(Option.toNullable),
    rxjs.filter((x): x is Exclude<typeof x, null> => x !== null),
    rxjs.distinctUntilChanged()
  );
};
