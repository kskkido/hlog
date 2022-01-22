module Models.TagContext.Types
  ( Tag
  ) where

import qualified Hakyll

type Tag = (String, [Hakyll.Identifier])
