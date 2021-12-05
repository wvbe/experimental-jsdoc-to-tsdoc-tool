import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

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

Deno.test("@fontosdk members", () =>
  assertEquals(
    jsdoc`
      /**
       * @fontosdk members
       */
    `,
    tsdoc`
      /**
       * @fontosdk
       */
    `,
  ));
Deno.test("@fontosdk members", () => {
  assertEquals(
    jsdoc`
      /**
       * @fontosdk importable
       */
    `,
    tsdoc`
      /**
       * @fontosdk importable
       */
    `,
  );
  assertEquals(
    jsdoc`
      /**
       * @fontosdk    weg  wer  importable  wrg ehtr
       */
    `,
    tsdoc`
      /**
       * @fontosdk importable
       */
    `,
  );
});
