module Models.Css.To
  ( toCompiled
  ) where

import qualified Hakyll
import qualified Data.Either
import qualified Scripts.PostCss.Main as PostCss
import qualified Configs.App.Main as Config

toCompiled :: Config.Config -> Hakyll.Compiler (Hakyll.Item String)
toCompiled config = fmap Hakyll.compressCss <$> do
  file     <- Hakyll.getResourceFilePath
  compiled <- Hakyll.unsafeCompiler $ PostCss.compile file $ Config.toPostCssConfig config
  Data.Either.either (const Hakyll.getResourceString) Hakyll.makeItem $ compiled

