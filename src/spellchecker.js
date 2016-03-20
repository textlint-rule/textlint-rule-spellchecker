import { RuleHelper } from 'textlint-rule-helper';
import SpellChecker from 'spellchecker';
import StringSource from 'textlint-util-to-string';
import filter from 'unist-util-filter';

/**
 * Exclude inappropriate parts of text from linting,
 * such as link texts, image captions, blockquotes, emphasized texts and inline code.
 * @param {TxtNode} node
 * @param {TextLintContext} context
 * @return {{ source: StringSource, text: string }}
 */
function filterNode({ node, context }) {
  const { Syntax } = context;
  const helper = new RuleHelper(context);

  if (helper.isChildNode(node, [
    Syntax.Link,
    Syntax.Image,
    Syntax.BlockQuote,
    Syntax.Emphasis,
  ])) {
    return null;
  }

  const filteredNode = filter(node, (n) =>
    n.type !== Syntax.Code &&
    n.type !== Syntax.Link
  );

  if (!filteredNode) {
    return null;
  }

  const source = new StringSource(filteredNode);
  const text = source.toString();

  return { source, text };
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
      const { source, text } = filterNode({ node, context }) || {};

      if (!source || !text) {
        return;
      }

      const misspelledCharacterRanges = SpellChecker.checkSpelling(text);

      misspelledCharacterRanges.forEach((range) => {
        const misspelled = text.slice(range.start, range.end);
        const corrections = SpellChecker.getCorrectionsForMisspelling(misspelled);
        const originalPosition = source.originalPositionFromIndex(range.start);
        let fix;

        if (corrections.length === 1) {
          const originalRange = [
            originalPosition.column,
            originalPosition.column + (range.end - range.start),
          ];

          fix = fixer.replaceTextRange(originalRange, corrections[0]);
        }

        const message = `${misspelled} -> ${corrections.join(', ')}`;
        report(node, new RuleError(message, {
          line: originalPosition.line - 1,
          column: originalPosition.column,
          fix,
        }));
      });
    },
  };
}

export default {
  linter: reporter,
  fixer: reporter,
};
