import { constant } from 'fp-ts/function';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<{ brightness: states.brightness.types.State }>) => {
    return rxjs.merge(
      rxjs.fromEvent(e, 'click').pipe(rxjs.map(constant([states.brightness.actions.toggle]))),
      toggle(e)(
        $state.pipe(
          rxjs.map((s) => s.brightness),
          rxjs.distinctUntilChanged()
        )
      )
    );
  };

export const toggle =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.brightness.types.State>) => {
    return $state.pipe(
      rxjs.map((s) => [
        states.animations.actions.update(
          states.animation.actions.tween({
            value: s === 'light' ? 0 : 1,
            speed: 0.08,
            threshold: 0.001
          })
        )(lib.element.to.identifier(e))
      ])
    );
  };
