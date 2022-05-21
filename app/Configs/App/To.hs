module Configs.App.To
  ( toPostCssConfig
  , toHakyllConfig
  , toAssetsPattern
  , toScriptsPattern
  , toClientScriptsPattern
  , toModulesPattern
  , toFontsPattern
  , toStylesPattern
  , toStylesRootPattern
  , toViewsPattern
  , toViewsHomePattern
  , toViewsPostPattern
  , toViewsPostIdentifier
  , toViewsPostsPattern
  , toViewsTagPattern
  , toViewsTagIdentifier
  , toViewsTagsPattern
  , toViewsTagsIdentifier
  , toEnPostsPattern
  , toComponentsPattern
  , toMetadataPattern
  ) where

import Control.Lens
import qualified Hakyll
import qualified Configs.PostCss.Main as PostCss
import qualified Configs.App.Types as Types

toPostCssConfig :: Types.Config -> PostCss.Config
toPostCssConfig config = PostCss.Config
  { PostCss.command = config ^. Types._commandPostCss
  }

toHakyllConfig :: Types.Config -> Hakyll.Configuration
toHakyllConfig config = Hakyll.defaultConfiguration
  { Hakyll.providerDirectory = config ^. Types._filePathSource
  }

toAssetsPattern :: Types.Config -> Hakyll.Pattern
toAssetsPattern config = config ^. Types._filePathAssets . to (++ "**/*") . to Hakyll.fromGlob

toScriptsPattern :: Types.Config -> Hakyll.Pattern
toScriptsPattern config = config ^. Types._filePathScripts . to (++ "*") . to Hakyll.fromGlob

toClientScriptsPattern :: Types.Config -> Hakyll.Pattern
toClientScriptsPattern config = config ^. Types._filePathClientScripts . to (++ "*") . to Hakyll.fromGlob

toModulesPattern :: Types.Config -> Hakyll.Pattern
toModulesPattern config = config ^. Types._filePathModules . to (++ "**/*") . to Hakyll.fromGlob

toFontsPattern :: Types.Config -> Hakyll.Pattern
toFontsPattern config = config ^. Types._filePathFonts . to (++ "*") . to Hakyll.fromGlob

toStylesPattern :: Types.Config -> Hakyll.Pattern
toStylesPattern config = config ^. Types._filePathStyles . to (++ "*") . to Hakyll.fromGlob

toStylesRootPattern :: Types.Config -> Hakyll.Pattern
toStylesRootPattern config = config ^. Types._filePathStylesRoot . to Hakyll.fromGlob

toViewsPattern :: Types.Config -> Hakyll.Pattern
toViewsPattern config = config ^. Types._filePathViews . to (++ "*") . to Hakyll.fromGlob

toViewsHomePattern :: Types.Config -> Hakyll.Pattern
toViewsHomePattern config = config ^. Types._filePathViewsHome . to Hakyll.fromGlob

toViewsPostPattern :: Types.Config -> Hakyll.Pattern
toViewsPostPattern config = config ^. Types._filePathViewsPost . to Hakyll.fromGlob

toViewsPostIdentifier :: Types.Config -> Hakyll.Identifier
toViewsPostIdentifier config = config ^. Types._filePathViewsPost . to Hakyll.fromFilePath

toViewsPostsPattern :: Types.Config -> Hakyll.Pattern
toViewsPostsPattern config = config ^. Types._filePathViewsPosts . to Hakyll.fromGlob

toViewsTagPattern :: Types.Config -> Hakyll.Pattern
toViewsTagPattern config = config ^. Types._filePathViewsTag . to Hakyll.fromGlob

toViewsTagIdentifier :: Types.Config -> Hakyll.Identifier
toViewsTagIdentifier config = config ^. Types._filePathViewsTag . to Hakyll.fromFilePath

toViewsTagsPattern :: Types.Config -> Hakyll.Pattern
toViewsTagsPattern config = config ^. Types._filePathViewsTags . to Hakyll.fromGlob

toViewsTagsIdentifier :: Types.Config -> Hakyll.Identifier
toViewsTagsIdentifier config = config ^. Types._filePathViewsTags . to Hakyll.fromFilePath

toEnPostsPattern :: Types.Config -> Hakyll.Pattern
toEnPostsPattern config =
  (config ^. Types._filePathEnPosts . to (++ "*") . to Hakyll.fromGlob) Hakyll..&&.
  (Hakyll.complement $ toMetadataPattern config)

toComponentsPattern :: Types.Config -> Hakyll.Pattern
toComponentsPattern config = config ^. Types._filePathComponents . to (++ "*") . to Hakyll.fromGlob

toMetadataPattern :: Types.Config -> Hakyll.Pattern
toMetadataPattern config = config ^. Types._fileExtensionMetadata . to ("**/*" ++) . to Hakyll.fromGlob
