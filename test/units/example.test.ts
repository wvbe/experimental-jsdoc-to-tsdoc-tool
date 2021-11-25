import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@example, empty", () =>
  assertEquals(
    jsdoc`
      /**
       * @example
       */
    `,
    tsdoc``,
  ));

Deno.test("@example, with a code example", () =>
  assertEquals(
    jsdoc`
      /**
       * @example
       * configuration.set('name', 'nerd');
       */
    `,
    tsdoc`
      /**
       * @example
       * \`\`\`
       * configuration.set('name', 'nerd');
       * \`\`\`
       */
    `,
  ));

Deno.test("@example, with a description and code example", () =>
  assertEquals(
    jsdoc`
      /**
       * @example
       * This is a code example:
       * \`\`\`js
       * configuration.set('name', 'nerd');
       * \`\`\`
       */
    `,
    // Notice that Prettier introduces a newline in between the paragraph and codeblock:
    tsdoc`
      /**
       * @example
       * This is a code example:
       *
       * \`\`\`js
       * configuration.set('name', 'nerd');
       * \`\`\`
       */
    `,
  ));
Deno.test("@example, with multi-line code example", () =>
  assertEquals(
    jsdoc`
      /**
       * @example
       * // This is an example:
       * if (something) {
       *    "content of if"
       * } else {
       *    "content of else"
       * }
       */
    `,
    tsdoc`
      /**
       * @example
       * \`\`\`
       * // This is an example:
       * if (something) {
       *    "content of if"
       * } else {
       *    "content of else"
       * }
       * \`\`\`
       */
    `,
  ));
