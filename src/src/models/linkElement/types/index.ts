import * as t from 'io-ts';
import * as lib from 'lib';

export const LinkElement = lib.element.types.HTMLAnchorElement;

export type LinkElement = t.TypeOf<typeof LinkElement>;
