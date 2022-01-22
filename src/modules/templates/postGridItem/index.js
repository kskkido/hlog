import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

export const fromProps =
  ({ post, tags }) =>
  (w) => {
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
          <span class="text">${post.title}</span>
        </a>
      </div>
      <div class="flex align-center mb-20">
        ${lib.maybe
          .concat(
            post.tags.map((name) => models.tagMetadata.fromName(name)(tags))
          )
          .map(
            (tag) =>
              `
            <div
              class="mr-2"
              style="--index: 2"
            >
              <a class="mr-1 text-animated-hover text text-sm" href="${tag.url}" data-type="link">
                <span class="text inline-block"> ${tag.name} </span>
              </a>
            </div>
          `
          )
          .join('')}
      </div>
      <div class="w-full flex justify-between text-xs text-slate-500">
        <div style="--index: 4">
          <span class="text">${lib.date.toISOString(post.date)}</span>
        </div>
        <div style="--index: 6">
          <span class="text">${post.length} minutes read</span>
        </div>
      </div>
    </div>
  `;
  };
