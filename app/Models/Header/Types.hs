module Models.Header.Types
  ( Header(..)
  ) where

import qualified Data.Text

data Header = Header
  { identifier :: String
  , label      :: String
  , level      :: Int
  }
