module Models.Tags.To
  ( toTag
  , toTagsMap
  , toItem
  , toItems
  , toIdentifiers
  ) where

import qualified Hakyll
import qualified Data.Map

toTag :: String -> Hakyll.Tags -> (String, [Hakyll.Identifier])
toTag name tags = (name, maybe [] id $ Data.Map.lookup name $ toTagsMap tags)

toTagsMap :: Hakyll.Tags -> Data.Map.Map String [Hakyll.Identifier]
toTagsMap = Data.Map.fromList . Hakyll.tagsMap

toItem :: String -> Hakyll.Tags -> Hakyll.Item String
toItem name tags = Hakyll.Item (Hakyll.tagsMakeId tags name) name

toItems :: Hakyll.Tags -> [Hakyll.Item String]
toItems tags = flip toItem tags . fst <$> Hakyll.tagsMap tags

toIdentifiers :: String -> Hakyll.Tags -> [Hakyll.Identifier]
toIdentifiers name = snd . toTag name

