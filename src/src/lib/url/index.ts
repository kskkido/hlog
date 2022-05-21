export const normalize = (x: string) => {
  return x
    .split('://')
    .map((x) => x.replace(/\/{2,}/g, '/'))
    .join('://');
};

export const append = (path: string) => (url: string) => {
  return path.length > 0
    ? normalize(
        path.startsWith('?') || path.startsWith('#') || /^\/*\?/.test(path)
          ? `${url.replace(/\/*$/, '')}${path.replace(/^\/*/, '')}`
          : `${url}/${path}`
      )
    : normalize(url);
};

export const fromLocation = (l: Window['location']) => {
  return normalize([l.origin, l.pathname].join(''));
};
