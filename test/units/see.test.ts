import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@see", () =>
  assertEquals(
    jsdoc`
      /**
       * @see You need to see this.
       * @see And this other too.
       */
    `,
    tsdoc`
      /**
       * @see You need to see this.
       * @see And this other too.
       */
    `,
  ));
Deno.test("@see, with a long description", () =>
  assertEquals(
    jsdoc`
    /**
     * @see Derp skoobadee skoobadaai skoo skeeba fazskooob snaadoo doo daa daa daa nee nerf snoo skeebabadoo snaa doo daa daa daa nee.
     */
    `,
    tsdoc`
    /**
     * @see Derp skoobadee skoobadaai skoo skeeba fazskooob snaadoo doo daa daa daa nee nerf snoo
     * skeebabadoo snaa doo daa daa daa nee.
     */
    `,
  ));
