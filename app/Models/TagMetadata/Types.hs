module Models.TagMetadata.Types
  ( TagMetadata(..)
  ) where

import qualified Hakyll

data TagMetadata = TagMetadata
  { name  :: String
  , route :: String
  , posts :: [Hakyll.Identifier]
  } deriving (Eq, Show)

