module Models.TagMetadata.From
  ( fromTag
  , fromItem
  ) where

import qualified Hakyll
import qualified Control.Monad
import qualified Models.Tags.Main as Tags
import qualified Models.TagMetadata.Types as Types
import qualified Models.PostMetadata.Main as PostMetadata

fromTag :: String -> Hakyll.Tags -> Hakyll.Compiler Types.TagMetadata
fromTag name tags = do
  posts <- return $ Tags.toIdentifiers name tags
  route <- maybe "" id <$> (Hakyll.getRoute $ Hakyll.tagsMakeId tags name)
  return $ Types.TagMetadata
    { Types.name  = name
    , Types.route = route
    , Types.posts = posts
    }

fromItem :: Hakyll.Item String -> Hakyll.Tags -> Hakyll.Compiler Types.TagMetadata
fromItem item tags = do
  name  <- return $ Hakyll.itemBody item
  posts <- return $ Tags.toIdentifiers name tags
  route <- maybe "" id <$> (Hakyll.getRoute $ Hakyll.tagsMakeId tags name)
  return $ Types.TagMetadata
    { Types.name  = name
    , Types.route = route
    , Types.posts = posts
    }

