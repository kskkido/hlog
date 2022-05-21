import * as Record from 'fp-ts/Record';
import * as string from 'fp-ts/string';
import * as tagMetadata from 'models/tagMetadata';
import * as types from '../types';

export const list = (x: types.TagMetadataRecord): ReadonlyArray<tagMetadata.types.TagMetadata> => {
  return Record.collect(string.Ord)((_, v: tagMetadata.types.TagMetadata) => v)(x);
};
