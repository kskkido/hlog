import * as t from 'io-ts';

export const SectionElement = new t.Type<HTMLElement, unknown, unknown>(
  'HTMLElement',
  (x): x is HTMLElement => x instanceof HTMLElement,
  (x, c) => (x instanceof HTMLElement ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type SectionElement = t.TypeOf<typeof SectionElement>;
