import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@deprecated without include a link", () =>
  assertEquals(
    jsdoc`
      /**
       * @deprecated This contend is deprecated.
       */
    `,
    tsdoc`
      /**
       * @deprecated This contend is deprecated.
       */
    `,
  ));

Deno.test("@deprecated including a link", () =>
  assertEquals(
    jsdoc`
      /**
       * @deprecated This contend is deprecated, see {@link this one}.
       */
    `,
    tsdoc`
      /**
       * @deprecated This contend is deprecated, see {@link this one}.
       */
    `,
  ));
