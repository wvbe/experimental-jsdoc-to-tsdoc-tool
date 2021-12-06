import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { jsdoc, tsdoc } from "../util.ts";

Deno.test("@category", () =>
  assertEquals(
    jsdoc`
      /**
       * @category
       */
    `,
    tsdoc``,
  ));

Deno.test("@category and description", () =>
  assertEquals(
    jsdoc`
      /**
       * @category configuration/experiment
       */
    `,
    tsdoc``,
  ));

Deno.test("@category family/cvk", () =>
  assertEquals(
    jsdoc`
      /**
       * @category family/cvk
       */
    `,
    tsdoc`
      /**
       * @category CVK families
       */
    `,
  ));

Deno.test("@category fds/components", () =>
  assertEquals(
    jsdoc`
      /**
       * @category fds/components
       */
    `,
    tsdoc`
      /**
       * @category Design system components
       */
    `,
  ));

Deno.test("@category fds/system", () =>
  assertEquals(
    jsdoc`
      /**
       * @category fds/system
       */
    `,
    tsdoc`
      /**
       * @category Design system utilities
       */
    `,
  ));

Deno.test("@category widget", () =>
  assertEquals(
    jsdoc`
      /**
       * @category widget
       */
    `,
    tsdoc`
      /**
       * @category CVK widgets
       */
    `,
  ));

Deno.test("@category manager", () =>
  assertEquals(
    jsdoc`
      /**
       * @category manager
       */
    `,
    tsdoc`
      /**
       * @category Managers
       */
    `,
  ));
