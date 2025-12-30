import TextLintTester from "textlint-tester";
import rule from "../src";

const tester = new TextLintTester();

tester.run("textlint-rule-no-smart-quotes", rule, {
   valid: [
      "Normal text without any smart quotes",
      'Text with straight double quotes "like this"',
      "Text with straight single quotes 'like this'",
      "Mixed quotes: \"double\" and 'single'",
   ],
   invalid: [
      {
         text: "\u201cHello World\u201d",
         output: '"Hello World"',
         errors: [
            {
               index: 0,
               message: 'Found left double quote (\\u201c), use " instead',
            },
            {
               index: 12,
               message: 'Found right double quote (\\u201d), use " instead',
            },
         ],
      },
      {
         text: "\u2018Hello World\u2019",
         output: "'Hello World'",
         errors: [
            {
               index: 0,
               message: "Found left single quote (\\u2018), use ' instead",
            },
            {
               index: 12,
               message: "Found right single quote (\\u2019), use ' instead",
            },
         ],
      },
      {
         text: "She said, \u201cIt\u2019s fine.\u201d",
         output: 'She said, "It\'s fine."',
         errors: [
            {
               index: 10,
               message: 'Found left double quote (\\u201c), use " instead',
            },
            {
               index: 13,
               message: "Found right single quote (\\u2019), use ' instead",
            },
            {
               index: 21,
               message: 'Found right double quote (\\u201d), use " instead',
            },
         ],
      },
      {
         text: "The \u2018quick\u2019 brown fox",
         output: "The 'quick' brown fox",
         errors: [
            {
               index: 4,
               message: "Found left single quote (\\u2018), use ' instead",
            },
            {
               index: 10,
               message: "Found right single quote (\\u2019), use ' instead",
            },
         ],
      },
      {
         text: "\u201cNested \u2018quotes\u2019 here\u201d",
         output: "\"Nested 'quotes' here\"",
         errors: [
            {
               index: 0,
               message: 'Found left double quote (\\u201c), use " instead',
            },
            {
               index: 8,
               message: "Found left single quote (\\u2018), use ' instead",
            },
            {
               index: 15,
               message: "Found right single quote (\\u2019), use ' instead",
            },
            {
               index: 21,
               message: 'Found right double quote (\\u201d), use " instead',
            },
         ],
      },
   ],
});
