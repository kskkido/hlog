export const fromCharacter = (character) => (attributes) => (w) => {
  const letter = w.document.createElement('span');
  for (const key of Object.keys(attributes)) {
    letter.setAttribute(key, attributes[key]);
  }
  letter.innerHTML = character.replace(/ /g, '&nbsp;');
  return letter;
};

export const fromWindow = (w) => {
  return maybe.concat(
    array.fmap(
      (unknown) =>
        maybe.bind(
          (el) =>
            lib.maybe.guard(
              typeof el.dataset.letters === 'string' &&
                el.dataset.letters.length > 0,
              lib.maybe.pure(el)
            ),
          parser.html(unknown)
        ),
      element.toArray(w.document.querySelectorAll('*[data-letters]'))
    )
  );
};

export const toLetters = (x) => (attributes) => (w) => {
  return array.fmap(
    (c, i) =>
      letter.fromCharacter(c)({ ...attributes, style: `--index: ${i}` })(w),
    x.dataset.word.split('')
  );
};
