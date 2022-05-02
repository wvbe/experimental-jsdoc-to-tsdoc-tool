import { Block, parse } from "https://esm.sh/comment-parser@1.3.0";
import { serializeTag } from "./formatting.ts";
import {
  getDeprecatedTags,
  getDescriptionAndRemarksTag,
  getExampleTags,
  getInternalTags,
  getParamTags,
  getReturnsTags,
  getSeeTags,
  getThrowsTags,
  getVirtualTags,
} from "./tags.ts";

export function getJsdocAstsForFileContents(fileContents: string): Block[] {
  return parse(fileContents, { spacing: "preserve" });
}

const fancyCategoryNames: { [legacy: string]: string } = {
  "family/cvk": "CVK families",
  "fds/components": "Design system components",
  "fds/system": "Design system utilities",
  "widget": "CVK widgets",
  "manager": "Managers",
};

export function getTsdocStringForJsdocAst(ast: Block): string {
  const tab = ast.source[0].tokens.start;
  const eol = "\n" + tab;

  // Create a few "groups" of adjacent lines, and wrap everything in a "/**" codeblock
  const innerDoclet = [
    [
      // The summary, description, and more information go at the top
      ...getDescriptionAndRemarksTag(ast.description, ast.tags),
    ],
    [...getExampleTags(ast.tags)],
    [...getSeeTags(ast.tags)],
    [
      // Then some TSdoc about the API status
      ...getDeprecatedTags(ast.tags),
    ],
    [
      ...serializeTag(ast.tags, "fontosdk", {
        // Leave only `@fontosdk importable` in place, drop all other suffixes
        transformLine: (line: string) =>
          line
            .split(/\s+/)
            .filter((tag) => tag === "importable")
            .join(" "),
      }),
      ...serializeTag(ast.tags, "category", {
        transformLine: (category: string) => {
          if (fancyCategoryNames[category]) {
            return fancyCategoryNames[category];
          }
          return null;
        },
      }),
    ],
    [
      ...getInternalTags(ast.tags),
      ...getVirtualTags(ast.tags),
      ...getThrowsTags(ast.tags),
    ],
    [...getParamTags(ast.tags)],
    [...getReturnsTags(ast.tags)],
  ]
    .reduce((all, block) => {
      const isEmpty = !block.some(Boolean);
      if (isEmpty) {
        return all;
      }
      if (all.length) {
        // A newline separates blocks from one another
        all.push("");
      }
      return all.concat(block);
    }, [])
    .map((line) => `${eol} * ${line}`.trimEnd());

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
  getJsdocAstsForFileContents(fileContents)
    .reverse()
    .forEach((ast) => {
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
