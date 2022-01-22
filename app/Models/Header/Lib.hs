module Models.Header.Lib
  ( groupByLevel
  ) where

import qualified Data.List
import qualified Data.Function
import qualified Models.Header.Types as Types

groupByLevel :: [Types.Header] -> [[Types.Header]]
groupByLevel = Data.List.groupBy ((<) `Data.Function.on` Types.level)
