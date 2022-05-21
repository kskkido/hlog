import * as Eq from 'fp-ts/Eq';
import * as types from '../types';

export const deep = Eq.fromEquals<types.PostMetadata>(
  (x, y) =>
    x.identifier === y.identifier &&
    x.title === y.title &&
    x.author === y.author &&
    x.date.getTime() === y.date.getTime() &&
    x.url === y.url &&
    x.length === y.length &&
    x.tags.join('') === y.tags.join('')
);
