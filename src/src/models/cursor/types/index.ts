import * as t from 'io-ts';

export const Cursor = t.type({
  scale: t.number,
  position: t.tuple([t.number, t.number])
});

export type Cursor = t.TypeOf<typeof Cursor>;
