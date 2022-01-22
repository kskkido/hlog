import * as orientationObserver from '../orientationObserver/index.js';

export const fromObservers = (oxs) => {
  return oxs.reduce(
    (acc, ox) => ({
      ...acc,
      [orientationObserver.getWidgetID(ox)]:
        orientationObserver.getOrientation(ox),
    }),
    {}
  );
};
