module Models.PostTagContext.From
  ( fromItem
  ) where

import qualified Hakyll
import qualified Models.TagMetadata.Main as TagMetadata

fromItem :: Hakyll.Tags -> Hakyll.Context String
fromItem tags =
  Hakyll.field "name" (fmap TagMetadata.name  . flip TagMetadata.fromItem tags) <>
  Hakyll.field "url"  (fmap (Hakyll.toUrl . TagMetadata.route) . flip TagMetadata.fromItem tags)

