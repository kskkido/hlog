import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

const main = (w) => {
  lib.maybe
    .concat(
      lib.array.fmap(
        (hx) =>
          lib.maybe.bind(
            (ax) => [
              hx,
              ax,
              models.icon.fromAttributes({ class: 'link fa-solid fa-link' }),
            ],
            models.anchor.fromUnknown(hx.querySelector(`a[title="${hx.id}"]`))
          ),
        models.heading.fromWindow(w)
      )
    )
    .forEach(([hx, ax, ix]) => {
      hx.appendChild(ix);
      ix.addEventListener('click', () => {
        w.navigator.clipboard.writeText(
          lib.url.append(
            lib.url.fromLocation(w.location),
            ax.getAttribute('href')
          )
        );
      });
    });
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
