module Services.Markdown.Main
  ( transpile
  ) where

import qualified Data.Text
import qualified Text.Pandoc
import qualified Text.Pandoc.Walk

transpile :: Text.Pandoc.Pandoc -> Text.Pandoc.Pandoc
transpile = Text.Pandoc.Walk.walk step
  where step block@(Text.Pandoc.Header _ _ _) = transpileHeader block
        step block                            = block

transpileHeader :: Text.Pandoc.Block -> Text.Pandoc.Block
transpileHeader (Text.Pandoc.Header level (identifier, classes, hash) inlines) = Text.Pandoc.Header
  level
  (identifier, classes, hash ++
    [ (Data.Text.pack "data-type", Data.Text.pack "heading")
    ]
  )
  ( inlines ++
  [ Text.Pandoc.Link (Data.Text.empty, [], [(Data.Text.pack "data-type", Data.Text.pack "anchor")]) [] (Data.Text.cons '#' identifier, identifier)
  ]
  )
transpileHeader block = block
