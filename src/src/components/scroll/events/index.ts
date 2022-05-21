import { constant, flow, identity, pipe } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';
import * as Option from 'fp-ts/Option';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as states from 'states';

export const observe = ($time: rxjs.Observable<number>) => (w: Window) => {
  return pipe(
    Option.zero<rxjs.Observable<Array<lib.state.types.ActionSchema>>>(),
    Option.alt(() =>
      pipe(
        Option.guard(lib.device.from.window(w) === 'desktop'),
        Option.map((): rxjs.Observable<Array<lib.state.types.ActionSchema>> => smooth($time)(w))
      )
    ),
    Option.fold(() => native(w), identity)
  );
};

export const native = (w: Window) => {
  w.document.documentElement.classList.remove('smooth-scroll');
  return rxjs
    .merge(
      rxjs.fromEvent(w, 'scrollTo').pipe(
        rxjs.map(flow(models.scrollToEvent.from.event, Option.toNullable)),
        rxjs.filter((x): x is Exclude<typeof x, null> => x !== null),
        rxjs.map((e) => e.detail)
      )
    )
    .pipe(rxjs.map((y) => [states.scroll.actions.set({ y })]));
};

export const smooth = ($time: rxjs.Observable<number>) => (w: Window) => {
  w.document.documentElement.classList.add('smooth-scroll');
  return rxjs.fromEvent(w, 'wheel', { passive: false }).pipe(
    rxjs.map(models.wheelEvent.types.WheelEvent.decode),
    rxjs.map(Either.fold(constant(null), identity)),
    rxjs.filter((x): x is models.wheelEvent.types.WheelEvent => x !== null),
    rxjs.map((e) => e.deltaY * 0.8),
    rxjs.startWith(0),
    rxjs.switchScan(
      (dx, dy) =>
        rxjs
          .merge(
            rxjs.of(dx + dy),
            rxjs.fromEvent(w, 'scrollTo').pipe(
              rxjs.map(flow(models.scrollToEvent.from.event, Option.toNullable)),
              rxjs.filter((x): x is Exclude<typeof x, null> => x !== null),
              rxjs.map((e) => e.detail)
            ),
            rxjs.fromEvent(w, 'hashchange').pipe(
              rxjs.map(() =>
                pipe(
                  w.document.querySelector(`${w.location.hash}`),
                  Option.fromNullable,
                  Option.chain(Option.fromEitherK(lib.element.types.HTMLElement.decode)),
                  Option.toNullable
                )
              ),
              rxjs.filter((x): x is HTMLElement => x !== null),
              rxjs.map((x) => lib.element.to.scrollY(x)(w))
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
    rxjs.filter(() => lib.device.from.window(w) === 'desktop'),
    rxjs.map((y) => [states.scroll.actions.set({ y })])
  );
};
