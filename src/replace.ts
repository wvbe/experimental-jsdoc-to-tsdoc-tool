import { Block, parse } from "https://esm.sh/comment-parser";
import {
  getNicelyFormattedAbstractFromTags,
  getNicelyFormattedDeprecatedFromTags,
  getNicelyFormattedFontosdkFromTags,
  getNicelyFormattedInternalFromTags,
  getNicelyFormattedParamsFromTags,
  getNicelyFormattedReturnFromTags,
  getNicelyFormattedSeeFromTags,
  getNicelyWrappedDescription,
} from "./formatting.ts";

export async function getJsdocAstsForFile(filePath: string) {
  return getJsdocAstsForFileContents(await Deno.readTextFile(filePath));
}

export function getJsdocAstsForFileContents(fileContents: string): Block[] {
  return parse(fileContents, { spacing: "preserve" });
}

export function getTsdocStringForJsdocAst(ast: Block): string {
  const tab = ast.source[0].tokens.start;
  const eol = "\n" + tab;

  const description = getNicelyWrappedDescription(
    ast.description,
    ast.tags,
  );

  const tags = [
    ...getNicelyFormattedAbstractFromTags(ast.tags),
    ...getNicelyFormattedDeprecatedFromTags(ast.tags),
    ...getNicelyFormattedFontosdkFromTags(ast.tags),
    ...getNicelyFormattedInternalFromTags(ast.tags),
    ...getNicelyFormattedParamsFromTags(ast.tags),
    ...getNicelyFormattedReturnFromTags(ast.tags),
    ...getNicelyFormattedSeeFromTags(ast.tags),
  ];

  // Wrap everything in a "/**" comment block, and separate the description from all other
  //   tags with a newline.
  return eol + "/**" + [
    ...description,
    description.length && tags.length ? "" : null,
    ...tags,
  ]
    .filter((line) => line !== null)
    .map((line) => (eol + " * " + line).trimEnd())
    .join("") +
    eol + " */";
}
