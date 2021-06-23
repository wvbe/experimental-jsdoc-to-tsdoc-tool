import {
  getJsdocAstsForFileContents,
  getTsdocStringForJsdocAst,
} from "../src/replace.ts";

export function jsdoc(strs: TemplateStringsArray) {
  const asts = getJsdocAstsForFileContents(strs.join("").trimEnd());
  if (asts.length !== 1) {
    throw new Error(`Expected exactly 1 doclet, got ${asts.length}`);
  }
  return getTsdocStringForJsdocAst(asts[0]);
}

export function tsdoc(strs: TemplateStringsArray) {
  return strs.join("").trimEnd();
}
