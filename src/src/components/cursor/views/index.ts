import { constant, flow, identity, pipe } from 'fp-ts/function';
import * as IO from 'fp-ts/IO';
import * as Option from 'fp-ts/Option';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as models from 'models';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) =>
  ($state: rxjs.Observable<{ animations: states.animations.types.State; cursor: states.cursor.types.State }>) => {
    return rxjs.merge(
      update(e)(
        $state.pipe(
          rxjs.map((s) => s.cursor),
          rxjs.distinctUntilChanged(models.cursor.eq.deep.equals)
        )
      ),
      animate(e)(
        $state.pipe(
          rxjs.map((s) => s.animations),
          rxjs.distinctUntilChanged()
        )
      )
    );
  };

export const update = (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.cursor.types.State>) => {
  return rxjs.merge(
    $state.pipe(
      rxjs.tap((state) => {
        elements.cursor.lib.update(state)(e)();
      })
    )
  );
};

export const animate =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return pipe($state, states.animations.selectors.lookup(lib.element.to.identifier(e))).pipe(
      rxjs.startWith(0),
      rxjs.tap(
        flow(
          lib.time.lerpish,
          lib.animation.concat([
            lib.animation.reverse((t) =>
              pipe(
                elements.cursor.to.path(e),
                Option.map((path) => () => {
                  path.setAttribute('stroke-dasharray', `${lib.element.to.pathLength(path)}`);
                  path.setAttribute('stroke-dashoffset', `${lib.element.to.pathLength(path) * t}`);
                }),
                Option.fold(constant(IO.of(null)), identity)
              )()
            ),
            (t) => {
              e.style.opacity = `${t}`;
            }
          ])
        )
      )
    );
  };
