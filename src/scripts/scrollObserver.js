import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

const main = (w) => {
  const xs = lib.array.sort(
    models.scrollObserver.compareByPositionY,
    models.scrollObserver.fromWindow(w)
  );
  const tick = () => {
    const [lxs, rxs] = lib.array.span(
      (x) => models.scrollObserver.toStatus(x)(w) === 'in',
      xs
    );
    lxs.forEach((x) => {
      w.requestAnimationFrame(() => {
        x.classList.remove('out');
        x.classList.add('in');
      });
    });
    rxs.forEach((x) => {
      w.requestAnimationFrame(() => {
        x.classList.remove('in');
        x.classList.add('out');
      });
    });
  };

  tick();
  w.rxjs.fromEvent(w, 'scroll').subscribe(tick);
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
