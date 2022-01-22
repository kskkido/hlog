module Models.TagsContext.From
  ( fromTags
  ) where

import qualified Control.Monad
import qualified Data.List
import qualified Hakyll
import qualified Lib.String.Main as Lib.String
import qualified Models.Tag.Main as Tag
import qualified Models.Tags.Main as Tags
import qualified Models.TagContext.Main as TagContext

fromTags :: Hakyll.Tags -> Hakyll.Context String
fromTags tags = Hakyll.listField "tags" (TagContext.fromItem tags) (return $ Tags.toItems tags)
