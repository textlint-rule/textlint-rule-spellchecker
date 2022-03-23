import TextlintTester from 'textlint-tester';
import rule from '../src/spellchecker';

const tester = new TextlintTester();

tester.run('spellchecker', rule, {
  valid: [
    'Hello, world!',
    'This sentence contains no mistakes.',
    'This link contains an [errror](index.html), but it should be ignored.',
    'Misspellings in inline code should be `ignord`.',
    {
      text: 'This sentence contains no mistakes in a plain text.',
      ext: '.txt',
    },
    {
      text:
        "This sentence contains an errror, but it's in the `skipWords` list",
      options: {
        skipWords: ['errror'],
      },
    },
    {
      text:
        "This sentence contains an errror, but it's in the `skipRegExps` list",
      options: {
        skipRegExps: ['er+or'],
      },
    },
  ],
  invalid: [
    {
      text: 'This sentence contains an errror.',
      output: 'This sentence contains an error.',
      errors: [
        {
          message: 'errror -> error',
          line: 1,
          column: 27,
        },
      ],
    },
    {
      text: 'This sentence contains an errror in a plain text.',
      output: 'This sentence contains an error in a plain text.',
      ext: '.txt',
      errors: [
        {
          message: 'errror -> error',
          line: 1,
          column: 27,
        },
      ],
    },
    {
      text: 'This sentence contains `code` and an errror.',
      output: 'This sentence contains `code` and an error.',
      errors: [
        {
          message: 'errror -> error',
          line: 1,
          column: 38,
        },
      ],
    },
    {
      text:
        'This link contains an [errror](index.html) and should be reported.',
      output:
        'This link contains an [error](index.html) and should be reported.',
      options: {
        skipNodeTypes: [],
      },
      errors: [
        {
          message: 'errror -> error',
          line: 1,
          column: 24,
        },
      ],
    },
    {
      text:
        'This link contains an [errror](index.html) and should be reported.',
      output:
        'This link contains an [error](index.html) and should be reported.',
      options: {
        skipNodeTypes: ['Link'],
      },
      errors: [],
    },
  ],
});
