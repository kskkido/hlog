module Lib.String.Main
  ( strip
  , takeWords
  ) where

import qualified Data.Text

strip :: String -> String
strip = Data.Text.unpack . Data.Text.strip. Data.Text.pack

takeWords :: Int -> String -> String
takeWords n = Data.Text.unpack . Data.Text.unwords . take n . Data.Text.words . Data.Text.pack
