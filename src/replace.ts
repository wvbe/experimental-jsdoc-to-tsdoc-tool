import { Block, parse } from "https://esm.sh/comment-parser";
import * as Colors from "https://deno.land/std@0.99.0/fmt/colors.ts";
import { serializeTag } from "./formatting.ts";
import {
  getConstTags,
  getDeprecatedTags,
  getDescriptionAndRemarksTag,
  getDoctypeTags,
  getExampleTags,
  getHideconstructorTags,
  getInternalTags,
  getParamTags,
  getReactTags,
  getReturnsTags,
  getSeeTags,
  getThrowsTags,
  getTypeTags,
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
      ...getInternalTags(ast.tags),
    ],
    [
      // Then the API shape itself
      ...getConstTags(ast.tags),
      ...getDoctypeTags(ast.tags),
      ...getExampleTags(ast.tags),
      ...getHideconstructorTags(ast.tags),
      ...getVirtualTags(ast.tags),
      ...getThrowsTags(ast.tags),
      ...getTypeTags(ast.tags),
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

  // Avoid return empty doclets.
  if (!innerDoclet.length) {
    return "";
  }

  return `${tab}/**${innerDoclet.join("")}${eol} */`;
}

export function replaceJsdocWithTsdoc(
  fileContents: string,
  file?: string,
): string {
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

  const typeOcurrences = rawLines.reduce(
    function (
      ocurrences: number[],
      line: string,
      lineNumber: number,
    ): number[] {
      if (line.includes("@type")) {
        ocurrences.push(lineNumber + 1);
      }
      return ocurrences;
    },
    [],
  );

  if (typeOcurrences.length) {
    typeOcurrences.map((ocurrence) =>
      console.warn(Colors.yellow("[WARN]"), "@type in", file + ":" + ocurrence)
    );
  }

  return rawLines.join("\n");
}
