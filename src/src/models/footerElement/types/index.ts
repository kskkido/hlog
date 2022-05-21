import * as t from 'io-ts';
import * as lib from 'lib';

export const FooterElement = lib.element.types.HTMLElement;

export type FooterElement = t.TypeOf<typeof FooterElement>;
