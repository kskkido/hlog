module Models.TagContext.From
  ( fromPosts
  , fromItem
  ) where

import qualified Hakyll
import qualified Lib.String.Main as Lib.String
import qualified Models.Tag.Main as Tag
import qualified Models.Tags.Main as Tags
import qualified Models.PostContext.Main as PostContext
import qualified Models.TagMetadata.Main as TagMetadata
import qualified Models.TagContext.Types as Types

fromPosts :: [Hakyll.Item String] -> String -> Hakyll.Tags -> Hakyll.Context String
fromPosts posts name tags =
  Hakyll.field "name" (const $ fmap TagMetadata.name metadata) <>
  Hakyll.field "url"  (const $ fmap (Hakyll.toUrl . TagMetadata.name) metadata) <>
  Hakyll.field "size" (const $ fmap (show . length . TagMetadata.posts) metadata) <>
  Hakyll.listFieldWith "posts" (PostContext.fromTags tags) (\_ -> do
    identifiers <- TagMetadata.posts <$> metadata
    Hakyll.loadAll (Hakyll.fromList identifiers) >>= Hakyll.recentFirst
  ) <>
  Hakyll.listField "tags" (fromItem tags) (return $ Tags.toItems tags)
  where metadata = TagMetadata.fromTag name tags

fromItem :: Hakyll.Tags -> Hakyll.Context String
fromItem tags =
  Hakyll.field "name" (fmap TagMetadata.name  . flip TagMetadata.fromItem tags) <>
  Hakyll.field "url"  (fmap (Hakyll.toUrl . TagMetadata.route) . flip TagMetadata.fromItem tags) <>
  Hakyll.field "size" (fmap (show . length . TagMetadata.posts)  . flip TagMetadata.fromItem tags) <>
  Hakyll.listFieldWith "posts" (PostContext.fromTags tags) (\item -> do
    identifiers <- TagMetadata.posts <$> TagMetadata.fromItem item tags
    Hakyll.loadAll (Hakyll.fromList identifiers) >>= Hakyll.recentFirst
  )

