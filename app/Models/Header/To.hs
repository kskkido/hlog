module Models.Header.To
  ( toForest
  ) where

import qualified Control.Monad
import qualified Data.Tree
import qualified Data.Maybe
import qualified Models.Header.Lib as Lib
import qualified Models.Header.Types as Types

toForest :: [Types.Header] -> Data.Maybe.Maybe (Data.Tree.Forest Types.Header)
toForest = Control.Monad.mapM step . Lib.groupByLevel
  where step []     = Data.Maybe.Nothing
        step (x:xs) = Data.Tree.Node x <$> toForest xs

