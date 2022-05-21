import { constant, flow, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as IO from 'fp-ts/IO';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as actors from './actors';
import * as stores from './stores';
import * as network from './network';

export const main = (w: Window) => {
  const source = lib.event.from.io();
  const $time = rxjs.interval(0, rxjs.animationFrameScheduler).pipe(rxjs.share());
  const $actor = actors.page.from.window(w);
  const $state = stores.page.from.event($time)(w)(source[0]);

  return network
    .main($actor)($state)($time)(source)(w)
    .pipe(rxjs.map(constant(null)))
    .subscribe(() => {});
};

export const prerender = (w: Window) => {
  lib.bfcache.disable(w);
  return pipe(
    models.storage.from.window(w),
    IO.chain(
      flow(
        (s) => Option.fromNullable(s.brightness),
        Option.fold(constant(constant(null)), (brightness) => () => {
          w.document.documentElement.classList.add(brightness);
        })
      )
    )
  )();
};
