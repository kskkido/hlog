import { pipe } from 'fp-ts/function';
import * as IO from 'fp-ts/IO';
import * as Option from 'fp-ts/Option';
import * as brightness from 'models/brightness';
import * as postFilter from 'models/postFilter';
import * as tagFilter from 'models/tagFilter';
import * as types from '../types';

export const window = (w: Window): IO.IO<types.Storage> => {
  return () => ({
    brightness: pipe(
      w.localStorage.getItem('brightness'),
      Option.fromEitherK(brightness.types.Brightness.decode),
      Option.toNullable
    ),
    postFilter: pipe(
      w.localStorage.getItem('postFilter'),
      Option.fromNullable,
      Option.chain(postFilter.from.string),
      Option.toNullable
    ),
    tagFilter: pipe(
      w.localStorage.getItem('tagFilter'),
      Option.fromNullable,
      Option.chain(tagFilter.from.string),
      Option.toNullable
    )
  });
};
