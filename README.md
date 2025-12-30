# textlint-rule-no-smart-quotes

[textlint](https://textlint.github.io/) rule which detects and fixes smart quotes (curly quotes) to straight quotes.

## What it does

This rule detects the following smart quote characters and replaces them with their straight equivalents:

| Code Point | Name                                  | Replacement |
| ---------- | ------------------------------------- | ----------- |
| `U+201C`   | LEFT DOUBLE QUOTATION MARK (&ldquo;)  | `"`         |
| `U+201D`   | RIGHT DOUBLE QUOTATION MARK (&rdquo;) | `"`         |
| `U+2018`   | LEFT SINGLE QUOTATION MARK (&lsquo;)  | `'`         |
| `U+2019`   | RIGHT SINGLE QUOTATION MARK (&rsquo;) | `'`         |

## Install

Install with [pnpm](https://pnpm.io/):

```sh
pnpm add @0x6b/textlint-rule-no-smart-quotes
```

Or with npm:

```sh
npm install @0x6b/textlint-rule-no-smart-quotes
```

This module requires Node.js >= 20.0.0.

## Usage

Via `.textlintrc`(recommended):

```json
{
  "rules": {
    "@0x6b/no-smart-quotes": true
  }
}
```

Via CLI:

```
textlint --rule @0x6b/no-smart-quotes README.md
```

### Build

Builds source codes for publish to the `lib/` folder.

```sh
pnpm install && pnpm run build
```

### Test

Run test code in `test` folder by [textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester").

```sh
pnpm test
```

## License

MIT © 0x6b
