import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as stores from 'stores';
import * as models from 'models';

export const main = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => (w: Window) => {
  return tick($time)(store).pipe(
    rxjs.last(),
    rxjs.withLatestFrom(
      store[0].pipe(
        rxjs.map((state) => state.history.present),
        rxjs.filter((l): l is models.location.types.Location => l !== null),
        rxjs.tap((l) => (w.location.href = l.path))
      )
    )
  );
};

export const tick = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => {
  return store[0].pipe(
    rxjs.map((state) => state.phase),
    rxjs.filter((phase) => phase === 'outro'),
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
