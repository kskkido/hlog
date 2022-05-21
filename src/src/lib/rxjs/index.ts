import { pipe, constant } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import { lerp, lerpW, between, range } from 'lib/math';

export const duration = (ms: number) => ($time: rxjs.Observable<number>) => {
  return $time.pipe(
    rxjs.map(constant(rxjs.Scheduler.now())),
    rxjs.map((s) => rxjs.Scheduler.now() - s),
    rxjs.map((t) => lerp(0, 1, t / ms)),
    rxjs.takeWhile((p) => p < 1),
    rxjs.endWith(1)
  );
};

export const tween = ($status: rxjs.Observable<0 | 1>) => ($time: rxjs.Observable<number>) => {
  return $status.pipe(
    rxjs.switchScan(
      (t, to) =>
        $time.pipe(
          rxjs.scan((u) => lerpW(u, to, 0.03)(0.001), t), // win!
          rxjs.takeWhile(between(range(0, 1))),
          rxjs.endWith(to)
        ),
      0
    ),
    rxjs.distinctUntilChanged()
  );
};

export const animation = (fn: (t: number) => void) => ($progress: rxjs.Observable<number>) => {
  return $progress.pipe(rxjs.tap(fn));
};

export const combine = <A>(rx: { readonly [K in keyof A]: rxjs.Observable<A[K]> }): rxjs.Observable<A> => {
  return rxjs
    .combineLatest(
      pipe(
        Object.keys(rx) as Array<keyof A>,
        ReadonlyArray.map((key) => rxjs.combineLatest([rxjs.of(key), rx[key]]))
      )
    )
    .pipe(
      rxjs.map((pxs) => pxs.reduce((acc, px) => ({ ...acc, [px[0]]: px[1] }), {} as A)),
      rxjs.distinctUntilChanged(),
      rxjs.shareReplay(1)
    );
};
