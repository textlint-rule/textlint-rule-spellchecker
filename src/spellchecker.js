import { RuleHelper, IgnoreNodeManager } from 'textlint-rule-helper';
import SpellChecker from 'spellchecker';
import StringSource from 'textlint-util-to-string';

const ignoreNodeManager = new IgnoreNodeManager();

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

  ignoreNodeManager.ignoreChildrenByTypes(node, [Syntax.Code, Syntax.Link]);

  const source = new StringSource(node);
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
        const originalPosition = source.originalPositionFromIndex(range.start);
        const originalRange = [
          originalPosition.column,
          originalPosition.column + (range.end - range.start),
        ];

        // if range is ignored, not report
        if (ignoreNodeManager.isIgnoredRange(originalRange)) {
          return;
        }

        const misspelled = text.slice(range.start, range.end);
        const corrections = SpellChecker.getCorrectionsForMisspelling(misspelled);
        let fix;

        if (corrections.length === 1) {
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
