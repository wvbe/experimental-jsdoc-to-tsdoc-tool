import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("Description, simple", () =>
  assertEquals(
    jsdoc`
      /**
       * Test 1
       */
    `,
    tsdoc`
      /**
       * @remarks
       * Test 1
       */
    `,
  ));

Deno.test("Description, two paragraphs", () =>
  assertEquals(
    jsdoc`
      /**
       * Paragraph 1
       *
       * Paragraph 2
       */
    `,
    tsdoc`
      /**
       * @remarks
       * Paragraph 1
       *
       * Paragraph 2
       */
    `,
  ));

Deno.test("Description, long and line-wrapping", () =>
  assertEquals(
    jsdoc`
      /**
       * This description with some really long lines. This description with some really long lines. This description with some really long lines. This description with some really
       * long lines. This description
       * with some really weird wrapping.
       */
    `,
    tsdoc`
      /**
       * @remarks
       * This description with some really long lines. This description with some really
       * long lines. This description with some really long lines. This description with
       * some really long lines. This description with some really weird wrapping.
       */
    `,
  ));

Deno.test("@description on one line", () =>
  assertEquals(
    jsdoc`
      /**
       * @description This is a description.
       */
    `,
    tsdoc`
      /**
       * @remarks
       * This is a description.
       */
    `,
  ));

Deno.test("@description on two lines", () =>
  assertEquals(
    jsdoc`
        /**
         * @description This is
         * a description.
         */
      `,
    tsdoc`
        /**
         * @remarks
         * This is a description.
         */
      `,
  ));

Deno.test("@description on the next line line", () =>
  assertEquals(
    jsdoc`
        /**
         * @description
         * This is a description.
         */
      `,
    tsdoc`
        /**
         * @remarks
         * This is a description.
         */
      `,
  ));

Deno.test("Description and @description", () =>
  assertEquals(
    jsdoc`
          /**
           * This is the first description
           *
           * More parts of the first description
           * @description This is the second description
           *
           * More parts of the second description
           * @description This is the third description
           */
        `,
    tsdoc`
          /**
           * @remarks
           * This is the first description
           *
           * More parts of the first description
           *
           * This is the second description
           *
           * More parts of the second description
           *
           * This is the third description
           */
        `,
  ));

Deno.test("Description and @summary", () =>
  assertEquals(
    jsdoc`
          /**
           * This is the first description
           *
           * @summary This is the summary
           *
           * @description This is the second description
           */
        `,
    tsdoc`
          /**
           * This is the summary
           *
           * @remarks
           * This is the first description
           *
           * This is the second description
           */
        `,
  ));
Deno.test("@summary only", () =>
  assertEquals(
    jsdoc`
          /**
           * @summary This is the summary
           */
        `,
    tsdoc`
          /**
           * This is the summary
           */
        `,
  ));
