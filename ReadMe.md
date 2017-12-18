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

## Notes

To ignore specific words, please add them to the dictionary in your computer.

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
