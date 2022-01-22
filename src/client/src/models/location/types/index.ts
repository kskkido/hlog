import * as t from 'io-ts';

export const Location = t.type({
  path: t.string,
  state: t.unknown
});

export type Location = t.TypeOf<typeof Location>;
