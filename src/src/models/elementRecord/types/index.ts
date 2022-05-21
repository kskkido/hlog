import * as t from 'io-ts';
import * as lib from 'lib';

export const ElementRecord = t.record(t.string, lib.element.types.HTMLElement);

export type ElementRecord = t.TypeOf<typeof ElementRecord>;
