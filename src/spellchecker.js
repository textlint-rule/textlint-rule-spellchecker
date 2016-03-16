import { RuleHelper } from 'textlint-rule-helper';
import SpellChecker from 'spellchecker';

function reporter(context) {
  const {
    Syntax,
    getSource,
    report,
    RuleError,
    fixer,
  } = context;
  const helper = new RuleHelper(context);

  return {
    [Syntax.Paragraph](node) {
      if (helper.isChildNode(node, [Syntax.BlockQuote])) {
        return;
      }

      const text = getSource(node);
      const misspelledCharacterRanges = SpellChecker.checkSpelling(text);

      misspelledCharacterRanges.forEach((range) => {
        const index = range.start;
        const misspelled = text.slice(range.start, range.end);
        const corrections = SpellChecker.getCorrectionsForMisspelling(misspelled);
        let fix;

        if (corrections.length === 1) {
          fix = fixer.replaceTextRange([range.start, range.end], corrections[0]);
        }

        const message = `${misspelled} -> ${corrections.join(', ')}`;
        report(node, new RuleError(message, { index, fix }));
      });
    },
  };
}

export default {
  linter: reporter,
  fixer: reporter,
};
