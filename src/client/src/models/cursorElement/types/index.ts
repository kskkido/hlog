import * as t from 'io-ts';

export const CursorElement = new t.Type<HTMLElement, unknown, unknown>(
  'Element',
  (x): x is HTMLElement => x instanceof HTMLElement,
  (x, c) => (x instanceof HTMLElement ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type CursorElement = t.TypeOf<typeof CursorElement>;
