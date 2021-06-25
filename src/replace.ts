import { Block, parse } from "https://esm.sh/comment-parser";
import {
  getDescriptionAndRemarks,
  getNicelyFormattedAbstractFromTags,
  getNicelyFormattedCategoryFromTags,
  getNicelyFormattedDeprecatedFromTags,
  getNicelyFormattedFontosdkFromTags,
  getNicelyFormattedInternalFromTags,
  getNicelyFormattedParamsFromTags,
  getNicelyFormattedReturnFromTags,
  getNicelyFormattedSeeFromTags,
} from "./formatting.ts";

export function getJsdocAstsForFileContents(fileContents: string): Block[] {
  return parse(fileContents, { spacing: "preserve" });
}

export function getTsdocStringForJsdocAst(ast: Block): string {
  const tab = ast.source[0].tokens.start;
  const eol = "\n" + tab;

  const description = getDescriptionAndRemarks(
    ast.description,
    ast.tags,
  );

  const tags = [
    ...getNicelyFormattedAbstractFromTags(ast.tags),
    ...getNicelyFormattedCategoryFromTags(ast.tags),
    ...getNicelyFormattedDeprecatedFromTags(ast.tags),
    ...getNicelyFormattedFontosdkFromTags(ast.tags),
    ...getNicelyFormattedInternalFromTags(ast.tags),
    ...getNicelyFormattedParamsFromTags(ast.tags),
    ...getNicelyFormattedReturnFromTags(ast.tags),
    ...getNicelyFormattedSeeFromTags(ast.tags),
  ];

  // Wrap everything in a "/**" comment block, and separate the description from all other
  //   tags with a newline.
  return tab + "/**" + [
    ...description,
    description.length && tags.length ? "" : null,
    ...tags,
  ]
    .filter((line) => line !== null)
    .map((line) => (eol + " * " + line).trimEnd())
    .join("") +
    eol + " */";
}

export function replaceJsdocWithTsdoc(fileContents: string): string {
  const rawLines = fileContents.split("\n");
  const asts = getJsdocAstsForFileContents(fileContents);
  // Splice the generated Typescript in
  asts.reverse().forEach((ast) => {
    const firstLine = ast.source[0];
    const lastLine = ast.source[ast.source.length - 1];
    const tsdocLines = getTsdocStringForJsdocAst(ast).split("\n");
    rawLines.splice(
      firstLine.number,
      lastLine.number - firstLine.number + 1,
      ...tsdocLines,
    );
  });
  return rawLines.join("\n");
}
