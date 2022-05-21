import { pipe } from 'fp-ts/function';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as states from 'states';

export const observe =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<{ menu: states.menu.types.State }>) => {
    return rxjs.merge(
      $state.pipe(
        rxjs.map((s) => s.menu),
        rxjs.distinctUntilChanged(),
        rxjs.filter((s) => s === 'open'),
        rxjs.mergeMap(() => unmount(e))
      ),
      $state.pipe(
        rxjs.map((s) => s.menu),
        rxjs.distinctUntilChanged(),
        rxjs.filter((s) => s === 'closed'),
        rxjs.mergeMap(() => mount(e))
      )
    );
  };

export const mount = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(
    ...pipe(
      ReadonlyArray.of(e),
      ReadonlyArray.map((c) =>
        rxjs.timer(0).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.linear({
                value: 1,
                duration: 600
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
      ReadonlyArray.of(e),
      ReadonlyArray.reverse,
      ReadonlyArray.map((c) =>
        rxjs.timer(0).pipe(
          rxjs.map(() => [
            states.animations.actions.update(
              states.animation.actions.linear({
                value: 0,
                duration: 300
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
    const contents = [...ReadonlyArray.of(e)];
    return rxjs
      .combineLatest(
        pipe(
          contents,
          ReadonlyArray.map((c) => pipe(states.animations.selectors.lookup(lib.element.to.identifier(c))($state)))
        )
      )
      .pipe(rxjs.map((ns) => lib.math.sum(ns) / contents.length));
  };
