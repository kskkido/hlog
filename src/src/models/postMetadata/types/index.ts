import * as t from 'io-ts';
import * as tt from 'io-ts-types';

export const PostMetadata = t.type({
  identifier: t.string,
  title: t.string,
  author: t.string,
  date: tt.date,
  url: t.string,
  length: t.number,
  tags: t.array(t.string)
});

export type PostMetadata = t.TypeOf<typeof PostMetadata>;
