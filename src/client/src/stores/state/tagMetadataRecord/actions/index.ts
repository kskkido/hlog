import * as lib from 'lib';
import { identity } from 'fp-ts/function';
import { State } from '../reducers';

export const set = lib.store.actionCreator.from<State>(identity)('tagMetadataRecord/set');

export type Action = lib.store.types.ActionOf<typeof set>;
