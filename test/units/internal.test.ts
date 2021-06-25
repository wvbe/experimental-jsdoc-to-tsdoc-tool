import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@internal", () =>
  assertEquals(
    jsdoc`
      /**
       * @internal
       */
    `,
    tsdoc`
      /**
       * @internal
       */
    `,
  ));

Deno.test("@internal and description", () =>
  assertEquals(
    jsdoc`
      /**
       * @internal This is a description.
       */
    `,
    tsdoc`
      /**
       * @internal This is a description.
       */
    `,
  ));
