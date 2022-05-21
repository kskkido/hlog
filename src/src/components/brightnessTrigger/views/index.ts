import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) =>
  (
    $state: rxjs.Observable<{ animations: states.animations.types.State; brightness: states.brightness.types.State }>
  ) => {
    return rxjs.merge(
      animate(e)(
        $state.pipe(
          rxjs.map((s) => s.animations),
          rxjs.distinctUntilChanged()
        )
      )
    );
  };

export const animate =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors
      .lookup(lib.element.to.identifier(e))($state)
      .pipe(
        rxjs.tap((t) => {
          lib.animation.concat([
            pipe(
              lib.animation.concat([
                (t) => {
                  pipe(elements.brightnessTrigger.to.dark(e), ReadonlyArray.fromOption).forEach((c) => {
                    c.style.transform = `translateY(${100 * t}%)`;
                  });
                }
              ]),
              lib.animation.between([0, 0.5])
            ),
            pipe(
              lib.animation.concat([
                (t) => {
                  pipe(elements.brightnessTrigger.to.light(e), ReadonlyArray.fromOption).forEach((c) => {
                    c.style.transform = `translateY(${-100 * t}%)`;
                  });
                }
              ]),
              lib.animation.reverse,
              lib.animation.between([0.5, 1])
            )
          ])(t);
        })
      );
  };
