import * as t from 'io-ts';

export const TagMetadataDTO = t.type({
  name: t.string,
  size: t.string,
  url: t.string
});

export type TagMetadataDTO = t.TypeOf<typeof TagMetadataDTO>;
