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
