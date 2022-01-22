import * as t from 'io-ts';

export const Phase = t.union([t.literal('preload'), t.literal('intro'), t.literal('main'), t.literal('outro')]);

export type Phase = t.TypeOf<typeof Phase>;
