import * as tagGridItem from '/modules/templates/tagGridItem/index.js';

export const fromProps = (props) => (w) => {
  return `
    <div class="grid-view flex flex-wrap" id=${props.id} data-items="grid">
      ${props.tags
        .map(
          (tag) => `
        <div class="w-1/3" data-item>
          ${tagGridItem.fromProps({ ...props, tag })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
