import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

const main = (w) => {
  const $click = w.rxjs.fromEvent(w.document, 'click').pipe(
    w.rxjs.map((event) =>
      lib.maybe.sequence([
        models.link.fromEvent(event)(w),
        lib.maybe.pure(event),
      ])
    ),
    w.rxjs.filter((mx) => mx !== null),
    w.rxjs.tap(([_, event]) => event.preventDefault()),
    w.rxjs.filter(
      ([link]) =>
        lib.url.normalize(link.href) !== lib.url.normalize(w.location.href)
    )
  );
  const $animation = $click.pipe(
    w.rxjs.switchScan(
      (t) =>
        lib.frame.global(w).pipe(
          w.rxjs.scan((u) => lib.math.lerpW(u, 1, 0.15)(0.025), t),
          w.rxjs.takeWhile(lib.math.between(lib.math.range(0, 1))),
          w.rxjs.endWith(1)
        ),
      0
    ),
    w.rxjs.distinctUntilChanged(),
    w.rxjs.withLatestFrom($click)
  );

  $animation.subscribe(([value, [link]]) =>
    lib.frp.behavior.until((t) => {
      models.container.fromWindow(w).forEach((item) => {
        const u = lib.time.easeInOutQuad(t);
        item.style.opacity = 1 - 1 * u;
        item.style.transform = `translateY(${-32 * u}px)`;
      });
    })([
      1,
      () => {
        w.location.href = link.href;
      },
    ])(value)
  );
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
