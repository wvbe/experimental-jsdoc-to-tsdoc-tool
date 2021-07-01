import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@doctype", () =>
  assertEquals(
    jsdoc`
      /**
       * @doctype nerf
       */
    `,
    tsdoc`
      /**
       * @doctype nerf
       */
    `,
  ));
