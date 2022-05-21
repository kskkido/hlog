import * as t from 'io-ts';

export const Menu = t.union([t.literal('open'), t.literal('closed')]);

export type Menu = t.TypeOf<typeof Menu>;
