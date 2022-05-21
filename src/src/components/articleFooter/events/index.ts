import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as states from 'states';

export const observe = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(mount(e));
};

export const mount = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(
    ...pipe(
      elements.content.from.element(e),
      ReadonlyArray.mapWithIndex((i, c) =>
        rxjs.timer(0 + i * 50).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.tween({
                value: 1,
                speed: 0.04,
                threshold: 0.01
              })
            )(lib.element.to.identifier(c))
          ])
        )
      )
    )
  );
};

export const unmount = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(
    ...pipe(
      elements.content.from.element(e),
      ReadonlyArray.reverse,
      ReadonlyArray.mapWithIndex((i, c) =>
        rxjs.timer(i * 50).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.tween({
                value: 0,
                speed: 0.2,
                threshold: 0.01
              })
            )(lib.element.to.identifier(c))
          ])
        )
      )
    )
  );
};

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    const contents = elements.content.from.element(e);
    return rxjs
      .combineLatest(
        pipe(
          contents,
          ReadonlyArray.map((c) => pipe(states.animations.selectors.lookup(lib.element.to.identifier(c))($state)))
        )
      )
      .pipe(rxjs.map((ns) => lib.math.sum(ns) / contents.length));
  };
