import * as t from 'io-ts';

export const AnimationType = t.union([
  t.literal('fadeIn'),
  t.literal('fadeOut'),
  t.literal('slideInBottom'),
  t.literal('slideOutTop')
]);

export type AnimationType = t.TypeOf<typeof AnimationType>;
