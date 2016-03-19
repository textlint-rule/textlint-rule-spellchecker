import { RuleHelper } from 'textlint-rule-helper';
import SpellChecker from 'spellchecker';
import StringSource from 'textlint-util-to-string';
import filter from 'unist-util-filter';

function getPlainText({ node, context }) {
  const { Syntax } = context;
  const helper = new RuleHelper(context);

  if (helper.isChildNode(node, [
    Syntax.Link,
    Syntax.Image,
    Syntax.BlockQuote,
    Syntax.Emphasis,
  ])) {
    return '';
  }

  const filteredNode = filter(node, (n) =>
    n.type !== Syntax.Code && n.type !== Syntax.Link
  );

  if (!filteredNode) {
    return '';
  }

  return (new StringSource(filteredNode)).toString();
}

function reporter(context) {
  const {
    Syntax,
    report,
    RuleError,
    fixer,
  } = context;

  return {
    [Syntax.Paragraph](node) {
      const text = getPlainText({ node, context });

      if (!text) {
        return;
      }

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
