import { identity, pipe } from 'fp-ts/function';
import * as Ord from 'fp-ts/Ord';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as postMetadata from 'models/postMetadata';
import * as types from '../types';

export const match = (metadatas: ReadonlyArray<postMetadata.types.PostMetadata>) => (x: types.PostFilter) => {
  return pipe(
    metadatas,
    ReadonlyArray.sort(pipe(postMetadata.order.sortType(x.sort), x.order === 'ascending' ? identity : Ord.reverse))
  );
};
