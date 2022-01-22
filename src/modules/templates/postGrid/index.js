import * as postGridItem from '/modules/templates/postGridItem/index.js';

export const fromProps = (props) => (w) => {
  return `
    <div class="grid-view flex flex-wrap" id=${props.id} data-items="grid">
      ${props.posts
        .map(
          (post) => `
        <div class="w-1/3" data-item>
          ${postGridItem.fromProps({ ...props, post })(w)}
        </div>
        <div class="w-1/3" data-item>
          ${postGridItem.fromProps({ ...props, post })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
