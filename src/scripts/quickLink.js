import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

const main = (w) => {
  lib.maybe
    .concat(
      lib.array.fmap(
        lib.parser.html,
        lib.element.toArray(w.document.querySelectorAll('*[data-quick_link]'))
      )
    )
    .map((ex) => [
      ex,
      models.icon.fromAttributes({ class: 'link fa-solid fa-link' }),
    ])
    .forEach(([ex, ix]) => {
      ex.appendChild(ix);
      ix.addEventListener('click', () => {
        w.navigator.clipboard.writeText(lib.url.fromLocation(location));
      });
    });
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
