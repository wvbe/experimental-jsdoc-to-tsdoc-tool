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
       * @remarks
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
       * @remarks
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

Deno.test("@link referencing object properties", () =>
  assertEquals(
    jsdoc`
      /**
       * {@link ConfigurationValueTypes."configuration-manager-value"}
       */
    `,
    tsdoc`
      /**
       * @remarks
       * {@link ConfigurationValueTypes."configuration-manager-value"}
       */
    `,
  ));
