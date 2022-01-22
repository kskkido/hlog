import * as t from 'io-ts';

export const MouseEvent = t.type({
  clientX: t.number,
  clientY: t.number
});

export type MouseEvent = t.TypeOf<typeof MouseEvent>;
