import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@link text", () =>
  assertEquals(
    jsdoc`
      /**
       * Skeet boop {@link} derp {@link http://newrg.com} derp {@link http://rgeth wrg ewfrgt} {@link http://rgeth
       * | wrg
       * ewfrgt} qewregt
       */
    `,
    tsdoc`
      /**
       * @remarks
       * Skeet boop {@link} derp {@link http://newrg.com} derp {@link http://rgeth | wrg
       * ewfrgt} {@link http://rgeth | wrg ewfrgt} qewregt
       */
    `,
  ));
