import * as posts from 'pages/posts';

const main = (w: Window) => {
  posts.prerender(w);

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', () => posts.main(w));
  } else {
    posts.main(w);
  }
};

main(window);
