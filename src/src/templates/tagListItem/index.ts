import * as types from './types';

export const create =
  ({ tag }: types.Props) =>
  (_: Window) => {
    return `
    <div
      class="row-item grid grid-cols-9 py-8 border-b items-center"
      data-identifier="${tag.name}"
    >
      <div class="col-span-9 md:col-span-5 mb-3 md:mb-0">
        <a
          class="mb-2 text-2xl text-animated-hover"
          href="${tag.url}"
          data-type="link"
        >
          <span class="text text-primary"> ${tag.name} </span>
        </a>
      </div>
      <div class="invisible md:visible md:col-span-2">
      </div>
      <div class="col-span-9 md:col-span-2">
        <span class="text text-secondary text-xs">${tag.size} posts</span>
      </div>
    </div>
  `;
  };
