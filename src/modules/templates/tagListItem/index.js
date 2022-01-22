export const fromProps =
  ({ tag }) =>
  (w) => {
    return `
    <div
      class="row-item grid grid-cols-9 py-8 border-b items-center"
      data-identifier="${tag.name}"
    >
      <div class="col-span-5">
        <a
          class="mb-2 text-2xl text-animated-hover"
          href="${tag.url}"
          data-type="link"
        >
          <span class="text"> ${tag.name} </span>
        </a>
      </div>
      <div class="col-span-2" data-observer="scroll">
      </div>
      <div class="text-xs col-span-2" data-observer="scroll">
        <span class="text">${tag.size} posts</span>
      </div>
    </div>
  `;
  };
