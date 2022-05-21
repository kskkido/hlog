import * as tags from 'pages/tags';

const main = (w: Window) => {
  tags.prerender(w);

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', () => tags.main(w));
  } else {
    tags.main(w);
  }
};

main(window);
