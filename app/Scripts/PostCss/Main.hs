module Scripts.PostCss.Main
  ( compile
  ) where

import Control.Lens
import qualified Data.Either
import qualified System.Exit
import qualified System.Process
import qualified Configs.PostCss.Main as Config

compile :: String -> Config.Config -> IO (Data.Either.Either String String)
compile file config = do
  (status, stdout, _) <- System.Process.readProcessWithExitCode (config ^. Config._command) [file] ""
  return $ case status of
    System.Exit.ExitSuccess -> Data.Either.Right stdout
    _                       -> Data.Either.Left "unable to compile file"

