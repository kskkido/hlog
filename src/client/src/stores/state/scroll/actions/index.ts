import { identity } from 'fp-ts/function';
import * as models from 'models';
import * as store from 'lib/store';

export const set = store.actionCreator.from<models.scroll.types.Scroll>(identity)('scroll/set');

export type Action = store.types.ActionOf<typeof set>;
