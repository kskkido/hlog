import * as home from 'pages/home';

const main = (w: Window) => {
  home.prerender(w);

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', () => home.main(w));
  } else {
    home.main(w);
  }
};

main(window);
