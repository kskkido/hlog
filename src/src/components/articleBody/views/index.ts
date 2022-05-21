import { constant, pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as models from 'models';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<{ animations: states.animations.types.State }>) => {
    return rxjs
      .merge(
        animate(e)(
          $state.pipe(
            rxjs.map((s) => s.animations),
            rxjs.distinctUntilChanged()
          )
        )
      )
      .pipe(rxjs.map(constant(null)));
  };

export const animate =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors
      .lookup(lib.element.to.identifier(e))($state)
      .pipe(
        rxjs.tap(
          pipe(
            lib.animation.stagger(0.4)(
              pipe(
                elements.content.from.element(e),
                ReadonlyArray.map((element) =>
                  pipe(
                    lib.animation.concat([
                      models.animation.constants.slideInBottomPx(36)(element),
                      models.animation.constants.fadeIn(element)
                    ]),
                    lib.frp.behavior.contramap(lib.time.lerpish)
                  )
                )
              )
            )
          )
        )
      );
  };
