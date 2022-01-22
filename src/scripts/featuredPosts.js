import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';
import * as store from '/modules/store/index.js';

const main = (w) => {
  const posts = lib.array.zip(
    lib.array.keys(models.featuredPost.fromWindow(w)),
    models.featuredPost.fromWindow(w)
  );
  const previews = lib.array.zip(
    lib.array.keys(models.featuredPostPreview.fromWindow(w)),
    models.featuredPostPreview.fromWindow(w)
  );
  const [$state, dispatch] = store.create(
    [
      lib.fn.pipe(
        posts.map((entry) => entry[0]),
        models.featuredPostRecord.fromKeys,
        store.state.featuredPostRecord.actions.set
      ),
    ].reduce(
      store.state.root.reducers.main,
      store.state.root.reducers.initialState
    )
  )(w);
  const $hover = w.rxjs.merge(
    ...posts.map((entry) =>
      w.rxjs.merge(
        w.rxjs
          .fromEvent(entry[1], 'mouseenter')
          .pipe(w.rxjs.mapTo([entry[0], 'in'])),
        w.rxjs
          .fromEvent(entry[1], 'mouseleave')
          .pipe(w.rxjs.mapTo([entry[0], 'out']))
      )
    )
  );
  const $animation = w.rxjs.merge(
    ...posts.map((entry) =>
      $state.pipe(
        w.rxjs.map(
          lib.fn.flow(
            store.state.root.selectors.makeSelectFeaturedPostRecord(),
            store.state.featuredPostRecord.selectors.makeSelectByKey(entry[0])
          )
        ),
        w.rxjs.filter((x) => x !== null),
        w.rxjs.distinctUntilChanged(),
        w.rxjs.map(models.hover.toRange),
        w.rxjs.switchScan(
          (t, n) =>
            lib.frame.global(w).pipe(
              w.rxjs.scan((u) => lib.math.lerpW(u, n, 0.075)(0.001), t),
              w.rxjs.takeWhile(
                lib.math.between(
                  lib.math.range(
                    models.hover.toRange('out'),
                    models.hover.toRange('in')
                  )
                )
              ),
              w.rxjs.endWith(n)
            ),
          models.hover.toRange('in')
        ),
        w.rxjs.distinctUntilChanged(),
        w.rxjs.map((t) => [entry[0], t])
      )
    )
  );

  $hover.subscribe(([key, value]) => {
    const [lxs, rxs] = lib.array.partition(
      (entry) => key === entry[0] && value === 'in',
      posts
    );
    dispatch(
      store.state.featuredPostRecord.actions.update(
        lxs.length > 0
          ? [
              ...lxs.map((entry) => [entry[0], 'in']),
              ...rxs.map((entry) => [entry[0], 'out']),
            ]
          : posts.map((entry) => [entry[0], 'in'])
      )
    );
  });
  $animation.subscribe(([key, t]) => {
    lib.maybe.tap(
      ([_, item]) => {
        const u = lib.time.easeInOutQuad(t);
        item.style.opacity = u;
        item.style.clipPath = `inset(0 ${100 * (1 - u)}% 0 0)`;
      },
      previews.find((entry) => entry[0] === key)
    );
  });
  $animation.subscribe(([key, t]) => {
    lib.maybe.tap(
      ([_, item]) => {
        const u = lib.time.easeInOutQuad(t);
        item.style.opacity = 0.25 + 0.77 * u;
        item.style.transform = `translateY(${16 * (1 - u)}px)`;
      },
      posts.find((entry) => entry[0] === key)
    );
  });
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
