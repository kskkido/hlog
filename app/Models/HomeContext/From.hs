module Models.HomeContext.From
  ( fromPosts
  ) where

import qualified Hakyll
import qualified Models.PostContext.Main as PostContext

fromPosts :: [Hakyll.Item String] -> Hakyll.Tags -> Hakyll.Context String
fromPosts posts tags =
  Hakyll.listField "posts" (PostContext.fromTags tags) (take 10 <$> Hakyll.recentFirst posts)

