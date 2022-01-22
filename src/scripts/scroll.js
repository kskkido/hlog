import * as lib from '/modules/lib/index.js';

const main = (w) => {
  const $scroll = w.rxjs
    .merge(
      w.rxjs.fromEvent(w, 'wheel', { passive: false }).pipe(
        w.rxjs.map((e) => e.wheelDeltaY * 0.4 * -1),
        w.rxjs.startWith(0),
        w.rxjs.switchScan(
          (dx, dy) =>
            w.rxjs
              .merge(
                w.rxjs.of(dx + dy),
                w.rxjs.fromEvent(w, 'scrollTo').pipe(
                  w.rxjs.map((e) => e.detail),
                  w.rxjs.filter((x) => typeof x === 'number' && !isNaN(x))
                )
              )
              .pipe(
                w.rxjs.map((dy) =>
                  lib.math.clamp(
                    dy,
                    0,
                    w.document.body.scrollHeight - w.document.body.clientHeight
                  )
                )
              ),
          w.document.body.scrollTop
        )
      )
    )
    .pipe(
      w.rxjs.switchScan(
        (sx, dx) =>
          lib.frame.global(w).pipe(
            w.rxjs.scan((sy) => lib.math.lerpW(sy, dx, 0.1)(0.0001), sx),
            w.rxjs.distinctUntilChanged()
          ),
        w.pageYOffset
      )
    );
  $scroll.subscribe((x) => {
    w.scroll(0, x);
  });
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
