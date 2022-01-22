module Lib.Field.Main
  ( previewField
  , readTimeField
  ) where

import qualified Hakyll
import qualified Data.Maybe
import qualified Data.Text

previewField :: String -> String -> Hakyll.Context String
previewField key separator = Hakyll.field key $ \item -> do
  body <- return $ Hakyll.itemBody item
  case Hakyll.needlePrefix separator body of
    Data.Maybe.Nothing -> fail $ "unable to find separator of " ++ separator
    Data.Maybe.Just xs -> return xs

readTimeField :: String -> Int -> Hakyll.Context String
readTimeField key unit = Hakyll.field key $ \item -> do
  body <- return $ Hakyll.itemBody item
  return $ show $ div (length $ Data.Text.words $ Data.Text.pack body) unit
