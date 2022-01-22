import * as t from 'io-ts';

export const LinkElement = t.intersection([
  new t.Type<HTMLElement, unknown, unknown>(
    'HTMLElement',
    (x): x is HTMLElement => x instanceof HTMLElement,
    (x, c) => (x instanceof HTMLElement ? t.success(x) : t.failure(x, c)),
    (x) => x
  ),
  t.type({
    href: t.string
  })
]);

export type LinkElement = t.TypeOf<typeof LinkElement>;
