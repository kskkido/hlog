import * as t from 'io-ts';

export const TransitionTrigger = t.union([t.literal('load'), t.literal('viewport')]);

export type TransitionTrigger = t.TypeOf<typeof TransitionTrigger>;
