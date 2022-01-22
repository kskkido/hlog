import * as Ord from 'fp-ts/Ord';
import * as types from '../types';

export const name = Ord.fromCompare<types.TagMetadata>((x, y) => (x.name.localeCompare(y.name) > 0 ? 1 : -1));

export const size = Ord.fromCompare<types.TagMetadata>((x, y) => (x.size - y.size > 0 ? 1 : -1));
