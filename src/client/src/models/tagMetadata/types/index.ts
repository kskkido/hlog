import * as t from 'io-ts';

export const TagMetadata = t.type({
  name: t.string,
  size: t.number,
  url: t.string
});

export type TagMetadata = t.TypeOf<typeof TagMetadata>;
