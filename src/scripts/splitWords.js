import * as models from '/modules/models/index.js';

const main = (w) => {
  models.word.fromWindow(w).forEach((word) => {
    models.word
      .toLetters(word)({ class: 'letter' })(w)
      .forEach((l) => {
        word.appendChild(l);
      });
  });
};

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', main.bind(this, window));
} else {
  main(window);
}
