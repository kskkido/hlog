import { pipe, identity, constant } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as phaseConfig from 'models/phaseConfig';
import * as types from '../types';

export const element = (e: HTMLElement): types.PhaseElementConfig => {
  return {
    preload: pipe(
      phaseConfig.types.PhaseConfig.decode({
        activityStatus: e.dataset.preload_activity_status
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    intro: pipe(
      phaseConfig.types.PhaseConfig.decode({
        activityStatus: e.dataset.intro_activity_status
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    main: pipe(
      phaseConfig.types.PhaseConfig.decode({
        activityStatus: e.dataset.main_activity_status
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    ),
    outro: pipe(
      phaseConfig.types.PhaseConfig.decode({
        activityStatus: e.dataset.outro_activity_status
      }),
      Option.fromEither,
      Option.fold(constant(null), identity)
    )
  };
};
