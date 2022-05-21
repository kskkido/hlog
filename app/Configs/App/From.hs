module Configs.App.From
  ( fromIO
  ) where

import qualified Configs.App.Types as Types

-- TODO: read from process
fromIO :: IO Types.Config
fromIO = return $ Types.Config
  { Types.commandPostCss        = "node_modules/.bin/postcss" -- yikes
  , Types.filePathSource        = "src/public"
  , Types.filePathAssets        = "assets/"
  , Types.filePathFonts         = "assets/fonts/"
  , Types.filePathImages        = "assets/images/"
  , Types.filePathScripts       = "scripts/"
  , Types.filePathClientScripts = "client/public/scripts/"
  , Types.filePathModules       = "modules/"
  , Types.filePathStyles        = "styles/"
  , Types.filePathStylesRoot    = "styles/index.css"
  , Types.filePathViews         = "views/"
  , Types.filePathViewsHome     = "views/home.html"
  , Types.filePathViewsPost     = "views/post.html"
  , Types.filePathViewsPosts    = "views/posts.html"
  , Types.filePathViewsTag      = "views/tag.html"
  , Types.filePathViewsTags     = "views/tags.html"
  , Types.filePathComponents    = "templates/"
  , Types.filePathEnPosts       = "posts/en/"
  , Types.fileExtensionMetadata = ".metadata"
  }
