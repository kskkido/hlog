import * as t from 'io-ts';
import * as tagMetadata from 'models/tagMetadata';

export const TagMetadataRecord = t.record(t.string, tagMetadata.types.TagMetadata);

export type TagMetadataRecord = t.TypeOf<typeof TagMetadataRecord>;
