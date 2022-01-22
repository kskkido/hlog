module Configs.App.Types
  ( Config(..)
  , _commandPostCss
  , _filePathSource
  , _filePathAssets
  , _filePathScripts
  , _filePathModules
  , _filePathFonts
  , _filePathImages
  , _filePathStyles
  , _filePathStylesRoot
  , _filePathViews
  , _filePathViewsHome
  , _filePathViewsPost
  , _filePathViewsPosts
  , _filePathViewsTag
  , _filePathViewsTags
  , _filePathComponents
  , _filePathEnPosts
  , _fileExtensionMetadata
  ) where

import qualified Control.Lens

data Config = Config
  { commandPostCss        :: String
  , filePathSource        :: String
  , filePathAssets        :: String
  , filePathScripts       :: String
  , filePathModules       :: String
  , filePathFonts         :: String
  , filePathImages        :: String
  , filePathStyles        :: String
  , filePathStylesRoot    :: String
  , filePathViews         :: String
  , filePathViewsHome     :: String
  , filePathViewsPost     :: String
  , filePathViewsPosts    :: String
  , filePathViewsTag      :: String
  , filePathViewsTags     :: String
  , filePathComponents    :: String
  , filePathEnPosts       :: String
  , fileExtensionMetadata :: String
  } deriving (Eq, Show)

_commandPostCss :: Control.Lens.Lens' Config String
_commandPostCss = Control.Lens.lens commandPostCss $ \s x -> s { commandPostCss = x }

_filePathSource :: Control.Lens.Lens' Config String
_filePathSource = Control.Lens.lens filePathSource $ \s x -> s { filePathSource = x }

_filePathAssets :: Control.Lens.Lens' Config String
_filePathAssets = Control.Lens.lens filePathAssets $ \s x -> s { filePathAssets = x }

_filePathScripts :: Control.Lens.Lens' Config String
_filePathScripts = Control.Lens.lens filePathScripts $ \s x -> s { filePathScripts = x }

_filePathModules :: Control.Lens.Lens' Config String
_filePathModules = Control.Lens.lens filePathModules $ \s x -> s { filePathModules = x }

_filePathFonts :: Control.Lens.Lens' Config String
_filePathFonts = Control.Lens.lens filePathFonts $ \s x -> s { filePathFonts = x }

_filePathImages :: Control.Lens.Lens' Config String
_filePathImages = Control.Lens.lens filePathImages $ \s x -> s { filePathImages = x }

_filePathStyles :: Control.Lens.Lens' Config String
_filePathStyles = Control.Lens.lens filePathStyles $ \s x -> s { filePathStyles = x }

_filePathStylesRoot :: Control.Lens.Lens' Config String
_filePathStylesRoot = Control.Lens.lens filePathStylesRoot $ \s x -> s { filePathStylesRoot = x }

_filePathViews :: Control.Lens.Lens' Config String
_filePathViews = Control.Lens.lens filePathViews $ \s x -> s { filePathViews = x }

_filePathViewsHome :: Control.Lens.Lens' Config String
_filePathViewsHome = Control.Lens.lens filePathViewsHome $ \s x -> s { filePathViewsHome = x }

_filePathViewsPost :: Control.Lens.Lens' Config String
_filePathViewsPost = Control.Lens.lens filePathViewsPost $ \s x -> s { filePathViewsPost = x }

_filePathViewsPosts :: Control.Lens.Lens' Config String
_filePathViewsPosts = Control.Lens.lens filePathViewsPosts $ \s x -> s { filePathViewsPosts = x }

_filePathViewsTag :: Control.Lens.Lens' Config String
_filePathViewsTag = Control.Lens.lens filePathViewsTag $ \s x -> s { filePathViewsTag = x }

_filePathViewsTags :: Control.Lens.Lens' Config String
_filePathViewsTags = Control.Lens.lens filePathViewsTags $ \s x -> s { filePathViewsTags = x }

_filePathComponents :: Control.Lens.Lens' Config String
_filePathComponents = Control.Lens.lens filePathComponents $ \s x -> s { filePathComponents = x }

_filePathEnPosts :: Control.Lens.Lens' Config String
_filePathEnPosts = Control.Lens.lens filePathEnPosts $ \s x -> s { filePathEnPosts = x }

_fileExtensionMetadata :: Control.Lens.Lens' Config String
_fileExtensionMetadata = Control.Lens.lens fileExtensionMetadata $ \s x -> s { fileExtensionMetadata = x }
