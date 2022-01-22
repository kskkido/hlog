module Models.TableOfContents.Types
  ( TableOfContents
  ) where

import qualified Data.Tree
import qualified Models.Header.Main as Header

type TableOfContents = Data.Tree.Forest Header.Header
