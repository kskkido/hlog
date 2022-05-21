import { pipe } from 'fp-ts/function';
import * as Record from 'fp-ts/Record';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Semigroup from 'fp-ts/Semigroup';
import * as postMetadata from 'models/postMetadata';
import * as postMetadataDTO from 'models/postMetadataDTO';
import * as types from '../types';

export const window = (w: Window): types.PostMetadataRecord => {
  return pipe(
    postMetadataDTO.from.window(w),
    ReadonlyArray.map(postMetadata.from.dto),
    ReadonlyArray.compact,
    ReadonlyArray.map((metadata) => [metadata.identifier, metadata] as [string, typeof metadata]),
    Record.fromFoldable(Semigroup.last(), ReadonlyArray.Foldable)
  );
};
