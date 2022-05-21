import * as t from 'io-ts';
import * as postMetadata from 'models/postMetadata';

export const PostMetadataRecord = t.record(t.string, postMetadata.types.PostMetadata);

export type PostMetadataRecord = t.TypeOf<typeof PostMetadataRecord>;
