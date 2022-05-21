{-# LANGUAGE OverloadedStrings #-}

import Control.Lens
import qualified Hakyll
import qualified Configs.App.Main as Config
import qualified Models.Css.Main as Css
import qualified Models.HomeContext.Main as HomeContext
import qualified Models.PostContext.Main as PostContext
import qualified Models.PostsContext.Main as PostsContext
import qualified Models.TagContext.Main as TagContext
import qualified Models.TagsContext.Main as TagsContext
import qualified Models.TableOfContentsContext.Main as TableOfContentsContext
import qualified Services.Markdown.Main as Markdown

main :: IO ()
main = do
  config <- Config.fromIO
  Hakyll.hakyllWith (Config.toHakyllConfig config) $ do
    do
      Hakyll.match (Config.toAssetsPattern config) $ do
        Hakyll.route Hakyll.idRoute
        Hakyll.compile $ Hakyll.copyFileCompiler
    do
      Hakyll.match (Config.toScriptsPattern config) $ do
        Hakyll.route $ Hakyll.setExtension "js"
        Hakyll.compile $ Hakyll.copyFileCompiler
    do
      Hakyll.match (Config.toClientScriptsPattern config) $ do
        Hakyll.route $ Hakyll.setExtension "js"
        Hakyll.compile $ Hakyll.copyFileCompiler
    do
      Hakyll.match (Config.toModulesPattern config) $ do
        Hakyll.route $ Hakyll.setExtension "js"
        Hakyll.compile $ Hakyll.copyFileCompiler
    do
      styles <- Hakyll.makePatternDependency $ Config.toStylesPattern config
      Hakyll.rulesExtraDependencies [styles] $ do
        Hakyll.match (Config.toStylesRootPattern config) $ do
          Hakyll.route $ Hakyll.setExtension "css"
          Hakyll.compile Hakyll.compressCssCompiler
    tags <- Hakyll.buildTags (Config.toEnPostsPattern config) (Hakyll.fromCapture "tags/*.html")
    Hakyll.tagsRules tags $ \tag pattern -> do
      Hakyll.route Hakyll.idRoute
      Hakyll.compile $ do
        posts   <- Hakyll.loadAll pattern
        context <- return $ TagContext.fromPosts posts tag tags
        Hakyll.makeItem ""
          >>= Hakyll.loadAndApplyTemplate (Config.toViewsTagIdentifier config) context
          >>= Hakyll.relativizeUrls
    Hakyll.match (Config.toViewsTagsPattern config) $ do
      Hakyll.route $ Hakyll.constRoute "tags.html"
      Hakyll.compile $ do
        context <- return $ TagsContext.fromTags tags
        Hakyll.getResourceBody
          >>= Hakyll.applyAsTemplate context
          >>= Hakyll.relativizeUrls
    Hakyll.match (Config.toEnPostsPattern config) $ do
      Hakyll.version "relative" $ do
        Hakyll.route $ Hakyll.setExtension "html"
        Hakyll.compile $ do
          context <- return $ (PostContext.fromTags tags <> TableOfContentsContext.fromItem)
          Hakyll.pandocCompilerWithTransform Hakyll.defaultHakyllReaderOptions Hakyll.defaultHakyllWriterOptions Markdown.transpile
            >>= Hakyll.loadAndApplyTemplate (Config.toViewsPostIdentifier config) context
            >>= Hakyll.relativizeUrls
      Hakyll.route $ Hakyll.setExtension "html"
      Hakyll.compile $ do
        posts   <- Hakyll.loadAll (Config.toEnPostsPattern config Hakyll..&&. Hakyll.hasVersion "relative")
        context <- return $ (PostContext.fromPosts posts tags <> TableOfContentsContext.fromItem)
        Hakyll.pandocCompilerWithTransform Hakyll.defaultHakyllReaderOptions Hakyll.defaultHakyllWriterOptions Markdown.transpile
          >>= Hakyll.loadAndApplyTemplate (Config.toViewsPostIdentifier config) context
          >>= Hakyll.relativizeUrls
    Hakyll.match (Config.toViewsPostsPattern config) $ do
      Hakyll.route $ Hakyll.constRoute "posts.html"
      Hakyll.compile $ do
        posts   <- Hakyll.loadAll $ (Config.toEnPostsPattern config Hakyll..&&. Hakyll.hasNoVersion)
        context <- return $ PostsContext.fromPosts posts tags <> TagsContext.fromTags tags
        Hakyll.getResourceBody
          >>= Hakyll.applyAsTemplate context
          >>= Hakyll.relativizeUrls
    Hakyll.match (Config.toViewsHomePattern config) $ do
      Hakyll.route $ Hakyll.constRoute "index.html"
      Hakyll.compile $ do
        posts   <- Hakyll.loadAll $ (Config.toEnPostsPattern config Hakyll..&&. Hakyll.hasNoVersion)
        context <- return $ HomeContext.fromPosts (take 5 $ posts) tags
        Hakyll.getResourceBody
          >>= Hakyll.applyAsTemplate context
          >>= Hakyll.relativizeUrls
    Hakyll.match (Config.toComponentsPattern config) $ do
      Hakyll.compile Hakyll.templateBodyCompiler
    Hakyll.match (Config.toViewsPattern config) $ do
      Hakyll.compile $ Hakyll.templateBodyCompiler

