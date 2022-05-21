import * as t from 'io-ts';

export const Brightness = t.union([t.literal('light'), t.literal('dark')]);

export type Brightness = t.TypeOf<typeof Brightness>;
