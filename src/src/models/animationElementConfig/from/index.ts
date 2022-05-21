import { pipe, identity, constant } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as animationConfig from 'models/animationConfig';
import * as types from '../types';

export const element = (e: HTMLElement): types.AnimationElementConfig => {
  return {
    active: pipe(
      animationConfig.types.AnimationConfig.decode({
        animation: e.dataset.active_animation
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    inactive: pipe(
      animationConfig.types.AnimationConfig.decode({
        animation: e.dataset.inactive_animation
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    visible: pipe(
      animationConfig.types.AnimationConfig.decode({
        animation: e.dataset.visible_animation
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    hidden: pipe(
      animationConfig.types.AnimationConfig.decode({
        animation: e.dataset.hidden_animation
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    )
  };
};
