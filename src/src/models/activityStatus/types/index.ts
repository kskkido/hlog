import * as t from 'io-ts';

export const ActivityStatus = t.union([t.literal('active'), t.literal('inactive')]);

export type ActivityStatus = t.TypeOf<typeof ActivityStatus>;
