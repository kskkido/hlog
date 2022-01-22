// from :: (a -> b) -> a -> b
export const from = (fn) => {
  return (x) => fn(x);
};

export const exec = (observer) => {
  return (ox) => ox(observer);
};

// pure :: a -> (a -> b) -> b
export const pure = (x) => {
  return from((observer) => observer(x));
};

// fmap :: (a -> b) -> (a -> c) -> (b -> c)
export const fmap = (fn) => (ox) => {
  return from((observer) => ox((x) => observer(fn(x))));
};

// join :: (a -> a -> b) -> (a -> b)
export const join = (oox) => {
  return from((observer) => oox((ox) => ox(observer)));
};

export const bind = (fn) => (ox) => {
  return join(fmap(fn)(ox));
};

export const tap = (fn) => (ox) => {
  return fmap((x) => {
    fn(x);
    return x;
  })(ox);
};

export const until = (fn) => (ox) => {
  return from((observer) => {
    const cancel = ox((x) => {
      const mx = fn(x);
      if (mx === null) {
        observer(x);
      } else {
        cancel();
        observer(mx);
      }
    });
    return cancel;
  });
};

export const loop = (w) => {
  return from((observer) => {
    let id;
    const tick = () => {
      id = w.requestAnimationFrame((ts) => {
        tick();
        observer(ts);
      });
    };
    tick();
    return () => {
      w.cancelAnimationFrame(id);
    };
  });
};

export const time = (w) => {
  const now = w.performance.now();
  return fmap((ts) => Math.max(ts - now, 0))(loop(w));
};

export const timer = (d) => (w) => {
  return until((t) => (t >= d ? d : null))(time(w));
};

export const animation = (d) => (w) => {
  return fmap((t) => t / d)(timer(d)(w));
};

export const domEvent = (cs, el) => {
  return from((observer) => {
    const cb = (ex) => {
      observer(ex);
    };
    el.addEventListener(cs, cb);
    return () => el.removeEventListener(cs, cb);
  });
};

export const pipe = (ox, fn, ...fns) => {
  return fns.length > 0 ? fns.reduce((acc, fn_) => fn_(acc), fn(ox)) : fn(ox);
};
