import rule from '../src/spellchecker';
import TextlintTester from 'textlint-tester';

const tester = new TextlintTester();

tester.run('spellchecker', rule, {
  valid: [
    'Hello, world!',
    'This sentence contains no mistakes.',
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
  ],
});
