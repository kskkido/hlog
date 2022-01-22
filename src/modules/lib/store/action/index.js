export const translate = (options) => {
  return (action) => {
    return action.type in options ? options[action.type](action) : null;
  };
};

export const noop = { type: '@noop' };
