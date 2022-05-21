import * as t from 'io-ts';
import * as lib from 'lib';

export const ItemElement = lib.element.types.HTMLElement;

export type ItemElement = t.TypeOf<typeof ItemElement>;
