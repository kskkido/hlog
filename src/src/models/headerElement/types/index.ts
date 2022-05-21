import * as t from 'io-ts';
import * as lib from 'lib';

export const HeaderElement = lib.element.types.HTMLElement;

export type HeaderElement = t.TypeOf<typeof HeaderElement>;
