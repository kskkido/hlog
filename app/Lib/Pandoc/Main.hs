module Lib.Pandoc.Main
  ( parse
  , render
  , headers
  ) where

import qualified Hakyll
import qualified Data.Either
import qualified Data.Text
import qualified Text.Pandoc
import qualified Text.Pandoc.Walk

parse :: Data.Text.Text -> Text.Pandoc.Pandoc
parse text = case (Text.Pandoc.runPure $ Text.Pandoc.readHtml Hakyll.defaultHakyllReaderOptions text) of
    Data.Either.Left _         -> error $ "unable to parse"
    Data.Either.Right document -> document

render :: Text.Pandoc.Pandoc -> String
render document = case (Text.Pandoc.runPure $ Text.Pandoc.writePlain Text.Pandoc.def document) of
    Data.Either.Left _     -> error $ "unable to render"
    Data.Either.Right text -> Data.Text.unpack $ text

headers :: Text.Pandoc.Pandoc -> [Text.Pandoc.Block]
headers = Text.Pandoc.Walk.query header
  where header x@(Text.Pandoc.Header _ _ _) = [x]
        header _                            = []

