import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as states from 'states';

export const observe = (e: lib.element.types.HTMLElement) => (w: Window) => {
  return rxjs.merge(
    visible(e)(w).pipe(rxjs.mergeMap(() => mount(e))),
    hidden(e)(w).pipe(rxjs.mergeMap(() => unmount(e)))
  );
};

export const mount = (e: lib.element.types.HTMLElement) => {
  return rxjs.of(null).pipe(
    rxjs.map(() => [
      states.animations.actions.update(
        states.animation.actions.tween({
          value: 1,
          speed: 0.02
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

export const visibility = (e: lib.element.types.HTMLElement) => (w: Window) => {
  return rxjs.fromEvent(w, 'scroll').pipe(
    rxjs.startWith(null),
    rxjs.map(() => (lib.element.lib.above(e)(w) ? 'in' : 'out')),
    rxjs.distinctUntilChanged()
  );
};

export const visible = (e: lib.element.types.HTMLElement) => (w: Window) => {
  return visibility(e)(w).pipe(rxjs.filter((x): x is 'in' => x === 'in'));
};

export const hidden = (e: lib.element.types.HTMLElement) => (w: Window) => {
  return visibility(e)(w).pipe(rxjs.filter((x): x is 'out' => x === 'out'));
};

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors.lookup(lib.element.to.identifier(e))($state);
  };
