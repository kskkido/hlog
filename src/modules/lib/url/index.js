export const normalize = (x) => {
  return x.replace(/(?<!\:)\/{2,}/, '/');
};

export const append = (url, path) => {
  return path.length > 0
    ? normalize(
        path.startsWith('?') || path.startsWith('#') || /^\/*\?/.test(path)
          ? `${url.replace(/\/*$/, '')}${path.replace(/^\/*/, '')}`
          : `${url}/${path}`
      )
    : normalize(url);
};

export const fromLocation = (l) => {
  return normalize([l.origin, l.pathname].join(''));
};
