import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { js, ts } from "../util.ts";

Deno.test("getNodeId.js", () =>
  assertEquals(
    js("./files/getNodeId.in.js"),
    ts("./files/getNodeId.out.js"),
  ));
