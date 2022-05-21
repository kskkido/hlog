import * as postListItem from '../postListItem';
import * as types from './types';

export const create = (props: types.Props) => (w: Window) => {
  return `
    <div class="list-view flex flex-col hidden" id=${props.id} data-items="list">
      ${props.posts
        .map(
          (post) => `
        <div class="mb-16" data-item data-type="content">
          ${postListItem.create({ ...props, post })(w)}
        </div>
        <div class="mb-16" data-item data-type="content">
          ${postListItem.create({ ...props, post })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
