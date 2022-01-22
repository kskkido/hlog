import { id, flow, pipe, constant } from '/modules/lib/fn/index.js';

export const success = (value) => {
  return { tag: 'success', value };
};

export const failure = (value) => {
  return { tag: 'failure', value };
};

export const of = (value) => {
  return success(value);
};

export const fold = (fn, gn) => {
  return (mx) => (mx.tag === 'failure' ? fn(mx.value) : gn(mx.value));
};

export const fmap = (fn) => {
  return fold(failure, flow(fn, success));
};

export const join = (mmx) => {
  return pipe(mmx, fold(failure, id));
};

export const bind = (fn) => {
  return (mx) => pipe(mx, fmap(fn), join);
};

export const apply = (mx) => {
  return (mfn) => {
    return mx.tag === 'failure' && mfn.tag === 'failure'
      ? failure(mx.value.concat(mfn.value))
      : mx.tag === 'failure'
      ? mx
      : mfn.tag === 'failure'
      ? mfn
      : pipe(
          mfn,
          bind((fn) => fmap(fn)(mx))
        );
  };
};

export const alt = (mx) => {
  return (my) => {
    return mx.tag === 'failure' && my.tag === 'failure'
      ? failure(errors(mx).concat(errors(my)))
      : mx.tag === 'success'
      ? mx
      : my;
  };
};

export const any = (...fns) => {
  return (x) =>
    fns.reduce((acc, fn) => {
      return alt(fn(x))(acc);
    }, failure([]));
};

export const and = (fn, ...fns) => {
  return (x) => fns.reduce((acc, gn) => bind(gn)(acc), fn(x));
};

export const errors = (vx) => {
  return pipe(vx, fold(id, constant([])));
};

export const write = (fn) => {
  return (mx) => pipe(mx, fold(flow(fn, failure), success));
};

export const sequence = (vxs) => {
  return vxs.reduce((xs, vx) => {
    return pipe(
      of((_xs) => (x) => [..._xs, x]),
      apply(xs),
      apply(vx)
    );
  }, of([]));
};

export const boolean = (vx) => {
  return pipe(vx, fold(constant(false), constant(true)));
};

export const maybe = (vx) => {
  return pipe(vx, fold(constant(null), id));
};
