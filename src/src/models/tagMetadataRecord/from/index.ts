import { pipe } from 'fp-ts/function';
import * as Record from 'fp-ts/Record';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Semigroup from 'fp-ts/Semigroup';
import * as tagMetadata from 'models/tagMetadata';
import * as tagMetadataDTO from 'models/tagMetadataDTO';
import * as types from '../types';

export const window = (w: Window): types.TagMetadataRecord => {
  return pipe(
    tagMetadataDTO.from.window(w),
    ReadonlyArray.map(tagMetadata.from.dto),
    ReadonlyArray.compact,
    ReadonlyArray.map((metadata) => [metadata.name, metadata] as [string, typeof metadata]),
    Record.fromFoldable(Semigroup.last(), ReadonlyArray.Foldable)
  );
};
