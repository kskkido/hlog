import * as t from 'io-ts';

export const Scroll = t.type({
  y: t.number
});

export type Scroll = t.TypeOf<typeof Scroll>;
