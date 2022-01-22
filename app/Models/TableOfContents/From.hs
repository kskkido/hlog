module Models.TableOfContents.From
  ( fromItem
  , fromDocument
  ) where

import qualified Hakyll
import qualified Data.Either
import qualified Data.Maybe
import qualified Data.Text
import qualified Text.Pandoc
import qualified Text.Pandoc.Walk
import qualified Lib.Pandoc.Main as Lib.Pandoc
import qualified Models.Header.Main as Header
import qualified Models.TableOfContents.Types as Types

fromItem :: Hakyll.MonadMetadata m => Hakyll.Item String -> m Types.TableOfContents
fromItem item = do
  body     <- return $ Data.Text.pack $ Hakyll.itemBody item
  document <- return $ Lib.Pandoc.parse body
  return $ case fromDocument document of
    Data.Maybe.Nothing  -> error "unable to parse document"
    Data.Maybe.Just toc -> toc

fromDocument :: Text.Pandoc.Pandoc -> Data.Maybe.Maybe Types.TableOfContents
fromDocument = Header.toForest . Header.fromBlocks . Lib.Pandoc.headers

