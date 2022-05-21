import * as t from 'io-ts';

export const ProgressRange = t.union([t.literal(0), t.literal(1)]);

export type ProgressRange = t.TypeOf<typeof ProgressRange>;
