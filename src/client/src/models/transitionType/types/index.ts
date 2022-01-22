import * as t from 'io-ts';

export const TransitionType = t.union([
  t.literal('slideInTop'),
  t.literal('slideInBottom'),
  t.literal('slideOutTop'),
  t.literal('slideOutBottom'),
  t.literal('fadeInTop'),
  t.literal('fadeInBottom'),
  t.literal('fadeOutTop'),
  t.literal('fadeOutBottom')
]);
