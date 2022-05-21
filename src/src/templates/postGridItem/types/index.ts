import * as models from 'models';

export type Props = {
  post: models.postMetadata.types.PostMetadata;
  tags: ReadonlyArray<models.tagMetadata.types.TagMetadata>;
};
