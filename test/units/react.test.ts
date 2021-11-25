import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@react", () =>
  assertEquals(
    jsdoc`
      /**
       * @react
       */
    `,
    tsdoc`
      /**
       * @react
       */
    `,
  ));
