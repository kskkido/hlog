import * as t from 'io-ts';
import * as activityStatus from 'models/activityStatus';

export const PhaseConfig = t.type({
  activityStatus: activityStatus.types.ActivityStatus
});

export type PhaseConfig = t.TypeOf<typeof PhaseConfig>;
