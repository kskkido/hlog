import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

const main = (w) => {
  const cursors = models.cursor.fromWindow(w);
  const $position = w.rxjs.merge(
    ...cursors.map((cursor) =>
      lib.frame.global(w).pipe(
        w.rxjs.withLatestFrom(
          w.rxjs
            .fromEvent(w, 'mousemove')
            .pipe(w.rxjs.map((e) => lib.vector2.from(e.clientX)(e.clientY))),
          (_, vx) => vx
        ),
        w.rxjs.scan(
          (vx, vy) =>
            lib.fn.pipe(
              lib.vector2.transpose(lib.vector2.from(vx)(vy)),
              lib.vector2.fmap(
                lib.vector2.fold((x, y) => lib.math.lerpW(x, y, 0.065)(0.001))
              )
            ),
          models.cursor.getPosition(cursor)
        ),
        w.rxjs.distinctUntilChanged(lib.vector2.equal((x, y) => x === y)),
        w.rxjs.map((vx) => [cursor, vx])
      )
    )
  );
  $position.subscribe(([cursor, vx]) => {
    models.cursor.setPosition(vx)(cursor);
  });
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
