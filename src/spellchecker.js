import { RuleHelper, IgnoreNodeManager } from 'textlint-rule-helper';
import SpellChecker from 'spellchecker';
import StringSource from 'textlint-util-to-string';
import { ASTNodeTypes } from '@textlint/ast-node-types';

const DEFAULT_OPTIONS = {
  skipNodeTypes: [
    ASTNodeTypes.Link,
    ASTNodeTypes.Image,
    ASTNodeTypes.BlockQuote,
    ASTNodeTypes.Emphasis,
    ASTNodeTypes.Code,
  ], // {Array<TxtNodeType>} TxtNode types under which a text will not be checked
  skipWords: [], // {Array<String>} Words to be skipped from the spell checks
  skipRegExps: [], // {Array<String>} Regular expressions that will not be checked if matched
};

function reporter(context, options = {}) {
  const { Syntax, report, RuleError, fixer } = context;
  const opts = Object.assign({}, DEFAULT_OPTIONS, options);
  const { skipWords, skipNodeTypes } = opts;
  const skipRegExps = opts.skipRegExps.map((re) => new RegExp(re));
  const ignoreNodeManager = new IgnoreNodeManager();

  /**
   * Exclude inappropriate parts of text from linting,
   * such as link texts, image captions, blockquotes, emphasized texts and inline code.
   * @param {TxtNode} node
   * @param {TextLintContext} context
   * @return {{ source: StringSource, text: string }}
   */
  const filterNode = (node) => {
    const helper = new RuleHelper(context);

    if (helper.isChildNode(node, skipNodeTypes)) {
      return {};
    }

    if (skipNodeTypes && skipNodeTypes.length > 0) {
      ignoreNodeManager.ignoreChildrenByTypes(node, skipNodeTypes);
    }

    const source = new StringSource(node);
    const nodeStart = node.range[0];
    const text = source.toString();

    return { source, text };
  };

  return {
    [Syntax.Paragraph](node) {
      const { source, text } = filterNode(node);

      if (!source || !text) {
        return;
      }

      const misspelledCharacterRanges = SpellChecker.checkSpelling(text);

      misspelledCharacterRanges.forEach((range) => {
        const originalPosition = source.originalPositionFromIndex(range.start);
        const originalRange = [
          nodeStart + originalPosition.column,
          nodeStart + originalPosition.column + (range.end - range.start),
        ];

        // if range is ignored, not report
        if (ignoreNodeManager.isIgnoredRange(originalRange)) {
          return;
        }

        const misspelled = text.slice(range.start, range.end);

        if (
          skipWords.includes(misspelled) ||
          skipRegExps.some((re) => re.test(misspelled))
        ) {
          return;
        }

        const corrections = SpellChecker.getCorrectionsForMisspelling(
          misspelled,
        );
        let fix;

        if (corrections.length === 1) {
          fix = fixer.replaceTextRange(originalRange, corrections[0]);
        }

        const message = `${misspelled} -> ${corrections.join(', ')}`;
        report(
          node,
          new RuleError(message, {
            line: originalPosition.line - 1,
            column: originalPosition.column,
            fix,
          }),
        );
      });
    },
  };
}

export default {
  linter: reporter,
  fixer: reporter,
};
