import * as Ord from 'fp-ts/Ord';
import * as types from '../types';

export const date = Ord.fromCompare<types.PostMetadata>((x, y) => (x.date.getTime() - y.date.getTime() > 0 ? 1 : -1));

export const title = Ord.fromCompare<types.PostMetadata>((x, y) => (x.title.localeCompare(y.title) > 0 ? 1 : -1));

export const length = Ord.fromCompare<types.PostMetadata>((x, y) => (x.length - y.length > 0 ? 1 : -1));
