import * as t from 'io-ts';
import * as activityStatus from 'models/activityStatus';
import * as visibilityStatus from 'models/visibilityStatus';
import * as animationGroupConfig from 'models/animationGroupConfig';

export const AnimationGroupElementConfig = t.record(
  t.union([activityStatus.types.ActivityStatus, visibilityStatus.types.VisibilityStatus]),
  t.union([animationGroupConfig.types.AnimationGroupConfig, t.null])
);

export type AnimationGroupElementConfig = t.TypeOf<typeof AnimationGroupElementConfig>;
