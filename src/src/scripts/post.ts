import * as post from 'pages/post';

const main = (w: Window) => {
  post.prerender(w);

  if (w.document.readyState === 'loading') {
    w.document.addEventListener('DOMContentLoaded', () => post.main(w));
  } else {
    post.main(w);
  }
};

main(window);
