module Models.Tag.From
  ( fromItem
  , fromString
  ) where

import Data.Functor ((<&>))
import qualified Control.Monad
import qualified Data.Maybe
import qualified Data.Char
import qualified Data.List.Split
import qualified Data.Text
import qualified Data.HashMap.Strict
import qualified Hakyll
import qualified Lib.String.Main as Lib.String
import qualified Models.Tag.Types as Types

fromItem :: Hakyll.MonadMetadata m => Hakyll.Item a -> m [Types.Tag]
fromItem item = do
  object <- Hakyll.getMetadata $ Hakyll.itemIdentifier item
  return $ Data.Maybe.fromMaybe [] $ Control.Monad.msum
    [ Hakyll.lookupStringList "tags" object
    , Hakyll.lookupString "tags" object <&> fromString
    ]

fromString :: String -> [Types.Tag]
fromString xs = fmap Data.Char.toLower <$> Lib.String.strip <$> Data.List.Split.splitOn "," xs

