import { constant, flow, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as states from 'states';
import * as elements from 'elements';

export const observe = (e: lib.element.types.HTMLElement) => ($time: rxjs.Observable<number>) => (w: Window) => {
  return rxjs.merge(scale($time)(w), mount(e)(w));
};

export const move = ($time: rxjs.Observable<number>) => (w: Window) => {
  return $time.pipe(
    rxjs.withLatestFrom(
      rxjs
        .fromEvent(w, 'mousemove')
        .pipe(
          rxjs.map(flow(models.mouseEvent.from.event, Option.toNullable)),
          rxjs.filter((x): x is Exclude<typeof x, null> => x !== null)
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
    rxjs.filter(() => lib.device.from.window(w) === 'desktop'),
    rxjs.map((x) => [states.cursor.actions.move(x)])
  );
};

export const scale = ($time: rxjs.Observable<number>) => (w: Window) => {
  return rxjs
    .merge(
      rxjs.fromEvent(w, 'mouseup').pipe(rxjs.map(constant(1))),
      rxjs.fromEvent(w, 'mousedown').pipe(rxjs.map(constant(1.25))),
      rxjs
        .fromEvent(w, 'mousemove')
        .pipe(rxjs.map(flow(elements.link.from.event, Option.fold(constant(1), constant(1.5)))))
    )
    .pipe(
      rxjs.switchScan((state, next) => {
        return $time.pipe(
          rxjs.scan((tween) => {
            return lib.math.lerpW(tween, next, 0.125)(0.001);
          }, state)
        );
      }, 1),
      rxjs.filter(() => lib.device.from.window(w) === 'desktop'),
      rxjs.map((x) => [states.cursor.actions.scale(x)])
    );
};

export const mount = (e: lib.element.types.HTMLElement) => (w: Window) => {
  return rxjs.fromEvent(w, 'mousemove').pipe(
    rxjs.filter(() => lib.device.from.window(w) === 'desktop'),
    rxjs.take(1),
    rxjs.map(() => [
      states.animations.actions.update(
        states.animation.actions.tween({
          value: 1,
          speed: 0.0225,
          threshold: 0.01
        })
      )(lib.element.to.identifier(e))
    ])
  );
};

export const unmount = (e: lib.element.types.HTMLElement) => {
  return rxjs.of(null).pipe(
    rxjs.map(() => [
      states.animations.actions.update(
        states.animation.actions.linear({
          value: 0,
          duration: 300
        })
      )(lib.element.to.identifier(e))
    ])
  );
};

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors.lookup(lib.element.to.identifier(e))($state);
  };
