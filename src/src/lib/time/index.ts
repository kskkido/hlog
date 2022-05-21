export const easeInOutExpo = (x: number) => {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
};

export const easeInOutQuad = (x: number) => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export const easeOutQuint = (x: number) => {
  return 1 - Math.pow(1 - x, 5);
};

export const cubicBezier = (a: number, b: number, c: number, d: number) => {
  const cx = 3 * a,
    bx = 3 * (c - a) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * b,
    by = 3 * (d - b) - cy,
    ay = 1 - cy - by;
  const bezierX = (t: number) => {
    return t * (cx + t * (bx + t * ax));
  };
  const bezierDX = (t: number) => {
    return cx + t * (2 * bx + 3 * ax * t);
  };
  const newtonRaphson = (x: number) => {
    if (x <= 0) {
      return 0;
    }
    if (x >= 1) {
      return 1;
    }
    let prev,
      t = x;
    do {
      prev = t;
      t = t - (bezierX(t) - x) / bezierDX(t);
    } while (Math.abs(t - prev) > 1e-4);
    return t;
  };
  return (t: number) => {
    const u = newtonRaphson(t);
    return u * (cy + u * (by + u * ay));
  };
};

export const lerpish = cubicBezier(0.25, 0.1, 0.14, 0.99);
