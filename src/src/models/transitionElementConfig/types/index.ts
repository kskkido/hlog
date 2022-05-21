import * as t from 'io-ts';
import * as animationElementConfig from 'models/animationElementConfig';

export const TransitionElementConfig = t.type({
  animation: animationElementConfig.types.AnimationElementConfig
});

export type TransitionElementConfig = t.TypeOf<typeof TransitionElementConfig>;
