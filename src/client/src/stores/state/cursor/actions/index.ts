import { identity } from 'fp-ts/function';
import * as models from 'models';
import * as store from 'lib/store';

export const set = store.actionCreator.from<models.cursor.types.Cursor>(identity)('cursor/set');

export type Action = store.types.ActionOf<typeof set>;
