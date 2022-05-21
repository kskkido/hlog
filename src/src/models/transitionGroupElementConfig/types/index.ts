import * as t from 'io-ts';
import * as phaseElementConfig from 'models/phaseElementConfig';
import * as animationGroupElementConfig from 'models/animationGroupElementConfig';

export const TransitionGroupElementConfig = t.type({
  animation: animationGroupElementConfig.types.AnimationGroupElementConfig,
  phase: phaseElementConfig.types.PhaseElementConfig
});

export type TransitionGroupElementConfig = t.TypeOf<typeof TransitionGroupElementConfig>;
