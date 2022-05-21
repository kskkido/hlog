import * as t from 'io-ts';
import * as activityStatus from 'models/activityStatus';
import * as visibilityStatus from 'models/visibilityStatus';
import * as animationConfig from 'models/animationConfig';

export const AnimationElementConfig = t.record(
  t.union([activityStatus.types.ActivityStatus, visibilityStatus.types.VisibilityStatus]),
  t.union([animationConfig.types.AnimationConfig, t.null])
);

export type AnimationElementConfig = t.TypeOf<typeof AnimationElementConfig>;
