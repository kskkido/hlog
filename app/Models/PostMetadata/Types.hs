module Models.PostMetadata.Types
  ( PostMetadata(..)
  , _identifier
  , _title
  , _author
  , _date
  , _tags
  , _locale
  , _image
  , _description
  ) where

import qualified Control.Lens
import qualified Models.Tag.Main as Tag
import qualified Models.Locale.Main as Locale

data PostMetadata = PostMetadata
  { identifier  :: String
  , title       :: String
  , author      :: String
  , date        :: String
  , tags        :: [Tag.Tag]
  , locale      :: Locale.Locale
  , image       :: String
  , description :: String
  }

_identifier :: Control.Lens.Lens' PostMetadata String
_identifier = Control.Lens.lens identifier $ \s x -> s { identifier = x }

_title :: Control.Lens.Lens' PostMetadata String
_title = Control.Lens.lens title $ \s x -> s { title = x }

_author :: Control.Lens.Lens' PostMetadata String
_author = Control.Lens.lens author $ \s x -> s { author = x }

_date :: Control.Lens.Lens' PostMetadata String
_date = Control.Lens.lens date $ \s x -> s { date = x }

_tags :: Control.Lens.Lens' PostMetadata [Tag.Tag]
_tags = Control.Lens.lens tags $ \s x -> s { tags = x }

_locale :: Control.Lens.Lens' PostMetadata Locale.Locale
_locale = Control.Lens.lens locale $ \s x -> s { locale = x }

_image :: Control.Lens.Lens' PostMetadata String
_image = Control.Lens.lens image $ \s x -> s { image = x }

_description :: Control.Lens.Lens' PostMetadata String
_description = Control.Lens.lens description $ \s x -> s { description = x }
