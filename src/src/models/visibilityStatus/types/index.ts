import * as t from 'io-ts';

export const VisibilityStatus = t.union([t.literal('visible'), t.literal('hidden')]);

export type VisibilityStatus = t.TypeOf<typeof VisibilityStatus>;
