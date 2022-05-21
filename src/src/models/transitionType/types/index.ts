import * as t from 'io-ts';

export const TransitionType = t.union([
  t.literal('load'),
  t.literal('unload'),
  t.literal('visible'),
  t.literal('hidden')
]);

export type TransitionType = t.TypeOf<typeof TransitionType>;
