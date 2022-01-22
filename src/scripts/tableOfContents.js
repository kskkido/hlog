import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

const registerScrollTo = (w) => {
  const tuples = lib.maybe.concat(
    lib.array.fmap(
      (hx) =>
        lib.maybe.bind(
          (ax) => [hx, ax],
          models.anchor.fromUnknown(
            w.document.querySelector(
              `#table-of-contents a[data-target="${hx.id}"]`
            )
          )
        ),
      lib.maybe.concat(
        lib.array.fmap(
          models.heading.fromUnknown,
          lib.element.toArray(
            w.document.querySelectorAll('*[data-type="heading"]')
          )
        )
      )
    )
  );
  for (const [hx, ax] of tuples) {
    ax.addEventListener('click', () => {
      w.dispatchEvent(
        new w.CustomEvent('scrollTo', {
          detail: hx.getBoundingClientRect().top + w.scrollY,
        })
      );
    });
  }
};

const registerIndicator = (w) => {
  const tuples = lib.maybe.concat(
    lib.array.fmap(
      (hx) =>
        lib.maybe.bind(
          (ax) => [hx, ax],
          models.target.fromUnknown(
            w.document.querySelector(
              `#table-of-contents *[data-target="${hx.id}"]`
            )
          )
        ),
      lib.array.sort(
        models.heading.compareByPositionY,
        lib.maybe.concat(
          lib.array.fmap(
            models.heading.fromUnknown,
            lib.element.toArray(
              w.document.querySelectorAll('*[data-type="heading"]')
            )
          )
        )
      )
    )
  );
  const tick = () => {
    const [matches, rest] = lib.array.span(
      ([hx]) => models.heading.toVisibilityStatus(hx)(window) === 'in',
      tuples
    );
    lib.array
      .mappend(lib.array.init(matches), rest)
      .forEach(([_, inactive]) => {
        inactive.classList.remove('active');
        inactive.classList.add('inactive');
      });
    lib.maybe.tap(([_, active]) => {
      active.classList.remove('inactive');
      active.classList.add('active');
    }, lib.maybe.alternative(lib.array.last(matches), lib.array.head(tuples)));
  };
  tick();
  w.addEventListener('scroll', tick);
};

const main = (w) => {
  registerScrollTo(w);
  registerIndicator(w);
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
