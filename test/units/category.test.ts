import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@category", () =>
  assertEquals(
    jsdoc`
      /**
       * @category
       */
    `,
    tsdoc`
      /**
       * @category
       */
    `,
  ));

Deno.test("@category and description", () =>
  assertEquals(
    jsdoc`
      /**
       * @category configuration/experiment
       */
    `,
    tsdoc`
      /**
       * @category configuration/experiment
       */
    `,
  ));
