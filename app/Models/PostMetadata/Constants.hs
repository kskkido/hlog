module Models.PostMetadata.Constants
  ( empty
  ) where

import qualified Models.Locale.Main as Locale
import qualified Models.PostMetadata.Types as Types

empty :: Types.PostMetadata
empty = Types.PostMetadata
  { Types.identifier = "unknown"
  , Types.title = "unknown"
  , Types.author = "unknown"
  , Types.date = "unknown"
  , Types.image = "unknown"
  , Types.description = "unknown"
  , Types.tags = []
  , Types.locale = Locale.EN
  }
