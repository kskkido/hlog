import * as tag from 'pages/tag';

const main = (w: Window) => {
  tag.prerender(w);

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', () => tag.main(w));
  } else {
    tag.main(w);
  }
};

main(window);
