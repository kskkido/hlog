import * as postGridItem from '../postGridItem';
import * as types from './types';

export const create = (props: types.Props) => (w: Window) => {
  return `
    <div class="grid-view flex flex-wrap hidden" id=${props.id} data-items="grid">
      ${props.posts
        .map(
          (post) => `
        <div class="w-full sm:w-1/2 md:w-1/3" data-item data-type="content">
          ${postGridItem.create({ ...props, post })(w)}
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3" data-item data-type="content">
          ${postGridItem.create({ ...props, post })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
