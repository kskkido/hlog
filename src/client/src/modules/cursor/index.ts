import { flow, pipe, constant, identity } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as Either from 'fp-ts/Either';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as stores from 'stores';
import * as models from 'models';

export const main = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => (w: Window) => {
  return rxjs.combineLatest([move($time)(store)(w), position($time)(store)(w)]).pipe(rxjs.map(constant(null)));
};

export const move =
  (_: rxjs.Observable<number>) =>
  ([$state]: stores.types.Store) =>
  (w: Window) => {
    return rxjs.merge(
      ...pipe(
        models.cursorElement.from.window(w),
        ReadonlyArray.map((element) =>
          $state.pipe(
            rxjs.map((state) => state.cursor),
            rxjs.tap((cursor) => {
              models.cursorElement.lib.move(cursor)(element)();
            })
          )
        )
      )
    );
  };

export const position =
  ($time: rxjs.Observable<number>) =>
  ([_, dispatch]: stores.types.Store) =>
  (w: Window) => {
    return $time.pipe(
      rxjs.withLatestFrom(
        rxjs
          .fromEvent(w, 'mousemove')
          .pipe(
            rxjs.map(models.mouseEvent.types.MouseEvent.decode),
            rxjs.map(Either.fold(constant(null), identity)),
            rxjs.filter((x): x is models.mouseEvent.types.MouseEvent => x !== null)
          )
          .pipe(rxjs.map((e) => lib.vector2.from(e.clientX)(e.clientY))),
        (_, vx) => vx
      ),
      rxjs.scan(
        (vx, vy) =>
          pipe(
            lib.vector2.transpose(lib.vector2.from(vx)(vy)),
            lib.vector2.fmap(lib.vector2.fold((x, y) => lib.math.lerpW(x, y, 0.065)(0.001)))
          ),
        lib.vector2.from(0)(0)
      ),
      rxjs.distinctUntilChanged(lib.vector2.equal((x, y) => x === y)),
      rxjs.tap(flow(stores.state.cursor.actions.set, dispatch))
    );
  };
