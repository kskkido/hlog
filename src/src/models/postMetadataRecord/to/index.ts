import * as Record from 'fp-ts/Record';
import * as string from 'fp-ts/string';
import * as postMetadata from 'models/postMetadata';
import * as types from '../types';

export const list = (x: types.PostMetadataRecord): ReadonlyArray<postMetadata.types.PostMetadata> => {
  return Record.collect(string.Ord)((_, v: postMetadata.types.PostMetadata) => v)(x);
};
