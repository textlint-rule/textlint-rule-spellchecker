# textlint-rule-spellchecker

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)
[![npm](https://img.shields.io/npm/v/textlint-rule-spellchecker.svg)](https://www.npmjs.com/package/textlint-rule-spellchecker)
[![Build Status](https://travis-ci.org/nodaguti/textlint-rule-spellchecker.svg?branch=master)](https://travis-ci.org/nodaguti/textlint-rule-spellchecker)
[![Dependency Status](https://david-dm.org/nodaguti/textlint-rule-spellchecker.svg)](https://david-dm.org/nodaguti/textlint-rule-spellchecker)
[![devDependency Status](https://david-dm.org/nodaguti/textlint-rule-spellchecker/dev-status.svg)](https://david-dm.org/nodaguti/textlint-rule-spellchecker#info=devDependencies)

A [textlint](https://github.com/textlint/textlint) rule
to check spellings with an available native spellchecker, i.e. [NSSpellChecker](https://developer.apple.com/library/mac/#documentation/cocoa/reference/ApplicationKit/Classes/NSSpellChecker_Class/Reference/Reference.html), [Hunspell](http://hunspell.sourceforge.net/), or the [Windows 8 Spell Check API](<https://msdn.microsoft.com/en-us/library/windows/desktop/hh869853(v=vs.85).aspx>), depending on your platform.

## Installation

```
$ yarn add textlint textlint-rule-spellchecker
```

## Usage

```
$ yarn run textlint --rule textlint-rule-spellchecker text-to-spellcheck.txt
```

## Ignoring Words

### Global Settings

As this rule uses the native spellchecker in your computer, you can ignore specific words by adding them to your computer's/IME's dictionary.

### Per-project Settings

You can also prevent some words from being spellchecked by writing configurations in `.textlintrc` like:

```
{
  "rules": {
    "spellchecker": {
      skipWords: ['JavaScript', 'ECMAScript'],
      skipRegExps: ['(?:[a-z]+)Script'],
      skipNodeTypes: ['Comment'],
    }
  }
}
```

#### skipWords

Default: `[]`

Words in the `skipWords` list will not be checked and put no errors.

#### skipRegExps

Default: `[]`

Words that match with one of the regular expressions in `skipRegExps` are ignored.
Please note that they should be specified as an array of _string_, not `RegExp` object, and thus you need to do some extra escaping when using `\`.

#### skipNodeTypes

Default: `['Link', 'Image', 'BlockQuote', 'Emphasis', 'Code']`

textlint traverses an [TxtAST tree](https://github.com/textlint/textlint/blob/master/docs/txtnode.md) while linting the input text.

This option changes which types of node should be skipped from the spellchecks. Any texts under an ignored node will not be checked.

By default, links, images, blockquotes, emphasised texts and code blocks are ignored.

The valid node types are defined in [`@textlint/ast-node-types`](https://github.com/textlint/textlint/blob/master/docs/txtnode.md#type) and you should pass them as a string to this option.

Please note that adding this option **overrides** the default behaviour so if you want to add another node type, you must redefine all types in the default settings.

## Tests

```
npm test
```

## Contribution

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT License (http://nodaguti.mit-license.org/)
