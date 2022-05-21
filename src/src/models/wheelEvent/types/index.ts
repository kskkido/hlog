import * as t from 'io-ts';

export const WheelEvent = new t.Type<globalThis.WheelEvent, unknown, unknown>(
  'WheelEvent',
  (x): x is globalThis.WheelEvent => x instanceof globalThis.WheelEvent,
  (x, c) => (x instanceof globalThis.WheelEvent ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type WheelEvent = t.TypeOf<typeof WheelEvent>;
