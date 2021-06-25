import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@return, without a description", () =>
  assertEquals(
    jsdoc`
      /**
       * @return {string}
       */
    `,
    tsdoc`
      /**
       */
    `,
  ));

Deno.test("@return", () =>
  assertEquals(
    jsdoc`
      /**
       * @return {string} This is the return.
       */
    `,
    tsdoc`
      /**
       * @return This is the return.
       */
    `,
  ));

Deno.test("@returns", () =>
  assertEquals(
    jsdoc`
      /**
       * @returns {string[]} This is the return.
       */
    `,
    tsdoc`
      /**
       * @return This is the return.
       */
    `,
  ));
