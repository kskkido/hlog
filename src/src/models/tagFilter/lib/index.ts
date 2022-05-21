import { identity, pipe } from 'fp-ts/function';
import * as Ord from 'fp-ts/Ord';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as tagMetadata from 'models/tagMetadata';
import * as types from '../types';

export const match = (metadatas: ReadonlyArray<tagMetadata.types.TagMetadata>) => (x: types.TagFilter) => {
  return pipe(
    metadatas,
    ReadonlyArray.sort(pipe(tagMetadata.order.sortType(x.sort), x.order === 'ascending' ? identity : Ord.reverse))
  );
};
