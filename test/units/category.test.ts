import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@category", () =>
  assertEquals(
    jsdoc`
      /**
       * @category
       */
    `,
    tsdoc``,
  ));

Deno.test("@category and description", () =>
  assertEquals(
    jsdoc`
      /**
       * @category configuration/experiment
       */
    `,
    tsdoc``,
  ));
