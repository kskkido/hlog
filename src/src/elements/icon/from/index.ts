import * as lib from 'lib';

export const attributes =
  (attributes: Record<string, string>) =>
  (w: Window): lib.element.types.HTMLElement => {
    const icon = w.document.createElement('i');
    for (const key of Object.keys(attributes)) {
      icon.setAttribute(key, attributes[key]);
    }
    return icon;
  };
