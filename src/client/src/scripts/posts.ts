import * as posts from 'pages/posts';

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', () => posts.main(window));
} else {
  posts.main(window);
}
