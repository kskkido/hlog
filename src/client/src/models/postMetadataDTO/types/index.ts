import * as t from 'io-ts';

export const PostMetadataDTO = t.type({
  identifier: t.string,
  title: t.string,
  author: t.string,
  date: t.string,
  url: t.string,
  length: t.string,
  tags: t.array(t.string)
});

export type PostMetadataDTO = t.TypeOf<typeof PostMetadataDTO>;
