import type { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";

const SMART_QUOTES: ReadonlyMap<string, string> = new Map([
   ["\u201c", '"'], // left double quote " → "
   ["\u201d", '"'], // right double quote " → "
   ["\u2018", "'"], // left single quote ' → '
   ["\u2019", "'"], // right single quote ' → '
]);

const SMART_QUOTE_NAMES: ReadonlyMap<string, string> = new Map([
   ["\u201c", "left double quote"],
   ["\u201d", "right double quote"],
   ["\u2018", "left single quote"],
   ["\u2019", "right single quote"],
]);

const escapeUnicode = (str: string): string => {
   return str
      .split("")
      .map((c) => `\\u${`0000${c.charCodeAt(0).toString(16)}`.slice(-4)}`)
      .join("");
};

const smartQuotePattern = new RegExp(`[${[...SMART_QUOTES.keys()].join("")}]`, "g");

const reporter: TextlintRuleReporter = ({ Syntax, RuleError, getSource, fixer, report }) => {
   return {
      [Syntax.Str](node) {
         const text = getSource(node);
         const matches = text.matchAll(smartQuotePattern);

         for (const match of matches) {
            const smartQuote = match[0];
            const index = match.index;

            if (index === undefined) {
               continue;
            }

            const replacement = SMART_QUOTES.get(smartQuote);
            const quoteName = SMART_QUOTE_NAMES.get(smartQuote);

            if (!replacement) {
               continue;
            }

            report(
               node,
               new RuleError(`Found ${quoteName} (${escapeUnicode(smartQuote)}), use ${replacement} instead`, {
                  index,
                  fix: fixer.replaceTextRange([index, index + smartQuote.length], replacement),
               })
            );
         }
      },
   };
};

export default {
   linter: reporter,
   fixer: reporter,
} as TextlintRuleModule;
