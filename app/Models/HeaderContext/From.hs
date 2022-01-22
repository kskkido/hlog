module Models.HeaderContext.From
  ( fromItem
  , fromItemTree
  ) where

import qualified Hakyll
import qualified Data.Tree
import qualified Models.Header.Main as Header

fromItem :: Hakyll.Context Header.Header
fromItem =
  Hakyll.field "identifier" (return . Header.identifier . Hakyll.itemBody) <>
  Hakyll.field "label" (return . Header.label . Hakyll.itemBody) <>
  Hakyll.field "level" (return . show . Header.level . Hakyll.itemBody)

fromItemTree :: Hakyll.Context (Data.Tree.Tree Header.Header)
fromItemTree =
  (Hakyll.field "identifier" (return . Header.identifier . Data.Tree.rootLabel . Hakyll.itemBody)) <>
  (Hakyll.field "label" (return . Header.label . Data.Tree.rootLabel . Hakyll.itemBody)) <>
  (Hakyll.field "level" (return . show . Header.level . Data.Tree.rootLabel . Hakyll.itemBody)) <>
  (Hakyll.listFieldWith "headers" fromItem $ \item -> do
    forest <- return $ Data.Tree.subForest $ Hakyll.itemBody item
    return $ (flip Hakyll.itemSetBody item . Data.Tree.rootLabel) <$> forest
   )

