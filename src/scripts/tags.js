import * as lib from '/modules/lib/index.js';
import * as store from '/modules/store/index.js';
import * as models from '/modules/models/index.js';
import * as templates from '/modules/templates/index.js';

const main = (w) => {
  const slots = models.slot.fromWindow('list')(w);
  const [$state] = store.create(
    [
      store.state.tagMetadataRecord.actions.update(
        models.tagMetadataDTO
          .fromWindow(w)
          .map(models.tagMetadata.fromDTO)
          .map((metadata) => [metadata.name, metadata])
      ),
    ].reduce(
      store.state.root.reducers.main,
      store.state.root.reducers.initialState
    )
  )(w);
  const $metadata = w.rxjs.combineLatest(
    $state.pipe(
      w.rxjs.map(
        lib.fn.flow(
          store.state.root.selectors.makeSelectTagMetadataRecord(),
          store.state.tagMetadataRecord.selectors.makeSelectValues()
        )
      )
    )
  );
  const $view = w.rxjs
    .merge(
      ...models.viewWidget
        .fromWindow(w)
        .map((wx) =>
          w.rxjs.fromEvent(wx, 'click').pipe(w.rxjs.mapTo(wx.dataset.value))
        )
    )
    .pipe(w.rxjs.startWith('list'), w.rxjs.distinctUntilChanged());
  const $sort = w.rxjs
    .merge(
      ...models.sortWidget
        .fromWindow(w)
        .map((wx) =>
          w.rxjs.fromEvent(wx, 'click').pipe(w.rxjs.mapTo(wx.dataset.value))
        )
    )
    .pipe(w.rxjs.startWith('date'), w.rxjs.distinctUntilChanged());
  const $order = w.rxjs
    .merge(
      ...models.orderWidget
        .fromWindow(w)
        .map((wx) =>
          w.rxjs.fromEvent(wx, 'click').pipe(w.rxjs.mapTo(wx.dataset.value))
        )
    )
    .pipe(w.rxjs.startWith('descending'), w.rxjs.distinctUntilChanged());
  const $transition = w.rxjs.combineLatest($view, $sort, $order).pipe(
    w.rxjs.withLatestFrom(
      w.rxjs.merge($view, $sort, $order).pipe(
        w.rxjs.scan((n) => n * -1, 1),
        w.rxjs.pairwise()
      )
    )
  );
  const $animation = $transition.pipe(
    w.rxjs.switchScan(
      (t, [_, [from, to]]) =>
        lib.frame.global(w).pipe(
          w.rxjs.scan((u) => lib.math.lerpW(u, to, 0.03)(0.001), t), // win!
          w.rxjs.takeWhile(lib.math.between(lib.math.range(from, to))),
          w.rxjs.endWith(to)
        ),
      0
    ),
    w.rxjs.distinctUntilChanged()
  );

  $sort.subscribe((to) => {
    const [lxs, rxs] = lib.array.partition(
      (x) => x.dataset.value === to,
      models.sortWidget.fromWindow(w)
    );
    lxs.forEach((item) => {
      item.classList.remove('inactive');
      item.classList.add('active');
    });
    rxs.forEach((item) => {
      item.classList.remove('active');
      item.classList.add('inactive');
    });
  });
  $view.subscribe((to) => {
    const [lxs, rxs] = lib.array.partition(
      (x) => x.dataset.value === to,
      models.viewWidget.fromWindow(w)
    );
    lxs.forEach((item) => {
      item.classList.remove('inactive');
      item.classList.add('active');
    });
    rxs.forEach((item) => {
      item.classList.remove('active');
      item.classList.add('inactive');
    });
  });
  $order.subscribe((to) => {
    const [lxs, rxs] = lib.array.partition(
      (x) => x.dataset.value === to,
      models.orderWidget.fromWindow(w)
    );
    lxs.forEach((item) => {
      item.classList.remove('inactive');
      item.classList.add('active');
    });
    rxs.forEach((item) => {
      item.classList.remove('active');
      item.classList.add('inactive');
    });
  });
  $transition
    .pipe(w.rxjs.withLatestFrom($metadata))
    .subscribe(([[[view, sort, order], [_, to]], [tags]]) => {
      lib.maybe.tap(
        ([lxs, rx]) => {
          slots.forEach((slot) => {
            lxs.forEach((lx) => {
              slot.removeChild(lx);
            });
            slot.appendChild(rx);
          });
        },
        lib.maybe.sequence([
          lib.maybe.pure(
            lib.maybe.concat(
              lib.array.bind(
                (slot) =>
                  lib.element.toArray(
                    slot.querySelectorAll(`#transition-${to}`)
                  ),
                slots
              )
            )
          ),
          lib.element.fromString(
            (view === 'list'
              ? templates.tagList.fromProps
              : templates.tagGrid.fromProps)({
              tags: tags.sort(
                lib.fn.pipe(
                  models.tagMetadata.compareBy(sort),
                  models.tagMetadata.orderBy(order)
                )
              ),
              id: `transition-${to}`,
            })(w)
          )(w),
        ])
      );
    });
  $animation.subscribe((value) => {
    const animate = (x) => (t) => {
      lib.maybe
        .concat(
          lib.array.bind(
            (slot) =>
              lib.element.toArray(
                slot.querySelectorAll(`#transition-${x * -1}`)
              ),
            slots
          )
        )
        .forEach((items) => {
          items.style.display = 'none';
        });
      lib.maybe
        .concat(
          lib.array.bind(
            (slot) =>
              lib.element.toArray(slot.querySelectorAll(`#transition-${x}`)),
            slots
          )
        )
        .forEach((items) => {
          items.style.opacity = 1;
          items.style.display = 'flex';
          lib.element.toArray(items.children).forEach((item, index, xs) => {
            const u = lib.time.easeInOutQuad(
              lib.math.clamp(t - (0.5 / (xs.length - 1)) * index, 0, 0.5) / 0.5
            );
            item.style.opacity = u;
            item.style.transform = `translateY(${48 * (1 - u)}px)`;
          });
        });
    };
    animate(value <= 0 ? -1 : 1)(Math.abs(value));
  });
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
