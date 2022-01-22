import { identity } from 'fp-ts/function';
import * as store from 'lib/store';
import * as models from 'models';

export const push = store.actionCreator.from<models.location.types.Location>(identity)('history/push');

export const back = store.actionCreator.from<void>(identity)('history/back');

export const forward = store.actionCreator.from<void>(identity)('history/forward');

export type Action =
  | store.types.ActionOf<typeof push>
  | store.types.ActionOf<typeof back>
  | store.types.ActionOf<typeof forward>;
