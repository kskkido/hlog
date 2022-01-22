import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

export const fromProps =
  ({ post, tags }) =>
  (w) => {
    return `
    <div
      class="row-item grid grid-cols-9 py-8 border-b items-center"
      data-identifier="${post.identifier}"
    >
      <div class="col-span-5">
        <a
          class="mb-2 text-2xl text-animated-hover"
          href="${post.url}"
          data-type="link"
        >
          <span class="text"> ${post.title} </span>
        </a>
      </div>
      <div class="col-span-2" data-observer="scroll">
        <div
          class="mr-2"
          style="--index: 2"
        >
        ${lib.maybe
          .concat(
            post.tags.map((name) => models.tagMetadata.fromName(name)(tags))
          )
          .map(
            (tag) =>
              `
              <a class="mr-1 text-animated-hover text text-sm" href="${tag.url}" data-type="link">
                <span class="text inline-block"> ${tag.name} </span>
              </a>
          `
          )
          .join('')}
        </div>
      </div>
      <div class="text-xs col-span-2" data-observer="scroll">
        <span class="text">${lib.date.toISOString(post.date)}</span>
        <span class="dot"></span>
        <span class="text">${post.length} minutes read</span>
      </div>
    </div>
  `;
  };
