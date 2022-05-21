import { apply, flow, pipe } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import * as ReadonlyArray from 'fp-ts/ReadonlyArray';
import * as lib from 'lib';
import * as models from 'models';
import * as types from './types';

export const create =
  ({ post, tags }: types.Props) =>
  (_: Window) => {
    return `
    <div
      class="row-item grid grid-cols-9 py-8 border-b items-center"
      data-identifier="${post.identifier}"
    >
      <div class="col-span-9 md:col-span-5 mb-3 md:mb-0">
        <a
          class="text-2xl text-animated-hover"
          href="${post.url}"
          data-type="link"
        >
          <span class="text text-primary"> ${post.title} </span>
        </a>
      </div>
      <div class="col-span-9 md:col-span-2 mb-2 md:mb-0">
        ${pipe(
          post.tags,
          ReadonlyArray.map(
            flow(
              models.tagMetadata.from.name,
              apply(tags),
              Option.map(
                (tag) =>
                  `
              <a class="mr-1 text-animated-hover text text-sm" href="${tag.url}" data-type="link">
                <span class="text  text-primary inline-block"> ${tag.name} </span>
              </a>
          `
              )
            )
          ),
          ReadonlyArray.compact
        ).join('')}
      </div>
      <div class="text-xs col-span-9 md:col-span-2">
        <span class="text text-secondary">${lib.date.to.isoString(post.date)}</span>
        <span class="dot text-secondary"></span>
        <span class="text text-secondary">${post.length} words</span>
      </div>
    </div>
  `;
  };
