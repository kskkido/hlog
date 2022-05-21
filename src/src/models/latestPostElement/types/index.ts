import * as t from 'io-ts';
import * as lib from 'lib';

export const LatestPostElement = lib.element.types.HTMLElement;

export type LatestPostElement = t.TypeOf<typeof LatestPostElement>;
