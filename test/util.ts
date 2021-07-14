import {
  getJsdocAstsForFileContents,
  getTsdocStringForJsdocAst,
  replaceJsdocWithTsdoc,
} from "../src/replace.ts";
import {
  dirname,
  fromFileUrl,
  join,
} from "https://deno.land/std@0.99.0/path/mod.ts";

export function jsdoc(strs: TemplateStringsArray) {
  const asts = getJsdocAstsForFileContents(strs.join("").trimEnd());
  if (asts.length !== 1) {
    throw new Error(`Expected exactly 1 doclet, got ${asts.length}`);
  }

  if (!getTsdocStringForJsdocAst(asts[0])) {
    return "";
  }
  return "\n" + getTsdocStringForJsdocAst(asts[0]);
}

export function tsdoc(strs: TemplateStringsArray) {
  return strs.join("").trimEnd();
}

function readFile(file: string) {
  return Deno.readTextFileSync(
    join(dirname(fromFileUrl(import.meta.url)), file),
  ).replace(/\r\n/g, "\n");
}

export function js(file: string) {
  return replaceJsdocWithTsdoc(readFile(file));
}

export function ts(file: string) {
  return readFile(file);
}
