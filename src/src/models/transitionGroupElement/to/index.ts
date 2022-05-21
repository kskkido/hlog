import { pipe, constant, identity } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as phase from 'models/phase';
import * as transitionTrigger from 'models/transitionTrigger';
import * as transitionElement from 'models/transitionElement';
import * as animationElementConfig from 'models/animationElementConfig';
import * as animationGroupElementConfig from 'models/animationGroupElementConfig';
import * as types from '../types';

export const trigger = (x: types.TransitionGroupElement): ReadonlyArray<transitionTrigger.types.TransitionTrigger> => {
  return ReadonlyArray.compact([
    pipe(
      Option.guard(children(x).some((e) => transitionElement.to.trigger(e).includes('load'))),
      Option.apSecond(Option.of('load'))
    ),
    pipe(
      Option.guard(children(x).some((e) => transitionElement.to.trigger(e).includes('viewport'))),
      Option.apSecond(Option.of('viewport'))
    )
  ]);
};

export const active =
  (p: phase.types.Phase) =>
  (x: types.TransitionGroupElement): Option.Option<types.TransitionGroupElement> => {
    return pipe(Option.guard(x[1].phase[p]?.activityStatus === 'active'), Option.apSecond(Option.of(x)));
  };

export const inactive =
  (p: phase.types.Phase) =>
  (x: types.TransitionGroupElement): Option.Option<types.TransitionGroupElement> => {
    return pipe(Option.guard(x[1].phase[p]?.activityStatus === 'inactive'), Option.apSecond(Option.of(x)));
  };

export const idle =
  (p: phase.types.Phase) =>
  (x: types.TransitionGroupElement): Option.Option<types.TransitionGroupElement> => {
    return pipe(Option.guard(x[1].phase[p] === null), Option.apSecond(Option.of(x)));
  };

export const children = (x: types.TransitionGroupElement): ReadonlyArray<transitionElement.types.TransitionElement> => {
  return transitionElement.from.parent(x[0]);
};

export const animationGroupConfig =
  (status: keyof animationGroupElementConfig.types.AnimationGroupElementConfig) =>
  (x: types.TransitionGroupElement) => {
    return Option.fromNullable(x[1].animation[status]);
  };

export const animation =
  (status: keyof animationElementConfig.types.AnimationElementConfig) =>
  (x: types.TransitionGroupElement): lib.animation.types.Animation => {
    return pipe(
      animationGroupConfig(status)(x),
      Option.map((config) =>
        pipe(
          children(x),
          ReadonlyArray.map(transitionElement.to.animation(status)),
          ReadonlyArray.compact,
          (animations) =>
            pipe(
              animations,
              ReadonlyArray.zip(animations.map(() => config.stagger / (animations.length - 1))),
              ReadonlyArray.mapWithIndex((i, [animation, stagger]) =>
                pipe(
                  animation,
                  lib.frp.behavior.contramap(lib.time.lerpish),
                  lib.animation.between([stagger * i, stagger * i + (1 - config.stagger)])
                )
              )
            ),
          lib.animation.concat,
          lib.animation.between([config.start, config.end])
        )
      ),
      Option.fold(
        constant(() => null),
        identity
      )
    );
  };
