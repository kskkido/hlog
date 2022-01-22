import * as post from 'pages/post';

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', () => post.main(window));
} else {
  post.main(window);
}
