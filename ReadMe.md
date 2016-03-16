# textlint-rule-spellchecker

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)
[![Build Status](https://travis-ci.org/nodaguti/textlint-rule-spellchecker.svg?branch=master)](https://travis-ci.org/nodaguti/textlint-rule-spellchecker)
[![Dependency Status](https://david-dm.org/nodaguti/textlint-rule-spellchecker.svg)](https://david-dm.org/nodaguti/textlint-rule-spellchecker)
[![devDependency Status](https://david-dm.org/nodaguti/textlint-rule-spellchecker/dev-status.svg)](https://david-dm.org/nodaguti/textlint-rule-spellchecker#info=devDependencies)

[textlint](https://github.com/textlint/textlint) rule
to check spellings with native spellchecker, i.e. [NSSpellChecker](https://developer.apple.com/library/mac/#documentation/cocoa/reference/ApplicationKit/Classes/NSSpellChecker_Class/Reference/Reference.html), [Hunspell](http://hunspell.sourceforge.net/), or the [Windows 8 Spell Check API](https://msdn.microsoft.com/en-us/library/windows/desktop/hh869853(v=vs.85).aspx), depending on your platform.

## Installation
```
$ npm install textlint-rule-spellchecker
```

## Usage
```
$ npm install textlint textlint-rule-spellchecker
$ textlint --rule textlint-rule-spellchecker text-to-spellcheck.txt
```

## Notes
To ignore specific words, please add them to the dictionary in your computer.
