import { constant, flow, pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as models from 'models';
import * as stores from 'stores';

export const main = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => (w: Window) => {
  return tick($time)(store).pipe(
    rxjs.tap(animate(w)),
    rxjs.last(),
    rxjs.tap(flow(constant(stores.state.phase.actions.set('main')), store[1]))
  );
};

export const tick = ($time: rxjs.Observable<number>) => (store: stores.types.Store) => {
  return store[0].pipe(
    rxjs.map((state) => state.phase),
    rxjs.filter((phase) => phase === 'intro'),
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

export const animate = (w: Window) =>
  lib.animation.concat([
    pipe(
      lib.animation.concat(
        pipe(
          models.headerElement.from.window(w),
          ReadonlyArray.map((element) =>
            pipe(
              lib.animation.concat(
                pipe(models.headerElement.to.itemElements(element), (elements) =>
                  pipe(
                    elements,
                    ReadonlyArray.zip(elements.map(() => 0.4 / (elements.length - 1))),
                    ReadonlyArray.mapWithIndex((i, [element, stagger]) =>
                      pipe((t) => {
                        element.style.transform = `translateY(${48 - 48 * t}px)`;
                        element.style.opacity = `${1 * t}`;
                      }, lib.animation.between([stagger * i, stagger * i + 0.6]))
                    )
                  )
                )
              )
            )
          )
        )
      ),
      lib.animation.between([0, 0.6])
    ),
    pipe(
      lib.animation.concat(
        pipe(
          models.mainElement.from.window(w),
          ReadonlyArray.map((element) =>
            pipe(
              lib.animation.concat(
                pipe(models.mainElement.to.sectionElements(element), (elements) =>
                  pipe(
                    elements,
                    ReadonlyArray.zip(elements.map(() => 0.4 / (elements.length - 1))),
                    ReadonlyArray.mapWithIndex((i, [element, stagger]) =>
                      pipe((t) => {
                        element.style.transform = `translateY(${48 - 48 * t}px)`;
                        element.style.opacity = `${1 * t}`;
                      }, lib.animation.between([stagger * i, stagger * i + 0.6]))
                    )
                  )
                )
              )
            )
          )
        )
      ),
      lib.animation.between([0.2, 0.8])
    ),
    pipe(
      lib.animation.concat(
        pipe(
          models.footerElement.from.window(w),
          ReadonlyArray.map((element) =>
            pipe(
              lib.animation.concat(
                pipe(models.footerElement.to.itemElements(element), (elements) =>
                  pipe(
                    elements,
                    ReadonlyArray.zip(elements.map(() => 0.4 / (elements.length - 1))),
                    ReadonlyArray.mapWithIndex((i, [element, stagger]) =>
                      pipe((t) => {
                        element.style.transform = `translateY(${48 - 48 * t}px)`;
                        element.style.opacity = `${1 * t}`;
                      }, lib.animation.between([stagger * i, stagger * i + 0.6]))
                    )
                  )
                )
              )
            )
          )
        )
      ),
      lib.animation.between([0.4, 1])
    )
  ]);
