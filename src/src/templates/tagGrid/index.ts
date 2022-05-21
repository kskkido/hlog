import * as tagGridItem from '../tagGridItem';
import * as types from './types';

export const create = (props: types.Props) => (w: Window) => {
  return `
    <div class="grid-view flex flex-wrap hidden" id=${props.id} data-items="grid">
      ${props.tags
        .map(
          (tag) => `
        <div class="w-full sm:w-1/2 md:w-1/3" data-item data-type="content">
          ${tagGridItem.create({ ...props, tag })(w)}
        </div>
      `
        )
        .join('')}
    </div>
  `;
};
