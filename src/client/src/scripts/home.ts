import * as home from 'pages/home';

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', () => home.main(window));
} else {
  home.main(window);
}
