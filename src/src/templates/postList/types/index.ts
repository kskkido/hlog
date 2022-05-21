import * as models from 'models';

export type Props = {
  id: string;
  posts: ReadonlyArray<models.postMetadata.types.PostMetadata>;
  tags: ReadonlyArray<models.tagMetadata.types.TagMetadata>;
};
