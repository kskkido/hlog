import * as t from 'io-ts';

export const ViewType = t.union([
  t.literal('grid'),
  t.literal('list'),
]);

export type ViewType = t.TypeOf<typeof ViewType>
