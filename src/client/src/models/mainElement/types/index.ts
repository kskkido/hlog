import * as t from 'io-ts';

export const MainElement = new t.Type<HTMLElement, unknown, unknown>(
  'HTMLElement',
  (x): x is HTMLElement => x instanceof HTMLElement,
  (x, c) => (x instanceof HTMLElement ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type MainElement = t.TypeOf<typeof MainElement>;
