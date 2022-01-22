import * as tagListItem from '/modules/templates/tagListItem/index.js';

export const fromProps = (props) => (w) => {
  return `
    <div class="list-view flex flex-col" id=${props.id} data-items="list">
      ${props.tags
        .map(
          (tag) => `
        <div class="mb-16" data-item>
          ${tagListItem.fromProps({ ...props, tag })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
