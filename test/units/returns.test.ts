import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@return, without a description", () =>
  assertEquals(
    jsdoc`
      /**
       * @return {string}
       */
    `,
    tsdoc``,
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
       * @returns This is the return.
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
       * @returns This is the return.
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
     * @returns This is the return.
     */
    `,
  ));

Deno.test("@returns, with a long description", () =>
  assertEquals(
    jsdoc`
      /**
       * @returns {string}  Derp skoobadee skoobadaai skoo skeeba fazskooob snaadoo doo daa daa daa nee nerf snoo skeebabadoo snaa doo daa daa daa nee.
       */
    `,
    tsdoc`
      /**
       * @returns Derp skoobadee skoobadaai skoo skeeba fazskooob snaadoo doo daa daa daa
       * nee nerf snoo skeebabadoo snaa doo daa daa daa nee.
       */
    `,
  ));
