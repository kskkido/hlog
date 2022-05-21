import * as t from 'io-ts';

export const Scene = t.union([t.literal('in'), t.literal('out')]);

export type Scene = t.TypeOf<typeof Scene>;
