import { getMarkdownColumnLines } from "../../src/formatting.ts";
import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";

const MEDIUM_LENGTH = `
Erebor became the home of the Folk of Durin, a clan of Dwarves known as the Longbeards, after they were driven from their ancestral home of Khazad-dûm. In the latter days of the Third Age, this Kingdom under the Mountain held one of the largest dwarvish treasure hoards in Middle-earth.
`.trim();

Deno.test("Description, capped to 60 columns", () => {
  const out = getMarkdownColumnLines(MEDIUM_LENGTH, 60, ["> ", "  "]);
  assertEquals(out, [
    "> Erebor became the home of the Folk of Durin, a clan of",
    "  Dwarves known as the Longbeards, after they were driven",
    "  from their ancestral home of Khazad-dûm. In the latter",
    "  days of the Third Age, this Kingdom under the Mountain",
    "  held one of the largest dwarvish treasure hoards in",
    "  Middle-earth.",
  ]);
  console.log(out.reduce((max, l) => max + l.length, 0) / out.length);
});
Deno.test("Description, capped to 60 columns but thicker prefix", () => {
  const out = getMarkdownColumnLines(MEDIUM_LENGTH, 60, [
    "> & @ $         ",
    "                ",
  ]);
  assertEquals(out, [
    "> & @ $         Erebor became the home of the Folk of Durin,",
    "                a clan of Dwarves known as the Longbeards,",
    "                after they were driven from their ancestral",
    "                home of Khazad-dûm. In the latter days of",
    "                the Third Age, this Kingdom under the",
    "                Mountain held one of the largest dwarvish",
    "                treasure hoards in Middle-earth.",
  ]);
  console.log(out.reduce((max, l) => max + l.length, 0) / out.length);
});

Deno.test("Description, maxed to 60 columns, and with hanging prefixes", () => {
  const out = getMarkdownColumnLines(
    MEDIUM_LENGTH,
    60,
    ["> ", "  ", "  ", "  ", "  ", "  ", ">>"],
    " ",
  );
  assertEquals(out, [
    "> Erebor became the home of the Folk of Durin, a clan of    ",
    "  Dwarves known as the Longbeards, after they were driven   ",
    "  from their ancestral home of Khazad-dûm. In the latter    ",
    "  days of the Third Age, this Kingdom under the Mountain    ",
    "  held one of the largest dwarvish treasure hoards in       ",
    "  Middle-earth.                                             ",
    ">>                                                          ",
  ]);
  console.log(out.reduce((max, l) => max + l.length, 0) / out.length);
});
Deno.test("Description, maxed to 60 columns, and with hanging prefixes", () => {
  const out = getMarkdownColumnLines(
    "Skip handing prefixes",
    60,
    ["> ", "  ", "  ", ">>"],
    undefined,
    true,
  );
  assertEquals(out, ["> Skip handing prefixes"]);
  console.log(out.reduce((max, l) => max + l.length, 0) / out.length);
});
