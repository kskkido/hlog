import * as t from 'io-ts';
import * as models from 'models';

export const Storage = t.type({
  brightness: t.union([models.brightness.types.Brightness, t.null]),
  postFilter: t.union([models.postFilter.types.PostFilter, t.null]),
  tagFilter: t.union([models.tagFilter.types.TagFilter, t.null])
});

export type Storage = t.TypeOf<typeof Storage>;
