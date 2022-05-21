import * as t from 'io-ts';
import * as animationType from 'models/animationType';

export const AnimationConfig = t.type({
  animation: animationType.types.AnimationType
});

export type AnimationConfig = t.TypeOf<typeof AnimationConfig>;
