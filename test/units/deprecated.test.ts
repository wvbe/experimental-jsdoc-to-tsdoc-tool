import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@deprecated without further information", () =>
  assertEquals(
    jsdoc`
      /**
       * @deprecated
       */
    `,
    tsdoc`
      /**
       * @deprecated
       */
    `,
  ));
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
Deno.test("@deprecated with a description on the next line", () =>
  assertEquals(
    jsdoc`
      /**
       * @deprecated
       * This contend is deprecated.
       */
    `,
    tsdoc`
      /**
       * @deprecated This contend is deprecated.
       */
    `,
  ));

Deno.test("@deprecated with a description on the 2nd next line", () =>
  assertEquals(
    jsdoc`
      /**
       * @deprecated
       *
       * This contend is deprecated.
       */
    `,
    tsdoc`
      /**
       * @deprecated This contend is deprecated.
       */
    `,
  ));

Deno.test("@deprecated with a long description across several lines", () =>
  assertEquals(
    jsdoc`
      /**
       * @deprecated This contend is deprecated
       * it is very deprecated please don't
       * use it or you will be fired.
       */
    `,
    tsdoc`
      /**
       * @deprecated This contend is deprecated it is very deprecated please don't use it or you will be
       * fired.
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
