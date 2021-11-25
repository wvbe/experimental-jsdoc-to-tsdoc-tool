import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@type", () =>
  assertEquals(
    jsdoc`
      /**
       * @type {FDS~Sometype}
       */
    `,
    tsdoc`
      /**
       * @type {FDS~Sometype}
       */
    `,
  ));
