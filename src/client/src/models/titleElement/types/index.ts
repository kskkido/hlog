import * as t from 'io-ts';

export const TitleElement = t.intersection([
  new t.Type<HTMLElement, unknown, unknown>(
    'HTMLElement',
    (x): x is HTMLElement => x instanceof HTMLElement,
    (x, c) => (x instanceof HTMLElement ? t.success(x) : t.failure(x, c)),
    (x) => x
  ),
  t.type({
    dataset: t.type({
      type: t.literal('title')
    }),
    href: t.string
  })
]);

export type TitleElement = t.TypeOf<typeof TitleElement>;
