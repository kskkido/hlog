import * as rxjs from 'rxjs';
import * as types from '../types';

export const stream = (): types.ActionSource => {
  const $actions = new rxjs.Subject<ReadonlyArray<types.ActionSchema>>();
  return [$actions.pipe(rxjs.mergeMap(rxjs.from)), $actions.next.bind($actions)];
};
