import * as rxjs from 'rxjs';
import * as lib from 'lib';
import * as states from 'states';

export const observe = (e: lib.element.types.HTMLElement) => {
  return rxjs.merge(mount(e));
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

export const animation =
  (e: lib.element.types.HTMLElement) => ($state: rxjs.Observable<states.animations.types.State>) => {
    return states.animations.selectors.lookup(lib.element.to.identifier(e))($state);
  };
