module Models.Header.Types
  ( Header(..)
  ) where

data Header = Header
  { identifier :: String
  , label      :: String
  , level      :: Int
  }
