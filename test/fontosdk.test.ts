import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "./util.ts";

Deno.test("@fontosdk", () =>
  assertEquals(
    jsdoc`
      /**
       * @fontosdk
       */
    `,
    tsdoc`
      /**
       * @fontosdk
       */
    `,
  ));

Deno.test("@fontosdk and members", () =>
  assertEquals(
    jsdoc`
      /**
       * @fontosdk members
       */
    `,
    tsdoc`
      /**
       * @fontosdk members
       */
    `,
  ));
