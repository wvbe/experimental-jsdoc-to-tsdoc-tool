import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@throws with a link", () =>
  assertEquals(
    jsdoc`
      /**
       * @throws {Error}
       */
    `,
    tsdoc`
      /**
       * @throws {@link Error}
       */
    `,
  ));

Deno.test("@throws and description", () =>
  assertEquals(
    jsdoc`
      /**
       * @throws {Error} This is a description.
       */
    `,
    tsdoc`
      /**
       * @throws {@link Error}
       * This is a description.
       */
    `,
  ));

Deno.test("@throws and long description", () =>
  assertEquals(
    jsdoc`
      /**
       * @throws This is a description with some really long lines,
       * and here continue the description. There is more description for you it you want it. Lots
       * of description and so on.
       */
    `,
    tsdoc`
      /**
       * @throws
       * This is a description with some really long lines, and here continue the
       * description. There is more description for you it you want it. Lots of
       * description and so on.
       */
    `,
  ));
