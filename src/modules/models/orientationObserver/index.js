import * as lib from '/modules/lib/index.js';
import * as orientation from '/modules/models/orientation/index.js';
import * as orientationWidget from '/modules/models/orientationWidget/index.js';

export const fromWidget = (el) => (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(
        w.document.querySelectorAll(
          `*[data-widget_id=${orientationWidget.getGroup(el)}]`
        )
      )
    )
  );
};

export const fromGroup = (id) => (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(
        w.document.querySelectorAll(`*[data-widget_id=${id}]`)
      )
    )
  );
};

export const fromWindow = (w) => {
  return lib.maybe.concat(
    lib.array.fmap(
      fromUnknown,
      lib.element.toArray(w.document.querySelectorAll(`*[data-widget_id]`))
    )
  );
};

export const fromUnknown = (unknown) => {
  return lib.maybe.bind(
    (el) =>
      lib.maybe.bind(
        () => (typeof el.dataset.widget_id === 'string' ? el : null),
        orientation.fromUnknown(el.dataset.orientation)
      ),
    lib.parser.html(unknown)
  );
};

export const getWidgetID = (x) => {
  return x.dataset.widget_id;
};

export const getOrientation = (x) => {
  return x.dataset.orientation;
};

export const setOrientation = (ox, x) => {
  x.dataset.orientation = ox;
  x.dispatchEvent(new Event('orientation'));
};
