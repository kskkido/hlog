export const fromAttributes = (attributes) => {
  const icon = document.createElement('i');
  for (const key of Object.keys(attributes)) {
    icon.setAttribute(key, attributes[key]);
  }
  return icon;
};

