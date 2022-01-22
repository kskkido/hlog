import * as tag from 'pages/tag';

if (window.document.readyState === 'loading') {
  window.document.addEventListener('DOMContentLoaded', () => tag.main(window));
} else {
  tag.main(window);
}
