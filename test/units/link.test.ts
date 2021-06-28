import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@link", () =>
  assertEquals(
    jsdoc`
      /**
       * {@link https://www.google.com}
       */
    `,
    tsdoc`
      /**
       * {@link https://www.google.com}
       */
    `,
  ));

Deno.test("Description and @link", () =>
  assertEquals(
    jsdoc`
      /**
       * This is a description with a {@link https://www.google.com}
       */
    `,
    tsdoc`
      /**
       * This is a description with a {@link https://www.google.com}
       */
    `,
  ));

Deno.test("@param and @link", () =>
  assertEquals(
    jsdoc`
      /**
       * @param {string} nerf This is a param with a {@link https://www.google.com}
       */
    `,
    tsdoc`
      /**
       * @param nerf - This is a param with a {@link https://www.google.com}
       */
    `,
  ));
