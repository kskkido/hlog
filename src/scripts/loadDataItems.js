import * as lib from '/modules/lib/index.js';
import * as models from '/modules/models/index.js';

const main = (w) => {
  const lists = models.dataList.fromWindow(w);
  const $animation = lib.frame.global(w).pipe(
    w.rxjs.scan((t) => lib.math.lerpW(t, 1, 0.03)(0.001), 0),
    w.rxjs.takeWhile((t) => t <= 1),
    w.rxjs.endWith(1)
  );

  $animation.subscribe((t) => {
    lists.forEach((list) => {
      lib.element.toArray(list.children).forEach((item, index, xs) => {
        const u = lib.time.easeInOutQuad(
          lib.math.clamp(t - (0.5 / (xs.length - 1)) * index, 0, 0.5) / 0.5
        );
        item.style.opacity = u;
        item.style.transform = `translateY(${48 * (1 - u)}px)`;
        item.style.visibility = 'visible';
      });
    });
  });
};

window.onload = main.bind(this, window);
