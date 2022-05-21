export const create = (() => {
  let id = 0;

  return () => {
    return `${id++}`;
  };
})();
