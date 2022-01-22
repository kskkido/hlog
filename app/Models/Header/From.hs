module Models.Header.From
  ( fromBlock
  , fromBlocks
  ) where

import qualified Data.Text
import qualified Data.Maybe
import qualified Text.Pandoc
import qualified Lib.Pandoc.Main as Lib.Pandoc
import qualified Models.Header.Types as Types

fromBlock :: Text.Pandoc.Block -> Data.Maybe.Maybe Types.Header
fromBlock x@(Text.Pandoc.Header level (identifier, _, _) inlines) = return $ Types.Header
  { Types.identifier = Data.Text.unpack identifier
  , Types.label      = Lib.Pandoc.render (Text.Pandoc.Pandoc Text.Pandoc.nullMeta [Text.Pandoc.Plain inlines])
  , Types.level      = level
  }
fromBlock _                                           = Data.Maybe.Nothing

fromBlocks :: [Text.Pandoc.Block] -> [Types.Header]
fromBlocks = Data.Maybe.catMaybes . map fromBlock
