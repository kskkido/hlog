import * as t from 'io-ts';

export const Element = new t.Type<globalThis.Element, unknown, unknown>(
  'Element',
  (x): x is globalThis.Element => x instanceof globalThis.Element,
  (x, c) => (x instanceof globalThis.Element ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type Element = t.TypeOf<typeof Element>;

export const HTMLElement = new t.Type<globalThis.HTMLElement, unknown, unknown>(
  'HTMLElement',
  (x): x is globalThis.HTMLElement => x instanceof globalThis.HTMLElement,
  (x, c) => (x instanceof globalThis.HTMLElement ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type HTMLElement = t.TypeOf<typeof HTMLElement>;

export const HTMLAnchorElement = new t.Type<globalThis.HTMLAnchorElement, unknown, unknown>(
  'HTMLAnchorElement',
  (x): x is globalThis.HTMLAnchorElement => x instanceof globalThis.HTMLAnchorElement,
  (x, c) => (x instanceof globalThis.HTMLAnchorElement ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type HTMLAnchorElement = t.TypeOf<typeof HTMLAnchorElement>;

export const SVGGeometryElement = new t.Type<globalThis.SVGGeometryElement, unknown, unknown>(
  'SVGGeometryElement',
  (x): x is globalThis.SVGGeometryElement => x instanceof globalThis.SVGGeometryElement,
  (x, c) => (x instanceof globalThis.SVGGeometryElement ? t.success(x) : t.failure(x, c)),
  (x) => x
);

export type SVGGeometryElement = t.TypeOf<typeof SVGGeometryElement>;
