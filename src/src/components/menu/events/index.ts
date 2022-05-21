import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as elements from 'elements';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<{ menu: states.menu.types.State }>) => {
    return rxjs.merge(
      $state.pipe(
        rxjs.map((s) => s.menu),
        rxjs.distinctUntilChanged(),
        rxjs.filter((s) => s === 'open'),
        rxjs.mergeMap(() =>
          mount(e).pipe(
            rxjs.takeUntil(
              $state.pipe(
                rxjs.map((s) => s.menu),
                rxjs.distinctUntilChanged(),
                rxjs.filter((s) => s === 'closed')
              )
            )
          )
        )
      ),
      $state.pipe(
        rxjs.map((s) => s.menu),
        rxjs.distinctUntilChanged(),
        rxjs.filter((s) => s === 'closed'),
        rxjs.mergeMap(() =>
          unmount(e).pipe(
            rxjs.takeUntil(
              $state.pipe(
                rxjs.map((s) => s.menu),
                rxjs.distinctUntilChanged(),
                rxjs.filter((s) => s === 'open')
              )
            )
          )
        )
      )
    );
  };

export const mount = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(
    ...pipe(
      elements.content.from.element(e),
      ReadonlyArray.mapWithIndex((i, c) =>
        rxjs.timer(150 + i * 150).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.tween({
                value: 1,
                speed: 0.025,
                threshold: 0.01
              })
            )(lib.element.to.identifier(c))
          ])
        )
      )
    ),
    ...pipe(
      ReadonlyArray.of(e),
      ReadonlyArray.map((c) =>
        rxjs.timer(0).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.linear({
                value: 1,
                duration: 300
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
      [
        ...ReadonlyArray.of(e).map((c) =>
          rxjs.of([
            states.animations.actions.update(
              states.animation.actions.linear({
                value: 0,
                duration: 200
              })
            )(lib.element.to.identifier(c))
          ])
        ),
        ...elements.content.from.element(e).map((c) =>
          rxjs.of([
            states.animations.actions.update(
              states.animation.actions.tween({
                value: 0,
                speed: 0.2,
                threshold: 0.01
              })
            )(lib.element.to.identifier(c))
          ])
        )
      ],
      ReadonlyArray.reverse,
      ReadonlyArray.mapWithIndex((i, c) => rxjs.timer(i * 75).pipe(rxjs.mergeMap(() => c)))
    )
  );
};

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    const contents = [...ReadonlyArray.of(e), ...elements.content.from.element(e)];
    return rxjs
      .combineLatest(
        pipe(
          contents,
          ReadonlyArray.map((c) => pipe(states.animations.selectors.lookup(lib.element.to.identifier(c))($state)))
        )
      )
      .pipe(rxjs.map((ns) => lib.math.sum(ns) / contents.length));
  };
