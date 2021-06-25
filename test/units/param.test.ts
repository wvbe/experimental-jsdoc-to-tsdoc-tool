import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

// Just a single parameter without description
//   The TSDoc playground will complain if a param name is not followed by a hyphen.
//   Mind you that this hyphen is, in the absence of a description, not followed by a space or
//   any other character.
Deno.test("@param, without description", () =>
  assertEquals(
    jsdoc`
      /**
       * @param {string} nerf
       */
    `,
    tsdoc`
      /**
       * @param nerf -
       */
    `,
  ));

// Just a single parameter with description
Deno.test("@param, simple description", () =>
  assertEquals(
    jsdoc`
      /**
       * @param {string} nerf Derp
       */
    `,
    tsdoc`
      /**
       * @param nerf - Derp
       */
    `,
  ));

// Several parameters, the names have different lengths and become nicely aligned in output
Deno.test("@param, alignment on name length", () =>
  assertEquals(
    jsdoc`
      /**
       * @param {string} nerf Derp
       * @param {string} nerfOfDifferentLength Derp
       */
    `,
    tsdoc`
      /**
       * @param nerf                  - Derp
       * @param nerfOfDifferentLength - Derp
       */
    `,
  ));

// Optional parameters. Optionality is left out, because this lives in TS
Deno.test("@param, optionality is ignored", () =>
  assertEquals(
    jsdoc`
      /**
       * @param {string} [nerf] Derp
       */
    `,
    tsdoc`
      /**
       * @param nerf - Derp
       */
    `,
  ));

// Parameter defaults. Also left out, because (according to some) this should be part of TS
//   https://github.com/microsoft/tsdoc/issues/151
Deno.test("@param, default value is ignored", () =>
  assertEquals(
    jsdoc`
      /**
       * @param {string} [nerf='foo'] Derp
       */
    `,
    tsdoc`
      /**
       * @param nerf - Derp
       */
    `,
  ));
