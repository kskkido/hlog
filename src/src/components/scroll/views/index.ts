import * as rxjs from 'rxjs';
import * as states from 'states';

export const observe = ($state: rxjs.Observable<{ scroll: states.scroll.types.State }>) => (w: Window) => {
  return scroll($state.pipe(rxjs.map((s) => s.scroll)))(w);
};

export const scroll = ($state: rxjs.Observable<states.scroll.types.State>) => (w: Window) => {
  return $state.pipe(
    rxjs.distinctUntilChanged(),
    rxjs.tap((scroll) => {
      w.scroll(0, scroll.y);
    })
  );
};
