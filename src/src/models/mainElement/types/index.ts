import * as t from 'io-ts';
import * as lib from 'lib';

export const MainElement = lib.element.types.HTMLElement;

export type MainElement = t.TypeOf<typeof MainElement>;
