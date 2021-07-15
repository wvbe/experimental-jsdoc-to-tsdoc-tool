import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@const", () =>
  assertEquals(
    jsdoc`
      /**
       * @const {boolean} nerf
       */
    `,
    tsdoc`
      /**
       * @const {boolean} nerf
       */
    `,
  ));
