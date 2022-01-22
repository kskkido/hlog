module Models.PostMetadata.From
  ( fromItem
  , fromObject
  , fromPattern
  ) where

import Control.Lens
import Data.Functor ((<&>))
import qualified Data.List.Split
import qualified Data.Text
import qualified Data.Maybe
import qualified Data.Aeson
import qualified Data.HashMap.Strict
import qualified Control.Monad
import qualified Hakyll
import qualified Lib.Parser.Main as Parser
import qualified Models.Locale.Main as Locale
import qualified Models.Tag.Main as Tag
import qualified Models.PostMetadata.Constants as Constants
import qualified Models.PostMetadata.Types as Types

fromPattern :: Hakyll.MonadMetadata m => Hakyll.Pattern -> m [Types.PostMetadata]
fromPattern pattern = do
  identifiers <- Hakyll.getMatches pattern
  Control.Monad.forM identifiers $ \identifier -> do
    metadata <- Hakyll.getMetadata identifier
    return $ fromObject metadata

fromItem :: Hakyll.MonadMetadata m => Hakyll.Item a -> m Types.PostMetadata
fromItem item = do
  metadata <- Hakyll.getMetadata $ Hakyll.itemIdentifier item
  return $ fromObject metadata

fromObject :: Data.Aeson.Object -> Types.PostMetadata
fromObject object = foldl (&) Constants.empty
  [ Types._identifier  %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "identifier") object  >>= Parser.parseString
  , Types._title       %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "title")      object  >>= Parser.parseString
  , Types._author      %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "author")     object  >>= Parser.parseString
  , Types._date        %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "date")       object  >>= Parser.parseString
  , Types._description %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "description") object >>= Parser.parseString
  , Types._image       %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "image")      object  >>= Parser.parseString
  , Types._tags        %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "tags")       object  >>= Parser.parseString <&> Tag.fromString
  , Types._locale      %~ \x -> maybe x id $ Data.HashMap.Strict.lookup (Data.Text.pack "locale")     object  >>= Parser.parseString >>= Locale.fromString
  ]

