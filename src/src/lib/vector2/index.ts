import * as types from './types';

export { types };

export const from =
  <A>(x: A) =>
  (y: A): types.Vector2<A> => {
    return [x, y];
  };

export const toX = <A>(vx: types.Vector2<A>): A => {
  return vx[0];
};

export const toY = <A>(vx: types.Vector2<A>): A => {
  return vx[1];
};

export const fmap =
  <A, B>(fn: (x: A) => B) =>
  (vx: types.Vector2<A>): types.Vector2<B> => {
    return bimap(fn)(fn)(vx);
  };

export const bimap =
  <A, B>(fn: (x: A) => B) =>
  (gn: (x: A) => B) =>
  (vx: types.Vector2<A>): types.Vector2<B> => {
    return from(fn(toX(vx)))(gn(toY(vx)));
  };

export const fold =
  <A, B>(fn: (x: A, y: A) => B) =>
  (vx: types.Vector2<A>): B => {
    return fn(toX(vx), toY(vx));
  };

export const transpose = <A>(vxs: types.Vector2<types.Vector2<A>>): types.Vector2<types.Vector2<A>> => {
  const [vx, vy] = vxs;
  return from(from(toX(vx))(toX(vy)))(from(toY(vx))(toY(vy)));
};

export const add = (vx: types.Vector2<number>) => (vy: types.Vector2<number>) => {
  return bimap<number, number>((x) => x + toX(vx))((y) => y + toY(vy))(vx);
};

export const equal =
  <A>(fn: (x: A, y: A) => boolean) =>
  (vx: types.Vector2<A>, vy: types.Vector2<A>) => {
    return fn(toX(vx), toX(vy)) && fn(toY(vx), toY(vy));
  };
