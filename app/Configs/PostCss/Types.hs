module Configs.PostCss.Types
  ( Config(..)
  , _command
  ) where

import qualified Control.Lens

data Config = Config
  { command :: String
  } deriving (Eq, Show)

_command :: Control.Lens.Lens' Config String
_command = Control.Lens.lens command $ \s x -> s { command = x }
