import { Block, parse } from "https://esm.sh/comment-parser";
import { serializeTag } from "./formatting.ts";
import {
  getConstTags,
  getDeprecatedTags,
  getDescriptionAndRemarksTag,
  getDoctypeTags,
  getInternalTags,
  getParamTags,
  getReactTags,
  getReturnsTags,
  getSeeTags,
  getThrowsTag,
  getVirtualTags,
} from "./tags.ts";

export function getJsdocAstsForFileContents(fileContents: string): Block[] {
  return parse(fileContents, { spacing: "preserve" });
}

export function getTsdocStringForJsdocAst(ast: Block): string {
  const tab = ast.source[0].tokens.start;
  const eol = "\n" + tab;

  // Create a few "groups" of adjacent lines, and wrap everything in a "/**" codeblock
  const innerDoclet = [
    [
      // The summary, description, and more information go at the top
      ...getDescriptionAndRemarksTag(
        ast.description,
        ast.tags,
      ),
      ...getSeeTags(ast.tags),
    ],
    [
      // Then some TSdoc about the API status
      ...getDeprecatedTags(ast.tags),
      ...serializeTag(ast.tags, "fontosdk"),
      ...serializeTag(ast.tags, "category"),
      ...getInternalTags(ast.tags),
    ],
    [
      // Then the API shape itself
      ...getConstTags(ast.tags),
      ...getDoctypeTags(ast.tags),
      ...getVirtualTags(ast.tags),
      ...getThrowsTag(ast.tags),
      ...getParamTags(ast.tags),
      ...getReactTags(ast.tags),
      ...getReturnsTags(ast.tags),
    ],
  ].reduce((all, block) => {
    const isEmpty = !block.some(Boolean);
    if (isEmpty) {
      return all;
    }
    if (all.length) {
      // A newline separates blocks from one another
      all.push("");
    }
    return all.concat(block);
  }, []).map((line) => `${eol} * ${line}`.trimEnd());

  return `${tab}/**${innerDoclet.join("")}${eol} */`;
}

export function replaceJsdocWithTsdoc(fileContents: string): string {
  const rawLines = fileContents.split("\n");
  getJsdocAstsForFileContents(fileContents).reverse().forEach((ast) => {
    const firstLine = ast.source[0];
    const lastLine = ast.source[ast.source.length - 1];
    rawLines.splice(
      firstLine.number,
      lastLine.number - firstLine.number + 1,
      ...getTsdocStringForJsdocAst(ast).split("\n"),
    );
  });
  return rawLines.join("\n");
}
