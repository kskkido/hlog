import { pipe, apply } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as animation_ from 'models/animation';
import * as animationElementConfig from 'models/animationElementConfig';
import * as transitionTrigger from 'models/transitionTrigger';
import * as types from '../types';

export const trigger = (x: types.TransitionElement): ReadonlyArray<transitionTrigger.types.TransitionTrigger> => {
  return ReadonlyArray.compact([
    pipe(
      Option.guard(x[1].animation.active !== null || x[1].animation.inactive !== null),
      Option.apSecond(Option.of('load'))
    ),
    pipe(
      Option.guard(x[1].animation.visible !== null || x[1].animation.hidden !== null),
      Option.apSecond(Option.of('viewport'))
    )
  ]);
};

export const animation =
  (status: keyof animationElementConfig.types.AnimationElementConfig) =>
  (x: types.TransitionElement): Option.Option<lib.animation.types.Animation> => {
    return pipe(
      Option.fromNullable(x[1].animation[status]),
      Option.map(animation_.from.config),
      Option.map(apply(x[0]))
    );
  };
