import * as postListItem from '/modules/templates/postListItem/index.js';

export const fromProps = (props) => (w) => {
  return `
    <div class="list-view flex flex-col" id=${props.id} data-items="list">
      ${props.posts
        .map(
          (post) => `
        <div class="mb-16" data-item>
          ${postListItem.fromProps({ ...props, post })(w)}
        </div>
        <div class="mb-16" data-item>
          ${postListItem.fromProps({ ...props, post })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
