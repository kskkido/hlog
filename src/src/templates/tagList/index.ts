import * as tagListItem from '../tagListItem';
import * as types from './types';

export const create = (props: types.Props) => (w: Window) => {
  return `
    <div class="list-view flex flex-col hidden" id=${props.id} data-items="list">
      ${props.tags
        .map(
          (tag) => `
        <div class="mb-16" data-item data-type="content">
          ${tagListItem.create({ ...props, tag })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
