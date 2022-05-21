import * as rxjs from 'rxjs';
import * as models from 'models';
import * as states from 'states';

export const observe = ($state: rxjs.Observable<{ brightness: states.brightness.types.State }>) => (w: Window) => {
  return rxjs.merge(
    brightness(
      $state.pipe(
        rxjs.map((s) => s.brightness),
        rxjs.distinctUntilChanged()
      )
    )(w)
  );
};

export const brightness = ($state: rxjs.Observable<states.brightness.types.State>) => (w: Window) => {
  return $state.pipe(
    rxjs.tap((bx) => {
      w.document.documentElement.classList.remove(models.brightness.lib.toggle(bx));
      w.document.documentElement.classList.add(bx);
    })
  );
};
