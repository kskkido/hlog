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
      class="card-item flex flex-col justify-center items-center border p-8"
      data-identifier="${post.identifier}"
    >
      <div class="w-3/4 h-px my-9"></div>
      <div class="w-full h-24 flex justify-center items-center">
        <a
          class="text-2xl text-animated-hover"
          href="${post.url}"
          data-type="link"
        >
          <span class="text text-primary">${post.title}</span>
        </a>
      </div>
      <div class="flex align-center mb-20">
              ${pipe(
                post.tags,
                ReadonlyArray.map(
                  flow(
                    models.tagMetadata.from.name,
                    apply(tags),
                    Option.map(
                      (tag) =>
                        `
            <div
              class="mr-2"
              style="--index: 2"
            >
              <a class="mr-1 text-animated-hover text text-sm" href="${tag.url}" data-type="link">
                <span class="text text-primary inline-block"> ${tag.name} </span>
              </a>
            </div>
          `
                    )
                  )
                ),
                ReadonlyArray.compact
              ).join('')}
      </div>
      <div class="w-full flex justify-between text-xs">
        <div style="--index: 4">
          <span class="text text-secondary">${lib.date.to.isoString(post.date)}</span>
        </div>
        <div style="--index: 6">
          <span class="text text-secondary">${post.length} words</span>
        </div>
      </div>
    </div>
  `;
  };
