import { Block, parse } from "https://esm.sh/comment-parser";
import {
  getNicelyFormattedAbstractFromTags,
  getNicelyFormattedDeprecatedFromTags,
  getNicelyFormattedFontosdkFromTags,
  getNicelyFormattedParamsFromTags,
  getNicelyFormattedReturnFromTags,
  getNicelyFormattedSeeFromTags,
  getNicelyWrappedDescription,
} from "./formatting.ts";

const MAX_LINE_WIDTH = 120;
const TAB_WIDTH = 4;
export async function getJsdocAstsForFile(filePath: string) {
  return getJsdocAstsForFileContents(await Deno.readTextFile(filePath));
}
export function getJsdocAstsForFileContents(fileContents: string): Block[] {
  return parse(fileContents);
}

export function getTsdocStringForJsdocAst(ast: Block): string {
  const tab = ast.source[0].tokens.start;
  const eol = "\n" + tab;
  const maxContentWidth = MAX_LINE_WIDTH -
    eol.split("").reduce(
      (width, char) => width + (char === "\t" ? TAB_WIDTH : char.length),
      0,
    );

  let comment = eol + "/**";

  if (ast.description) {
    comment += "\n" +
      getNicelyWrappedDescription(
        ast.description,
        maxContentWidth,
        tab + " * ",
      );
  }

  comment += [
    ...getNicelyFormattedAbstractFromTags(ast.tags),
    ...getNicelyFormattedDeprecatedFromTags(ast.tags),
    ...getNicelyFormattedFontosdkFromTags(ast.tags),
    ...getNicelyFormattedParamsFromTags(ast.tags),
    ...getNicelyFormattedReturnFromTags(ast.tags),
    ...getNicelyFormattedSeeFromTags(ast.tags),
  ]
    .map((line) => eol + " * " + line)
    .join("");
  comment += eol + " */";
  return comment;
}
