import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as models from 'models';
import * as states from 'states';

export const observe = (e: lib.element.types.HTMLElement) => (w: Window) => {
  return rxjs.merge(scrollTo(e)(w), mount(e)).pipe(rxjs.filter(t.array(lib.event.types.Event).is));
};

export const scrollTo = (e: lib.element.types.HTMLElement) => (w: Window) => {
  return rxjs.merge(
    ...pipe(
      elements.articleTableOfContents.to.targets(e)(w),
      ReadonlyArray.map((px) =>
        rxjs.fromEvent(px[0], 'click').pipe(
          rxjs.tap(() => {
            w.dispatchEvent(
              new CustomEvent('scrollTo', models.scrollToEvent.from.detail(lib.element.to.scrollY(px[1])(w)))
            );
          })
        )
      )
    )
  );
};

export const mount = (e: lib.element.types.HTMLElement) => {
  return rxjs.of(null).pipe(
    rxjs.map(() => [
      states.animations.actions.update(
        states.animation.actions.tween({
          value: 1,
          speed: 0.025
        })
      )(lib.element.to.identifier(e))
    ])
  );
};

export const unmount = (e: lib.element.types.HTMLElement) => {
  return rxjs.of(null).pipe(
    rxjs.map(() => [
      states.animations.actions.update(
        states.animation.actions.tween({
          value: 0,
          speed: 0.2,
          threshold: 0.01
        })
      )(lib.element.to.identifier(e))
    ])
  );
};

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors.lookup(lib.element.to.identifier(e))($state);
  };
