import { constant, flow } from 'fp-ts/function';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as stores from 'stores';

export const main = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => (_: Window) => {
  return tick($time)(store).pipe(
    rxjs.last(),
    rxjs.tap(flow(constant(stores.state.phase.actions.set('intro')), store[1]))
  );
};

export const tick = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => {
  return store[0].pipe(
    rxjs.map((state) => state.phase),
    rxjs.filter((phase) => phase === 'preload'),
    rxjs.take(1),
    rxjs.switchScan(
      (t) =>
        $time.pipe(
          rxjs.scan((u) => lib.math.lerpW(u, 1, 0.15)(0.025), t),
          rxjs.takeWhile(lib.math.between(lib.math.range(0, 1))),
          rxjs.endWith(1)
        ),
      0
    )
  );
};
