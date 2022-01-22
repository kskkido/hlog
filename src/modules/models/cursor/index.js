import * as lib from '/modules/lib/index.js';

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll('#cursor'))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.parser.html(unknown);
};

export const getPosition = (x) => {
  return lib.shape.toCenterPosition(lib.element.toShape(x));
};

export const setPosition = (vx) => (x) => {
  const position = lib.shape.toCenterPosition({
    ...lib.element.toShape(x),
    position: vx,
  });
  x.style.transform = `translate(${lib.vector2.toX(
    position
  )}px, ${lib.vector2.toY(position)}px)`;
};
