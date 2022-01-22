import * as t from 'io-ts';

export const WheelEvent = t.type({
  wheelDeltaY: t.number
});

export type WheelEvent = t.TypeOf<typeof WheelEvent>;
