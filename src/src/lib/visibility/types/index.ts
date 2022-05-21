import * as t from 'io-ts';

export const Visibility = t.union([t.literal('visible'), t.literal('hidden')]);

export type Visibility = t.TypeOf<typeof Visibility>;
