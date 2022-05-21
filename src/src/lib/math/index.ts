export const sum = (ns: ReadonlyArray<number>): number => {
  return ns.reduce((x, y) => x + y, 0);
};

export const clamp = (x: number, min: number, max: number): number => {
  return max >= min ? Math.min(Math.max(x, min), max) : clamp(x, max, min);
};

export const percent = (x: number) => {
  return clamp(100 * x, 0, 100);
};

export const hypotenuse = (x: number, y: number) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

export const radian = (degree: number) => {
  return degree * (Math.PI / 180);
};

export const degree = (radian: number) => {
  return (radian * 180) / Math.PI;
};

export const margin = (x: number, y: number) => {
  return y === 0 ? x : -(1 - x / y);
};

export const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

export const lerpW = (x: number, y: number, t: number) => (z: number) => {
  return lerp(x, y, Math.abs(margin(x, y)) < z ? 1 : t);
};

export const range = (x: number, y: number): [number, number] => {
  return y >= x ? [x, y] : [y, x];
};

export const between = (rx: [number, number]) => (x: number) => {
  return rx[0] <= x && x < rx[1];
};
