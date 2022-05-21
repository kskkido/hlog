module Models.PostContext.From
  ( fromItem
  , fromTags
  , fromPosts
  ) where

import qualified Hakyll
import qualified Lib.Field.Main as Lib.Field
import qualified Lib.String.Main as Lib.String
import qualified Models.Tags.Main as Tags
import qualified Models.PostMetadata.Main as PostMetadata
import qualified Models.PostTagContext.Main as PostTagContext

fromItem :: Hakyll.Context String
fromItem =
  Hakyll.field "identifier"  (fmap PostMetadata.identifier . PostMetadata.fromItem) <>
  Hakyll.field "title"       (fmap PostMetadata.title . PostMetadata.fromItem) <>
  Hakyll.field "author"      (fmap PostMetadata.author . PostMetadata.fromItem) <>
  Hakyll.field "date"        (fmap PostMetadata.date  . PostMetadata.fromItem) <>
  Hakyll.field "image"       (fmap PostMetadata.image . PostMetadata.fromItem) <>
  Hakyll.field "description" (fmap PostMetadata.description . PostMetadata.fromItem) <>
  Hakyll.field "body"        (return . Hakyll.itemBody) <>
  Hakyll.urlField "url" <>
  Lib.Field.wordCountField "word-count"

fromTags :: Hakyll.Tags -> Hakyll.Context String
fromTags tags =
  fromItem <>
  Hakyll.listFieldWith "tags" (PostTagContext.fromItem tags) (\item -> do
    names <- PostMetadata.tags <$> PostMetadata.fromItem item
    return $ flip Tags.toItem tags <$> names
  )

fromPosts :: [Hakyll.Item String] -> Hakyll.Tags -> Hakyll.Context String
fromPosts posts tags =
  fromTags tags <>
  Hakyll.listFieldWith "prev" fromItem (\item -> do
    sorted <- (zip . fmap (Hakyll.toFilePath . Hakyll.itemIdentifier) <*> tail) <$> Hakyll.recentFirst posts
    return $ maybe [] pure $ lookup (Hakyll.toFilePath $ Hakyll.itemIdentifier item) sorted
  ) <>
  Hakyll.listFieldWith "next" fromItem (\item -> do
    sorted <- (tail >>= zip . fmap (Hakyll.toFilePath . Hakyll.itemIdentifier)) <$> Hakyll.recentFirst posts
    return $ maybe [] pure $ lookup (Hakyll.toFilePath $ Hakyll.itemIdentifier item) sorted
  )
