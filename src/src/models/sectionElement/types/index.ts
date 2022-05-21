import * as t from 'io-ts';
import * as lib from 'lib';

export const SectionElement = lib.element.types.HTMLElement;

export type SectionElement = t.TypeOf<typeof SectionElement>;
