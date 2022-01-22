module Lib.Parser.String.Main
  ( parseString
  ) where

import qualified Data.Text
import qualified Data.Aeson
import qualified Data.Maybe

parseString :: Data.Aeson.Value -> Data.Maybe.Maybe String
parseString (Data.Aeson.String x) = return $ Data.Text.unpack x
parseString _                     = Data.Maybe.Nothing

