export const fromProps =
  ({ tag }) =>
  (w) => {
    return `
    <div
      class="card-item flex flex-col justify-center items-center border p-8"
      data-identifier="${tag.name}"
    >
      <div class="w-3/4 h-px my-9"></div>
      <div class="w-full h-24 flex justify-center items-center">
        <a
          class="text-2xl text-animated-hover"
          href="${tag.url}"
          data-type="link"
        >
          <span class="text">${tag.name}</span>
        </a>
      </div>
      <div class="flex align-center mb-20">
        <div
          class="mr-2"
          style="--index: 2"
        >
          <span class="text inline-block"> ${tag.size} posts </span>
        </div>
      </div>
    </div>
  `;
  };
