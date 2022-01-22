import * as tags from 'pages/tags';

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', () => tags.main(window));
} else {
  tags.main(window);
}
