import rule from '../src/spellchecker';
import TextlintTester from 'textlint-tester';

const tester = new TextlintTester();

tester.run('spellchecker', rule, {
  valid: [
    'Hello, world!',
    'This sentence contains no mistakes.',
    'This link contains an [errror](index.html), but it should be ignored.',
    'Misspellings in inline code should be `ignord`.',
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
      text: 'This sentence contains `code` and an errror.',
      output: 'This sentence contains `code` and an error.',
      errors: [
        {
          message: 'errror -> error',
          line: 1,
          column: 41,
        },
      ],
    },
  ],
});
