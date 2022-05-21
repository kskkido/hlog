import * as t from 'io-ts';

export const ScrollToEvent = t.type({
  detail: t.number
});

export type ScrollToEvent = t.TypeOf<typeof ScrollToEvent>;
