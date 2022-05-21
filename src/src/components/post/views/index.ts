import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as models from 'models';
import * as states from 'states';
import * as events from '../events';

export const observe =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<{ animations: states.animations.types.State }>) => {
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
    return events
      .animation(e)($state)
      .pipe(
        rxjs.tap(
          pipe(
            lib.animation.stagger(0.2)(
              pipe(
                elements.content.from.element(e),
                ReadonlyArray.map((element) =>
                  pipe(
                    lib.animation.concat([models.animation.constants.slideInBottom(element)]),
                    lib.frp.behavior.contramap(lib.time.lerpish)
                  )
                )
              )
            )
          )
        )
      );
  };
