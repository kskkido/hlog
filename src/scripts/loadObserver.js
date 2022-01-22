import * as models from '/modules/models/index.js';

const main = (w) => {
  models.loadObserver.fromWindow(w).forEach((x) => {
    w.requestAnimationFrame(() => {
      x.classList.remove('out');
      x.classList.add('in');
    });
  });
};

window.onload = main.bind(this, window);
