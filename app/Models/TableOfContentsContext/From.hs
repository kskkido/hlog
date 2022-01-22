module Models.TableOfContentsContext.From
  ( fromItem
  ) where

import qualified Hakyll
import qualified Models.HeaderContext.Main as HeaderContext
import qualified Models.TableOfContents.Main as TableOfContents

fromItem :: Hakyll.Context String
fromItem = Hakyll.listFieldWith "headers" HeaderContext.fromItemTree $ \item -> do
  toc <- TableOfContents.fromItem item
  return $ flip Hakyll.itemSetBody item <$> toc
