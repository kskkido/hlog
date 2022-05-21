import { pipe, identity, constant } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as lib from 'lib';
import * as animationGroupConfig from 'models/animationGroupConfig';
import * as types from '../types';

export const element = (e: HTMLElement): types.AnimationGroupElementConfig => {
  return {
    active: pipe(
      animationGroupConfig.types.AnimationGroupConfig.decode({
        start: pipe(lib.parser.number.parse(e.dataset.active_start || ''), Option.fold(constant(0), identity)),
        end: pipe(lib.parser.number.parse(e.dataset.active_end || ''), Option.fold(constant(1), identity)),
        stagger: pipe(lib.parser.number.parse(e.dataset.active_stagger || ''), Option.fold(constant(0), identity))
      }),
      (x) => (console.log(x), x),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    inactive: pipe(
      animationGroupConfig.types.AnimationGroupConfig.decode({
        start: pipe(lib.parser.number.parse(e.dataset.inactive_start || ''), Option.fold(constant(0), identity)),
        end: pipe(lib.parser.number.parse(e.dataset.inactive_end || ''), Option.fold(constant(1), identity)),
        stagger: pipe(lib.parser.number.parse(e.dataset.inactive_stagger || ''), Option.fold(constant(0), identity))
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    visible: pipe(
      animationGroupConfig.types.AnimationGroupConfig.decode({
        start: pipe(lib.parser.number.parse(e.dataset.visible_start || ''), Option.fold(constant(0), identity)),
        end: pipe(lib.parser.number.parse(e.dataset.visible_end || ''), Option.fold(constant(1), identity)),
        stagger: pipe(lib.parser.number.parse(e.dataset.visible_stagger || ''), Option.fold(constant(0), identity))
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    hidden: pipe(
      animationGroupConfig.types.AnimationGroupConfig.decode({
        start: pipe(lib.parser.number.parse(e.dataset.hidden_start || ''), Option.fold(constant(0), identity)),
        end: pipe(lib.parser.number.parse(e.dataset.hidden_end || ''), Option.fold(constant(1), identity)),
        stagger: pipe(lib.parser.number.parse(e.dataset.hidden_stagger || ''), Option.fold(constant(0), identity))
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    )
  };
};
