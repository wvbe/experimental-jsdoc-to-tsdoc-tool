import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "./util.ts";

Deno.test("Description, simple", () =>
  assertEquals(
    jsdoc`
      /**
       * Test 1
       */
    `,
    tsdoc`
      /**
       * Test 1
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
    // @TODO
    //   Wrap the output description
    tsdoc`
      /**
       * This description with some really long lines. This description with some really long lines. This description with
       * some really long lines. This description with some really long lines. This description with some really weird
       * wrapping.
       */
    `,
  ));
