module Lib.PostCss.Main
  ( compile
  ) where

import qualified Data.Either
import qualified System.Exit
import qualified System.Process

compile :: String -> IO (Data.Either.Either String String)
compile file = do
  (status, stdout, _) <- System.Process.readProcessWithExitCode "yarn postcss" [file] ""
  return $ case status of
    System.Exit.ExitSuccess -> Data.Either.Right stdout
    _                       -> Data.Either.Left "unable to compile file"

