module Models.Locale.From
  ( fromString
  ) where

import qualified Data.Char
import qualified Data.Maybe
import qualified Models.Locale.Types as Types

fromString :: String -> Data.Maybe.Maybe Types.Locale
fromString xs | normalized == "en" = return Types.EN
              | normalized == "ja" = return Types.JA
              | otherwise          = Data.Maybe.Nothing
  where normalized = Data.Char.toLower <$> xs
