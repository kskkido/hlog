import { constant, identity } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as stores from 'stores';
import * as models from 'models';

export const main = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => (w: Window) => {
  return rxjs.combineLatest([scroll($time)(store)(w), offset($time)(store)(w)]).pipe(rxjs.map(constant(null)));
};

export const scroll =
  (_: rxjs.Observable<number>) =>
  ([$state]: stores.types.Store) =>
  (w: Window) => {
    return $state.pipe(
      rxjs.map((state) => state.scroll),
      rxjs.tap((scroll) => {
        w.scroll(0, scroll.y);
      })
    );
  };

export const offset =
  ($time: rxjs.Observable<number>) =>
  ([_, dispatch]: stores.types.Store) =>
  (w: Window) => {
    return rxjs.fromEvent(w, 'wheel', { passive: false }).pipe(
      rxjs.map(models.wheelEvent.types.WheelEvent.decode),
      rxjs.map(Either.fold(constant(null), identity)),
      rxjs.filter((x): x is models.wheelEvent.types.WheelEvent => x !== null),
      rxjs.map((e) => e.wheelDeltaY * 0.4 * -1),
      rxjs.startWith(0),
      rxjs.switchScan(
        (dx, dy) =>
          rxjs
            .merge(
              rxjs.of(dx + dy),
              rxjs.fromEvent(w, 'scrollTo').pipe(
                rxjs.map(models.scrollToEvent.types.ScrollToEvent.decode),
                rxjs.map(Either.fold(constant(null), identity)),
                rxjs.filter((x): x is models.scrollToEvent.types.ScrollToEvent => x !== null),
                rxjs.map((e) => e.detail)
              )
            )
            .pipe(rxjs.map((dy) => lib.math.clamp(dy, 0, w.document.body.scrollHeight - w.document.body.clientHeight))),
        w.document.body.scrollTop
      ),
      rxjs.switchScan(
        (sx, dx) =>
          $time.pipe(
            rxjs.scan((sy) => lib.math.lerpW(sy, dx, 0.1)(0.0001), sx),
            rxjs.distinctUntilChanged()
          ),
        w.scrollY
      ),
      rxjs.tap((y) => {
        dispatch(stores.state.scroll.actions.set({ y }));
      })
    );
  };
